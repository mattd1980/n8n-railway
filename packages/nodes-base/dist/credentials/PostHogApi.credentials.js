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
var PostHogApi_credentials_exports = {};
__export(PostHogApi_credentials_exports, {
  PostHogApi: () => PostHogApi
});
module.exports = __toCommonJS(PostHogApi_credentials_exports);
class PostHogApi {
  constructor() {
    this.name = "postHogApi";
    this.displayName = "PostHog API";
    this.documentationUrl = "postHog";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "https://app.posthog.com"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostHogApi
});
//# sourceMappingURL=PostHogApi.credentials.js.map