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
var CiscoUmbrellaApi_credentials_exports = {};
__export(CiscoUmbrellaApi_credentials_exports, {
  CiscoUmbrellaApi: () => CiscoUmbrellaApi
});
module.exports = __toCommonJS(CiscoUmbrellaApi_credentials_exports);
class CiscoUmbrellaApi {
  constructor() {
    this.name = "ciscoUmbrellaApi";
    this.displayName = "Cisco Umbrella API";
    this.documentationUrl = "ciscoumbrella";
    this.icon = { light: "file:icons/Cisco.svg", dark: "file:icons/Cisco.dark.svg" };
    this.httpRequestNode = {
      name: "Cisco Umbrella",
      docsUrl: "https://developer.cisco.com/docs/cloud-security/",
      apiBaseUrl: "https://api.umbrella.com/"
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
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      },
      {
        displayName: "Secret",
        name: "secret",
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
        baseURL: "https://api.umbrella.com",
        url: "/users"
      }
    };
  }
  async preAuthentication(credentials) {
    const url = "https://api.umbrella.com";
    const { access_token } = await this.helpers.httpRequest({
      method: "POST",
      url: `${url.endsWith("/") ? url.slice(0, -1) : url}/auth/v2/token?grant_type=client_credentials`,
      auth: {
        username: credentials.apiKey,
        password: credentials.secret
      },
      headers: {
        "Content-Type": "x-www-form-urlencoded"
      }
    });
    return { sessionToken: access_token };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CiscoUmbrellaApi
});
//# sourceMappingURL=CiscoUmbrellaApi.credentials.js.map