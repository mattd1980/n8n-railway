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
  getAllResource: () => getAllResource,
  harvestApiRequest: () => harvestApiRequest,
  harvestApiRequestAllItems: () => harvestApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function harvestApiRequest(method, qs, path, body = {}, option = {}, uri) {
  let options = {
    headers: {
      "Harvest-Account-Id": `${this.getNodeParameter("accountId", 0)}`,
      "User-Agent": "Harvest App",
      Authorization: ""
    },
    method,
    body,
    uri: uri || `https://api.harvestapp.com/v2/${path}`,
    qs,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("harvestApi");
      options.headers.Authorization = `Bearer ${credentials.accessToken}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "harvestOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function harvestApiRequestAllItems(method, qs, uri, resource, body = {}, option = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await harvestApiRequest.call(this, method, qs, uri, body, option);
    qs.page = responseData.next_page;
    returnData.push.apply(returnData, responseData[resource]);
  } while (responseData.next_page);
  return returnData;
}
async function getAllResource(resource, i) {
  const endpoint = resource;
  const qs = {};
  const requestMethod = "GET";
  qs.per_page = 100;
  const additionalFields = this.getNodeParameter("filters", i);
  const returnAll = this.getNodeParameter("returnAll", i);
  Object.assign(qs, additionalFields);
  let responseData = {};
  if (returnAll) {
    responseData[resource] = await harvestApiRequestAllItems.call(
      this,
      requestMethod,
      qs,
      endpoint,
      resource
    );
  } else {
    const limit = this.getNodeParameter("limit", i);
    qs.per_page = limit;
    responseData = await harvestApiRequest.call(this, requestMethod, qs, endpoint);
  }
  return responseData[resource];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllResource,
  harvestApiRequest,
  harvestApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map