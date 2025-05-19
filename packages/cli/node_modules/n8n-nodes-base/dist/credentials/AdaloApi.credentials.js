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
var AdaloApi_credentials_exports = {};
__export(AdaloApi_credentials_exports, {
  AdaloApi: () => AdaloApi
});
module.exports = __toCommonJS(AdaloApi_credentials_exports);
class AdaloApi {
  constructor() {
    this.name = "adaloApi";
    this.displayName = "Adalo API";
    this.documentationUrl = "adalo";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: 'The Adalo API is available on paid Adalo plans, find more information <a href="https://help.adalo.com/integrations/the-adalo-api" target="_blank">here</a>'
      },
      {
        displayName: "App ID",
        name: "appId",
        type: "string",
        default: "",
        description: "You can get App ID from the URL of your app. For example, if your app URL is <strong>https://app.adalo.com/apps/1234567890/screens</strong>, then your App ID is <strong>1234567890</strong>."
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdaloApi
});
//# sourceMappingURL=AdaloApi.credentials.js.map