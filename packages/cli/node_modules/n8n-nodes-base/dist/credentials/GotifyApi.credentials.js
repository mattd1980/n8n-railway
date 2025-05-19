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
var GotifyApi_credentials_exports = {};
__export(GotifyApi_credentials_exports, {
  GotifyApi: () => GotifyApi
});
module.exports = __toCommonJS(GotifyApi_credentials_exports);
class GotifyApi {
  constructor() {
    this.name = "gotifyApi";
    this.displayName = "Gotify API";
    this.documentationUrl = "gotify";
    this.properties = [
      {
        displayName: "App API Token",
        name: "appApiToken",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        description: "(Optional) Needed for message creation"
      },
      {
        displayName: "Client API Token",
        name: "clientApiToken",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        description: "(Optional) Needed for everything (delete, getAll) but message creation"
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        description: "The URL of the Gotify host"
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "ignoreSSLIssues",
        type: "boolean",
        default: false,
        description: "Whether to connect even if SSL certificate validation is not possible"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GotifyApi
});
//# sourceMappingURL=GotifyApi.credentials.js.map