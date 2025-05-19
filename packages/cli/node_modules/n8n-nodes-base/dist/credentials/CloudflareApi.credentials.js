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
var CloudflareApi_credentials_exports = {};
__export(CloudflareApi_credentials_exports, {
  CloudflareApi: () => CloudflareApi
});
module.exports = __toCommonJS(CloudflareApi_credentials_exports);
class CloudflareApi {
  constructor() {
    this.name = "cloudflareApi";
    this.displayName = "Cloudflare API";
    this.documentationUrl = "cloudflare";
    this.properties = [
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.cloudflare.com/client/v4/user/tokens/verify"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloudflareApi
});
//# sourceMappingURL=CloudflareApi.credentials.js.map