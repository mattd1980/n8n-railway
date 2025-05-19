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
var MicrosoftGraphSecurityOAuth2Api_credentials_exports = {};
__export(MicrosoftGraphSecurityOAuth2Api_credentials_exports, {
  MicrosoftGraphSecurityOAuth2Api: () => MicrosoftGraphSecurityOAuth2Api
});
module.exports = __toCommonJS(MicrosoftGraphSecurityOAuth2Api_credentials_exports);
class MicrosoftGraphSecurityOAuth2Api {
  constructor() {
    this.name = "microsoftGraphSecurityOAuth2Api";
    this.displayName = "Microsoft Graph Security OAuth2 API";
    this.extends = ["microsoftOAuth2Api"];
    this.documentationUrl = "microsoft";
    this.properties = [
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "SecurityEvents.ReadWrite.All"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftGraphSecurityOAuth2Api
});
//# sourceMappingURL=MicrosoftGraphSecurityOAuth2Api.credentials.js.map