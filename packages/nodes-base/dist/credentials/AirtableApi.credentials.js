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
var AirtableApi_credentials_exports = {};
__export(AirtableApi_credentials_exports, {
  AirtableApi: () => AirtableApi
});
module.exports = __toCommonJS(AirtableApi_credentials_exports);
class AirtableApi {
  constructor() {
    this.name = "airtableApi";
    this.displayName = "Airtable API";
    this.documentationUrl = "airtable";
    this.properties = [
      {
        displayName: "This type of connection (API Key) was deprecated and can't be used anymore. Please create a new credential of type 'Access Token' instead.",
        name: "deprecated",
        type: "notice",
        default: ""
      },
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
        qs: {
          api_key: "={{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AirtableApi
});
//# sourceMappingURL=AirtableApi.credentials.js.map