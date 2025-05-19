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
var JotFormApi_credentials_exports = {};
__export(JotFormApi_credentials_exports, {
  JotFormApi: () => JotFormApi
});
module.exports = __toCommonJS(JotFormApi_credentials_exports);
class JotFormApi {
  constructor() {
    this.name = "jotFormApi";
    this.displayName = "JotForm API";
    this.documentationUrl = "jotForm";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "API Domain",
        name: "apiDomain",
        type: "options",
        options: [
          {
            name: "api.jotform.com",
            value: "api.jotform.com"
          },
          {
            name: "eu-api.jotform.com",
            value: "eu-api.jotform.com"
          },
          {
            name: "hipaa-api.jotform.com",
            value: "hipaa-api.jotform.com"
          }
        ],
        default: "api.jotform.com",
        description: 'The API domain to use. Use "eu-api.jotform.com" if your account is in based in Europe.'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JotFormApi
});
//# sourceMappingURL=JotFormApi.credentials.js.map