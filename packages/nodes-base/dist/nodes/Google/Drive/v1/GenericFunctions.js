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
  extractId: () => extractId,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
async function googleApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter(
    "authentication",
    0,
    "serviceAccount"
  );
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://www.googleapis.com${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (authenticationMethod === "serviceAccount") {
      const credentials = await this.getCredentials("googleApi");
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "drive");
      options.headers.Authorization = `Bearer ${access_token}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "googleDriveOAuth2Api", options);
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
  query.maxResults = query.maxResults || 100;
  query.pageSize = query.pageSize || 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
function extractId(url) {
  if (url.includes("/d/")) {
    const data = url.match(/[-\w]{25,}/);
    if (Array.isArray(data)) {
      return data[0];
    }
  } else if (url.includes("/folders/")) {
    return url.split("/folders/")[1];
  }
  return url;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractId,
  googleApiRequest,
  googleApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map