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
var Magento2Api_credentials_exports = {};
__export(Magento2Api_credentials_exports, {
  Magento2Api: () => Magento2Api
});
module.exports = __toCommonJS(Magento2Api_credentials_exports);
class Magento2Api {
  constructor() {
    this.name = "magento2Api";
    this.displayName = "Magento 2 API";
    this.documentationUrl = "magento2";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: ""
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.host}}",
        url: "/rest/default/V1/modules"
      }
    };
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
  Magento2Api
});
//# sourceMappingURL=Magento2Api.credentials.js.map