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
var DeepLApi_credentials_exports = {};
__export(DeepLApi_credentials_exports, {
  DeepLApi: () => DeepLApi
});
module.exports = __toCommonJS(DeepLApi_credentials_exports);
class DeepLApi {
  constructor() {
    this.name = "deepLApi";
    this.displayName = "DeepL API";
    this.documentationUrl = "deepL";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "API Plan",
        name: "apiPlan",
        type: "options",
        options: [
          {
            name: "Pro Plan",
            value: "pro"
          },
          {
            name: "Free Plan",
            value: "free"
          }
        ],
        default: "pro"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        qs: {
          auth_key: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.apiPlan === "pro" ? "https://api.deepl.com/v2" : "https://api-free.deepl.com/v2" }}',
        url: "/usage"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeepLApi
});
//# sourceMappingURL=DeepLApi.credentials.js.map