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
var AirtableOAuth2Api_credentials_exports = {};
__export(AirtableOAuth2Api_credentials_exports, {
  AirtableOAuth2Api: () => AirtableOAuth2Api
});
module.exports = __toCommonJS(AirtableOAuth2Api_credentials_exports);
const scopes = ["schema.bases:read", "data.records:read", "data.records:write"];
class AirtableOAuth2Api {
  constructor() {
    this.name = "airtableOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Airtable OAuth2 API";
    this.documentationUrl = "airtable";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "pkce"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://airtable.com/oauth2/v1/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://airtable.com/oauth2/v1/token"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: `${scopes.join(" ")}`
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
  AirtableOAuth2Api
});
//# sourceMappingURL=AirtableOAuth2Api.credentials.js.map