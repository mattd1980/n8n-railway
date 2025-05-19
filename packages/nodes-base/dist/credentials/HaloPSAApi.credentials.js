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
var HaloPSAApi_credentials_exports = {};
__export(HaloPSAApi_credentials_exports, {
  HaloPSAApi: () => HaloPSAApi
});
module.exports = __toCommonJS(HaloPSAApi_credentials_exports);
class HaloPSAApi {
  constructor() {
    this.name = "haloPSAApi";
    this.displayName = "HaloPSA API";
    this.documentationUrl = "halopsa";
    this.properties = [
      {
        displayName: "Hosting Type",
        name: "hostingType",
        type: "options",
        options: [
          {
            name: "On-Premise Solution",
            value: "onPremise"
          },
          {
            name: "Hosted Solution Of Halo",
            value: "hostedHalo"
          }
        ],
        default: "onPremise"
      },
      {
        displayName: "HaloPSA Authorisation Server URL",
        name: "authUrl",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Resource Server",
        name: "resourceApiUrl",
        type: "string",
        default: "",
        required: true,
        description: 'The Resource server is available at your "Halo Web Application URL/api"'
      },
      {
        displayName: "Client ID",
        name: "client_id",
        type: "string",
        default: "",
        required: true,
        description: "Must be your application client ID"
      },
      {
        displayName: "Client Secret",
        name: "client_secret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true,
        description: "Must be your application client secret"
      },
      {
        displayName: "Tenant",
        name: "tenant",
        type: "string",
        displayOptions: {
          show: {
            hostingType: ["hostedHalo"]
          }
        },
        default: "",
        description: "An additional tenant parameter for HaloPSA hosted solution"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "admin edit:tickets edit:customers",
        required: true
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HaloPSAApi
});
//# sourceMappingURL=HaloPSAApi.credentials.js.map