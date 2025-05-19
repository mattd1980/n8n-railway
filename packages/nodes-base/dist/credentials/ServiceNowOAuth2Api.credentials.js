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
var ServiceNowOAuth2Api_credentials_exports = {};
__export(ServiceNowOAuth2Api_credentials_exports, {
  ServiceNowOAuth2Api: () => ServiceNowOAuth2Api
});
module.exports = __toCommonJS(ServiceNowOAuth2Api_credentials_exports);
class ServiceNowOAuth2Api {
  constructor() {
    this.name = "serviceNowOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "ServiceNow OAuth2 API";
    this.documentationUrl = "serviceNow";
    this.properties = [
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        hint: "The subdomain can be extracted from the URL. If the URL is: https://dev99890.service-now.com the subdomain is dev99890",
        required: true
      },
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
        default: '=https://{{$self["subdomain"]}}.service-now.com/oauth_auth.do',
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '=https://{{$self["subdomain"]}}.service-now.com/oauth_token.do',
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "useraccount"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "response_type=code"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "grant_type=authorization_code"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "header"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServiceNowOAuth2Api
});
//# sourceMappingURL=ServiceNowOAuth2Api.credentials.js.map