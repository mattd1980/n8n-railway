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
var CalendlyApi_credentials_exports = {};
__export(CalendlyApi_credentials_exports, {
  CalendlyApi: () => CalendlyApi
});
module.exports = __toCommonJS(CalendlyApi_credentials_exports);
const getAuthenticationType = (data) => {
  return data.includes(".") ? "accessToken" : "apiKey";
};
class CalendlyApi {
  constructor() {
    this.name = "calendlyApi";
    this.displayName = "Calendly API";
    this.documentationUrl = "calendly";
    this.properties = [
      // Change name to Personal Access Token once API Keys
      // are deprecated
      {
        displayName: "API Key or Personal Access Token",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://calendly.com",
        url: "/api/v1/users/me"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const { apiKey } = credentials;
    const tokenType = getAuthenticationType(apiKey);
    if (tokenType === "accessToken") {
      requestOptions.headers.Authorization = `Bearer ${apiKey}`;
    } else {
      requestOptions.headers["X-TOKEN"] = apiKey;
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendlyApi
});
//# sourceMappingURL=CalendlyApi.credentials.js.map