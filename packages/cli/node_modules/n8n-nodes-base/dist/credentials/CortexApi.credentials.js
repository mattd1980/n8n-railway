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
var CortexApi_credentials_exports = {};
__export(CortexApi_credentials_exports, {
  CortexApi: () => CortexApi
});
module.exports = __toCommonJS(CortexApi_credentials_exports);
class CortexApi {
  constructor() {
    this.name = "cortexApi";
    this.displayName = "Cortex API";
    this.documentationUrl = "cortex";
    this.properties = [
      {
        displayName: "API Key",
        name: "cortexApiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Cortex Instance",
        name: "host",
        type: "string",
        description: "The URL of the Cortex instance",
        default: "",
        placeholder: "https://localhost:9001"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.cortexApiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.host}}",
        url: "/api/analyzer"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CortexApi
});
//# sourceMappingURL=CortexApi.credentials.js.map