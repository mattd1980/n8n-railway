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
var HubspotAppToken_credentials_exports = {};
__export(HubspotAppToken_credentials_exports, {
  HubspotAppToken: () => HubspotAppToken
});
module.exports = __toCommonJS(HubspotAppToken_credentials_exports);
class HubspotAppToken {
  constructor() {
    this.name = "hubspotAppToken";
    this.displayName = "HubSpot App Token";
    this.documentationUrl = "hubspot";
    this.properties = [
      {
        displayName: "APP Token",
        name: "appToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.appToken}}"
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
  HubspotAppToken
});
//# sourceMappingURL=HubspotAppToken.credentials.js.map