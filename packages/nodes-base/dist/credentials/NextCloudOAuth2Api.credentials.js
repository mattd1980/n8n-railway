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
var NextCloudOAuth2Api_credentials_exports = {};
__export(NextCloudOAuth2Api_credentials_exports, {
  NextCloudOAuth2Api: () => NextCloudOAuth2Api
});
module.exports = __toCommonJS(NextCloudOAuth2Api_credentials_exports);
class NextCloudOAuth2Api {
  constructor() {
    this.name = "nextCloudOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "NextCloud OAuth2 API";
    this.documentationUrl = "nextCloud";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Web DAV URL",
        name: "webDavUrl",
        type: "string",
        placeholder: "https://nextcloud.example.com/remote.php/webdav",
        default: ""
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "string",
        default: "https://nextcloud.example.com/apps/oauth2/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "string",
        default: "https://nextcloud.example.com/apps/oauth2/api/v1/token",
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
  NextCloudOAuth2Api
});
//# sourceMappingURL=NextCloudOAuth2Api.credentials.js.map