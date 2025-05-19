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
var MailchimpOAuth2Api_credentials_exports = {};
__export(MailchimpOAuth2Api_credentials_exports, {
  MailchimpOAuth2Api: () => MailchimpOAuth2Api
});
module.exports = __toCommonJS(MailchimpOAuth2Api_credentials_exports);
class MailchimpOAuth2Api {
  constructor() {
    this.name = "mailchimpOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Mailchimp OAuth2 API";
    this.documentationUrl = "mailchimp";
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
        default: "https://login.mailchimp.com/oauth2/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://login.mailchimp.com/oauth2/token",
        required: true
      },
      {
        displayName: "Metadata",
        name: "metadataUrl",
        type: "hidden",
        default: "https://login.mailchimp.com/oauth2/metadata",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: ""
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
        default: "body"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailchimpOAuth2Api
});
//# sourceMappingURL=MailchimpOAuth2Api.credentials.js.map