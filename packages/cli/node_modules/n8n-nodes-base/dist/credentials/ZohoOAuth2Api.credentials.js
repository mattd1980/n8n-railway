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
var ZohoOAuth2Api_credentials_exports = {};
__export(ZohoOAuth2Api_credentials_exports, {
  ZohoOAuth2Api: () => ZohoOAuth2Api
});
module.exports = __toCommonJS(ZohoOAuth2Api_credentials_exports);
class ZohoOAuth2Api {
  constructor() {
    this.name = "zohoOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Zoho OAuth2 API";
    this.documentationUrl = "zoho";
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
        type: "options",
        options: [
          {
            name: "https://accounts.zoho.com/oauth/v2/auth",
            value: "https://accounts.zoho.com/oauth/v2/auth",
            description: "For the EU, AU, and IN domains"
          },
          {
            name: "https://accounts.zoho.com.cn/oauth/v2/auth",
            value: "https://accounts.zoho.com.cn/oauth/v2/auth",
            description: "For the CN domain"
          }
        ],
        default: "https://accounts.zoho.com/oauth/v2/auth",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "options",
        options: [
          {
            name: "AU - https://accounts.zoho.com.au/oauth/v2/token",
            value: "https://accounts.zoho.com.au/oauth/v2/token"
          },
          {
            name: "CN - https://accounts.zoho.com.cn/oauth/v2/token",
            value: "https://accounts.zoho.com.cn/oauth/v2/token"
          },
          {
            name: "EU - https://accounts.zoho.eu/oauth/v2/token",
            value: "https://accounts.zoho.eu/oauth/v2/token"
          },
          {
            name: "IN - https://accounts.zoho.in/oauth/v2/token",
            value: "https://accounts.zoho.in/oauth/v2/token"
          },
          {
            name: "US - https://accounts.zoho.com/oauth/v2/token",
            value: "https://accounts.zoho.com/oauth/v2/token"
          }
        ],
        default: "https://accounts.zoho.com/oauth/v2/token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "ZohoCRM.modules.ALL,ZohoCRM.settings.all,ZohoCRM.users.all"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "access_type=offline"
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
  ZohoOAuth2Api
});
//# sourceMappingURL=ZohoOAuth2Api.credentials.js.map