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
var CiscoMerakiApi_credentials_exports = {};
__export(CiscoMerakiApi_credentials_exports, {
  CiscoMerakiApi: () => CiscoMerakiApi
});
module.exports = __toCommonJS(CiscoMerakiApi_credentials_exports);
class CiscoMerakiApi {
  constructor() {
    this.name = "ciscoMerakiApi";
    this.displayName = "Cisco Meraki API";
    this.documentationUrl = "ciscomeraki";
    this.icon = { light: "file:icons/Cisco.svg", dark: "file:icons/Cisco.dark.svg" };
    this.httpRequestNode = {
      name: "Cisco Meraki",
      docsUrl: "https://developer.cisco.com/meraki/api/",
      apiBaseUrl: "https://api.meraki.com/api/v1/"
    };
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        required: true,
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Cisco-Meraki-API-Key": "={{$credentials.apiKey}}"
        }
      }
    };
  }
  // test: ICredentialTestRequest = {
  // 	request: {
  // 		baseURL: 'https://api.meraki.com/api/v1',
  // 		url: '/organizations',
  // 	},
  // };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CiscoMerakiApi
});
//# sourceMappingURL=CiscoMerakiApi.credentials.js.map