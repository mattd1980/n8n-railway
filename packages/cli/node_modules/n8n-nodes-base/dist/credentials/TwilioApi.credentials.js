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
var TwilioApi_credentials_exports = {};
__export(TwilioApi_credentials_exports, {
  TwilioApi: () => TwilioApi
});
module.exports = __toCommonJS(TwilioApi_credentials_exports);
class TwilioApi {
  constructor() {
    this.name = "twilioApi";
    this.displayName = "Twilio API";
    this.documentationUrl = "twilio";
    this.properties = [
      {
        displayName: "Auth Type",
        name: "authType",
        type: "options",
        default: "authToken",
        options: [
          {
            name: "Auth Token",
            value: "authToken"
          },
          {
            name: "API Key",
            value: "apiKey"
          }
        ]
      },
      {
        displayName: "Account SID",
        name: "accountSid",
        type: "string",
        default: ""
      },
      {
        displayName: "Auth Token",
        name: "authToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        displayOptions: {
          show: {
            authType: ["authToken"]
          }
        }
      },
      {
        displayName: "API Key SID",
        name: "apiKeySid",
        type: "string",
        typeOptions: { password: true },
        default: "",
        displayOptions: {
          show: {
            authType: ["apiKey"]
          }
        }
      },
      {
        displayName: "API Key Secret",
        name: "apiKeySecret",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        displayOptions: {
          show: {
            authType: ["apiKey"]
          }
        }
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: '={{ $credentials.authType === "apiKey" ? $credentials.apiKeySid : $credentials.accountSid }}',
          password: '={{ $credentials.authType === "apiKey" ? $credentials.apiKeySecret : $credentials.authToken }}'
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TwilioApi
});
//# sourceMappingURL=TwilioApi.credentials.js.map