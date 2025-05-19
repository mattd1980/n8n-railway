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
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var alert = __toESM(require("./alert"));
var report = __toESM(require("./report"));
var search = __toESM(require("./search"));
var user = __toESM(require("./user"));
async function router() {
  const items = this.getInputData();
  let returnData = [];
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const splunkNodeData = {
    resource,
    operation
  };
  let responseData;
  for (let i = 0; i < items.length; i++) {
    try {
      switch (splunkNodeData.resource) {
        case "alert":
          responseData = await alert[splunkNodeData.operation].execute.call(this, i);
          break;
        case "report":
          responseData = await report[splunkNodeData.operation].execute.call(this, i);
          break;
        case "search":
          responseData = await search[splunkNodeData.operation].execute.call(this, i);
          break;
        case "user":
          responseData = await user[splunkNodeData.operation].execute.call(this, i);
          break;
        default:
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Resource not found", { itemIndex: i });
      }
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.cause.error }, pairedItem: { item: i } });
        continue;
      }
      if (error instanceof import_n8n_workflow.NodeApiError) {
        (0, import_set.default)(error, "context.itemIndex", i);
        throw error;
      }
      if (error instanceof import_n8n_workflow.NodeOperationError) {
        if (error?.context?.itemIndex === void 0) {
          (0, import_set.default)(error, "context.itemIndex", i);
        }
        throw error;
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex: i });
    }
    const executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData),
      { itemData: { item: i } }
    );
    returnData = returnData.concat(executionData);
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map