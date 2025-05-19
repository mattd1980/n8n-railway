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
var CrowdStrikeOAuth2Api_credentials_exports = {};
__export(CrowdStrikeOAuth2Api_credentials_exports, {
  CrowdStrikeOAuth2Api: () => CrowdStrikeOAuth2Api
});
module.exports = __toCommonJS(CrowdStrikeOAuth2Api_credentials_exports);
class CrowdStrikeOAuth2Api {
  constructor() {
    this.name = "crowdStrikeOAuth2Api";
    this.displayName = "CrowdStrike OAuth2 API";
    this.documentationUrl = "crowdstrike";
    this.icon = { light: "file:icons/CrowdStrike.svg", dark: "file:icons/CrowdStrike.dark.svg" };
    this.httpRequestNode = {
      name: "CrowdStrike",
      docsUrl: "https://developer.crowdstrike.com/",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Session Token",
        name: "sessionToken",
        type: "hidden",
        typeOptions: {
          expirable: true
        },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        required: true,
        default: ""
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        required: true,
        default: ""
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: {
          password: true
        },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.sessionToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}",
        url: "user-management/queries/users/v1"
      }
    };
  }
  async preAuthentication(credentials) {
    const url = credentials.url;
    const { access_token } = await this.helpers.httpRequest({
      method: "POST",
      url: `${url.endsWith("/") ? url.slice(0, -1) : url}/oauth2/token`,
      body: {
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return { sessionToken: access_token };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrowdStrikeOAuth2Api
});
//# sourceMappingURL=CrowdStrikeOAuth2Api.credentials.js.map