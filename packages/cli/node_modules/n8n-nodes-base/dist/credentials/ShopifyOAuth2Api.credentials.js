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
var ShopifyOAuth2Api_credentials_exports = {};
__export(ShopifyOAuth2Api_credentials_exports, {
  ShopifyOAuth2Api: () => ShopifyOAuth2Api
});
module.exports = __toCommonJS(ShopifyOAuth2Api_credentials_exports);
class ShopifyOAuth2Api {
  constructor() {
    this.name = "shopifyOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Shopify OAuth2 API";
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
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        required: true,
        hint: "Be aware that Shopify refers to the Client ID as API Key"
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true,
        hint: "Be aware that Shopify refers to the Client Secret as API Secret Key"
      },
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: '=https://{{$self["shopSubdomain"]}}.myshopify.com/admin/oauth/authorize',
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '=https://{{$self["shopSubdomain"]}}.myshopify.com/admin/oauth/access_token',
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "write_orders read_orders write_products read_products"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "access_mode=value"
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopifyOAuth2Api
});
//# sourceMappingURL=ShopifyOAuth2Api.credentials.js.map