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
var VirusTotalApi_credentials_exports = {};
__export(VirusTotalApi_credentials_exports, {
  VirusTotalApi: () => VirusTotalApi
});
module.exports = __toCommonJS(VirusTotalApi_credentials_exports);
class VirusTotalApi {
  constructor() {
    this.name = "virusTotalApi";
    this.displayName = "VirusTotal API";
    this.documentationUrl = "virustotal";
    this.icon = "file:icons/VirusTotal.svg";
    this.httpRequestNode = {
      name: "VirusTotal",
      docsUrl: "https://developers.virustotal.com/reference/overview",
      apiBaseUrl: "https://www.virustotal.com/api/v3/"
    };
    this.properties = [
      {
        displayName: "API Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "x-apikey": "={{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://www.virustotal.com/api/v3",
        url: "/popular_threat_categories"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VirusTotalApi
});
//# sourceMappingURL=VirusTotalApi.credentials.js.map