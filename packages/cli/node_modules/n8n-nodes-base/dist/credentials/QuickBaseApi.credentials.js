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
var QuickBaseApi_credentials_exports = {};
__export(QuickBaseApi_credentials_exports, {
  QuickBaseApi: () => QuickBaseApi
});
module.exports = __toCommonJS(QuickBaseApi_credentials_exports);
class QuickBaseApi {
  constructor() {
    this.name = "quickbaseApi";
    this.displayName = "Quick Base API";
    this.documentationUrl = "quickbase";
    this.properties = [
      {
        displayName: "Hostname",
        name: "hostname",
        type: "string",
        default: "",
        required: true,
        placeholder: "demo.quickbase.com"
      },
      {
        displayName: "User Token",
        name: "userToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickBaseApi
});
//# sourceMappingURL=QuickBaseApi.credentials.js.map