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
  googleBigQueryApiRequest: () => googleBigQueryApiRequest,
  googleBigQueryApiRequestAllItems: () => googleBigQueryApiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../../GenericFunctions");
async function googleBigQueryApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
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
    uri: uri || `https://bigquery.googleapis.com/bigquery${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (authenticationMethod === "serviceAccount") {
      const credentials = await this.getCredentials("googleApi");
      if (credentials === void 0) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials got returned!");
      }
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "bigquery");
      options.headers.Authorization = `Bearer ${access_token}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "googleBigQueryOAuth2Api", options);
    }
  } catch (error) {
    if (error.code === "ERR_OSSL_PEM_NO_START_LINE") {
      error.statusCode = "401";
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
      message: error?.error?.error?.message || error.message
    });
  }
}
async function googleBigQueryApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  let rows = [];
  let responseData;
  if (query.maxResults === void 0) {
    query.maxResults = 1e3;
  }
  do {
    responseData = await googleBigQueryApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.pageToken;
    rows = rows.concat(responseData.rows ?? []);
  } while (responseData.pageToken !== void 0 && responseData.pageToken !== "");
  return { ...responseData || {}, rows };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleBigQueryApiRequest,
  googleBigQueryApiRequestAllItems
});
//# sourceMappingURL=index.js.map