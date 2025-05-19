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
var MailjetSmsApi_credentials_exports = {};
__export(MailjetSmsApi_credentials_exports, {
  MailjetSmsApi: () => MailjetSmsApi
});
module.exports = __toCommonJS(MailjetSmsApi_credentials_exports);
class MailjetSmsApi {
  constructor() {
    this.name = "mailjetSmsApi";
    this.displayName = "Mailjet SMS API";
    this.documentationUrl = "mailjet";
    this.properties = [
      {
        displayName: "Token",
        name: "token",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.token}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.mailjet.com",
        url: "/v4/sms",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailjetSmsApi
});
//# sourceMappingURL=MailjetSmsApi.credentials.js.map