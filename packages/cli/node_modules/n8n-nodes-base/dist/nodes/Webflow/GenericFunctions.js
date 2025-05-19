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
  getCollections: () => getCollections,
  getFields: () => getFields,
  getSites: () => getSites,
  webflowApiRequest: () => webflowApiRequest,
  webflowApiRequestAllItems: () => webflowApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function webflowApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  let credentialsType = "webflowOAuth2Api";
  let options = {
    method,
    qs,
    body,
    url: uri || `https://api.webflow.com${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (this.getNode().typeVersion === 1) {
    const authenticationMethod = this.getNodeParameter("authentication", 0, "accessToken");
    if (authenticationMethod === "accessToken") {
      credentialsType = "webflowApi";
    }
    options.headers = { "accept-version": "1.0.0" };
  } else {
    options.returnFullResponse = true;
    options.url = `https://api.webflow.com/v2${resource}`;
  }
  if (Object.keys(options.qs).length === 0) {
    delete options.qs;
  }
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  return await this.helpers.httpRequestWithAuthentication.call(this, credentialsType, options);
}
async function webflowApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  query.offset = 0;
  const isTypeVersion1 = this.getNode().typeVersion === 1;
  do {
    responseData = await webflowApiRequest.call(this, method, endpoint, body, query);
    const items = isTypeVersion1 ? responseData.items : responseData.body.items;
    returnData.push(...items);
    if (responseData.offset !== void 0 || responseData?.body?.pagination?.offset !== void 0) {
      query.offset += query.limit;
    }
  } while (isTypeVersion1 ? returnData.length < responseData.total : returnData.length < responseData.body.pagination.total);
  return returnData;
}
async function getSites() {
  const returnData = [];
  const response = await webflowApiRequest.call(this, "GET", "/sites");
  const sites = response.body?.sites || response;
  for (const site of sites) {
    returnData.push({
      name: site.displayName || site.name,
      value: site.id || site._id
    });
  }
  return returnData;
}
async function getCollections() {
  const returnData = [];
  const siteId = this.getCurrentNodeParameter("siteId");
  const response = await webflowApiRequest.call(this, "GET", `/sites/${siteId}/collections`);
  const collections = response.body?.collections || response;
  for (const collection of collections) {
    returnData.push({
      name: collection.displayName || collection.name,
      value: collection.id || collection._id
    });
  }
  return returnData;
}
async function getFields() {
  const returnData = [];
  const collectionId = this.getCurrentNodeParameter("collectionId");
  const response = await webflowApiRequest.call(this, "GET", `/collections/${collectionId}`);
  const fields = response.body?.fields || response;
  for (const field of fields) {
    returnData.push({
      name: `${field.displayName || field.name} (${field.type}) ${field.isRequired || field.required ? " (required)" : ""}`,
      value: field.slug
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCollections,
  getFields,
  getSites,
  webflowApiRequest,
  webflowApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map