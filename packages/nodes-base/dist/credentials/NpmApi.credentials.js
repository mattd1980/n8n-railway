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
var NpmApi_credentials_exports = {};
__export(NpmApi_credentials_exports, {
  NpmApi: () => NpmApi
});
module.exports = __toCommonJS(NpmApi_credentials_exports);
class NpmApi {
  constructor() {
    this.name = "npmApi";
    this.displayName = "Npm API";
    this.documentationUrl = "npm";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Registry Url",
        name: "registryUrl",
        type: "string",
        default: "https://registry.npmjs.org"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.registryUrl}}",
        url: "/-/whoami"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NpmApi
});
//# sourceMappingURL=NpmApi.credentials.js.map