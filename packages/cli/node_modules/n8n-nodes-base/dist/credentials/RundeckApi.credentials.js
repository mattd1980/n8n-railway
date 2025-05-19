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
var RundeckApi_credentials_exports = {};
__export(RundeckApi_credentials_exports, {
  RundeckApi: () => RundeckApi
});
module.exports = __toCommonJS(RundeckApi_credentials_exports);
class RundeckApi {
  constructor() {
    this.name = "rundeckApi";
    this.displayName = "Rundeck API";
    this.documentationUrl = "rundeck";
    this.properties = [
      {
        displayName: "Url",
        name: "url",
        type: "string",
        default: "",
        placeholder: "http://127.0.0.1:4440"
      },
      {
        displayName: "Token",
        name: "token",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "user-agent": "n8n",
          "X-Rundeck-Auth-Token": "={{$credentials?.token}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/api/14/system/info",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RundeckApi
});
//# sourceMappingURL=RundeckApi.credentials.js.map