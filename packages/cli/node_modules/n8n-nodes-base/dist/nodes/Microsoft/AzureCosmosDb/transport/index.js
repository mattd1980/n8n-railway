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
  azureCosmosDbApiRequest: () => azureCosmosDbApiRequest
});
module.exports = __toCommonJS(transport_exports);
async function azureCosmosDbApiRequest(method, endpoint, body = {}, qs, headers, returnFullResponse = false) {
  const credentialsType = "microsoftAzureCosmosDbSharedKeyApi";
  const credentials = await this.getCredentials(credentialsType);
  const baseUrl = `https://${credentials.account}.documents.azure.com/dbs/${credentials.database}`;
  const options = {
    method,
    url: `${baseUrl}${endpoint}`,
    json: true,
    headers,
    body,
    qs,
    returnFullResponse
  };
  return await this.helpers.httpRequestWithAuthentication.call(this, credentialsType, options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  azureCosmosDbApiRequest
});
//# sourceMappingURL=index.js.map