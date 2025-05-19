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
var ZulipApi_credentials_exports = {};
__export(ZulipApi_credentials_exports, {
  ZulipApi: () => ZulipApi
});
module.exports = __toCommonJS(ZulipApi_credentials_exports);
class ZulipApi {
  constructor() {
    this.name = "zulipApi";
    this.displayName = "Zulip API";
    this.documentationUrl = "zulip";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://yourZulipDomain.zulipchat.com"
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZulipApi
});
//# sourceMappingURL=ZulipApi.credentials.js.map