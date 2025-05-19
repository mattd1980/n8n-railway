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
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function googleApiRequest(projectId, method, resource, body = {}, qs = {}, headers = {}, uri = null) {
  const { region } = await this.getCredentials("googleFirebaseRealtimeDatabaseOAuth2Api");
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    url: uri || `https://${projectId}.${region}/${resource}.json`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(
      this,
      "googleFirebaseRealtimeDatabaseOAuth2Api",
      options
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function googleApiRequestAllItems(projectId, method, resource, body = {}, qs = {}, _headers = {}, uri = null) {
  const returnData = [];
  let responseData;
  qs.pageSize = 100;
  do {
    responseData = await googleApiRequest.call(
      this,
      projectId,
      method,
      resource,
      body,
      qs,
      {},
      uri
    );
    qs.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[resource]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiRequest,
  googleApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map