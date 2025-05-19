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
var TwakeCloudApi_credentials_exports = {};
__export(TwakeCloudApi_credentials_exports, {
  TwakeCloudApi: () => TwakeCloudApi
});
module.exports = __toCommonJS(TwakeCloudApi_credentials_exports);
class TwakeCloudApi {
  constructor() {
    this.name = "twakeCloudApi";
    this.displayName = "Twake Cloud API";
    this.documentationUrl = "twake";
    this.properties = [
      {
        displayName: "Workspace Key",
        name: "workspaceKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.workspaceKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://plugins.twake.app/plugins/n8n",
        url: "/channel",
        method: "POST"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TwakeCloudApi
});
//# sourceMappingURL=TwakeCloudApi.credentials.js.map