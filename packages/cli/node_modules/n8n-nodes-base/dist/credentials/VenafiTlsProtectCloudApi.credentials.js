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
var VenafiTlsProtectCloudApi_credentials_exports = {};
__export(VenafiTlsProtectCloudApi_credentials_exports, {
  VenafiTlsProtectCloudApi: () => VenafiTlsProtectCloudApi
});
module.exports = __toCommonJS(VenafiTlsProtectCloudApi_credentials_exports);
class VenafiTlsProtectCloudApi {
  constructor() {
    this.name = "venafiTlsProtectCloudApi";
    this.displayName = "Venafi TLS Protect Cloud";
    this.documentationUrl = "venafitlsprotectcloud";
    this.properties = [
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: [
          {
            name: "US",
            value: "cloud"
          },
          {
            name: "EU",
            value: "eu"
          }
        ],
        default: "cloud"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "tppl-api-key": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '=https://api.venafi.{{$credentials.region ?? "cloud"}}',
        url: "/v1/preferences"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VenafiTlsProtectCloudApi
});
//# sourceMappingURL=VenafiTlsProtectCloudApi.credentials.js.map