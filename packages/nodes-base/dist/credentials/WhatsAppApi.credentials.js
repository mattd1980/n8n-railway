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
var WhatsAppApi_credentials_exports = {};
__export(WhatsAppApi_credentials_exports, {
  WhatsAppApi: () => WhatsAppApi
});
module.exports = __toCommonJS(WhatsAppApi_credentials_exports);
class WhatsAppApi {
  constructor() {
    this.name = "whatsAppApi";
    this.displayName = "WhatsApp API";
    this.documentationUrl = "whatsApp";
    this.properties = [
      {
        displayName: "Access Token",
        type: "string",
        typeOptions: { password: true },
        name: "accessToken",
        default: "",
        required: true
      },
      {
        displayName: "Business Account ID",
        type: "string",
        name: "businessAccountId",
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://graph.facebook.com/v13.0",
        url: "/",
        ignoreHttpStatusErrors: true
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "error.type",
            value: "OAuthException",
            message: "Invalid access token"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsAppApi
});
//# sourceMappingURL=WhatsAppApi.credentials.js.map