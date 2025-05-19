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
var alert = __toESM(require("./alert"));
var case_ = __toESM(require("./case"));
var comment = __toESM(require("./comment"));
var log = __toESM(require("./log"));
var observable = __toESM(require("./observable"));
var page = __toESM(require("./page"));
var query = __toESM(require("./query"));
var task = __toESM(require("./task"));
async function router() {
  const items = this.getInputData();
  const returnData = [];
  const length = items.length;
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  let executionData = [];
  const theHiveNodeData = {
    resource,
    operation
  };
  for (let i = 0; i < length; i++) {
    try {
      switch (theHiveNodeData.resource) {
        case "alert":
          executionData = await alert[theHiveNodeData.operation].execute.call(this, i, items[i]);
          break;
        case "case":
          executionData = await case_[theHiveNodeData.operation].execute.call(this, i, items[i]);
          break;
        case "comment":
          executionData = await comment[theHiveNodeData.operation].execute.call(this, i);
          break;
        case "log":
          executionData = await log[theHiveNodeData.operation].execute.call(this, i, items[i]);
          break;
        case "observable":
          executionData = await observable[theHiveNodeData.operation].execute.call(
            this,
            i,
            items[i]
          );
          break;
        case "page":
          executionData = await page[theHiveNodeData.operation].execute.call(this, i);
          break;
        case "query":
          executionData = await query[theHiveNodeData.operation].execute.call(this, i);
          break;
        case "task":
          executionData = await task[theHiveNodeData.operation].execute.call(this, i, items[i]);
          break;
        default:
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not supported!`
          );
      }
      returnData.push(...executionData);
    } catch (error) {
      if (this.continueOnFail()) {
        executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray({ error: error.message }),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
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