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
var YourlsApi_credentials_exports = {};
__export(YourlsApi_credentials_exports, {
  YourlsApi: () => YourlsApi
});
module.exports = __toCommonJS(YourlsApi_credentials_exports);
class YourlsApi {
  constructor() {
    this.name = "yourlsApi";
    this.displayName = "Yourls API";
    this.documentationUrl = "yourls";
    this.properties = [
      {
        displayName: "Signature",
        name: "signature",
        type: "string",
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "http://localhost:8080"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YourlsApi
});
//# sourceMappingURL=YourlsApi.credentials.js.map