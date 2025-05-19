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
var AgileCrmApi_credentials_exports = {};
__export(AgileCrmApi_credentials_exports, {
  AgileCrmApi: () => AgileCrmApi
});
module.exports = __toCommonJS(AgileCrmApi_credentials_exports);
class AgileCrmApi {
  constructor() {
    this.name = "agileCrmApi";
    this.displayName = "AgileCRM API";
    this.documentationUrl = "agileCrm";
    this.properties = [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        placeholder: "example",
        description: 'If the domain is https://example.agilecrm.com "example" would have to be entered'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgileCrmApi
});
//# sourceMappingURL=AgileCrmApi.credentials.js.map