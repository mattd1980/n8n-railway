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
var AzureStorageOAuth2Api_credentials_exports = {};
__export(AzureStorageOAuth2Api_credentials_exports, {
  AzureStorageOAuth2Api: () => AzureStorageOAuth2Api
});
module.exports = __toCommonJS(AzureStorageOAuth2Api_credentials_exports);
class AzureStorageOAuth2Api {
  constructor() {
    this.name = "azureStorageOAuth2Api";
    this.displayName = "Azure Storage OAuth2 API";
    this.extends = ["microsoftOAuth2Api"];
    this.documentationUrl = "azurestorage";
    this.properties = [
      {
        displayName: "Account",
        name: "account",
        type: "string",
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "hidden",
        default: '=https://{{ $self["account"] }}.blob.core.windows.net'
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "https://storage.azure.com/.default"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AzureStorageOAuth2Api
});
//# sourceMappingURL=AzureStorageOAuth2Api.credentials.js.map