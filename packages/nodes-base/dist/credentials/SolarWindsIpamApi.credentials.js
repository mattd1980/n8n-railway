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
var SolarWindsIpamApi_credentials_exports = {};
__export(SolarWindsIpamApi_credentials_exports, {
  SolarWindsIpamApi: () => SolarWindsIpamApi
});
module.exports = __toCommonJS(SolarWindsIpamApi_credentials_exports);
class SolarWindsIpamApi {
  constructor() {
    this.name = "solarWindsIpamApi";
    this.displayName = "SolarWinds IPAM";
    this.documentationUrl = "solarwindsipam";
    this.icon = {
      light: "file:icons/SolarWindsIpam.svg",
      dark: "file:icons/SolarWindsIpam.svg"
    };
    this.httpRequestNode = {
      name: "SolarWinds IPAM",
      docsUrl: "https://www.solarwinds.com/ip-address-manager",
      apiBaseUrlPlaceholder: "https://your-ipam-server"
    };
    this.properties = [
      {
        displayName: "Base URL",
        name: "url",
        required: true,
        type: "string",
        default: "",
        placeholder: "https://your-ipam-server",
        description: "The base URL of your SolarWinds IPAM server."
      },
      {
        displayName: "Username",
        name: "username",
        required: true,
        type: "string",
        default: "",
        description: "The username for SolarWinds IPAM API."
      },
      {
        displayName: "Password",
        name: "password",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "The password for SolarWinds IPAM API."
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
        url: "/SolarWinds/InformationService/v3/Json/Query",
        method: "GET",
        qs: {
          query: "SELECT TOP 1 AccountID FROM IPAM.AccountRoles"
        },
        skipSslCertificateValidation: true
      },
      rules: [
        {
          type: "responseCode",
          properties: {
            value: 403,
            message: "Connection failed: Invalid credentials or unreachable server"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SolarWindsIpamApi
});
//# sourceMappingURL=SolarWindsIpamApi.credentials.js.map