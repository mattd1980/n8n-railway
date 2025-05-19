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
var RocketchatApi_credentials_exports = {};
__export(RocketchatApi_credentials_exports, {
  RocketchatApi: () => RocketchatApi
});
module.exports = __toCommonJS(RocketchatApi_credentials_exports);
class RocketchatApi {
  constructor() {
    this.name = "rocketchatApi";
    this.displayName = "Rocket API";
    this.documentationUrl = "rocketchat";
    this.properties = [
      {
        displayName: "User ID",
        name: "userId",
        type: "string",
        default: ""
      },
      {
        displayName: "Auth Key",
        name: "authKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://n8n.rocket.chat"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Auth-Token": "={{$credentials.authKey}}",
          "X-User-Id": "={{$credentials.userId}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.domain}}",
        url: "/api/v1/webdav.getMyAccounts"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RocketchatApi
});
//# sourceMappingURL=RocketchatApi.credentials.js.map