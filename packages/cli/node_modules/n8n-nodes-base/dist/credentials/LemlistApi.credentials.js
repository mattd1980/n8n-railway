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
var LemlistApi_credentials_exports = {};
__export(LemlistApi_credentials_exports, {
  LemlistApi: () => LemlistApi
});
module.exports = __toCommonJS(LemlistApi_credentials_exports);
class LemlistApi {
  constructor() {
    this.name = "lemlistApi";
    this.displayName = "Lemlist API";
    this.documentationUrl = "lemlist";
    this.properties = [
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
        baseURL: "https://api.lemlist.com/api",
        url: "/campaigns"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const encodedApiKey = Buffer.from(":" + credentials.apiKey).toString("base64");
    requestOptions.headers.Authorization = `Basic ${encodedApiKey}`;
    requestOptions.headers["user-agent"] = "n8n";
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LemlistApi
});
//# sourceMappingURL=LemlistApi.credentials.js.map