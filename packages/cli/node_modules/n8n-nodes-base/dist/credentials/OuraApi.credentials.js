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
var OuraApi_credentials_exports = {};
__export(OuraApi_credentials_exports, {
  OuraApi: () => OuraApi
});
module.exports = __toCommonJS(OuraApi_credentials_exports);
class OuraApi {
  constructor() {
    this.name = "ouraApi";
    this.displayName = "Oura API";
    this.documentationUrl = "oura";
    this.properties = [
      {
        displayName: "Personal Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
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
        baseURL: "https://api.ouraring.com",
        url: "/v2/usercollection/personal_info"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OuraApi
});
//# sourceMappingURL=OuraApi.credentials.js.map