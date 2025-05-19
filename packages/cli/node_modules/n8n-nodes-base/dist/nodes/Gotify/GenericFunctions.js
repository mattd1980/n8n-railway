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
  gotifyApiRequest: () => gotifyApiRequest,
  gotifyApiRequestAllItems: () => gotifyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function gotifyApiRequest(method, path, body = {}, qs = {}, uri, _option = {}) {
  const credentials = await this.getCredentials("gotifyApi");
  const options = {
    method,
    headers: {
      "X-Gotify-Key": method === "POST" ? credentials.appApiToken : credentials.clientApiToken,
      accept: "application/json"
    },
    body,
    qs,
    uri: uri || `${credentials.url}${path}`,
    json: true,
    rejectUnauthorized: !credentials.ignoreSSLIssues
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function gotifyApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.limit = 100;
  do {
    responseData = await gotifyApiRequest.call(this, method, endpoint, body, query, uri);
    if (responseData.paging.next) {
      uri = responseData.paging.next;
    }
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.paging.next);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gotifyApiRequest,
  gotifyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map