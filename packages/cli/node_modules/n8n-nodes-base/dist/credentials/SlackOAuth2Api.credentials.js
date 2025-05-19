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
var SlackOAuth2Api_credentials_exports = {};
__export(SlackOAuth2Api_credentials_exports, {
  SlackOAuth2Api: () => SlackOAuth2Api
});
module.exports = __toCommonJS(SlackOAuth2Api_credentials_exports);
const userScopes = [
  "channels:read",
  "channels:write",
  "chat:write",
  "files:read",
  "files:write",
  "groups:read",
  "im:read",
  "mpim:read",
  "reactions:read",
  "reactions:write",
  "stars:read",
  "stars:write",
  "usergroups:write",
  "usergroups:read",
  "users.profile:read",
  "users.profile:write",
  "users:read"
];
class SlackOAuth2Api {
  constructor() {
    this.name = "slackOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Slack OAuth2 API";
    this.documentationUrl = "slack";
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
        default: "https://slack.com/oauth/v2/authorize"
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://slack.com/api/oauth.v2.access"
      },
      //https://api.slack.com/scopes
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "chat:write"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: `user_scope=${userScopes.join(" ")}`
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      },
      {
        displayName: 'If you get an Invalid Scopes error, make sure you add the correct one <a target="_blank" href="https://docs.n8n.io/integrations/builtin/credentials/slack/#using-oauth">here</a> to your Slack integration',
        name: "notice",
        type: "notice",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlackOAuth2Api
});
//# sourceMappingURL=SlackOAuth2Api.credentials.js.map