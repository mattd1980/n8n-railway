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
var Auth0ManagementApi_credentials_exports = {};
__export(Auth0ManagementApi_credentials_exports, {
  Auth0ManagementApi: () => Auth0ManagementApi
});
module.exports = __toCommonJS(Auth0ManagementApi_credentials_exports);
class Auth0ManagementApi {
  constructor() {
    this.name = "auth0ManagementApi";
    this.displayName = "Auth0 Management API";
    this.documentationUrl = "auth0management";
    this.icon = { light: "file:icons/Auth0.svg", dark: "file:icons/Auth0.dark.svg" };
    this.httpRequestNode = {
      name: "Auth0",
      docsUrl: "https://auth0.com/docs/api/management/v2",
      apiBaseUrlPlaceholder: "https://your-tenant.auth0.com/api/v2/users/"
    };
    this.properties = [
      {
        displayName: "Session Token",
        name: "sessionToken",
        type: "hidden",
        typeOptions: {
          expirable: true,
          password: true
        },
        default: ""
      },
      {
        displayName: "Auth0 Domain",
        name: "domain",
        type: "string",
        required: true,
        default: "your-domain.eu.auth0.com"
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
        baseURL: "=https://{{$credentials.domain}}",
        url: "/api/v2/clients"
      }
    };
  }
  async preAuthentication(credentials) {
    const { access_token } = await this.helpers.httpRequest({
      method: "POST",
      url: `https://${credentials.domain}/oauth/token`,
      body: {
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        audience: `https://${credentials.domain}/api/v2/`,
        grant_type: "client_credentials"
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return { sessionToken: access_token };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Auth0ManagementApi
});
//# sourceMappingURL=Auth0ManagementApi.credentials.js.map