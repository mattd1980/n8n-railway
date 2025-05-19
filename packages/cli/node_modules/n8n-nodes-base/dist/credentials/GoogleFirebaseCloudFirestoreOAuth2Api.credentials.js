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
var GoogleFirebaseCloudFirestoreOAuth2Api_credentials_exports = {};
__export(GoogleFirebaseCloudFirestoreOAuth2Api_credentials_exports, {
  GoogleFirebaseCloudFirestoreOAuth2Api: () => GoogleFirebaseCloudFirestoreOAuth2Api
});
module.exports = __toCommonJS(GoogleFirebaseCloudFirestoreOAuth2Api_credentials_exports);
const scopes = [
  "https://www.googleapis.com/auth/datastore",
  "https://www.googleapis.com/auth/firebase"
];
class GoogleFirebaseCloudFirestoreOAuth2Api {
  constructor() {
    this.name = "googleFirebaseCloudFirestoreOAuth2Api";
    this.extends = ["googleOAuth2Api"];
    this.displayName = "Google Firebase Cloud Firestore OAuth2 API";
    this.documentationUrl = "google/oauth-single-service";
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
  GoogleFirebaseCloudFirestoreOAuth2Api
});
//# sourceMappingURL=GoogleFirebaseCloudFirestoreOAuth2Api.credentials.js.map