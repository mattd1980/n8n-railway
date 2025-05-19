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
var FilescanApi_credentials_exports = {};
__export(FilescanApi_credentials_exports, {
  FilescanApi: () => FilescanApi
});
module.exports = __toCommonJS(FilescanApi_credentials_exports);
class FilescanApi {
  constructor() {
    this.name = "filescanApi";
    this.displayName = "Filescan API";
    this.documentationUrl = "filescan";
    this.icon = { light: "file:icons/Filescan.svg", dark: "file:icons/Filescan.svg" };
    this.httpRequestNode = {
      name: "Filescan",
      docsUrl: "https://www.filescan.io/api/docs",
      apiBaseUrlPlaceholder: "https://www.filescan.io/api/system/do-healthcheck"
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
          "X-Api-Key": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://www.filescan.io/api",
        url: "/system/do-healthcheck",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FilescanApi
});
//# sourceMappingURL=FilescanApi.credentials.js.map