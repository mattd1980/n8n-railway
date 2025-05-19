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
var AlienVaultApi_credentials_exports = {};
__export(AlienVaultApi_credentials_exports, {
  AlienVaultApi: () => AlienVaultApi
});
module.exports = __toCommonJS(AlienVaultApi_credentials_exports);
class AlienVaultApi {
  constructor() {
    this.name = "alienVaultApi";
    this.displayName = "AlienVault API";
    this.documentationUrl = "alienvault";
    this.icon = "file:icons/AlienVault.png";
    this.httpRequestNode = {
      name: "AlienVault",
      docsUrl: "https://otx.alienvault.com/api",
      apiBaseUrl: "https://otx.alienvault.com/api/v1/"
    };
    this.properties = [
      {
        displayName: "OTX Key",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-OTX-API-KEY": "={{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://otx.alienvault.com",
        url: "/api/v1/user/me"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlienVaultApi
});
//# sourceMappingURL=AlienVaultApi.credentials.js.map