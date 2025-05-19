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
var MicrosoftExcelOAuth2Api_credentials_exports = {};
__export(MicrosoftExcelOAuth2Api_credentials_exports, {
  MicrosoftExcelOAuth2Api: () => MicrosoftExcelOAuth2Api
});
module.exports = __toCommonJS(MicrosoftExcelOAuth2Api_credentials_exports);
class MicrosoftExcelOAuth2Api {
  constructor() {
    this.name = "microsoftExcelOAuth2Api";
    this.extends = ["microsoftOAuth2Api"];
    this.displayName = "Microsoft Excel OAuth2 API";
    this.documentationUrl = "microsoft";
    this.properties = [
      //https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "openid offline_access Files.ReadWrite"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftExcelOAuth2Api
});
//# sourceMappingURL=MicrosoftExcelOAuth2Api.credentials.js.map