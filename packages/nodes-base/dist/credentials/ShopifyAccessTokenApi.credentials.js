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
var ShopifyAccessTokenApi_credentials_exports = {};
__export(ShopifyAccessTokenApi_credentials_exports, {
  ShopifyAccessTokenApi: () => ShopifyAccessTokenApi
});
module.exports = __toCommonJS(ShopifyAccessTokenApi_credentials_exports);
class ShopifyAccessTokenApi {
  constructor() {
    this.name = "shopifyAccessTokenApi";
    this.displayName = "Shopify Access Token API";
    this.documentationUrl = "shopify";
    this.properties = [
      {
        displayName: "Shop Subdomain",
        name: "shopSubdomain",
        required: true,
        type: "string",
        default: "",
        description: "Only the subdomain without .myshopify.com"
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "APP Secret Key",
        name: "appSecretKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Secret key needed to verify the webhook when using Shopify Trigger node"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Shopify-Access-Token": "={{$credentials?.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "=https://{{$credentials?.shopSubdomain}}.myshopify.com/admin/api/2024-07",
        url: "/products.json"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopifyAccessTokenApi
});
//# sourceMappingURL=ShopifyAccessTokenApi.credentials.js.map