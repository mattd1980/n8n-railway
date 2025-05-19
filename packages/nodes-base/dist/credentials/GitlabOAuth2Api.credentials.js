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
var GitlabOAuth2Api_credentials_exports = {};
__export(GitlabOAuth2Api_credentials_exports, {
  GitlabOAuth2Api: () => GitlabOAuth2Api
});
module.exports = __toCommonJS(GitlabOAuth2Api_credentials_exports);
class GitlabOAuth2Api {
  constructor() {
    this.name = "gitlabOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "GitLab OAuth2 API";
    this.documentationUrl = "gitlab";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Gitlab Server",
        name: "server",
        type: "string",
        default: "https://gitlab.com"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: '={{$self["server"]}}/oauth/authorize',
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '={{$self["server"]}}/oauth/token',
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "api"
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
  GitlabOAuth2Api
});
//# sourceMappingURL=GitlabOAuth2Api.credentials.js.map