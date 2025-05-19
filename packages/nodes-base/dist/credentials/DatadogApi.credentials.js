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
var DatadogApi_credentials_exports = {};
__export(DatadogApi_credentials_exports, {
  DatadogApi: () => DatadogApi
});
module.exports = __toCommonJS(DatadogApi_credentials_exports);
class DatadogApi {
  constructor() {
    this.name = "datadogApi";
    this.displayName = "Datadog API";
    this.documentationUrl = "datadog";
    this.icon = { light: "file:icons/Datadog.svg", dark: "file:icons/Datadog.svg" };
    this.httpRequestNode = {
      name: "Datadog",
      docsUrl: "https://docs.datadoghq.com/api/latest/",
      apiBaseUrlPlaceholder: "https://api.datadoghq.com/api/v1/metrics"
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        required: true,
        type: "string",
        default: "https://api.datadoghq.com"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "APP Key",
        name: "appKey",
        required: false,
        type: "string",
        default: "",
        typeOptions: { password: true },
        description: "For some endpoints, you also need an Application key."
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/api/v1/validate",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.headers = {
      "DD-API-KEY": credentials.apiKey,
      "DD-APPLICATION-KEY": credentials.appKey
    };
    if (!requestOptions.headers["DD-APPLICATION-KEY"]) {
      delete requestOptions.headers["DD-APPLICATION-KEY"];
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatadogApi
});
//# sourceMappingURL=DatadogApi.credentials.js.map