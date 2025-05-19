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
var JiraSoftwareServerApi_credentials_exports = {};
__export(JiraSoftwareServerApi_credentials_exports, {
  JiraSoftwareServerApi: () => JiraSoftwareServerApi
});
module.exports = __toCommonJS(JiraSoftwareServerApi_credentials_exports);
class JiraSoftwareServerApi {
  constructor() {
    this.name = "jiraSoftwareServerApi";
    this.displayName = "Jira SW Server API";
    this.documentationUrl = "jira";
    this.properties = [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        typeOptions: {
          password: true
        },
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
        auth: {
          username: "={{$credentials.email}}",
          password: "={{$credentials.password}}"
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
  JiraSoftwareServerApi
});
//# sourceMappingURL=JiraSoftwareServerApi.credentials.js.map