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
  getDateParts: () => getDateParts,
  monicaCrmApiRequest: () => monicaCrmApiRequest,
  monicaCrmApiRequestAllItems: () => monicaCrmApiRequestAllItems,
  toOptions: () => toOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function monicaCrmApiRequest(method, endpoint, body = {}, qs = {}) {
  const credentials = await this.getCredentials("monicaCrmApi");
  if (credentials === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials got returned!");
  }
  let baseUrl = "https://app.monicahq.com";
  if (credentials.environment === "selfHosted") {
    baseUrl = credentials.domain;
  }
  const options = {
    headers: {
      Authorization: `Bearer ${credentials.apiToken}`
    },
    method,
    body,
    qs,
    uri: `${baseUrl}/api${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function monicaCrmApiRequestAllItems(method, endpoint, body = {}, qs = {}, { forLoader } = { forLoader: false }) {
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  let totalItems = 0;
  qs.page = 1;
  qs.limit = 100;
  let responseData;
  const returnData = [];
  do {
    responseData = await monicaCrmApiRequest.call(this, method, endpoint, body, qs);
    returnData.push(...responseData.data);
    if (!forLoader && !returnAll && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
    qs.page++;
    totalItems = responseData.meta.total;
  } while (totalItems > returnData.length);
  return returnData;
}
const getDateParts = (date) => date.split("T")[0].split("-").map(Number).reverse();
const toOptions = (response) => response.data.map(({ id, name }) => ({ value: id, name }));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDateParts,
  monicaCrmApiRequest,
  monicaCrmApiRequestAllItems,
  toOptions
});
//# sourceMappingURL=GenericFunctions.js.map