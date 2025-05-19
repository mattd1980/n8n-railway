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
var MonicaCrmApi_credentials_exports = {};
__export(MonicaCrmApi_credentials_exports, {
  MonicaCrmApi: () => MonicaCrmApi
});
module.exports = __toCommonJS(MonicaCrmApi_credentials_exports);
class MonicaCrmApi {
  constructor() {
    this.name = "monicaCrmApi";
    this.displayName = "Monica CRM API";
    this.documentationUrl = "monicaCrm";
    this.properties = [
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "cloudHosted",
        options: [
          {
            name: "Cloud-Hosted",
            value: "cloudHosted"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "Self-Hosted Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://www.mydomain.com",
        displayOptions: {
          show: {
            environment: ["selfHosted"]
          }
        }
      },
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MonicaCrmApi
});
//# sourceMappingURL=MonicaCrmApi.credentials.js.map