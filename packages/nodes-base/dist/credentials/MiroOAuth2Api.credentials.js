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
var MiroOAuth2Api_credentials_exports = {};
__export(MiroOAuth2Api_credentials_exports, {
  MiroOAuth2Api: () => MiroOAuth2Api
});
module.exports = __toCommonJS(MiroOAuth2Api_credentials_exports);
class MiroOAuth2Api {
  constructor() {
    this.name = "miroOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Miro OAuth2 API";
    this.documentationUrl = "miro";
    this.icon = "file:icons/Miro.svg";
    this.httpRequestNode = {
      name: "Miro",
      docsUrl: "https://developers.miro.com/reference/overview",
      apiBaseUrl: "https://api.miro.com/v2/"
    };
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
        default: "https://miro.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.miro.com/v1/oauth/token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "",
        required: true
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
  MiroOAuth2Api
});
//# sourceMappingURL=MiroOAuth2Api.credentials.js.map