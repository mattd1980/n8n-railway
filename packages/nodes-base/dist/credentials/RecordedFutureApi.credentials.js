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
var RecordedFutureApi_credentials_exports = {};
__export(RecordedFutureApi_credentials_exports, {
  RecordedFutureApi: () => RecordedFutureApi
});
module.exports = __toCommonJS(RecordedFutureApi_credentials_exports);
class RecordedFutureApi {
  constructor() {
    this.name = "recordedFutureApi";
    this.displayName = "Recorded Future API";
    this.documentationUrl = "recordedfuture";
    this.icon = {
      light: "file:icons/RecordedFuture.svg",
      dark: "file:icons/RecordedFuture.dark.svg"
    };
    this.httpRequestNode = {
      name: "Recorded Future",
      docsUrl: "https://api.recordedfuture.com",
      apiBaseUrl: "https://api.recordedfuture.com/v2/"
    };
    this.properties = [
      {
        displayName: "Access Token",
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
          "X-RFToken": "={{$credentials.accessToken}}"
        }
      }
    };
  }
  // test: ICredentialTestRequest = {
  // 	request: {
  // 		baseURL: 'https://api.recordedfuture.com/v2',
  // 		url: '/alert/search?limit=1',
  // 	},
  // };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecordedFutureApi
});
//# sourceMappingURL=RecordedFutureApi.credentials.js.map