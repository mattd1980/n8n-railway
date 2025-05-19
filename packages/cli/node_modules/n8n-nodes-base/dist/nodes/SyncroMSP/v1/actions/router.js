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
var contact = __toESM(require("./contact"));
var customer = __toESM(require("./customer"));
var rmm = __toESM(require("./rmm"));
var ticket = __toESM(require("./ticket"));
async function router() {
  const items = this.getInputData();
  const operationResult = [];
  for (let i = 0; i < items.length; i++) {
    const resource = this.getNodeParameter("resource", i);
    let operation = this.getNodeParameter("operation", i);
    let responseData = [];
    if (operation === "del") {
      operation = "delete";
    }
    const syncroMsp = {
      resource,
      operation
    };
    try {
      if (syncroMsp.resource === "customer") {
        responseData = await customer[syncroMsp.operation].execute.call(this, i);
      } else if (syncroMsp.resource === "ticket") {
        responseData = await ticket[syncroMsp.operation].execute.call(this, i);
      } else if (syncroMsp.resource === "contact") {
        responseData = await contact[syncroMsp.operation].execute.call(this, i);
      } else if (syncroMsp.resource === "rmm") {
        responseData = await rmm[syncroMsp.operation].execute.call(this, i);
      }
      const executionData = this.helpers.constructExecutionMetaData(responseData, {
        itemData: { item: i }
      });
      operationResult.push(...executionData);
    } catch (err) {
      if (this.continueOnFail()) {
        const executionErrorData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray({ error: err.message }),
          { itemData: { item: i } }
        );
        operationResult.push(...executionErrorData);
      } else {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), err, { itemIndex: i });
      }
    }
  }
  return [operationResult];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map