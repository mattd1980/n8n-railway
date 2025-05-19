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
var HelpScoutOAuth2Api_credentials_exports = {};
__export(HelpScoutOAuth2Api_credentials_exports, {
  HelpScoutOAuth2Api: () => HelpScoutOAuth2Api
});
module.exports = __toCommonJS(HelpScoutOAuth2Api_credentials_exports);
class HelpScoutOAuth2Api {
  constructor() {
    this.name = "helpScoutOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "HelpScout OAuth2 API";
    this.documentationUrl = "helpScout";
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
        default: "https://secure.helpscout.net/authentication/authorizeClientApplication",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.helpscout.net/v2/oauth2/token",
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
  HelpScoutOAuth2Api
});
//# sourceMappingURL=HelpScoutOAuth2Api.credentials.js.map