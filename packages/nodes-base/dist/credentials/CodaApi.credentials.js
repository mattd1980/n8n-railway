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
var CodaApi_credentials_exports = {};
__export(CodaApi_credentials_exports, {
  CodaApi: () => CodaApi
});
module.exports = __toCommonJS(CodaApi_credentials_exports);
class CodaApi {
  constructor() {
    this.name = "codaApi";
    this.displayName = "Coda API";
    this.documentationUrl = "coda";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://coda.io/apis/v1/whoami",
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodaApi
});
//# sourceMappingURL=CodaApi.credentials.js.map