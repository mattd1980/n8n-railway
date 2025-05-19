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
var ImpervaWafApi_credentials_exports = {};
__export(ImpervaWafApi_credentials_exports, {
  ImpervaWafApi: () => ImpervaWafApi
});
module.exports = __toCommonJS(ImpervaWafApi_credentials_exports);
class ImpervaWafApi {
  constructor() {
    this.name = "impervaWafApi";
    this.displayName = "Imperva WAF API";
    this.documentationUrl = "impervawaf";
    this.icon = { light: "file:icons/Imperva.svg", dark: "file:icons/Imperva.dark.svg" };
    this.httpRequestNode = {
      name: "Imperva WAF",
      docsUrl: "https://docs.imperva.com/bundle/api-docs",
      apiBaseUrl: "https://api.imperva.com/"
    };
    this.properties = [
      {
        displayName: "API ID",
        name: "apiID",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "x-API-Id": "={{$credentials.apiID}}",
          "x-API-Key": "={{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImpervaWafApi
});
//# sourceMappingURL=ImpervaWafApi.credentials.js.map