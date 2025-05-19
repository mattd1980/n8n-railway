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
var ZendeskApi_credentials_exports = {};
__export(ZendeskApi_credentials_exports, {
  ZendeskApi: () => ZendeskApi
});
module.exports = __toCommonJS(ZendeskApi_credentials_exports);
class ZendeskApi {
  constructor() {
    this.name = "zendeskApi";
    this.displayName = "Zendesk API";
    this.documentationUrl = "zendesk";
    this.properties = [
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        description: "The subdomain of your Zendesk work environment",
        placeholder: "company",
        default: ""
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      }
    ];
    this.test = {
      request: {
        baseURL: "=https://{{$credentials.subdomain}}.zendesk.com/api/v2",
        url: "/ticket_fields.json"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.auth = {
      username: `${credentials.email}/token`,
      password: credentials.apiToken
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZendeskApi
});
//# sourceMappingURL=ZendeskApi.credentials.js.map