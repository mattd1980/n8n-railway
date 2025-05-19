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
var SecurityScorecardApi_credentials_exports = {};
__export(SecurityScorecardApi_credentials_exports, {
  SecurityScorecardApi: () => SecurityScorecardApi
});
module.exports = __toCommonJS(SecurityScorecardApi_credentials_exports);
class SecurityScorecardApi {
  constructor() {
    this.name = "securityScorecardApi";
    this.displayName = "SecurityScorecard API";
    this.documentationUrl = "securityScorecard";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
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
  SecurityScorecardApi
});
//# sourceMappingURL=SecurityScorecardApi.credentials.js.map