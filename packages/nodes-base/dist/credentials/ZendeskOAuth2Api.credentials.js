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
var ZendeskOAuth2Api_credentials_exports = {};
__export(ZendeskOAuth2Api_credentials_exports, {
  ZendeskOAuth2Api: () => ZendeskOAuth2Api
});
module.exports = __toCommonJS(ZendeskOAuth2Api_credentials_exports);
const scopes = ["read", "write"];
class ZendeskOAuth2Api {
  constructor() {
    this.name = "zendeskOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Zendesk OAuth2 API";
    this.documentationUrl = "zendesk";
    this.properties = [
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        placeholder: "n8n",
        description: "The subdomain of your Zendesk work environment",
        required: true
      },
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
        default: '=https://{{$self["subdomain"]}}.zendesk.com/oauth/authorizations/new',
        description: "URL to get authorization code. Replace {SUBDOMAIN_HERE} with your subdomain.",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '=https://{{$self["subdomain"]}}.zendesk.com/oauth/tokens',
        description: "URL to get access token. Replace {SUBDOMAIN_HERE} with your subdomain.",
        required: true
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
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
        default: "",
        description: "For some services additional query parameters have to be set which can be defined here",
        placeholder: ""
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZendeskOAuth2Api
});
//# sourceMappingURL=ZendeskOAuth2Api.credentials.js.map