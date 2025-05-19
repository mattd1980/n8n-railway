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
var GoogleOAuth2Api_credentials_exports = {};
__export(GoogleOAuth2Api_credentials_exports, {
  GoogleOAuth2Api: () => GoogleOAuth2Api
});
module.exports = __toCommonJS(GoogleOAuth2Api_credentials_exports);
class GoogleOAuth2Api {
  constructor() {
    this.name = "googleOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Google OAuth2 API";
    this.documentationUrl = "google/oauth-generic";
    this.icon = "file:icons/Google.svg";
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
        default: "https://accounts.google.com/o/oauth2/v2/auth"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://oauth2.googleapis.com/token"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "access_type=offline&prompt=consent"
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
  GoogleOAuth2Api
});
//# sourceMappingURL=GoogleOAuth2Api.credentials.js.map