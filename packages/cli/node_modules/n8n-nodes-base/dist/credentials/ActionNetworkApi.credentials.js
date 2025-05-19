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
var ActionNetworkApi_credentials_exports = {};
__export(ActionNetworkApi_credentials_exports, {
  ActionNetworkApi: () => ActionNetworkApi
});
module.exports = __toCommonJS(ActionNetworkApi_credentials_exports);
class ActionNetworkApi {
  constructor() {
    this.name = "actionNetworkApi";
    this.displayName = "Action Network API";
    this.documentationUrl = "actionNetwork";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "https://actionnetwork.org/api/v2",
        url: "/events?per_page=1"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.headers = { "OSDI-API-Token": credentials.apiKey };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionNetworkApi
});
//# sourceMappingURL=ActionNetworkApi.credentials.js.map