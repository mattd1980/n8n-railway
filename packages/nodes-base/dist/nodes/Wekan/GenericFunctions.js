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
  apiRequest: () => apiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function apiRequest(method, endpoint, body, query) {
  const credentials = await this.getCredentials("wekanApi");
  query = query || {};
  const options = {
    headers: {
      Accept: "application/json"
    },
    method,
    body,
    qs: query,
    uri: `${credentials.url}/api/${endpoint}`,
    json: true
  };
  return await this.helpers.requestWithAuthentication.call(this, "wekanApi", options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest
});
//# sourceMappingURL=GenericFunctions.js.map