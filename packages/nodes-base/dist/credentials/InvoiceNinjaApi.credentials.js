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
var InvoiceNinjaApi_credentials_exports = {};
__export(InvoiceNinjaApi_credentials_exports, {
  InvoiceNinjaApi: () => InvoiceNinjaApi
});
module.exports = __toCommonJS(InvoiceNinjaApi_credentials_exports);
class InvoiceNinjaApi {
  constructor() {
    this.name = "invoiceNinjaApi";
    this.displayName = "Invoice Ninja API";
    this.documentationUrl = "invoiceNinja";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        hint: "Default URL for v4 is https://app.invoiceninja.com, for v5 it is https://invoicing.co"
      },
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Secret",
        name: "secret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        hint: "This is optional, enter only if you did set a secret in your app and only if you are using v5"
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}",
        url: "/api/v1/clients",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const VERSION_5_TOKEN_LENGTH = 64;
    const { apiToken, secret } = credentials;
    const tokenLength = apiToken.length;
    if (tokenLength < VERSION_5_TOKEN_LENGTH) {
      requestOptions.headers = {
        Accept: "application/json",
        "X-Ninja-Token": apiToken
      };
    } else {
      requestOptions.headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": apiToken,
        "X-Requested-With": "XMLHttpRequest",
        "X-API-SECRET": secret || ""
      };
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvoiceNinjaApi
});
//# sourceMappingURL=InvoiceNinjaApi.credentials.js.map