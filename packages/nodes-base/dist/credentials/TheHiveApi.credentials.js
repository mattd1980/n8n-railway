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
var TheHiveApi_credentials_exports = {};
__export(TheHiveApi_credentials_exports, {
  TheHiveApi: () => TheHiveApi
});
module.exports = __toCommonJS(TheHiveApi_credentials_exports);
class TheHiveApi {
  constructor() {
    this.name = "theHiveApi";
    this.displayName = "The Hive API";
    this.documentationUrl = "theHive";
    this.properties = [
      {
        displayName: "API Key",
        name: "ApiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        default: "",
        type: "string",
        description: "The URL of TheHive instance",
        placeholder: "https://localhost:9000"
      },
      {
        displayName: "API Version",
        name: "apiVersion",
        default: "",
        type: "options",
        description: "The version of api to be used",
        options: [
          {
            name: "TheHive 4+ (api v1)",
            value: "v1",
            description: "API version with TheHive 4 support, also works with TheHive 5 but not all features are supported"
          },
          {
            name: "TheHive 3 (api v0)",
            value: "",
            description: "API version with TheHive 3 support"
          }
        ]
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
          Authorization: "=Bearer {{$credentials?.ApiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}",
        url: "/api/case"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TheHiveApi
});
//# sourceMappingURL=TheHiveApi.credentials.js.map