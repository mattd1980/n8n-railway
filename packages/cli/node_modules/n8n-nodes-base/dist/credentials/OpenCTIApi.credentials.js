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
var OpenCTIApi_credentials_exports = {};
__export(OpenCTIApi_credentials_exports, {
  OpenCTIApi: () => OpenCTIApi
});
module.exports = __toCommonJS(OpenCTIApi_credentials_exports);
class OpenCTIApi {
  constructor() {
    this.name = "openCtiApi";
    this.displayName = "OpenCTI API";
    this.documentationUrl = "opencti";
    this.icon = "file:icons/OpenCTI.png";
    this.httpRequestNode = {
      name: "OpenCTI",
      docsUrl: "https://docs.opencti.io/latest/deployment/integrations/?h=api#graphql-api",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OpenCTIApi
});
//# sourceMappingURL=OpenCTIApi.credentials.js.map