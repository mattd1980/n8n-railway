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
var ElasticSecurityApi_credentials_exports = {};
__export(ElasticSecurityApi_credentials_exports, {
  ElasticSecurityApi: () => ElasticSecurityApi
});
module.exports = __toCommonJS(ElasticSecurityApi_credentials_exports);
class ElasticSecurityApi {
  constructor() {
    this.name = "elasticSecurityApi";
    this.displayName = "Elastic Security API";
    this.documentationUrl = "elasticSecurity";
    this.properties = [
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "e.g. https://mydeployment.kb.us-central1.gcp.cloud.es.io:9243",
        description: "Referred to as Kibana 'endpoint' in the Elastic deployment dashboard",
        required: true
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        options: [
          {
            name: "API Key",
            value: "apiKey"
          },
          {
            name: "Basic Auth",
            value: "basicAuth"
          }
        ],
        default: "basicAuth"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            type: ["basicAuth"]
          }
        }
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true,
        displayOptions: {
          show: {
            type: ["basicAuth"]
          }
        }
      },
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: "",
        displayOptions: {
          show: {
            type: ["apiKey"]
          }
        }
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.baseUrl}}",
        url: "/api/endpoint/metadata",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    if (credentials.type === "apiKey") {
      requestOptions.headers = {
        Authorization: `ApiKey ${credentials.apiKey}`
      };
    } else {
      requestOptions.auth = {
        username: credentials.username,
        password: credentials.password
      };
      requestOptions.headers = {
        "kbn-xsrf": true
      };
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElasticSecurityApi
});
//# sourceMappingURL=ElasticSecurityApi.credentials.js.map