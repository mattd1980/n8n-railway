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
var ShufflerApi_credentials_exports = {};
__export(ShufflerApi_credentials_exports, {
  ShufflerApi: () => ShufflerApi
});
module.exports = __toCommonJS(ShufflerApi_credentials_exports);
class ShufflerApi {
  constructor() {
    this.name = "shufflerApi";
    this.displayName = "Shuffler API";
    this.icon = "file:icons/Shuffler.svg";
    this.documentationUrl = "shuffler";
    this.httpRequestNode = {
      name: "Shuffler",
      docsUrl: "https://shuffler.io/docs/API",
      apiBaseUrl: "https://shuffler.io/api/v1/"
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://shuffler.io/api",
        url: "/v1/users/getusers",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShufflerApi
});
//# sourceMappingURL=ShufflerApi.credentials.js.map