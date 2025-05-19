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
var WebflowOAuth2Api_credentials_exports = {};
__export(WebflowOAuth2Api_credentials_exports, {
  WebflowOAuth2Api: () => WebflowOAuth2Api
});
module.exports = __toCommonJS(WebflowOAuth2Api_credentials_exports);
class WebflowOAuth2Api {
  constructor() {
    this.name = "webflowOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Webflow OAuth2 API";
    this.documentationUrl = "webflow";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Legacy",
        name: "legacy",
        type: "boolean",
        default: true,
        description: "If the legacy API should be used"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://webflow.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.webflow.com/oauth/access_token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: '={{$self["legacy"] ? "" : "cms:read cms:write sites:read forms:read"}}'
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "",
        description: "For some services additional query parameters have to be set which can be defined here",
        placeholder: ""
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
  WebflowOAuth2Api
});
//# sourceMappingURL=WebflowOAuth2Api.credentials.js.map