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
  contentfulApiRequest: () => contentfulApiRequest,
  contentfulApiRequestAllItems: () => contentfulApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function contentfulApiRequest(method, resource, body = {}, qs = {}, uri, _option = {}) {
  const credentials = await this.getCredentials("contentfulApi");
  const source = this.getNodeParameter("source", 0);
  const isPreview = source === "previewApi";
  const options = {
    method,
    qs,
    body,
    uri: uri || `https://${isPreview ? "preview" : "cdn"}.contentful.com${resource}`,
    json: true
  };
  if (isPreview) {
    qs.access_token = credentials.ContentPreviewaccessToken;
  } else {
    qs.access_token = credentials.ContentDeliveryaccessToken;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function contentfulApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  query.skip = 0;
  do {
    responseData = await contentfulApiRequest.call(this, method, resource, body, query);
    query.skip = (query.skip + 1) * query.limit;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (returnData.length < responseData.total);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contentfulApiRequest,
  contentfulApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map