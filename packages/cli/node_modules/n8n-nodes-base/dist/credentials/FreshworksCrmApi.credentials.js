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
var FreshworksCrmApi_credentials_exports = {};
__export(FreshworksCrmApi_credentials_exports, {
  FreshworksCrmApi: () => FreshworksCrmApi
});
module.exports = __toCommonJS(FreshworksCrmApi_credentials_exports);
class FreshworksCrmApi {
  constructor() {
    this.name = "freshworksCrmApi";
    this.displayName = "Freshworks CRM API";
    this.documentationUrl = "freshdesk";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        placeholder: "BDsTn15vHezBlt_XGp3Tig"
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "n8n-org",
        description: "Domain in the Freshworks CRM org URL. For example, in <code>https://n8n-org.myfreshworks.com</code>, the domain is <code>n8n-org</code>."
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Token token={{$credentials?.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "=https://{{$credentials?.domain}}.myfreshworks.com/crm/sales/api",
        url: "/tasks",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreshworksCrmApi
});
//# sourceMappingURL=FreshworksCrmApi.credentials.js.map