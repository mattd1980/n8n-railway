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
var IterableApi_credentials_exports = {};
__export(IterableApi_credentials_exports, {
  IterableApi: () => IterableApi
});
module.exports = __toCommonJS(IterableApi_credentials_exports);
class IterableApi {
  constructor() {
    this.name = "iterableApi";
    this.displayName = "Iterable API";
    this.documentationUrl = "iterable";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: [
          {
            name: "EDC",
            value: "https://api.eu.iterable.com"
          },
          {
            name: "USDC",
            value: "https://api.iterable.com"
          }
        ],
        default: "https://api.iterable.com"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Api_Key: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.region}}",
        url: "/api/webhooks",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IterableApi
});
//# sourceMappingURL=IterableApi.credentials.js.map