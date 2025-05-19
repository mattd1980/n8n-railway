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
var UProcApi_credentials_exports = {};
__export(UProcApi_credentials_exports, {
  UProcApi: () => UProcApi
});
module.exports = __toCommonJS(UProcApi_credentials_exports);
class UProcApi {
  constructor() {
    this.name = "uprocApi";
    this.displayName = "uProc API";
    this.documentationUrl = "uProc";
    this.properties = [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://api.uproc.io/api/v2",
        url: "/profile",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const token = Buffer.from(`${credentials.email}:${credentials.apiKey}`).toString("base64");
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Basic ${token}`
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UProcApi
});
//# sourceMappingURL=UProcApi.credentials.js.map