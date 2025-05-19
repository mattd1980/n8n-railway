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
var SplunkApi_credentials_exports = {};
__export(SplunkApi_credentials_exports, {
  SplunkApi: () => SplunkApi
});
module.exports = __toCommonJS(SplunkApi_credentials_exports);
class SplunkApi {
  constructor() {
    this.name = "splunkApi";
    this.displayName = "Splunk API";
    this.documentationUrl = "splunk";
    this.properties = [
      {
        displayName: "Auth Token",
        name: "authToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        description: "Protocol, domain and port",
        placeholder: "e.g. https://localhost:8089",
        default: ""
      },
      {
        displayName: "Allow Self-Signed Certificates",
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
          Authorization: "=Bearer {{$credentials?.authToken}}"
        }
      }
    };
    this.test = {
      request: {
        url: "={{$credentials.baseUrl}}/services/alerts/fired_alerts",
        method: "GET",
        skipSslCertificateValidation: "={{$credentials?.allowUnauthorizedCerts}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SplunkApi
});
//# sourceMappingURL=SplunkApi.credentials.js.map