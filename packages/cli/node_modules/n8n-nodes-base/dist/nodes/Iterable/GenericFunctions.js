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
  iterableApiRequest: () => iterableApiRequest,
  iterableApiRequestAllItems: () => iterableApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function iterableApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const credentials = await this.getCredentials("iterableApi");
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    url: uri || `${credentials.region}/api${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.httpRequestWithAuthentication.call(this, "iterableApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function iterableApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.maxResults = 100;
  do {
    responseData = await iterableApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  iterableApiRequest,
  iterableApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map