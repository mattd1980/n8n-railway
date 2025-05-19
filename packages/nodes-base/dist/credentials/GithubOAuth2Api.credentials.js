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
var GithubOAuth2Api_credentials_exports = {};
__export(GithubOAuth2Api_credentials_exports, {
  GithubOAuth2Api: () => GithubOAuth2Api
});
module.exports = __toCommonJS(GithubOAuth2Api_credentials_exports);
class GithubOAuth2Api {
  constructor() {
    this.name = "githubOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "GitHub OAuth2 API";
    this.documentationUrl = "github";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Github Server",
        name: "server",
        type: "string",
        default: "https://api.github.com",
        description: "The server to connect to. Only has to be set if Github Enterprise is used."
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: '={{$self["server"] === "https://api.github.com" ? "https://github.com" : $self["server"]}}/login/oauth/authorize',
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '={{$self["server"] === "https://api.github.com" ? "https://github.com" : $self["server"]}}/login/oauth/access_token',
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "repo,admin:repo_hook,admin:org,admin:org_hook,gist,notifications,user,write:packages,read:packages,delete:packages,workflow"
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
  GithubOAuth2Api
});
//# sourceMappingURL=GithubOAuth2Api.credentials.js.map