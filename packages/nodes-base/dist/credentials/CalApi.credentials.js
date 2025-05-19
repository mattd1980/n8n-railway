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
var CalApi_credentials_exports = {};
__export(CalApi_credentials_exports, {
  CalApi: () => CalApi
});
module.exports = __toCommonJS(CalApi_credentials_exports);
class CalApi {
  constructor() {
    this.name = "calApi";
    this.displayName = "Cal API";
    this.documentationUrl = "cal";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "https://api.cal.com"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        qs: {
          apiKey: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.host}}",
        url: "=/v1/memberships"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalApi
});
//# sourceMappingURL=CalApi.credentials.js.map