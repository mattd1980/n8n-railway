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
var LinearOAuth2Api_credentials_exports = {};
__export(LinearOAuth2Api_credentials_exports, {
  LinearOAuth2Api: () => LinearOAuth2Api
});
module.exports = __toCommonJS(LinearOAuth2Api_credentials_exports);
class LinearOAuth2Api {
  constructor() {
    this.name = "linearOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Linear OAuth2 API";
    this.documentationUrl = "linear";
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
        default: "https://linear.app/oauth/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://api.linear.app/oauth/token",
        required: true
      },
      {
        displayName: "Actor",
        name: "actor",
        type: "options",
        options: [
          {
            name: "User",
            value: "user",
            description: "Resources are created as the user who authorized the application"
          },
          {
            name: "Application",
            value: "application",
            description: "Resources are created as the application"
          }
        ],
        default: "user"
      },
      {
        displayName: "Include Admin Scope",
        name: "includeAdminScope",
        type: "boolean",
        default: false,
        description: 'Grants the "Admin" scope, Needed to create webhooks'
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: '={{$self["includeAdminScope"] ? "read write issues:create comments:create admin" : "read write issues:create comments:create"}}',
        required: true
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: '={{"actor="+$self["actor"]}}'
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
  LinearOAuth2Api
});
//# sourceMappingURL=LinearOAuth2Api.credentials.js.map