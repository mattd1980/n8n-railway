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
var StripeApi_credentials_exports = {};
__export(StripeApi_credentials_exports, {
  StripeApi: () => StripeApi
});
module.exports = __toCommonJS(StripeApi_credentials_exports);
class StripeApi {
  constructor() {
    this.name = "stripeApi";
    this.displayName = "Stripe API";
    this.documentationUrl = "stripe";
    this.properties = [
      {
        displayName: "Secret Key",
        name: "secretKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.secretKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.stripe.com/v1",
        url: "/charges",
        json: true
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StripeApi
});
//# sourceMappingURL=StripeApi.credentials.js.map