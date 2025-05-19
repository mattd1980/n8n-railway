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
var SentryIoServerApi_credentials_exports = {};
__export(SentryIoServerApi_credentials_exports, {
  SentryIoServerApi: () => SentryIoServerApi
});
module.exports = __toCommonJS(SentryIoServerApi_credentials_exports);
class SentryIoServerApi {
  constructor() {
    this.name = "sentryIoServerApi";
    this.displayName = "Sentry.io Server API";
    this.documentationUrl = "sentryIo";
    this.properties = [
      {
        displayName: "Token",
        name: "token",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://example.com"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SentryIoServerApi
});
//# sourceMappingURL=SentryIoServerApi.credentials.js.map