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
var TrelloApi_credentials_exports = {};
__export(TrelloApi_credentials_exports, {
  TrelloApi: () => TrelloApi
});
module.exports = __toCommonJS(TrelloApi_credentials_exports);
class TrelloApi {
  constructor() {
    this.name = "trelloApi";
    this.displayName = "Trello API";
    this.documentationUrl = "trello";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      },
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      },
      {
        displayName: "OAuth Secret",
        name: "oauthSecret",
        type: "hidden",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://api.trello.com",
        url: "=/1/tokens/{{$credentials.apiToken}}/member"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.qs = {
      ...requestOptions.qs,
      key: credentials.apiKey,
      token: credentials.apiToken
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TrelloApi
});
//# sourceMappingURL=TrelloApi.credentials.js.map