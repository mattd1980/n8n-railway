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
var QRadarApi_credentials_exports = {};
__export(QRadarApi_credentials_exports, {
  QRadarApi: () => QRadarApi
});
module.exports = __toCommonJS(QRadarApi_credentials_exports);
class QRadarApi {
  constructor() {
    this.name = "qRadarApi";
    this.displayName = "QRadar API";
    this.icon = { light: "file:icons/IBM.svg", dark: "file:icons/IBM.dark.svg" };
    this.documentationUrl = "qradar";
    this.httpRequestNode = {
      name: "QRadar",
      docsUrl: "https://www.ibm.com/docs/en/qradar-common",
      apiBaseUrl: ""
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
          SEC: "={{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QRadarApi
});
//# sourceMappingURL=QRadarApi.credentials.js.map