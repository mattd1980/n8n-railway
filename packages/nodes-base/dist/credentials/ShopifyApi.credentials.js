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
var ShopifyApi_credentials_exports = {};
__export(ShopifyApi_credentials_exports, {
  ShopifyApi: () => ShopifyApi
});
module.exports = __toCommonJS(ShopifyApi_credentials_exports);
var import_n8n_workflow = require("n8n-workflow");
class ShopifyApi {
  constructor() {
    this.name = "shopifyApi";
    this.displayName = "Shopify API";
    this.documentationUrl = "shopify";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Shop Subdomain",
        name: "shopSubdomain",
        required: true,
        type: "string",
        default: "",
        description: "Only the subdomain without .myshopify.com"
      },
      {
        displayName: "Shared Secret",
        name: "sharedSecret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "=https://{{$credentials.shopSubdomain}}.myshopify.com/admin/api/2024-07",
        url: "/products.json"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Basic ${Buffer.from(`${credentials.apiKey}:${credentials.password}`).toString(
        import_n8n_workflow.BINARY_ENCODING
      )}`
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopifyApi
});
//# sourceMappingURL=ShopifyApi.credentials.js.map