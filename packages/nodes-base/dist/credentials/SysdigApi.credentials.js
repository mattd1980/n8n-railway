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
var SysdigApi_credentials_exports = {};
__export(SysdigApi_credentials_exports, {
  SysdigApi: () => SysdigApi
});
module.exports = __toCommonJS(SysdigApi_credentials_exports);
class SysdigApi {
  constructor() {
    this.name = "sysdigApi";
    this.displayName = "Sysdig API";
    this.documentationUrl = "sysdig";
    this.icon = { light: "file:icons/Sysdig.Black.svg", dark: "file:icons/Sysdig.White.svg" };
    this.httpRequestNode = {
      name: "Sysdig",
      docsUrl: "https://docs.sysdig.com/en/docs/developer-tools/sysdig-api/",
      apiBaseUrl: "https://app.us1.sysdig.com"
    };
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SysdigApi
});
//# sourceMappingURL=SysdigApi.credentials.js.map