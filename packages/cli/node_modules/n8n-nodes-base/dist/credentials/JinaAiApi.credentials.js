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
var JinaAiApi_credentials_exports = {};
__export(JinaAiApi_credentials_exports, {
  JinaAiApi: () => JinaAiApi
});
module.exports = __toCommonJS(JinaAiApi_credentials_exports);
class JinaAiApi {
  constructor() {
    this.name = "jinaAiApi";
    this.displayName = "Jina AI API";
    this.documentationUrl = "jinaAi";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{ $credentials?.apiKey }}"
        }
      }
    };
    this.test = {
      request: {
        method: "GET",
        url: "https://embeddings-dashboard-api.jina.ai/api/v1/api_key/fe_user",
        qs: {
          api_key: "={{$credentials.apiKey}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JinaAiApi
});
//# sourceMappingURL=JinaAiApi.credentials.js.map