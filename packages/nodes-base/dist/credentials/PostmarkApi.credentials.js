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
var PostmarkApi_credentials_exports = {};
__export(PostmarkApi_credentials_exports, {
  PostmarkApi: () => PostmarkApi
});
module.exports = __toCommonJS(PostmarkApi_credentials_exports);
class PostmarkApi {
  constructor() {
    this.name = "postmarkApi";
    this.displayName = "Postmark API";
    this.documentationUrl = "postmark";
    this.properties = [
      {
        displayName: "Server API Token",
        name: "serverToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Postmark-Server-Token": "={{$credentials.serverToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.postmarkapp.com",
        url: "/server",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostmarkApi
});
//# sourceMappingURL=PostmarkApi.credentials.js.map