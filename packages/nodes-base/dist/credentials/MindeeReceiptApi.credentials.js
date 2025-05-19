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
var MindeeReceiptApi_credentials_exports = {};
__export(MindeeReceiptApi_credentials_exports, {
  MindeeReceiptApi: () => MindeeReceiptApi
});
module.exports = __toCommonJS(MindeeReceiptApi_credentials_exports);
class MindeeReceiptApi {
  constructor() {
    this.name = "mindeeReceiptApi";
    this.displayName = "Mindee Receipt API";
    this.documentationUrl = "mindee";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
  async authenticate(credentials, requestOptions) {
    const url = new URL(requestOptions.url ? requestOptions.url : requestOptions.uri);
    if (url.hostname === "api.mindee.net" && url.pathname.startsWith("/v1/")) {
      requestOptions.headers.Authorization = `Token ${credentials.apiKey}`;
    } else {
      requestOptions.headers["X-Inferuser-Token"] = `${credentials.apiKey}`;
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MindeeReceiptApi
});
//# sourceMappingURL=MindeeReceiptApi.credentials.js.map