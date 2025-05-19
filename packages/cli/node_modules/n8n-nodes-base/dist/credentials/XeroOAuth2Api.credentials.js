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
var XeroOAuth2Api_credentials_exports = {};
__export(XeroOAuth2Api_credentials_exports, {
  XeroOAuth2Api: () => XeroOAuth2Api
});
module.exports = __toCommonJS(XeroOAuth2Api_credentials_exports);
const scopes = [
  "offline_access",
  "accounting.transactions",
  "accounting.settings",
  "accounting.contacts"
];
class XeroOAuth2Api {
  constructor() {
    this.name = "xeroOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Xero OAuth2 API";
    this.documentationUrl = "xero";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://login.xero.com/identity/connect/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://identity.xero.com/connect/token"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: ""
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "header"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  XeroOAuth2Api
});
//# sourceMappingURL=XeroOAuth2Api.credentials.js.map