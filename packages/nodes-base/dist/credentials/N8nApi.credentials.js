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
var N8nApi_credentials_exports = {};
__export(N8nApi_credentials_exports, {
  N8nApi: () => N8nApi
});
module.exports = __toCommonJS(N8nApi_credentials_exports);
class N8nApi {
  constructor() {
    this.name = "n8nApi";
    this.displayName = "n8n API";
    this.documentationUrl = "https://docs.n8n.io/api/authentication/";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "The API key for the n8n instance"
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "https://<name>.app.n8n.cloud/api/v1",
        description: "The API URL of the n8n instance"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-N8N-API-KEY": "={{ $credentials.apiKey }}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{ $credentials.baseUrl }}",
        url: "/workflows?limit=5"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  N8nApi
});
//# sourceMappingURL=N8nApi.credentials.js.map