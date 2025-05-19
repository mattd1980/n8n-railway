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
var MattermostApi_credentials_exports = {};
__export(MattermostApi_credentials_exports, {
  MattermostApi: () => MattermostApi
});
module.exports = __toCommonJS(MattermostApi_credentials_exports);
class MattermostApi {
  constructor() {
    this.name = "mattermostApi";
    this.displayName = "Mattermost API";
    this.documentationUrl = "mattermost";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.baseUrl.replace(/\\/$/, "")}}/api/v4',
        url: "/users",
        skipSslCertificateValidation: "={{$credentials?.allowUnauthorizedCerts}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MattermostApi
});
//# sourceMappingURL=MattermostApi.credentials.js.map