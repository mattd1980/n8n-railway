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
var MicrosoftOAuth2Api_credentials_exports = {};
__export(MicrosoftOAuth2Api_credentials_exports, {
  MicrosoftOAuth2Api: () => MicrosoftOAuth2Api
});
module.exports = __toCommonJS(MicrosoftOAuth2Api_credentials_exports);
class MicrosoftOAuth2Api {
  constructor() {
    this.name = "microsoftOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.icon = "file:icons/Microsoft.svg";
    this.displayName = "Microsoft OAuth2 API";
    this.documentationUrl = "microsoft";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      // Info about the tenantID
      // https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols#endpoints
      // Endpoints `/common` can only be used for multitenant apps
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "string",
        default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "string",
        default: "https://login.microsoftonline.com/common/oauth2/v2.0/token"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "response_mode=query"
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
  MicrosoftOAuth2Api
});
//# sourceMappingURL=MicrosoftOAuth2Api.credentials.js.map