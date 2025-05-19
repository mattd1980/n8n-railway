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
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  simplify: () => simplify
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
async function googleApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
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
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.maxResults = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.pageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.pageToken !== void 0 && responseData.pageToken !== "");
  return returnData;
}
function simplify(rows, fields) {
  const results = [];
  for (const row of rows) {
    const record = {};
    for (const [index, field] of fields.entries()) {
      record[field] = row.f[index].v;
    }
    results.push(record);
  }
  return results;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiRequest,
  googleApiRequestAllItems,
  simplify
});
//# sourceMappingURL=GenericFunctions.js.map