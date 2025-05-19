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
var GithubApi_credentials_exports = {};
__export(GithubApi_credentials_exports, {
  GithubApi: () => GithubApi
});
module.exports = __toCommonJS(GithubApi_credentials_exports);
class GithubApi {
  constructor() {
    this.name = "githubApi";
    this.displayName = "GitHub API";
    this.documentationUrl = "github";
    this.properties = [
      {
        displayName: "Github Server",
        name: "server",
        type: "string",
        default: "https://api.github.com",
        description: "The server to connect to. Only has to be set if Github Enterprise is used."
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: ""
      },
      {
        displayName: "Access Token",
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
          Authorization: "=token {{$credentials?.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.server}}",
        url: "/user",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GithubApi
});
//# sourceMappingURL=GithubApi.credentials.js.map