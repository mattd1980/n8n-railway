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
var CarbonBlackApi_credentials_exports = {};
__export(CarbonBlackApi_credentials_exports, {
  CarbonBlackApi: () => CarbonBlackApi
});
module.exports = __toCommonJS(CarbonBlackApi_credentials_exports);
class CarbonBlackApi {
  constructor() {
    this.name = "carbonBlackApi";
    this.displayName = "Carbon Black API";
    this.icon = { light: "file:icons/vmware.svg", dark: "file:icons/vmware.dark.svg" };
    this.documentationUrl = "carbonblack";
    this.httpRequestNode = {
      name: "Carbon Black",
      docsUrl: "https://developer.carbonblack.com/reference",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "URL",
        name: "apiUrl",
        type: "string",
        placeholder: "https://defense.conferdeploy.net/",
        default: ""
      },
      {
        displayName: "Access Token",
        name: "accessToken",
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
          "X-Auth-Token": "={{$credentials.accessToken}}"
        }
      }
    };
  }
  // test: ICredentialTestRequest = {
  // 	request: {
  // 		baseURL: '={{$credentials.apiUrl}}',
  // 		url: 'integrationServices/v3/auditlogs',
  // 	},
  // };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CarbonBlackApi
});
//# sourceMappingURL=CarbonBlackApi.credentials.js.map