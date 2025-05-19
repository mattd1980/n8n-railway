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
var ApiTemplateIoApi_credentials_exports = {};
__export(ApiTemplateIoApi_credentials_exports, {
  ApiTemplateIoApi: () => ApiTemplateIoApi
});
module.exports = __toCommonJS(ApiTemplateIoApi_credentials_exports);
class ApiTemplateIoApi {
  constructor() {
    this.name = "apiTemplateIoApi";
    this.displayName = "APITemplate.io API";
    this.documentationUrl = "apiTemplateIo";
    this.properties = [
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
          "X-API-KEY": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.apitemplate.io/v1",
        url: "/list-templates"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiTemplateIoApi
});
//# sourceMappingURL=ApiTemplateIoApi.credentials.js.map