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
var ZammadTokenAuthApi_credentials_exports = {};
__export(ZammadTokenAuthApi_credentials_exports, {
  ZammadTokenAuthApi: () => ZammadTokenAuthApi
});
module.exports = __toCommonJS(ZammadTokenAuthApi_credentials_exports);
class ZammadTokenAuthApi {
  constructor() {
    this.name = "zammadTokenAuthApi";
    this.displayName = "Zammad Token Auth API";
    this.documentationUrl = "zammad";
    this.properties = [
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "https://n8n-helpdesk.zammad.com",
        required: true
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZammadTokenAuthApi
});
//# sourceMappingURL=ZammadTokenAuthApi.credentials.js.map