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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  codaApiRequest: () => codaApiRequest,
  codaApiRequestAllItems: () => codaApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function codaApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("codaApi");
  let options = {
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
      "User-Agent": "n8n"
    },
    method,
    qs,
    body,
    uri: uri || `https://coda.io/apis/v1${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function codaApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  let uri;
  do {
    responseData = await codaApiRequest.call(this, method, resource, body, query, uri);
    uri = responseData.nextPageLink;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageLink !== void 0 && responseData.nextPageLink !== "");
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  codaApiRequest,
  codaApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map