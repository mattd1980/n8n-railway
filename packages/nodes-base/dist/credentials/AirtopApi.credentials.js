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
var AirtopApi_credentials_exports = {};
__export(AirtopApi_credentials_exports, {
  AirtopApi: () => AirtopApi
});
module.exports = __toCommonJS(AirtopApi_credentials_exports);
class AirtopApi {
  constructor() {
    this.name = "airtopApi";
    this.displayName = "Airtop API";
    this.documentationUrl = "airtop";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        default: "",
        description: 'The Airtop API key. You can create one at <a href="https://portal.airtop.ai/api-keys" target="_blank">Airtop</a> for free.',
        required: true,
        typeOptions: {
          password: true
        },
        noDataExpression: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}",
          "api-key": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        method: "GET",
        baseURL: "https://api.airtop.ai/api/v1",
        url: "/sessions",
        qs: {
          limit: 10
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AirtopApi
});
//# sourceMappingURL=AirtopApi.credentials.js.map