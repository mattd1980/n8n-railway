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
  beeminderApiRequest: () => beeminderApiRequest,
  beeminderApiRequestAllItems: () => beeminderApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
const BEEMINDER_URI = "https://www.beeminder.com/api/v1";
async function beeminderApiRequest(method, endpoint, body = {}, query = {}) {
  const options = {
    method,
    body,
    qs: query,
    uri: `${BEEMINDER_URI}${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "beeminderApi", options);
}
async function beeminderApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await beeminderApiRequest.call(this, method, endpoint, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData);
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beeminderApiRequest,
  beeminderApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map