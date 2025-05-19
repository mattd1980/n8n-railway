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
var CiscoWebexOAuth2Api_credentials_exports = {};
__export(CiscoWebexOAuth2Api_credentials_exports, {
  CiscoWebexOAuth2Api: () => CiscoWebexOAuth2Api
});
module.exports = __toCommonJS(CiscoWebexOAuth2Api_credentials_exports);
class CiscoWebexOAuth2Api {
  constructor() {
    this.name = "ciscoWebexOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Cisco Webex OAuth2 API";
    this.documentationUrl = "ciscowebex";
    this.icon = { light: "file:icons/Cisco.svg", dark: "file:icons/Cisco.dark.svg" };
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
        default: "https://webexapis.com/v1/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://webexapis.com/v1/access_token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "spark:memberships_read meeting:recordings_read spark:kms meeting:schedules_read spark:rooms_read spark:messages_write spark:memberships_write meeting:recordings_write meeting:preferences_read spark:messages_read meeting:schedules_write"
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
  CiscoWebexOAuth2Api
});
//# sourceMappingURL=CiscoWebexOAuth2Api.credentials.js.map