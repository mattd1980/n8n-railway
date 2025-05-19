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
var Sms77Api_credentials_exports = {};
__export(Sms77Api_credentials_exports, {
  Sms77Api: () => Sms77Api
});
module.exports = __toCommonJS(Sms77Api_credentials_exports);
class Sms77Api {
  constructor() {
    this.name = "sms77Api";
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-miscased
    this.displayName = "seven API";
    this.documentationUrl = "sms77";
    this.properties = [
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
          "X-Api-Key": "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://gateway.seven.io/api",
        url: "/hooks",
        qs: {
          action: "read"
        }
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "success",
            message: "Invalid API Key",
            value: void 0
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sms77Api
});
//# sourceMappingURL=Sms77Api.credentials.js.map