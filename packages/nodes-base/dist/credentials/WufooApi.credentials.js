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
var WufooApi_credentials_exports = {};
__export(WufooApi_credentials_exports, {
  WufooApi: () => WufooApi
});
module.exports = __toCommonJS(WufooApi_credentials_exports);
class WufooApi {
  constructor() {
    this.name = "wufooApi";
    this.displayName = "Wufoo API";
    this.documentationUrl = "wufoo";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.apiKey}}",
          password: "not-needed"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "=https://{{$credentials.subdomain}}.wufoo.com",
        url: "/api/v3/forms.json"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WufooApi
});
//# sourceMappingURL=WufooApi.credentials.js.map