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
  handleListing: () => handleListing,
  normalizeId: () => normalizeId,
  urlScanIoApiRequest: () => urlScanIoApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function urlScanIoApiRequest(method, endpoint, body = {}, qs = {}) {
  const options = {
    method,
    body,
    qs,
    uri: `https://urlscan.io/api/v1${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "urlScanIoApi", options);
}
async function handleListing(endpoint, qs = {}) {
  const returnData = [];
  let responseData;
  qs.size = 100;
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  do {
    responseData = await urlScanIoApiRequest.call(this, "GET", endpoint, {}, qs);
    returnData.push(...responseData.results);
    if (!returnAll && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
    if (responseData.results.length) {
      const lastResult = responseData.results[responseData.results.length - 1];
      qs.search_after = lastResult.sort;
    }
  } while (responseData.total > returnData.length);
  return returnData;
}
const normalizeId = ({ _id, uuid, ...rest }) => {
  if (_id) return { scanId: _id, ...rest };
  if (uuid) return { scanId: uuid, ...rest };
  return rest;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleListing,
  normalizeId,
  urlScanIoApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map