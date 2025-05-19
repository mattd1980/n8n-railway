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
var GhostContentApi_credentials_exports = {};
__export(GhostContentApi_credentials_exports, {
  GhostContentApi: () => GhostContentApi
});
module.exports = __toCommonJS(GhostContentApi_credentials_exports);
class GhostContentApi {
  constructor() {
    this.name = "ghostContentApi";
    this.displayName = "Ghost Content API";
    this.documentationUrl = "ghost";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "http://localhost:3001"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/ghost/api/v3/content/settings/",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.qs = {
      ...requestOptions.qs,
      key: credentials.apiKey
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GhostContentApi
});
//# sourceMappingURL=GhostContentApi.credentials.js.map