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
var CircleCiApi_credentials_exports = {};
__export(CircleCiApi_credentials_exports, {
  CircleCiApi: () => CircleCiApi
});
module.exports = __toCommonJS(CircleCiApi_credentials_exports);
class CircleCiApi {
  constructor() {
    this.name = "circleCiApi";
    this.displayName = "CircleCI API";
    this.documentationUrl = "circleCi";
    this.properties = [
      {
        displayName: "Personal API Token",
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
  CircleCiApi
});
//# sourceMappingURL=CircleCiApi.credentials.js.map