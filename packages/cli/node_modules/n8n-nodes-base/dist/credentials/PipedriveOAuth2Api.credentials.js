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
var PipedriveOAuth2Api_credentials_exports = {};
__export(PipedriveOAuth2Api_credentials_exports, {
  PipedriveOAuth2Api: () => PipedriveOAuth2Api
});
module.exports = __toCommonJS(PipedriveOAuth2Api_credentials_exports);
class PipedriveOAuth2Api {
  constructor() {
    this.name = "pipedriveOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Pipedrive OAuth2 API";
    this.documentationUrl = "pipedrive";
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
        default: "https://oauth.pipedrive.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://oauth.pipedrive.com/oauth/token",
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
        default: "header"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PipedriveOAuth2Api
});
//# sourceMappingURL=PipedriveOAuth2Api.credentials.js.map