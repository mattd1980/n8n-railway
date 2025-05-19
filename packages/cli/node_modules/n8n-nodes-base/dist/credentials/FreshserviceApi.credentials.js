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
var FreshserviceApi_credentials_exports = {};
__export(FreshserviceApi_credentials_exports, {
  FreshserviceApi: () => FreshserviceApi
});
module.exports = __toCommonJS(FreshserviceApi_credentials_exports);
class FreshserviceApi {
  constructor() {
    this.name = "freshserviceApi";
    this.displayName = "Freshservice API";
    this.documentationUrl = "freshservice";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        placeholder: "atuH3AbeH9HsKvgHuxg"
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "n8n",
        description: "Domain in the Freshservice org URL. For example, in <code>https://n8n.freshservice.com</code>, the domain is <code>n8n</code>"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreshserviceApi
});
//# sourceMappingURL=FreshserviceApi.credentials.js.map