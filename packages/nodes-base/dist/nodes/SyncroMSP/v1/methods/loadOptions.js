"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getCustomers: () => getCustomers
});
module.exports = __toCommonJS(loadOptions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
async function getCustomers() {
  const endpoint = "customers";
  const responseData = await import_transport.apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  for (const data of responseData) {
    returnData.push({
      name: data.fullname,
      value: data.id
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomers
});
//# sourceMappingURL=loadOptions.js.map