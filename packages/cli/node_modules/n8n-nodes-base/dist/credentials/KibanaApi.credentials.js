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
var KibanaApi_credentials_exports = {};
__export(KibanaApi_credentials_exports, {
  KibanaApi: () => KibanaApi
});
module.exports = __toCommonJS(KibanaApi_credentials_exports);
class KibanaApi {
  constructor() {
    this.name = "kibanaApi";
    this.displayName = "Kibana API";
    this.documentationUrl = "kibana";
    this.icon = "file:icons/Kibana.svg";
    this.httpRequestNode = {
      name: "Kibana",
      docsUrl: "https://www.elastic.co/guide/en/kibana/current/api.html",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        required: true,
        default: "",
        placeholder: "http://localhost:5601"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        required: true,
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "kbn-xsrf": true
        },
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/api/features"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KibanaApi
});
//# sourceMappingURL=KibanaApi.credentials.js.map