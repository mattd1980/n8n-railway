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
var ElasticsearchApi_credentials_exports = {};
__export(ElasticsearchApi_credentials_exports, {
  ElasticsearchApi: () => ElasticsearchApi
});
module.exports = __toCommonJS(ElasticsearchApi_credentials_exports);
class ElasticsearchApi {
  constructor() {
    this.name = "elasticsearchApi";
    this.displayName = "Elasticsearch API";
    this.documentationUrl = "elasticsearch";
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
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "https://mydeployment.es.us-central1.gcp.cloud.es.io:9243",
        description: "Referred to as Elasticsearch 'endpoint' in the Elastic deployment dashboard"
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "ignoreSSLIssues",
        type: "boolean",
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
        baseURL: "={{$credentials.baseUrl}}".replace(/\/$/, ""),
        url: "/_xpack?human=false",
        skipSslCertificateValidation: "={{$credentials.ignoreSSLIssues}}"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElasticsearchApi
});
//# sourceMappingURL=ElasticsearchApi.credentials.js.map