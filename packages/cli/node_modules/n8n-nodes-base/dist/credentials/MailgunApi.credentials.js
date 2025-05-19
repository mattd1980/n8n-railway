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
var MailgunApi_credentials_exports = {};
__export(MailgunApi_credentials_exports, {
  MailgunApi: () => MailgunApi
});
module.exports = __toCommonJS(MailgunApi_credentials_exports);
class MailgunApi {
  constructor() {
    this.name = "mailgunApi";
    this.displayName = "Mailgun API";
    this.documentationUrl = "mailgun";
    this.properties = [
      {
        displayName: "API Domain",
        name: "apiDomain",
        type: "options",
        options: [
          {
            name: "api.eu.mailgun.net",
            value: "api.eu.mailgun.net"
          },
          {
            name: "api.mailgun.net",
            value: "api.mailgun.net"
          }
        ],
        default: "api.mailgun.net",
        description: "The configured mailgun API domain"
      },
      {
        displayName: "Email Domain",
        name: "emailDomain",
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
        auth: {
          username: "api",
          password: "={{$credentials.apiKey}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "=https://{{$credentials.apiDomain}}/v3",
        url: "/domains"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailgunApi
});
//# sourceMappingURL=MailgunApi.credentials.js.map