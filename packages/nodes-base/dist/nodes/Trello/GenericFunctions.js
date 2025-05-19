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
  apiRequestAllItems: () => apiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function apiRequest(method, endpoint, body, query) {
  query = query || {};
  const options = {
    method,
    body,
    qs: query,
    uri: `https://api.trello.com/1/${endpoint}`,
    json: true
  };
  if (method === "GET") {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, "trelloApi", options);
}
async function apiRequestAllItems(method, endpoint, body, query = {}) {
  query.limit = 30;
  query.sort = "-id";
  const returnData = [];
  let responseData;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData);
    if (responseData.length !== 0) {
      query.before = responseData[responseData.length - 1].id;
    }
  } while (query.limit <= responseData.length);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map