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
var transport_exports = {};
__export(transport_exports, {
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body = {}, query = {}) {
  const credentials = await this.getCredentials("syncroMspApi");
  query.api_key = credentials.apiKey;
  const options = {
    method,
    body,
    qs: query,
    url: `https://${credentials.subdomain}.syncromsp.com/api/v1/${endpoint}`,
    headers: {}
  };
  try {
    return await this.helpers.httpRequest(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(method, endpoint, body = {}, query = {}) {
  let returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    query.page++;
    returnData = returnData.concat(responseData[endpoint]);
  } while (responseData[endpoint].length !== 0);
  return returnData;
}
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const { subdomain, apiKey } = credentials;
  const options = {
    method: "GET",
    qs: {
      api_key: apiKey
    },
    url: `https://${subdomain}.syncromsp.com/api/v1//me`
  };
  return await this.helpers.request(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems,
  validateCredentials
});
//# sourceMappingURL=index.js.map