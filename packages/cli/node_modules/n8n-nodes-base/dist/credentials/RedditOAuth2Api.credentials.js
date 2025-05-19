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
var RedditOAuth2Api_credentials_exports = {};
__export(RedditOAuth2Api_credentials_exports, {
  RedditOAuth2Api: () => RedditOAuth2Api
});
module.exports = __toCommonJS(RedditOAuth2Api_credentials_exports);
const scopes = ["identity", "edit", "history", "mysubreddits", "read", "save", "submit"];
class RedditOAuth2Api {
  constructor() {
    this.name = "redditOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Reddit OAuth2 API";
    this.documentationUrl = "reddit";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "response_type=code"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "grant_type=authorization_code"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "duration=permanent"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://www.reddit.com/api/v1/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://www.reddit.com/api/v1/access_token"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
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
  RedditOAuth2Api
});
//# sourceMappingURL=RedditOAuth2Api.credentials.js.map