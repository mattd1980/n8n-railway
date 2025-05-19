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
var SekoiaApi_credentials_exports = {};
__export(SekoiaApi_credentials_exports, {
  SekoiaApi: () => SekoiaApi
});
module.exports = __toCommonJS(SekoiaApi_credentials_exports);
class SekoiaApi {
  constructor() {
    this.name = "sekoiaApi";
    this.displayName = "Sekoia API";
    this.icon = "file:icons/Sekoia.svg";
    this.documentationUrl = "sekoia";
    this.httpRequestNode = {
      name: "Sekoia",
      docsUrl: "https://docs.sekoia.io/cti/features/integrations/api/",
      apiBaseUrl: "https://api.sekoia.io/"
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
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
  SekoiaApi
});
//# sourceMappingURL=SekoiaApi.credentials.js.map