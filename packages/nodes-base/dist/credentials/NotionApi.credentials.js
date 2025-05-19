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
var NotionApi_credentials_exports = {};
__export(NotionApi_credentials_exports, {
  NotionApi: () => NotionApi
});
module.exports = __toCommonJS(NotionApi_credentials_exports);
class NotionApi {
  constructor() {
    this.name = "notionApi";
    this.displayName = "Notion API";
    this.documentationUrl = "notion";
    this.properties = [
      {
        displayName: "Internal Integration Secret",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://api.notion.com/v1",
        url: "/users/me"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer ${credentials.apiKey} `
    };
    if (!requestOptions.headers["Notion-Version"]) {
      requestOptions.headers = {
        ...requestOptions.headers,
        "Notion-Version": "2022-02-22"
      };
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotionApi
});
//# sourceMappingURL=NotionApi.credentials.js.map