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
var MoceanApi_credentials_exports = {};
__export(MoceanApi_credentials_exports, {
  MoceanApi: () => MoceanApi
});
module.exports = __toCommonJS(MoceanApi_credentials_exports);
class MoceanApi {
  constructor() {
    this.name = "moceanApi";
    this.displayName = "Mocean Api";
    this.documentationUrl = "mocean";
    this.properties = [
      // The credentials to get from user and save encrypted.
      // Properties can be defined exactly in the same way
      // as node properties.
      {
        displayName: "API Key",
        name: "mocean-api-key",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "API Secret",
        name: "mocean-api-secret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MoceanApi
});
//# sourceMappingURL=MoceanApi.credentials.js.map