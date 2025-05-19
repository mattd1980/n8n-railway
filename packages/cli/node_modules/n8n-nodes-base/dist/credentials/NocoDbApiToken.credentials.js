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
var NocoDbApiToken_credentials_exports = {};
__export(NocoDbApiToken_credentials_exports, {
  NocoDbApiToken: () => NocoDbApiToken
});
module.exports = __toCommonJS(NocoDbApiToken_credentials_exports);
class NocoDbApiToken {
  constructor() {
    this.name = "nocoDbApiToken";
    this.displayName = "NocoDB API Token";
    this.documentationUrl = "nocoDb";
    this.properties = [
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "",
        placeholder: "http(s)://localhost:8080"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "xc-token": "={{$credentials.apiToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{ $credentials.host }}",
        url: "/api/v1/auth/user/me"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NocoDbApiToken
});
//# sourceMappingURL=NocoDbApiToken.credentials.js.map