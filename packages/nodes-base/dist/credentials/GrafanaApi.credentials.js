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
var GrafanaApi_credentials_exports = {};
__export(GrafanaApi_credentials_exports, {
  GrafanaApi: () => GrafanaApi
});
module.exports = __toCommonJS(GrafanaApi_credentials_exports);
class GrafanaApi {
  constructor() {
    this.name = "grafanaApi";
    this.displayName = "Grafana API";
    this.documentationUrl = "grafana";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        description: "Base URL of your Grafana instance",
        placeholder: "e.g. https://n8n.grafana.net/",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.baseUrl.replace(new RegExp("/$"), "") + "/api" }}',
        url: "/folders"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GrafanaApi
});
//# sourceMappingURL=GrafanaApi.credentials.js.map