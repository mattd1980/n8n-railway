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
var DriftApi_credentials_exports = {};
__export(DriftApi_credentials_exports, {
  DriftApi: () => DriftApi
});
module.exports = __toCommonJS(DriftApi_credentials_exports);
class DriftApi {
  constructor() {
    this.name = "driftApi";
    this.displayName = "Drift API";
    this.documentationUrl = "drift";
    this.properties = [
      {
        displayName: "Personal Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: 'Visit your account details page, and grab the Access Token. See <a href="https://devdocs.drift.com/docs/quick-start">Drift auth</a>.'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DriftApi
});
//# sourceMappingURL=DriftApi.credentials.js.map