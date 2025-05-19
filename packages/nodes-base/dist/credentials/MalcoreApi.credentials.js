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
var MalcoreApi_credentials_exports = {};
__export(MalcoreApi_credentials_exports, {
  MalcoreApi: () => MalcoreApi
});
module.exports = __toCommonJS(MalcoreApi_credentials_exports);
class MalcoreApi {
  constructor() {
    this.name = "malcoreApi";
    this.displayName = "MalcoreAPI";
    this.documentationUrl = "malcore";
    this.icon = { light: "file:icons/Malcore.png", dark: "file:icons/Malcore.png" };
    this.httpRequestNode = {
      name: "Malcore",
      docsUrl: "https://malcore.readme.io/reference/upload",
      apiBaseUrlPlaceholder: "https://api.malcore.io/api/urlcheck"
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          apiKey: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.malcore.io/api",
        url: "/urlcheck",
        method: "POST",
        body: { url: "google.com" }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MalcoreApi
});
//# sourceMappingURL=MalcoreApi.credentials.js.map