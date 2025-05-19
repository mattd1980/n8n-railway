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
var HubspotDeveloperApi_credentials_exports = {};
__export(HubspotDeveloperApi_credentials_exports, {
  HubspotDeveloperApi: () => HubspotDeveloperApi
});
module.exports = __toCommonJS(HubspotDeveloperApi_credentials_exports);
const scopes = [
  "crm.objects.contacts.read",
  "crm.schemas.contacts.read",
  "crm.objects.companies.read",
  "crm.schemas.companies.read",
  "crm.objects.deals.read",
  "crm.schemas.deals.read"
];
class HubspotDeveloperApi {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-name-missing-oauth2
    this.name = "hubspotDeveloperApi";
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-missing-oauth2
    this.displayName = "HubSpot Developer API";
    this.documentationUrl = "hubspot";
    this.extends = ["oAuth2Api"];
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
        default: "https://app.hubspot.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.hubapi.com/oauth/v1/token",
        required: true
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "grant_type=authorization_code"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      },
      {
        displayName: "Developer API Key",
        name: "apiKey",
        type: "string",
        required: true,
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "APP ID",
        name: "appId",
        type: "string",
        required: true,
        default: ""
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HubspotDeveloperApi
});
//# sourceMappingURL=HubspotDeveloperApi.credentials.js.map