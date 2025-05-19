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
  extractID: () => extractID,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  hasKeys: () => hasKeys,
  upperFirst: () => upperFirst
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../GenericFunctions");
async function googleApiRequest(method, endpoint, body = {}, qs, uri) {
  const authenticationMethod = this.getNodeParameter(
    "authentication",
    0,
    "serviceAccount"
  );
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://docs.googleapis.com/v1${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  try {
    if (authenticationMethod === "serviceAccount") {
      const credentials = await this.getCredentials("googleApi");
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "docs");
      options.headers.Authorization = `Bearer ${access_token}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "googleDocsOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, qs, uri) {
  const returnData = [];
  let responseData;
  const query = { ...qs };
  query.maxResults = 100;
  query.pageSize = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
const hasKeys = (obj = {}) => Object.keys(obj).length > 0;
const extractID = (url) => {
  const regex = new RegExp("https://docs.google.com/document/d/([a-zA-Z0-9-_]+)/");
  const results = regex.exec(url);
  return results ? results[1] : void 0;
};
const upperFirst = (str) => {
  return str[0].toUpperCase() + str.substr(1);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractID,
  googleApiRequest,
  googleApiRequestAllItems,
  hasKeys,
  upperFirst
});
//# sourceMappingURL=GenericFunctions.js.map