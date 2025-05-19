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
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
async function googleApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  const propertyType = this.getNodeParameter("propertyType", 0, "universal");
  const baseURL = propertyType === "ga4" ? "https://analyticsdata.googleapis.com" : "https://analyticsreporting.googleapis.com";
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri ?? `${baseURL}${endpoint}`,
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    return await this.helpers.requestOAuth2.call(this, "googleAnalyticsOAuth2", options);
  } catch (error) {
    const errorData = (error.message || "").split(" - ")[1];
    if (errorData) {
      const parsedError = JSON.parse(errorData.trim());
      if (parsedError.error?.message) {
        const [message, ...rest] = parsedError.error.message.split("\n");
        const description = rest.join("\n");
        const httpCode = parsedError.error.code;
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message,
          description,
          httpCode
        });
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { message: error.message });
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, uri) {
  const propertyType = this.getNodeParameter("propertyType", 0, "universal");
  const returnData = [];
  let responseData;
  if (propertyType === "ga4") {
    let rows = [];
    query.limit = 1e5;
    query.offset = 0;
    responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
    rows = rows.concat(responseData.rows);
    query.offset = rows.length;
    while (responseData.rowCount > rows.length) {
      responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
      rows = rows.concat(responseData.rows);
      query.offset = rows.length;
    }
    responseData.rows = rows;
    returnData.push(responseData);
  } else {
    do {
      responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
      if (body.reportRequests && Array.isArray(body.reportRequests)) {
        body.reportRequests[0].pageToken = responseData[propertyName][0].nextPageToken;
      } else {
        body.pageToken = responseData.nextPageToken;
      }
      returnData.push.apply(returnData, responseData[propertyName]);
    } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "" || responseData[propertyName]?.[0].nextPageToken !== void 0);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiRequest,
  googleApiRequestAllItems
});
//# sourceMappingURL=index.js.map