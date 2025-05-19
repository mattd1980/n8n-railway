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
var OpenAiApi_credentials_exports = {};
__export(OpenAiApi_credentials_exports, {
  OpenAiApi: () => OpenAiApi
});
module.exports = __toCommonJS(OpenAiApi_credentials_exports);
class OpenAiApi {
  constructor() {
    this.name = "openAiApi";
    this.displayName = "OpenAi";
    this.documentationUrl = "openAi";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      },
      {
        displayName: "Organization ID (optional)",
        name: "organizationId",
        type: "string",
        default: "",
        hint: "Only required if you belong to multiple organisations",
        description: "For users who belong to multiple organizations, you can set which organization is used for an API request. Usage from these API requests will count against the specified organization's subscription quota."
      },
      {
        displayName: "Base URL",
        name: "url",
        type: "string",
        default: "https://api.openai.com/v1",
        description: "Override the default base URL for the API"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}",
          "OpenAI-Organization": "={{$credentials.organizationId}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}",
        url: "/models"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OpenAiApi
});
//# sourceMappingURL=OpenAiApi.credentials.js.map