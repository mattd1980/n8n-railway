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
var DiscourseApi_credentials_exports = {};
__export(DiscourseApi_credentials_exports, {
  DiscourseApi: () => DiscourseApi
});
module.exports = __toCommonJS(DiscourseApi_credentials_exports);
class DiscourseApi {
  constructor() {
    this.name = "discourseApi";
    this.displayName = "Discourse API";
    this.documentationUrl = "discourse";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        required: true,
        type: "string",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Username",
        name: "username",
        required: true,
        type: "string",
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/groups.json",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.headers = {
      "Api-Key": credentials.apiKey,
      "Api-Username": credentials.username
    };
    if (requestOptions.method === "GET") {
      delete requestOptions.body;
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscourseApi
});
//# sourceMappingURL=DiscourseApi.credentials.js.map