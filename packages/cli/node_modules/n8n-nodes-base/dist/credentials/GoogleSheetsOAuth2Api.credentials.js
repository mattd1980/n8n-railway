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
var GoogleSheetsOAuth2Api_credentials_exports = {};
__export(GoogleSheetsOAuth2Api_credentials_exports, {
  GoogleSheetsOAuth2Api: () => GoogleSheetsOAuth2Api
});
module.exports = __toCommonJS(GoogleSheetsOAuth2Api_credentials_exports);
const scopes = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.metadata"
];
class GoogleSheetsOAuth2Api {
  constructor() {
    this.name = "googleSheetsOAuth2Api";
    this.extends = ["googleOAuth2Api"];
    this.displayName = "Google Sheets OAuth2 API";
    this.documentationUrl = "google/oauth-single-service";
    this.properties = [
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      },
      {
        displayName: 'Make sure you enabled the following APIs & Services in the Google Cloud Console: Google Drive API, Google Sheets API. <a href="https://docs.n8n.io/integrations/builtin/credentials/google/oauth-generic/#scopes" target="_blank">More info</a>.',
        name: "notice",
        type: "notice",
        default: "",
        displayOptions: {
          hideOnCloud: true
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleSheetsOAuth2Api
});
//# sourceMappingURL=GoogleSheetsOAuth2Api.credentials.js.map