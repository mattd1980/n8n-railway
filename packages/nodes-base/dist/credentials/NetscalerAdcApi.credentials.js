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
var NetscalerAdcApi_credentials_exports = {};
__export(NetscalerAdcApi_credentials_exports, {
  NetscalerAdcApi: () => NetscalerAdcApi
});
module.exports = __toCommonJS(NetscalerAdcApi_credentials_exports);
class NetscalerAdcApi {
  constructor() {
    this.name = "citrixAdcApi";
    this.displayName = "Netscaler ADC API";
    this.documentationUrl = "netscaleradc";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        required: true
      },
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
        default: "",
        required: true,
        typeOptions: {
          password: true
        }
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-NITRO-USER": "={{$credentials.username}}",
          "X-NITRO-PASS": "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/nitro/v1/config/nspartition?view=summary"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NetscalerAdcApi
});
//# sourceMappingURL=NetscalerAdcApi.credentials.js.map