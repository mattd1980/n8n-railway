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
var CalendlyOAuth2Api_credentials_exports = {};
__export(CalendlyOAuth2Api_credentials_exports, {
  CalendlyOAuth2Api: () => CalendlyOAuth2Api
});
module.exports = __toCommonJS(CalendlyOAuth2Api_credentials_exports);
class CalendlyOAuth2Api {
  constructor() {
    this.name = "calendlyOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Calendly OAuth2 API";
    this.documentationUrl = "calendly";
    this.icon = "file:icons/Calendly.svg";
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
        default: "https://auth.calendly.com/oauth/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://auth.calendly.com/oauth/token"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "header"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: ""
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendlyOAuth2Api
});
//# sourceMappingURL=CalendlyOAuth2Api.credentials.js.map