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
  merge: () => merge,
  simplify: () => simplify
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function googleApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  const baseURL = "https://analyticsreporting.googleapis.com";
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `${baseURL}${endpoint}`,
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
      const [message, ...rest] = parsedError.error.message.split("\n");
      const description = rest.join("\n");
      const httpCode = parsedError.error.code;
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message,
        description,
        httpCode
      });
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { message: error.message });
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, uri) {
  const returnData = [];
  let responseData;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
    if (body.reportRequests && Array.isArray(body.reportRequests)) {
      body.reportRequests[0].pageToken = responseData[propertyName][0].nextPageToken;
    } else {
      body.pageToken = responseData.nextPageToken;
    }
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "" || responseData[propertyName]?.[0].nextPageToken !== void 0);
  return returnData;
}
function simplify(responseData) {
  const response = [];
  for (const {
    columnHeader: { dimensions, metricHeader },
    data: { rows }
  } of responseData) {
    if (rows === void 0) {
      continue;
    }
    const metrics = metricHeader.metricHeaderEntries.map((entry) => entry.name);
    for (const row of rows) {
      const data = {};
      if (dimensions) {
        for (let i = 0; i < dimensions.length; i++) {
          data[dimensions[i]] = row.dimensions[i];
          for (const [index, metric] of metrics.entries()) {
            data[metric] = row.metrics[0].values[index];
          }
        }
      } else {
        for (const [index, metric] of metrics.entries()) {
          data[metric] = row.metrics[0].values[index];
        }
      }
      response.push(data);
    }
  }
  return response;
}
function merge(responseData) {
  const response = {
    columnHeader: responseData[0].columnHeader,
    data: responseData[0].data
  };
  const allRows = [];
  for (const {
    data: { rows }
  } of responseData) {
    allRows.push(...rows);
  }
  response.data.rows = allRows;
  return [response];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiRequest,
  googleApiRequestAllItems,
  merge,
  simplify
});
//# sourceMappingURL=GenericFunctions.js.map