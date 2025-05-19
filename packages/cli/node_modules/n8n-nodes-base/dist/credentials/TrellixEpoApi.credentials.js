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
var TrellixEpoApi_credentials_exports = {};
__export(TrellixEpoApi_credentials_exports, {
  TrellixEpoApi: () => TrellixEpoApi
});
module.exports = __toCommonJS(TrellixEpoApi_credentials_exports);
class TrellixEpoApi {
  constructor() {
    this.name = "trellixEpoApi";
    this.displayName = "Trellix (McAfee) ePolicy Orchestrator API";
    this.documentationUrl = "trellixepo";
    this.icon = "file:icons/Trellix.svg";
    this.httpRequestNode = {
      name: "Trellix (McAfee) ePolicy Orchestrator",
      docsUrl: "https://docs.trellix.com/en/bundle/epolicy-orchestrator-web-api-reference-guide",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
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
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TrellixEpoApi
});
//# sourceMappingURL=TrellixEpoApi.credentials.js.map