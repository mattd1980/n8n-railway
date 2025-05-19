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
var MailerLiteApi_credentials_exports = {};
__export(MailerLiteApi_credentials_exports, {
  MailerLiteApi: () => MailerLiteApi
});
module.exports = __toCommonJS(MailerLiteApi_credentials_exports);
class MailerLiteApi {
  constructor() {
    this.name = "mailerLiteApi";
    this.displayName = "Mailer Lite API";
    this.documentationUrl = "mailerLite";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Classic API",
        name: "classicApi",
        type: "boolean",
        default: true,
        description: "If the Classic API should be used, If this is your first time using this node this should be false."
      }
    ];
    this.test = {
      request: {
        baseURL: '={{$credentials.classicApi ? "https://api.mailerlite.com/api/v2" : "https://connect.mailerlite.com/api"}}',
        url: "/groups"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    if (credentials.classicApi === true) {
      requestOptions.headers = {
        "X-MailerLite-ApiKey": credentials.apiKey
      };
    } else {
      requestOptions.headers = {
        Authorization: `Bearer ${credentials.apiKey}`
      };
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailerLiteApi
});
//# sourceMappingURL=MailerLiteApi.credentials.js.map