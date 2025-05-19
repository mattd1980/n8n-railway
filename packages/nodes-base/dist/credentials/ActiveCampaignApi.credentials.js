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
var ActiveCampaignApi_credentials_exports = {};
__export(ActiveCampaignApi_credentials_exports, {
  ActiveCampaignApi: () => ActiveCampaignApi
});
module.exports = __toCommonJS(ActiveCampaignApi_credentials_exports);
class ActiveCampaignApi {
  constructor() {
    this.name = "activeCampaignApi";
    this.displayName = "ActiveCampaign API";
    this.documentationUrl = "activeCampaign";
    this.properties = [
      {
        displayName: "API URL",
        name: "apiUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "Api-Token": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.apiUrl}}",
        url: "/api/3/fields"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActiveCampaignApi
});
//# sourceMappingURL=ActiveCampaignApi.credentials.js.map