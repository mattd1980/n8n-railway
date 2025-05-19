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
var F5BigIpApi_credentials_exports = {};
__export(F5BigIpApi_credentials_exports, {
  F5BigIpApi: () => F5BigIpApi
});
module.exports = __toCommonJS(F5BigIpApi_credentials_exports);
class F5BigIpApi {
  constructor() {
    this.name = "f5BigIpApi";
    this.displayName = "F5 Big-IP API";
    this.documentationUrl = "f5bigip";
    this.icon = "file:icons/F5.svg";
    this.httpRequestNode = {
      name: "F5 Big-IP",
      docsUrl: "https://clouddocs.f5.com/api/",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  F5BigIpApi
});
//# sourceMappingURL=F5BigIpApi.credentials.js.map