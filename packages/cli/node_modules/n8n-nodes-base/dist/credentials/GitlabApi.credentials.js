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
var GitlabApi_credentials_exports = {};
__export(GitlabApi_credentials_exports, {
  GitlabApi: () => GitlabApi
});
module.exports = __toCommonJS(GitlabApi_credentials_exports);
class GitlabApi {
  constructor() {
    this.name = "gitlabApi";
    this.displayName = "GitLab API";
    this.documentationUrl = "gitlab";
    this.properties = [
      {
        displayName: "Gitlab Server",
        name: "server",
        type: "string",
        default: "https://gitlab.com"
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
          "Private-Token": "={{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.server.replace(new RegExp("/$"), "") + "/api/v4" }}',
        url: "/personal_access_tokens/self"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GitlabApi
});
//# sourceMappingURL=GitlabApi.credentials.js.map