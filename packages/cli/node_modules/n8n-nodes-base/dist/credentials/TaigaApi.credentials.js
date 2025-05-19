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
var TaigaApi_credentials_exports = {};
__export(TaigaApi_credentials_exports, {
  TaigaApi: () => TaigaApi
});
module.exports = __toCommonJS(TaigaApi_credentials_exports);
class TaigaApi {
  constructor() {
    this.name = "taigaApi";
    this.displayName = "Taiga API";
    this.documentationUrl = "taiga";
    this.properties = [
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "cloud",
        options: [
          {
            name: "Cloud",
            value: "cloud"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://taiga.yourdomain.com",
        displayOptions: {
          show: {
            environment: ["selfHosted"]
          }
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaigaApi
});
//# sourceMappingURL=TaigaApi.credentials.js.map