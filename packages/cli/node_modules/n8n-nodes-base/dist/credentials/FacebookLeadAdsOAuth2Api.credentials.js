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
var FacebookLeadAdsOAuth2Api_credentials_exports = {};
__export(FacebookLeadAdsOAuth2Api_credentials_exports, {
  FacebookLeadAdsOAuth2Api: () => FacebookLeadAdsOAuth2Api
});
module.exports = __toCommonJS(FacebookLeadAdsOAuth2Api_credentials_exports);
class FacebookLeadAdsOAuth2Api {
  constructor() {
    this.name = "facebookLeadAdsOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Facebook Lead Ads OAuth2 API";
    this.documentationUrl = "facebookleadads";
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
        default: "https://www.facebook.com/v17.0/dialog/oauth",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://graph.facebook.com/v17.0/oauth/access_token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "leads_retrieval pages_show_list pages_manage_metadata pages_manage_ads business_management"
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
  FacebookLeadAdsOAuth2Api
});
//# sourceMappingURL=FacebookLeadAdsOAuth2Api.credentials.js.map