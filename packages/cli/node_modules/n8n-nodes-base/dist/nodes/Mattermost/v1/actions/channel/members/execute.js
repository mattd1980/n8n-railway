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
var execute_exports = {};
__export(execute_exports, {
  members: () => members
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function members(index) {
  const channelId = this.getNodeParameter("channelId", index);
  const returnAll = this.getNodeParameter("returnAll", index);
  const resolveData = this.getNodeParameter("resolveData", index);
  const limit = this.getNodeParameter("limit", index, 0);
  const body = {};
  const qs = {};
  const requestMethod = "GET";
  const endpoint = `channels/${channelId}/members`;
  if (!returnAll) {
    qs.per_page = this.getNodeParameter("limit", index);
  }
  let responseData;
  if (returnAll) {
    responseData = await import_transport.apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
  } else {
    responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
    if (limit) {
      responseData = responseData.slice(0, limit);
    }
    if (resolveData) {
      const userIds = [];
      for (const data of responseData) {
        userIds.push(data.user_id);
      }
      if (userIds.length > 0) {
        responseData = await import_transport.apiRequest.call(this, "POST", "users/ids", userIds, qs);
      }
    }
  }
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  members
});
//# sourceMappingURL=execute.js.map