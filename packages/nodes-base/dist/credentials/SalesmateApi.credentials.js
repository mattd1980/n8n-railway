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
var SalesmateApi_credentials_exports = {};
__export(SalesmateApi_credentials_exports, {
  SalesmateApi: () => SalesmateApi
});
module.exports = __toCommonJS(SalesmateApi_credentials_exports);
class SalesmateApi {
  constructor() {
    this.name = "salesmateApi";
    this.displayName = "Salesmate API";
    this.documentationUrl = "salesmate";
    this.properties = [
      {
        displayName: "Session Token",
        name: "sessionToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "n8n.salesmate.io"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SalesmateApi
});
//# sourceMappingURL=SalesmateApi.credentials.js.map