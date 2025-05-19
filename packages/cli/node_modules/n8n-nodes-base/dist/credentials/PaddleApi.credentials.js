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
var PaddleApi_credentials_exports = {};
__export(PaddleApi_credentials_exports, {
  PaddleApi: () => PaddleApi
});
module.exports = __toCommonJS(PaddleApi_credentials_exports);
class PaddleApi {
  constructor() {
    this.name = "paddleApi";
    this.displayName = "Paddle API";
    this.documentationUrl = "paddle";
    this.properties = [
      {
        displayName: "Vendor Auth Code",
        name: "vendorAuthCode",
        type: "string",
        default: ""
      },
      {
        displayName: "Vendor ID",
        name: "vendorId",
        type: "string",
        default: ""
      },
      {
        displayName: "Use Sandbox Environment API",
        name: "sandbox",
        type: "boolean",
        default: false
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PaddleApi
});
//# sourceMappingURL=PaddleApi.credentials.js.map