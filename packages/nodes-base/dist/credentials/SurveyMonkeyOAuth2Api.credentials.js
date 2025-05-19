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
var SurveyMonkeyOAuth2Api_credentials_exports = {};
__export(SurveyMonkeyOAuth2Api_credentials_exports, {
  SurveyMonkeyOAuth2Api: () => SurveyMonkeyOAuth2Api
});
module.exports = __toCommonJS(SurveyMonkeyOAuth2Api_credentials_exports);
const scopes = [
  "surveys_read",
  "collectors_read",
  "responses_read",
  "responses_read_detail",
  "webhooks_write",
  "webhooks_read"
];
class SurveyMonkeyOAuth2Api {
  constructor() {
    this.name = "surveyMonkeyOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "SurveyMonkey OAuth2 API";
    this.documentationUrl = "surveyMonkey";
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
        default: "https://api.surveymonkey.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.surveymonkey.com/oauth/token",
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
  SurveyMonkeyOAuth2Api
});
//# sourceMappingURL=SurveyMonkeyOAuth2Api.credentials.js.map