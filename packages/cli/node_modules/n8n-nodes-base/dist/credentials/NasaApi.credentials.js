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
var NasaApi_credentials_exports = {};
__export(NasaApi_credentials_exports, {
  NasaApi: () => NasaApi
});
module.exports = __toCommonJS(NasaApi_credentials_exports);
class NasaApi {
  constructor() {
    this.name = "nasaApi";
    this.displayName = "NASA API";
    this.documentationUrl = "nasa";
    this.properties = [
      {
        displayName: "API Key",
        name: "api_key",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NasaApi
});
//# sourceMappingURL=NasaApi.credentials.js.map