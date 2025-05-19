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
  clockifyApiRequest: () => clockifyApiRequest,
  clockifyApiRequestAllItems: () => clockifyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function clockifyApiRequest(method, resource, body = {}, qs = {}, _uri, _option = {}) {
  const BASE_URL = "https://api.clockify.me/api/v1";
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: `${BASE_URL}/${resource}`,
    json: true,
    useQuerystring: true
  };
  return await this.helpers.requestWithAuthentication.call(this, "clockifyApi", options);
}
async function clockifyApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query["page-size"] = 50;
  query.page = 1;
  do {
    responseData = await clockifyApiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData);
    const limit = query.limit;
    if (limit && returnData.length >= limit) {
      return returnData;
    }
    query.page++;
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clockifyApiRequest,
  clockifyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map