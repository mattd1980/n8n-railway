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
var GongApi_credentials_exports = {};
__export(GongApi_credentials_exports, {
  GongApi: () => GongApi
});
module.exports = __toCommonJS(GongApi_credentials_exports);
class GongApi {
  constructor() {
    this.name = "gongApi";
    this.displayName = "Gong API";
    this.documentationUrl = "gong";
    this.properties = [
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "https://api.gong.io"
      },
      {
        displayName: "Access Key",
        name: "accessKey",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Access Key Secret",
        name: "accessKeySecret",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{ $credentials.accessKey }}",
          password: "={{ $credentials.accessKeySecret }}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
        url: "/v2/users"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GongApi
});
//# sourceMappingURL=GongApi.credentials.js.map