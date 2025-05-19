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
var QuickBooksOAuth2Api_credentials_exports = {};
__export(QuickBooksOAuth2Api_credentials_exports, {
  QuickBooksOAuth2Api: () => QuickBooksOAuth2Api
});
module.exports = __toCommonJS(QuickBooksOAuth2Api_credentials_exports);
class QuickBooksOAuth2Api {
  constructor() {
    this.name = "quickBooksOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "QuickBooks Online OAuth2 API";
    this.documentationUrl = "quickbooks";
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
        default: "https://appcenter.intuit.com/connect/oauth2"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "com.intuit.quickbooks.accounting"
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
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "production",
        options: [
          {
            name: "Production",
            value: "production"
          },
          {
            name: "Sandbox",
            value: "sandbox"
          }
        ]
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickBooksOAuth2Api
});
//# sourceMappingURL=QuickBooksOAuth2Api.credentials.js.map