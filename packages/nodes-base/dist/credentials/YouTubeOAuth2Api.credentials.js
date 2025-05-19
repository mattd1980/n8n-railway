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
var YouTubeOAuth2Api_credentials_exports = {};
__export(YouTubeOAuth2Api_credentials_exports, {
  YouTubeOAuth2Api: () => YouTubeOAuth2Api
});
module.exports = __toCommonJS(YouTubeOAuth2Api_credentials_exports);
const scopes = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtubepartner-channel-audit"
];
class YouTubeOAuth2Api {
  constructor() {
    this.name = "youTubeOAuth2Api";
    this.icon = "node:n8n-nodes-base.youTube";
    this.extends = ["googleOAuth2Api"];
    this.displayName = "YouTube OAuth2 API";
    this.documentationUrl = "google";
    this.properties = [
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YouTubeOAuth2Api
});
//# sourceMappingURL=YouTubeOAuth2Api.credentials.js.map