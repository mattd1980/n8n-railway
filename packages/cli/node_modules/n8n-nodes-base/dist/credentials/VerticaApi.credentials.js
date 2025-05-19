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
var VerticaApi_credentials_exports = {};
__export(VerticaApi_credentials_exports, {
  VerticaApi: () => VerticaApi
});
module.exports = __toCommonJS(VerticaApi_credentials_exports);
class VerticaApi {
  constructor() {
    this.name = "verticaApi";
    this.displayName = "Vertica API";
    this.documentationUrl = "vertica";
    this.httpRequestNode = {
      name: "Vertica",
      docsUrl: "vertica",
      apiBaseUrlPlaceholder: "http://<server>:<port>/v1/"
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        required: true,
        type: "string",
        default: "https://localhost:8443",
        placeholder: "https://<server>:<port>"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        description: "The username for accessing the Vertica database."
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "The password for accessing the Vertica database."
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}".replace(/\/$/, ""),
        url: "/v1/health",
        method: "GET",
        skipSslCertificateValidation: true
      },
      rules: [
        {
          type: "responseCode",
          properties: {
            value: 403,
            message: "Connection failed: Invalid credentials or insufficient permissions"
          }
        },
        {
          type: "responseCode",
          properties: {
            value: 503,
            message: "Service unavailable: Server is overloaded or under maintenance"
          }
        },
        {
          type: "responseCode",
          properties: {
            value: 504,
            message: "Gateway timeout: Upstream server took too long to respond"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VerticaApi
});
//# sourceMappingURL=VerticaApi.credentials.js.map