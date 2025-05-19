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
var BitwardenApi_credentials_exports = {};
__export(BitwardenApi_credentials_exports, {
  BitwardenApi: () => BitwardenApi
});
module.exports = __toCommonJS(BitwardenApi_credentials_exports);
class BitwardenApi {
  constructor() {
    this.name = "bitwardenApi";
    this.displayName = "Bitwarden API";
    this.documentationUrl = "bitwarden";
    this.properties = [
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: ""
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
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
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BitwardenApi
});
//# sourceMappingURL=BitwardenApi.credentials.js.map