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
var FreshdeskApi_credentials_exports = {};
__export(FreshdeskApi_credentials_exports, {
  FreshdeskApi: () => FreshdeskApi
});
module.exports = __toCommonJS(FreshdeskApi_credentials_exports);
class FreshdeskApi {
  constructor() {
    this.name = "freshdeskApi";
    this.displayName = "Freshdesk API";
    this.documentationUrl = "freshdesk";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        placeholder: "company",
        description: 'If the URL you get displayed on Freshdesk is "https://company.freshdesk.com" enter "company"',
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreshdeskApi
});
//# sourceMappingURL=FreshdeskApi.credentials.js.map