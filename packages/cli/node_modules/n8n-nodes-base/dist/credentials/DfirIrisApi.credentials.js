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
var DfirIrisApi_credentials_exports = {};
__export(DfirIrisApi_credentials_exports, {
  DfirIrisApi: () => DfirIrisApi
});
module.exports = __toCommonJS(DfirIrisApi_credentials_exports);
class DfirIrisApi {
  constructor() {
    this.name = "dfirIrisApi";
    this.displayName = "DFIR-IRIS API";
    this.documentationUrl = "dfiriris";
    this.icon = { light: "file:icons/DfirIris.svg", dark: "file:icons/DfirIris.svg" };
    this.httpRequestNode = {
      name: "DFIR-IRIS",
      docsUrl: "https://docs.dfir-iris.org/operations/api/",
      apiBaseUrlPlaceholder: "http://<yourserver_ip>/manage/cases/list"
    };
    this.properties = [
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "e.g. https://localhost",
        description: "The API endpoints are reachable on the same Address and port as the web interface.",
        required: true
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
        displayName: "Ignore SSL Issues (Insecure)",
        name: "skipSslCertificateValidation",
        type: "boolean",
        default: false
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
        baseURL: "={{$credentials.baseUrl}}",
        url: "/api/ping",
        method: "GET",
        skipSslCertificateValidation: "={{$credentials.skipSslCertificateValidation}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DfirIrisApi
});
//# sourceMappingURL=DfirIrisApi.credentials.js.map