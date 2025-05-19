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
var MarketstackApi_credentials_exports = {};
__export(MarketstackApi_credentials_exports, {
  MarketstackApi: () => MarketstackApi
});
module.exports = __toCommonJS(MarketstackApi_credentials_exports);
class MarketstackApi {
  constructor() {
    this.name = "marketstackApi";
    this.displayName = "Marketstack API";
    this.documentationUrl = "marketstack";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Use HTTPS",
        name: "useHttps",
        type: "boolean",
        default: false,
        description: "Whether to use HTTPS (paid plans only)"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarketstackApi
});
//# sourceMappingURL=MarketstackApi.credentials.js.map