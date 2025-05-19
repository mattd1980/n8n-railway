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
var MailjetEmailApi_credentials_exports = {};
__export(MailjetEmailApi_credentials_exports, {
  MailjetEmailApi: () => MailjetEmailApi
});
module.exports = __toCommonJS(MailjetEmailApi_credentials_exports);
class MailjetEmailApi {
  constructor() {
    this.name = "mailjetEmailApi";
    this.displayName = "Mailjet Email API";
    this.documentationUrl = "mailjet";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Secret Key",
        name: "secretKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Sandbox Mode",
        name: "sandboxMode",
        type: "boolean",
        default: false,
        description: "Whether to allow to run the API call in a Sandbox mode, where all validations of the payload will be done without delivering the message"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.apiKey}}",
          password: "={{$credentials.secretKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.mailjet.com",
        url: "/v3/REST/template",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailjetEmailApi
});
//# sourceMappingURL=MailjetEmailApi.credentials.js.map