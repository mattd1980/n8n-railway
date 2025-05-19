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
var BitlyOAuth2Api_credentials_exports = {};
__export(BitlyOAuth2Api_credentials_exports, {
  BitlyOAuth2Api: () => BitlyOAuth2Api
});
module.exports = __toCommonJS(BitlyOAuth2Api_credentials_exports);
class BitlyOAuth2Api {
  constructor() {
    this.name = "bitlyOAuth2Api";
    this.displayName = "Bitly OAuth2 API";
    this.documentationUrl = "bitly";
    this.extends = ["oAuth2Api"];
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
        default: "https://bitly.com/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api-ssl.bitly.com/oauth/access_token",
        required: true
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: ""
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
  BitlyOAuth2Api
});
//# sourceMappingURL=BitlyOAuth2Api.credentials.js.map