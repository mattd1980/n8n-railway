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
var WooCommerceApi_credentials_exports = {};
__export(WooCommerceApi_credentials_exports, {
  WooCommerceApi: () => WooCommerceApi
});
module.exports = __toCommonJS(WooCommerceApi_credentials_exports);
class WooCommerceApi {
  constructor() {
    this.name = "wooCommerceApi";
    this.displayName = "WooCommerce API";
    this.documentationUrl = "wooCommerce";
    this.properties = [
      {
        displayName: "Consumer Key",
        name: "consumerKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Consumer Secret",
        name: "consumerSecret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "WooCommerce URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://example.com"
      },
      {
        displayName: "Include Credentials in Query",
        name: "includeCredentialsInQuery",
        type: "boolean",
        default: false,
        description: "Whether credentials should be included in the query. Occasionally, some servers may not parse the Authorization header correctly (if you see a \u201CConsumer key is missing\u201D error when authenticating over SSL, you have a server issue). In this case, you may provide the consumer key/secret as query string parameters instead."
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}/wp-json/wc/v3",
        url: "/products/categories"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.auth = {
      // @ts-ignore
      user: credentials.consumerKey,
      password: credentials.consumerSecret
    };
    if (credentials.includeCredentialsInQuery === true && requestOptions.qs) {
      delete requestOptions.auth;
      Object.assign(requestOptions.qs, {
        consumer_key: credentials.consumerKey,
        consumer_secret: credentials.consumerSecret
      });
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WooCommerceApi
});
//# sourceMappingURL=WooCommerceApi.credentials.js.map