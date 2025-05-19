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
var WordpressApi_credentials_exports = {};
__export(WordpressApi_credentials_exports, {
  WordpressApi: () => WordpressApi
});
module.exports = __toCommonJS(WordpressApi_credentials_exports);
class WordpressApi {
  constructor() {
    this.name = "wordpressApi";
    this.displayName = "Wordpress API";
    this.documentationUrl = "wordpress";
    this.properties = [
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Wordpress URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://example.com"
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
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}/wp-json/wp/v2",
        url: "/users",
        method: "GET",
        skipSslCertificateValidation: "={{$credentials.allowUnauthorizedCerts}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WordpressApi
});
//# sourceMappingURL=WordpressApi.credentials.js.map