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
var execute_exports = {};
__export(execute_exports, {
  getAll: () => getAll
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function getAll(index) {
  const returnAll = this.getNodeParameter("returnAll", index);
  const filters = this.getNodeParameter("filters", index);
  let qs = {};
  const requestMethod = "GET";
  const endpoint = "customers";
  const body = {};
  if (filters) {
    qs = filters;
    if (qs.businessName) {
      qs.business_name = qs.businessName;
    }
    if (qs.includeDisabled) {
      qs.include_disabled = qs.includeDisabled;
    }
  }
  if (!returnAll) {
    qs.per_page = this.getNodeParameter("limit", index);
  }
  let responseData;
  if (returnAll) {
    responseData = await import_transport.apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
    return this.helpers.returnJsonArray(responseData);
  } else {
    responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
    return this.helpers.returnJsonArray(responseData.customers);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAll
});
//# sourceMappingURL=execute.js.map