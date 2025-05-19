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
var GristApi_credentials_exports = {};
__export(GristApi_credentials_exports, {
  GristApi: () => GristApi
});
module.exports = __toCommonJS(GristApi_credentials_exports);
class GristApi {
  constructor() {
    this.name = "gristApi";
    this.displayName = "Grist API";
    this.documentationUrl = "grist";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      },
      {
        displayName: "Plan Type",
        name: "planType",
        type: "options",
        default: "free",
        options: [
          {
            name: "Free",
            value: "free"
          },
          {
            name: "Paid",
            value: "paid"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "Custom Subdomain",
        name: "customSubdomain",
        type: "string",
        default: "",
        required: true,
        description: "Custom subdomain of your team",
        displayOptions: {
          show: {
            planType: ["paid"]
          }
        }
      },
      {
        displayName: "Self-Hosted URL",
        name: "selfHostedUrl",
        type: "string",
        default: "",
        placeholder: "http://localhost:8484",
        required: true,
        description: "URL of your Grist instance. Include http/https without /api and no trailing slash.",
        displayOptions: {
          show: {
            planType: ["selfHosted"]
          }
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GristApi
});
//# sourceMappingURL=GristApi.credentials.js.map