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
  sendGridApiRequest: () => sendGridApiRequest,
  sendGridApiRequestAllItems: () => sendGridApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function sendGridApiRequest(endpoint, method, body = {}, qs = {}, option = {}) {
  const host = "api.sendgrid.com/v3";
  const options = {
    method,
    qs,
    body,
    uri: `https://${host}${endpoint}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  return await this.helpers.requestWithAuthentication.call(this, "sendGridApi", options);
}
async function sendGridApiRequestAllItems(endpoint, method, propertyName, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await sendGridApiRequest.call(this, endpoint, method, body, query, uri);
    uri = responseData._metadata.next;
    returnData.push.apply(returnData, responseData[propertyName]);
    const limit = query.limit;
    if (limit && returnData.length >= limit) {
      return returnData;
    }
  } while (responseData._metadata.next !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendGridApiRequest,
  sendGridApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map