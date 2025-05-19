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
var MistApi_credentials_exports = {};
__export(MistApi_credentials_exports, {
  MistApi: () => MistApi
});
module.exports = __toCommonJS(MistApi_credentials_exports);
class MistApi {
  constructor() {
    this.name = "mistApi";
    this.displayName = "Mist API";
    this.icon = "file:icons/Mist.svg";
    this.documentationUrl = "mist";
    this.httpRequestNode = {
      name: "Mist",
      docsUrl: "https://www.mist.com/documentation/mist-api-introduction/",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "API Token",
        name: "token",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      },
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: [
          {
            name: "Europe",
            value: "eu"
          },
          {
            name: "Global",
            value: "global"
          }
        ],
        default: "eu"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Token {{$credentials.token}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '=https://api{{$credentials.region === "eu" ? ".eu" : ""}}.mist.com',
        url: "/api/v1/self",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MistApi
});
//# sourceMappingURL=MistApi.credentials.js.map