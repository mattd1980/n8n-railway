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
var TwitterOAuth2Api_credentials_exports = {};
__export(TwitterOAuth2Api_credentials_exports, {
  TwitterOAuth2Api: () => TwitterOAuth2Api
});
module.exports = __toCommonJS(TwitterOAuth2Api_credentials_exports);
const scopes = [
  "tweet.read",
  "users.read",
  "tweet.write",
  "tweet.moderate.write",
  "users.read",
  "follows.read",
  "follows.write",
  "offline.access",
  "like.read",
  "like.write",
  "dm.write",
  "dm.read",
  "list.read",
  "list.write"
];
class TwitterOAuth2Api {
  constructor() {
    this.name = "twitterOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "X OAuth2 API";
    this.documentationUrl = "twitter";
    this.properties = [
      {
        displayName: 'Some operations require a Basic or Pro API. Refer to <a href="https://developer.x.com/en/docs/twitter-api" target="_blank">X API Docs</a> for more information.',
        name: "apiPermissions",
        type: "notice",
        default: ""
      },
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "pkce"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://twitter.com/i/oauth2/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.twitter.com/2/oauth2/token"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: `${scopes.join(" ")}`
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
  TwitterOAuth2Api
});
//# sourceMappingURL=TwitterOAuth2Api.credentials.js.map