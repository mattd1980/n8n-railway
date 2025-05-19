"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var import_n8n_workflow = require("n8n-workflow");
var channel = __toESM(require("./channel"));
var channelMessage = __toESM(require("./channelMessage"));
var chatMessage = __toESM(require("./chatMessage"));
var task = __toESM(require("./task"));
var import_configureWaitTillDate = require("../../../../../utils/sendAndWait/configureWaitTillDate.util");
async function router() {
  const items = this.getInputData();
  const returnData = [];
  let responseData;
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const nodeVersion = this.getNode().typeVersion;
  const instanceId = this.getInstanceId();
  const microsoftTeamsTypeData = {
    resource,
    operation
  };
  if (microsoftTeamsTypeData.resource === "chatMessage" && microsoftTeamsTypeData.operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
    await chatMessage[microsoftTeamsTypeData.operation].execute.call(this, 0, instanceId);
    const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
    await this.putExecutionToWait(waitTill);
    return [items];
  }
  for (let i = 0; i < items.length; i++) {
    try {
      switch (microsoftTeamsTypeData.resource) {
        case "channel":
          responseData = await channel[microsoftTeamsTypeData.operation].execute.call(this, i);
          break;
        case "channelMessage":
          responseData = await channelMessage[microsoftTeamsTypeData.operation].execute.call(
            this,
            i,
            nodeVersion,
            instanceId
          );
          break;
        case "chatMessage":
          responseData = await chatMessage[microsoftTeamsTypeData.operation].execute.call(
            this,
            i,
            instanceId
          );
          break;
        case "task":
          responseData = await task[microsoftTeamsTypeData.operation].execute.call(this, i);
          break;
        default:
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not supported!`
          );
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      if (this.continueOnFail()) {
        const executionErrorData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray({ error: error.message }),
          { itemData: { item: i } }
        );
        returnData.push(...executionErrorData);
        continue;
      }
      throw error;
    }
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map