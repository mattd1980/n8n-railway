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
var SalesforceOAuth2Api_credentials_exports = {};
__export(SalesforceOAuth2Api_credentials_exports, {
  SalesforceOAuth2Api: () => SalesforceOAuth2Api
});
module.exports = __toCommonJS(SalesforceOAuth2Api_credentials_exports);
class SalesforceOAuth2Api {
  constructor() {
    this.name = "salesforceOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Salesforce OAuth2 API";
    this.documentationUrl = "salesforce";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "pkce"
      },
      {
        displayName: "Environment Type",
        name: "environment",
        type: "options",
        options: [
          {
            name: "Production",
            value: "production"
          },
          {
            name: "Sandbox",
            value: "sandbox"
          }
        ],
        default: "production"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        required: true,
        default: '={{ $self["environment"] === "sandbox" ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize" }}'
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        required: true,
        default: '={{ $self["environment"] === "sandbox" ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token" }}'
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "full refresh_token"
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
  SalesforceOAuth2Api
});
//# sourceMappingURL=SalesforceOAuth2Api.credentials.js.map