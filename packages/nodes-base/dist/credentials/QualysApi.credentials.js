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
var QualysApi_credentials_exports = {};
__export(QualysApi_credentials_exports, {
  QualysApi: () => QualysApi
});
module.exports = __toCommonJS(QualysApi_credentials_exports);
class QualysApi {
  constructor() {
    this.name = "qualysApi";
    this.displayName = "Qualys API";
    this.icon = "file:icons/Qualys.svg";
    this.documentationUrl = "qualys";
    this.httpRequestNode = {
      name: "Qualys",
      docsUrl: "https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/api_doc/index.htm",
      apiBaseUrl: "https://qualysapi.qualys.com/api/"
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
      },
      {
        displayName: "Requested With",
        name: "requestedWith",
        type: "string",
        default: "n8n application",
        description: "User description, like a user agent"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Requested-With": "={{$credentials.requestedWith}}"
        },
        auth: {
          username: "={{$credentials.username}}",
          password: "={{$credentials.password}}"
        }
      }
    };
  }
  // test: ICredentialTestRequest = {
  // 	request: {
  // 		baseURL: 'https://qualysapi.qualys.com',
  // 		url: '/api/2.0/fo/asset/host/?action=list',
  // 	},
  // };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QualysApi
});
//# sourceMappingURL=QualysApi.credentials.js.map