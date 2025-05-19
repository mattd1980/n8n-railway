"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transport_exports = {};
__export(transport_exports, {
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../../GenericFunctions");
async function apiRequest(method, resource, body = {}, qs = {}, uri, headers = {}, option = {}) {
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
    uri: uri || `https://sheets.googleapis.com${resource}`,
    json: true,
    ...option
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
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "sheetV2");
      options.headers.Authorization = `Bearer ${access_token}`;
      return await this.helpers.request(options);
    } else if (authenticationMethod === "triggerOAuth2") {
      return await this.helpers.requestOAuth2.call(this, "googleSheetsTriggerOAuth2Api", options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "googleSheetsOAuth2Api", options);
    }
  } catch (error) {
    if (error.code === "ERR_OSSL_PEM_NO_START_LINE") {
      error.statusCode = "401";
    }
    if (error instanceof import_n8n_workflow.NodeApiError) {
      if (error.message.includes("PERMISSION_DENIED")) {
        const details = error.description ? ` Details of the error: ${error.description}.` : "";
        const description = `Please check that the account you're using has the right permissions. (If you're trying to modify the sheet, you'll need edit access.)${details}`;
        (0, import_set.default)(error, "description", description);
      }
      throw error;
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, uri) {
  const returnData = [];
  let responseData;
  query.maxResults = 100;
  const url = uri ? uri : `https://sheets.googleapis.com${method}`;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query, url);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems
});
//# sourceMappingURL=index.js.map