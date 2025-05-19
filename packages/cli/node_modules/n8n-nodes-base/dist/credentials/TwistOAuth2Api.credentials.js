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
var TwistOAuth2Api_credentials_exports = {};
__export(TwistOAuth2Api_credentials_exports, {
  TwistOAuth2Api: () => TwistOAuth2Api
});
module.exports = __toCommonJS(TwistOAuth2Api_credentials_exports);
const scopes = [
  "attachments:write",
  "channels:remove",
  "comments:remove",
  "messages:remove",
  "threads:remove",
  "workspaces:read"
];
class TwistOAuth2Api {
  constructor() {
    this.name = "twistOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Twist OAuth2 API";
    this.documentationUrl = "twist";
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
        default: "https://twist.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://twist.com/oauth/access_token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(",")
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
  TwistOAuth2Api
});
//# sourceMappingURL=TwistOAuth2Api.credentials.js.map