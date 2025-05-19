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
var MispApi_credentials_exports = {};
__export(MispApi_credentials_exports, {
  MispApi: () => MispApi
});
module.exports = __toCommonJS(MispApi_credentials_exports);
class MispApi {
  constructor() {
    this.name = "mispApi";
    this.displayName = "MISP API";
    this.documentationUrl = "misp";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "Allow Unauthorized Certificates",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.baseUrl.replace(new RegExp("/$"), "")}}',
        url: "/tags",
        skipSslCertificateValidation: "={{$credentials.allowUnauthorizedCerts}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MispApi
});
//# sourceMappingURL=MispApi.credentials.js.map