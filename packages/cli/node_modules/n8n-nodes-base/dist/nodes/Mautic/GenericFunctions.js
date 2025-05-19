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
  mauticApiRequest: () => mauticApiRequest,
  mauticApiRequestAllItems: () => mauticApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function mauticApiRequest(method, endpoint, body = {}, query, uri) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "credentials");
  const options = {
    headers: {},
    method,
    qs: query,
    uri: uri || `/api${endpoint}`,
    body,
    json: true
  };
  try {
    let returnData;
    if (authenticationMethod === "credentials") {
      const credentials = await this.getCredentials("mauticApi");
      const baseUrl = credentials.url;
      options.uri = `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${options.uri}`;
      returnData = await this.helpers.requestWithAuthentication.call(this, "mauticApi", options);
    } else {
      const credentials = await this.getCredentials("mauticOAuth2Api");
      const baseUrl = credentials.url;
      options.uri = `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${options.uri}`;
      returnData = await this.helpers.requestOAuth2.call(this, "mauticOAuth2Api", options, {
        includeCredentialsOnRefreshOnBody: true
      });
    }
    if (returnData.errors) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), returnData);
    }
    return returnData;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function mauticApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 30;
  query.start = 0;
  do {
    responseData = await mauticApiRequest.call(this, method, endpoint, body, query);
    const values = Object.values(responseData[propertyName]);
    returnData.push.apply(returnData, values);
    query.start += query.limit;
  } while (responseData.total !== void 0 && returnData.length - parseInt(responseData.total, 10) < 0);
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mauticApiRequest,
  mauticApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map