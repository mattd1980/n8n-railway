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
var JiraSoftwareServerPatApi_credentials_exports = {};
__export(JiraSoftwareServerPatApi_credentials_exports, {
  JiraSoftwareServerPatApi: () => JiraSoftwareServerPatApi
});
module.exports = __toCommonJS(JiraSoftwareServerPatApi_credentials_exports);
class JiraSoftwareServerPatApi {
  constructor() {
    this.name = "jiraSoftwareServerPatApi";
    this.displayName = "Jira SW Server (PAT) API";
    this.documentationUrl = "jira";
    this.properties = [
      {
        displayName: "Personal Access Token",
        name: "personalAccessToken",
        typeOptions: { password: true },
        type: "string",
        default: ""
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://example.com"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.personalAccessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.domain}}",
        url: "/rest/api/2/project"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JiraSoftwareServerPatApi
});
//# sourceMappingURL=JiraSoftwareServerPatApi.credentials.js.map