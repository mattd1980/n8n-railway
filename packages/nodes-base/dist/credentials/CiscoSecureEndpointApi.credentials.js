"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CiscoSecureEndpointApi_credentials_exports = {};
__export(CiscoSecureEndpointApi_credentials_exports, {
  CiscoSecureEndpointApi: () => CiscoSecureEndpointApi
});
module.exports = __toCommonJS(CiscoSecureEndpointApi_credentials_exports);
var import_axios = __toESM(require("axios"));
class CiscoSecureEndpointApi {
  constructor() {
    this.name = "ciscoSecureEndpointApi";
    this.displayName = "Cisco Secure Endpoint (AMP) API";
    this.documentationUrl = "ciscosecureendpoint";
    this.icon = { light: "file:icons/Cisco.svg", dark: "file:icons/Cisco.dark.svg" };
    this.httpRequestNode = {
      name: "Cisco Secure Endpoint",
      docsUrl: "https://developer.cisco.com/docs/secure-endpoint/",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: [
          {
            name: "Asia Pacific, Japan, and China",
            value: "apjc.amp"
          },
          {
            name: "Europe",
            value: "eu.amp"
          },
          {
            name: "North America",
            value: "amp"
          }
        ],
        default: "amp"
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
      }
    ];
    this.test = {
      request: {
        baseURL: "=https://api.{{$credentials.region}}.cisco.com",
        url: "/v3/organizations",
        qs: {
          size: 10
        }
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const clientId = credentials.clientId;
    const clientSecret = credentials.clientSecret;
    const region = credentials.region;
    const secureXToken = await (0, import_axios.default)({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      auth: {
        username: clientId,
        password: clientSecret
      },
      method: "POST",
      data: new URLSearchParams({
        grant_type: "client_credentials"
      }).toString(),
      url: `https://visibility.${region}.cisco.com/iroh/oauth2/token`
    });
    const secureEndpointToken = await (0, import_axios.default)({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${secureXToken.data.access_token}`
      },
      method: "POST",
      data: new URLSearchParams({
        grant_type: "client_credentials"
      }).toString(),
      url: `https://api.${region}.cisco.com/v3/access_tokens`
    });
    const requestOptionsWithAuth = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: `Bearer ${secureEndpointToken.data.access_token}`
      }
    };
    return requestOptionsWithAuth;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CiscoSecureEndpointApi
});
//# sourceMappingURL=CiscoSecureEndpointApi.credentials.js.map