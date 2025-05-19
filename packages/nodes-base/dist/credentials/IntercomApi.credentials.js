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
var IntercomApi_credentials_exports = {};
__export(IntercomApi_credentials_exports, {
  IntercomApi: () => IntercomApi
});
module.exports = __toCommonJS(IntercomApi_credentials_exports);
class IntercomApi {
  constructor() {
    this.name = "intercomApi";
    this.displayName = "Intercom API";
    this.documentationUrl = "intercom";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}",
          Accept: "application/json"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.intercom.io",
        url: "/me",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IntercomApi
});
//# sourceMappingURL=IntercomApi.credentials.js.map