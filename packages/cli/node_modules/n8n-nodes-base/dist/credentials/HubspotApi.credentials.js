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
var HubspotApi_credentials_exports = {};
__export(HubspotApi_credentials_exports, {
  HubspotApi: () => HubspotApi
});
module.exports = __toCommonJS(HubspotApi_credentials_exports);
class HubspotApi {
  constructor() {
    this.name = "hubspotApi";
    this.displayName = "HubSpot API";
    this.documentationUrl = "hubspot";
    this.properties = [
      {
        displayName: 'On 30 November, 2022 Hubspot will remove API key support. You will have to connect to HubSpot using private app or Oauth2 auth method. <a target="_blank" href="https://developers.hubspot.com/changelog/upcoming-api-key-sunset">More details (HubSpot.com)</a>',
        name: "notice",
        type: "notice",
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
        qs: {
          hapikey: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.hubapi.com",
        url: "/account-info/v3/details"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HubspotApi
});
//# sourceMappingURL=HubspotApi.credentials.js.map