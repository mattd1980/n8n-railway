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
var TwitterOAuth1Api_credentials_exports = {};
__export(TwitterOAuth1Api_credentials_exports, {
  TwitterOAuth1Api: () => TwitterOAuth1Api
});
module.exports = __toCommonJS(TwitterOAuth1Api_credentials_exports);
class TwitterOAuth1Api {
  constructor() {
    this.name = "twitterOAuth1Api";
    this.extends = ["oAuth1Api"];
    this.displayName = "X OAuth API";
    this.documentationUrl = "twitter";
    this.properties = [
      {
        displayName: "Request Token URL",
        name: "requestTokenUrl",
        type: "hidden",
        default: "https://api.twitter.com/oauth/request_token"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://api.twitter.com/oauth/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.twitter.com/oauth/access_token"
      },
      {
        displayName: "Signature Method",
        name: "signatureMethod",
        type: "hidden",
        default: "HMAC-SHA1"
      },
      {
        displayName: 'Some operations require a Basic or Pro API. Refer to <a href="https://developer.x.com/en/docs/twitter-api" target="_blank">X API Docs</a> for more information.',
        name: "apiPermissions",
        type: "notice",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TwitterOAuth1Api
});
//# sourceMappingURL=TwitterOAuth1Api.credentials.js.map