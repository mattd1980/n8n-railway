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
var FortiGateApi_credentials_exports = {};
__export(FortiGateApi_credentials_exports, {
  FortiGateApi: () => FortiGateApi
});
module.exports = __toCommonJS(FortiGateApi_credentials_exports);
class FortiGateApi {
  constructor() {
    this.name = "fortiGateApi";
    this.displayName = "Fortinet FortiGate API";
    this.documentationUrl = "fortigate";
    this.icon = "file:icons/Fortinet.svg";
    this.httpRequestNode = {
      name: "Fortinet FortiGate",
      docsUrl: "https://docs.fortinet.com/document/fortigate/7.4.1/administration-guide/940602/using-apis",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        qs: {
          access_token: "={{$credentials.accessToken}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FortiGateApi
});
//# sourceMappingURL=FortiGateApi.credentials.js.map