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
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  getForms: () => getForms
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body, query) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {},
    method,
    body,
    qs: query,
    uri: `https://api.typeform.com/${endpoint}`,
    json: true
  };
  query = query || {};
  try {
    if (authenticationMethod === "accessToken") {
      return await this.helpers.requestWithAuthentication.call(this, "typeformApi", options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "typeformOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(method, endpoint, body, query, _dataKey) {
  if (query === void 0) {
    query = {};
  }
  query.page_size = 200;
  query.page = 0;
  const returnData = {
    items: []
  };
  let responseData;
  do {
    query.page += 1;
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.items.push.apply(returnData.items, responseData.items);
  } while (responseData.page_count !== void 0 && responseData.page_count > query.page);
  return returnData;
}
async function getForms() {
  const endpoint = "forms";
  const responseData = await apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData.items === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  for (const baseData of responseData.items) {
    returnData.push({
      name: baseData.title,
      value: baseData.id
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems,
  getForms
});
//# sourceMappingURL=GenericFunctions.js.map