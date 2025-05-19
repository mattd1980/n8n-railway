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
var PhilipsHueOAuth2Api_credentials_exports = {};
__export(PhilipsHueOAuth2Api_credentials_exports, {
  PhilipsHueOAuth2Api: () => PhilipsHueOAuth2Api
});
module.exports = __toCommonJS(PhilipsHueOAuth2Api_credentials_exports);
class PhilipsHueOAuth2Api {
  constructor() {
    this.name = "philipsHueOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "PhilipHue OAuth2 API";
    this.documentationUrl = "philipsHue";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "APP ID",
        name: "appId",
        type: "string",
        default: ""
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://api.meethue.com/v2/oauth2/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.meethue.com/v2/oauth2/token"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: '={{"appid="+$self["appId"]}}'
      },
      {
        displayName: "Scope",
        name: "scope",
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
  PhilipsHueOAuth2Api
});
//# sourceMappingURL=PhilipsHueOAuth2Api.credentials.js.map