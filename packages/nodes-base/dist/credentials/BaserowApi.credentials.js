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
var BaserowApi_credentials_exports = {};
__export(BaserowApi_credentials_exports, {
  BaserowApi: () => BaserowApi
});
module.exports = __toCommonJS(BaserowApi_credentials_exports);
class BaserowApi {
  constructor() {
    this.name = "baserowApi";
    this.displayName = "Baserow API";
    this.documentationUrl = "baserow";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "https://api.baserow.io"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaserowApi
});
//# sourceMappingURL=BaserowApi.credentials.js.map