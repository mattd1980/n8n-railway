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
var OktaApi_credentials_exports = {};
__export(OktaApi_credentials_exports, {
  OktaApi: () => OktaApi
});
module.exports = __toCommonJS(OktaApi_credentials_exports);
class OktaApi {
  constructor() {
    this.name = "oktaApi";
    this.displayName = "Okta API";
    this.documentationUrl = "okta";
    this.icon = { light: "file:icons/Okta.svg", dark: "file:icons/Okta.dark.svg" };
    this.httpRequestNode = {
      name: "Okta",
      docsUrl: "https://developer.okta.com/docs/reference/",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://dev-123456.okta.com"
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: "",
        description: "Secure Session Web Service Access Token"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=SSWS {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/api/v1/api-tokens"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OktaApi
});
//# sourceMappingURL=OktaApi.credentials.js.map