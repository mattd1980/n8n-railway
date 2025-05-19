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
var HybridAnalysisApi_credentials_exports = {};
__export(HybridAnalysisApi_credentials_exports, {
  HybridAnalysisApi: () => HybridAnalysisApi
});
module.exports = __toCommonJS(HybridAnalysisApi_credentials_exports);
class HybridAnalysisApi {
  constructor() {
    this.name = "hybridAnalysisApi";
    this.displayName = "Hybrid Analysis API";
    this.documentationUrl = "hybridanalysis";
    this.icon = "file:icons/Hybrid.png";
    this.httpRequestNode = {
      name: "Hybrid Analysis",
      docsUrl: "https://www.hybrid-analysis.com/docs/api/v2",
      apiBaseUrl: "https://www.hybrid-analysis.com/api/"
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
          "api-key": "={{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HybridAnalysisApi
});
//# sourceMappingURL=HybridAnalysisApi.credentials.js.map