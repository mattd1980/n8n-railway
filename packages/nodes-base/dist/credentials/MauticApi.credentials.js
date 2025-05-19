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
var MauticApi_credentials_exports = {};
__export(MauticApi_credentials_exports, {
  MauticApi: () => MauticApi
});
module.exports = __toCommonJS(MauticApi_credentials_exports);
class MauticApi {
  constructor() {
    this.name = "mauticApi";
    this.displayName = "Mautic API";
    this.documentationUrl = "mautic";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://name.mautic.net"
      },
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
        typeOptions: {
          password: true
        },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
        url: "/api/users/self"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MauticApi
});
//# sourceMappingURL=MauticApi.credentials.js.map