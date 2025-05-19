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
var CopperApi_credentials_exports = {};
__export(CopperApi_credentials_exports, {
  CopperApi: () => CopperApi
});
module.exports = __toCommonJS(CopperApi_credentials_exports);
class CopperApi {
  constructor() {
    this.name = "copperApi";
    this.displayName = "Copper API";
    this.documentationUrl = "copper";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Email",
        name: "email",
        required: true,
        type: "string",
        placeholder: "name@email.com",
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-PW-AccessToken": "={{$credentials.apiKey}}",
          "X-PW-Application": "developer_api",
          "X-PW-UserEmail": "={{$credentials.email}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.copper.com/developer_api/v1/",
        url: "users/me"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopperApi
});
//# sourceMappingURL=CopperApi.credentials.js.map