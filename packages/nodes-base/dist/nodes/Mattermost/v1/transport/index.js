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
  apiRequestAllItems: () => apiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
async function apiRequest(method, endpoint, body = {}, query = {}) {
  const credentials = await this.getCredentials("mattermostApi");
  const baseUrl = credentials.baseUrl.replace(/\/$/, "");
  const options = {
    method,
    body,
    qs: query,
    url: `${baseUrl}/api/v4/${endpoint}`,
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    skipSslCertificateValidation: credentials.allowUnauthorizedCerts
  };
  return await this.helpers.httpRequestWithAuthentication.call(this, "mattermostApi", options);
}
async function apiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 0;
  query.per_page = 100;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData);
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems
});
//# sourceMappingURL=index.js.map