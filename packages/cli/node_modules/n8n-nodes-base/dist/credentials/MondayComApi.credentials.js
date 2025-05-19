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
var MondayComApi_credentials_exports = {};
__export(MondayComApi_credentials_exports, {
  MondayComApi: () => MondayComApi
});
module.exports = __toCommonJS(MondayComApi_credentials_exports);
class MondayComApi {
  constructor() {
    this.name = "mondayComApi";
    this.displayName = "Monday.com API";
    this.documentationUrl = "mondayCom";
    this.properties = [
      {
        displayName: "Token V2",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiToken}}"
        }
      }
    };
    this.test = {
      request: {
        headers: {
          "API-Version": "2023-10",
          "Content-Type": "application/json"
        },
        baseURL: "https://api.monday.com/v2",
        method: "POST",
        body: JSON.stringify({
          query: "query { me { name }}"
        })
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MondayComApi
});
//# sourceMappingURL=MondayComApi.credentials.js.map