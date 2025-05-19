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
var HomeAssistantApi_credentials_exports = {};
__export(HomeAssistantApi_credentials_exports, {
  HomeAssistantApi: () => HomeAssistantApi
});
module.exports = __toCommonJS(HomeAssistantApi_credentials_exports);
class HomeAssistantApi {
  constructor() {
    this.name = "homeAssistantApi";
    this.displayName = "Home Assistant API";
    this.documentationUrl = "homeAssistant";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: ""
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 8123
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "boolean",
        default: false
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HomeAssistantApi
});
//# sourceMappingURL=HomeAssistantApi.credentials.js.map