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
var OAuth2Api_credentials_exports = {};
__export(OAuth2Api_credentials_exports, {
  OAuth2Api: () => OAuth2Api
});
module.exports = __toCommonJS(OAuth2Api_credentials_exports);
class OAuth2Api {
  constructor() {
    this.name = "oAuth2Api";
    this.displayName = "OAuth2 API";
    this.documentationUrl = "httpRequest";
    this.genericAuth = true;
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "options",
        options: [
          {
            name: "Authorization Code",
            value: "authorizationCode"
          },
          {
            name: "Client Credentials",
            value: "clientCredentials"
          },
          {
            name: "PKCE",
            value: "pkce"
          }
        ],
        default: "authorizationCode"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "string",
        displayOptions: {
          show: {
            grantType: ["authorizationCode", "pkce"]
          }
        },
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
      // WARNING: if you are extending from this credentials and allow user to set their own scopes
      // you HAVE TO add it to GENERIC_OAUTH2_CREDENTIALS_WITH_EDITABLE_SCOPE in packages/cli/src/constants.ts
      // track any updates to this behavior in N8N-7424
      {
        displayName: "Scope",
        name: "scope",
        type: "string",
        default: ""
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "string",
        displayOptions: {
          show: {
            grantType: ["authorizationCode", "pkce"]
          }
        },
        default: "",
        description: "For some services additional query parameters have to be set which can be defined here",
        placeholder: "access_type=offline"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "options",
        options: [
          {
            name: "Body",
            value: "body",
            description: "Send credentials in body"
          },
          {
            name: "Header",
            value: "header",
            description: "Send credentials as Basic Auth header"
          }
        ],
        default: "header"
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "ignoreSSLIssues",
        type: "boolean",
        default: false,
        doNotInherit: true
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAuth2Api
});
//# sourceMappingURL=OAuth2Api.credentials.js.map