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
var SendyApi_credentials_exports = {};
__export(SendyApi_credentials_exports, {
  SendyApi: () => SendyApi
});
module.exports = __toCommonJS(SendyApi_credentials_exports);
class SendyApi {
  constructor() {
    this.name = "sendyApi";
    this.displayName = "Sendy API";
    this.documentationUrl = "sendy";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://yourdomain.com"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendyApi
});
//# sourceMappingURL=SendyApi.credentials.js.map