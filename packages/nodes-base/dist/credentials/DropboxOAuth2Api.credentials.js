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
var DropboxOAuth2Api_credentials_exports = {};
__export(DropboxOAuth2Api_credentials_exports, {
  DropboxOAuth2Api: () => DropboxOAuth2Api
});
module.exports = __toCommonJS(DropboxOAuth2Api_credentials_exports);
const scopes = ["files.content.write", "files.content.read", "sharing.read", "account_info.read"];
class DropboxOAuth2Api {
  constructor() {
    this.name = "dropboxOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Dropbox OAuth2 API";
    this.documentationUrl = "dropbox";
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
        default: "https://www.dropbox.com/oauth2/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.dropboxapi.com/oauth2/token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "token_access_type=offline&force_reapprove=true"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "header"
      },
      {
        displayName: "APP Access Type",
        name: "accessType",
        type: "options",
        options: [
          {
            name: "App Folder",
            value: "folder"
          },
          {
            name: "Full Dropbox",
            value: "full"
          }
        ],
        default: "full"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropboxOAuth2Api
});
//# sourceMappingURL=DropboxOAuth2Api.credentials.js.map