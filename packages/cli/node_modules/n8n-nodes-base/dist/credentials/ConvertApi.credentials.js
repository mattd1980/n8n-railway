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
var ConvertApi_credentials_exports = {};
__export(ConvertApi_credentials_exports, {
  ConvertApi: () => ConvertApi
});
module.exports = __toCommonJS(ConvertApi_credentials_exports);
class ConvertApi {
  constructor() {
    this.name = "convertApi";
    this.displayName = "ConvertAPI";
    this.documentationUrl = "convertapi";
    this.icon = "file:icons/ConvertApi.png";
    this.httpRequestNode = {
      name: "ConvertAPI",
      docsUrl: "https://docs.convertapi.com/docs/getting-started",
      apiBaseUrl: "https://v2.convertapi.com/"
    };
    this.properties = [
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://v2.convertapi.com",
        url: "/convert/docx/to/pdf",
        ignoreHttpStatusErrors: true
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "Code",
            value: 4013,
            message: "API Token or Secret is invalid."
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConvertApi
});
//# sourceMappingURL=ConvertApi.credentials.js.map