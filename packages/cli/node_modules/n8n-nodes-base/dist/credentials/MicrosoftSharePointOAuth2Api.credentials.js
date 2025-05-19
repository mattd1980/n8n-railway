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
var MicrosoftSharePointOAuth2Api_credentials_exports = {};
__export(MicrosoftSharePointOAuth2Api_credentials_exports, {
  MicrosoftSharePointOAuth2Api: () => MicrosoftSharePointOAuth2Api
});
module.exports = __toCommonJS(MicrosoftSharePointOAuth2Api_credentials_exports);
class MicrosoftSharePointOAuth2Api {
  constructor() {
    this.name = "microsoftSharePointOAuth2Api";
    this.extends = ["microsoftOAuth2Api"];
    this.displayName = "Microsoft SharePoint OAuth2 API";
    this.documentationUrl = "microsoft";
    this.properties = [
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "=openid offline_access https://{{$self.subdomain}}.sharepoint.com/.default"
      },
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        hint: 'You can extract the subdomain from the URL. For example, in the URL "https://tenant123.sharepoint.com", the subdomain is "tenant123".'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftSharePointOAuth2Api
});
//# sourceMappingURL=MicrosoftSharePointOAuth2Api.credentials.js.map