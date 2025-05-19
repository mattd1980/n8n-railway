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
var transport_exports = {};
__export(transport_exports, {
  apiRequest: () => apiRequest
});
module.exports = __toCommonJS(transport_exports);
var import_constants = require("../constants");
async function apiRequest(method, endpoint, body = {}, query = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs: query,
    url: endpoint.startsWith("http") ? endpoint : `${import_constants.BASE_URL}${endpoint}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    "airtopApi",
    options
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest
});
//# sourceMappingURL=index.js.map