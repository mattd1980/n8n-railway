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
var Rapid7InsightVmApi_credentials_exports = {};
__export(Rapid7InsightVmApi_credentials_exports, {
  Rapid7InsightVmApi: () => Rapid7InsightVmApi
});
module.exports = __toCommonJS(Rapid7InsightVmApi_credentials_exports);
class Rapid7InsightVmApi {
  constructor() {
    this.name = "rapid7InsightVmApi";
    this.displayName = "Rapid7 InsightVM API";
    this.documentationUrl = "rapid7insightvm";
    this.icon = {
      light: "file:icons/Rapid7InsightVm.svg",
      dark: "file:icons/Rapid7InsightVm.svg"
    };
    this.httpRequestNode = {
      name: "Rapid7 InsightVM",
      docsUrl: "https://docs.rapid7.com/",
      apiBaseUrlPlaceholder: "https://insight.rapid7.com/"
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
        displayName: "API Key",
        name: "apiKey",
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
          "x-api-key": "={{$credentials.apiKey}}",
          Accept: "application/json"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}".replace(/\/$/, ""),
        url: "/validate",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Rapid7InsightVmApi
});
//# sourceMappingURL=Rapid7InsightVmApi.credentials.js.map