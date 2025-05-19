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
var SolarWindsObservabilityApi_credentials_exports = {};
__export(SolarWindsObservabilityApi_credentials_exports, {
  SolarWindsObservabilityApi: () => SolarWindsObservabilityApi
});
module.exports = __toCommonJS(SolarWindsObservabilityApi_credentials_exports);
class SolarWindsObservabilityApi {
  constructor() {
    this.name = "solarWindsObservabilityApi";
    this.displayName = "SolarWinds Observability";
    this.documentationUrl = "solarwindsobservability";
    this.icon = {
      light: "file:icons/SolarWindsObservability.svg",
      dark: "file:icons/SolarWindsObservability.svg"
    };
    this.httpRequestNode = {
      name: "SolarWinds Observability",
      docsUrl: "https://documentation.solarwinds.com/en/success_center/observability/content/api/api-swagger.htm",
      apiBaseUrlPlaceholder: "https://api.xx-yy.cloud.solarwinds.com/"
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        required: true,
        type: "string",
        default: ""
      },
      {
        displayName: "API Token",
        name: "apiToken",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiToken}}",
          "Content-Type": "application/json-rpc"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}".replace(/\/$/, ""),
        url: "/v1/logs",
        method: "GET"
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "error",
            value: "invalid_auth",
            message: "Invalid access token"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SolarWindsObservabilityApi
});
//# sourceMappingURL=SolarWindsObservabilityApi.credentials.js.map