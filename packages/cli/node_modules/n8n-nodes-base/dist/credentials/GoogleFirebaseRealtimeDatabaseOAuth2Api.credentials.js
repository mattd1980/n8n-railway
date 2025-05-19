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
var GoogleFirebaseRealtimeDatabaseOAuth2Api_credentials_exports = {};
__export(GoogleFirebaseRealtimeDatabaseOAuth2Api_credentials_exports, {
  GoogleFirebaseRealtimeDatabaseOAuth2Api: () => GoogleFirebaseRealtimeDatabaseOAuth2Api
});
module.exports = __toCommonJS(GoogleFirebaseRealtimeDatabaseOAuth2Api_credentials_exports);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database",
  "https://www.googleapis.com/auth/firebase"
];
class GoogleFirebaseRealtimeDatabaseOAuth2Api {
  constructor() {
    this.name = "googleFirebaseRealtimeDatabaseOAuth2Api";
    this.extends = ["googleOAuth2Api"];
    this.displayName = "Google Firebase Realtime Database OAuth2 API";
    this.documentationUrl = "google/oauth-single-service";
    this.properties = [
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      },
      {
        displayName: "Region",
        name: "region",
        type: "options",
        default: "firebaseio.com",
        options: [
          {
            name: "us-central1",
            value: "firebaseio.com"
          },
          {
            name: "europe-west1",
            value: "europe-west1.firebasedatabase.app"
          },
          {
            name: "asia-southeast1",
            value: "asia-southeast1.firebasedatabase.app"
          }
        ]
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleFirebaseRealtimeDatabaseOAuth2Api
});
//# sourceMappingURL=GoogleFirebaseRealtimeDatabaseOAuth2Api.credentials.js.map