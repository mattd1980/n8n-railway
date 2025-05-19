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
var HighLevelOAuth2Api_credentials_exports = {};
__export(HighLevelOAuth2Api_credentials_exports, {
  HighLevelOAuth2Api: () => HighLevelOAuth2Api
});
module.exports = __toCommonJS(HighLevelOAuth2Api_credentials_exports);
class HighLevelOAuth2Api {
  constructor() {
    this.name = "highLevelOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "HighLevel OAuth2 API";
    this.documentationUrl = "highLevel";
    this.icon = "file:icons/highLevel.svg";
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
        type: "options",
        default: "https://marketplace.leadconnectorhq.com/oauth/chooselocation",
        required: true,
        options: [
          {
            name: "White-Label",
            value: "https://marketplace.leadconnectorhq.com/oauth/chooselocation"
          },
          {
            name: "Standard",
            value: "https://marketplace.gohighlevel.com/oauth/chooselocation"
          }
        ]
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "string",
        hint: "Separate scopes by space, scopes needed for node: 'locations.readonly contacts.readonly contacts.write opportunities.readonly opportunities.write users.readonly'",
        default: "",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://services.leadconnectorhq.com/oauth/token"
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
      },
      {
        displayName: "Make sure your credentials include the required OAuth scopes for all actions this node performs.",
        name: "notice",
        type: "notice",
        default: "",
        displayOptions: {
          hideOnCloud: true
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighLevelOAuth2Api
});
//# sourceMappingURL=HighLevelOAuth2Api.credentials.js.map