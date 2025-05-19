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
var calendar = __toESM(require("./calendar"));
var contact = __toESM(require("./contact"));
var draft = __toESM(require("./draft"));
var event = __toESM(require("./event"));
var folder = __toESM(require("./folder"));
var folderMessage = __toESM(require("./folderMessage"));
var message = __toESM(require("./message"));
var messageAttachment = __toESM(require("./messageAttachment"));
var import_configureWaitTillDate = require("../../../../../utils/sendAndWait/configureWaitTillDate.util");
async function router() {
  const items = this.getInputData();
  const returnData = [];
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  let responseData;
  const microsoftOutlook = {
    resource,
    operation
  };
  if (microsoftOutlook.resource === "message" && microsoftOutlook.operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
    await message[microsoftOutlook.operation].execute.call(this, 0, items);
    const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
    await this.putExecutionToWait(waitTill);
    return [items];
  }
  for (let i = 0; i < items.length; i++) {
    try {
      switch (microsoftOutlook.resource) {
        case "calendar":
          responseData = await calendar[microsoftOutlook.operation].execute.call(this, i);
          break;
        case "contact":
          responseData = await contact[microsoftOutlook.operation].execute.call(this, i);
          break;
        case "draft":
          responseData = await draft[microsoftOutlook.operation].execute.call(this, i, items);
          break;
        case "event":
          responseData = await event[microsoftOutlook.operation].execute.call(this, i);
          break;
        case "folder":
          responseData = await folder[microsoftOutlook.operation].execute.call(this, i);
          break;
        case "folderMessage":
          responseData = await folderMessage[microsoftOutlook.operation].execute.call(this, i);
          break;
        case "message":
          responseData = await message[microsoftOutlook.operation].execute.call(this, i, items);
          break;
        case "messageAttachment":
          responseData = await messageAttachment[microsoftOutlook.operation].execute.call(
            this,
            i,
            items
          );
          break;
        default:
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known`);
      }
      returnData.push(...responseData);
    } catch (error) {
      if (this.continueOnFail()) {
        const executionErrorData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray({ error: error.message }),
          { itemData: { item: i } }
        );
        returnData.push(...executionErrorData);
        continue;
      }
      if (error instanceof import_n8n_workflow.NodeApiError && error?.context?.itemIndex === void 0) {
        if (error.context === void 0) {
          error.context = {};
        }
        error.context.itemIndex = i;
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