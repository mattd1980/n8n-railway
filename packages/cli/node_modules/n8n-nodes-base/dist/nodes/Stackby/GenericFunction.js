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
var GenericFunction_exports = {};
__export(GenericFunction_exports, {
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems
});
module.exports = __toCommonJS(GenericFunction_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body, query, uri, option = {}) {
  const credentials = await this.getCredentials("stackbyApi");
  const options = {
    headers: {
      "api-key": credentials.apiKey,
      "Content-Type": "application/json"
    },
    method,
    body,
    qs: query,
    uri: uri || `https://stackby.com/api/betav1${endpoint}`,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(method, endpoint, body = {}, query = {}) {
  query.maxrecord = 100;
  query.offset = 0;
  const returnData = [];
  let responseData;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData);
    query.offset += query.maxrecord;
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems
});
//# sourceMappingURL=GenericFunction.js.map