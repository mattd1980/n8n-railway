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
var OAuth1Api_credentials_exports = {};
__export(OAuth1Api_credentials_exports, {
  OAuth1Api: () => OAuth1Api
});
module.exports = __toCommonJS(OAuth1Api_credentials_exports);
class OAuth1Api {
  constructor() {
    this.name = "oAuth1Api";
    this.displayName = "OAuth1 API";
    this.documentationUrl = "httpRequest";
    this.genericAuth = true;
    this.properties = [
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Consumer Key",
        name: "consumerKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      },
      {
        displayName: "Consumer Secret",
        name: "consumerSecret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      },
      {
        displayName: "Request Token URL",
        name: "requestTokenUrl",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Signature Method",
        name: "signatureMethod",
        type: "options",
        options: [
          {
            name: "HMAC-SHA1",
            value: "HMAC-SHA1"
          },
          {
            name: "HMAC-SHA256",
            value: "HMAC-SHA256"
          },
          {
            name: "HMAC-SHA512",
            value: "HMAC-SHA512"
          }
        ],
        default: "HMAC-SHA1",
        required: true
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAuth1Api
});
//# sourceMappingURL=OAuth1Api.credentials.js.map