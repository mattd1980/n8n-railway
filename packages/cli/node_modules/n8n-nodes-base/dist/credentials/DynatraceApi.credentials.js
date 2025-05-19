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
var DynatraceApi_credentials_exports = {};
__export(DynatraceApi_credentials_exports, {
  DynatraceApi: () => DynatraceApi
});
module.exports = __toCommonJS(DynatraceApi_credentials_exports);
class DynatraceApi {
  constructor() {
    this.name = "dynatraceApi";
    this.displayName = "DynatraceAPI";
    this.documentationUrl = "dynatrace";
    this.icon = { light: "file:icons/Dynatrace.svg", dark: "file:icons/Dynatrace.svg" };
    this.httpRequestNode = {
      name: "Dynatrace",
      docsUrl: "https://docs.dynatrace.com/docs/dynatrace-api",
      apiBaseUrlPlaceholder: "https://{your-environment-id}.live.dynatrace.com/api/v2/events"
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Api-Token {{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynatraceApi
});
//# sourceMappingURL=DynatraceApi.credentials.js.map