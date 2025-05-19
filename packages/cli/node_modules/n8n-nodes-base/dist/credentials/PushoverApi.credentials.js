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
var PushoverApi_credentials_exports = {};
__export(PushoverApi_credentials_exports, {
  PushoverApi: () => PushoverApi
});
module.exports = __toCommonJS(PushoverApi_credentials_exports);
class PushoverApi {
  constructor() {
    this.name = "pushoverApi";
    this.displayName = "Pushover API";
    this.documentationUrl = "pushover";
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
        baseURL: "https://api.pushover.net/1",
        url: "=/licenses.json?token={{$credentials?.apiKey}}",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    if (requestOptions.method === "GET" && requestOptions.qs) {
      Object.assign(requestOptions.qs, { token: credentials.apiKey });
    } else if (requestOptions.body) {
      Object.assign(requestOptions.body, { token: credentials.apiKey });
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PushoverApi
});
//# sourceMappingURL=PushoverApi.credentials.js.map