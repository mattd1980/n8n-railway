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
var TelegramApi_credentials_exports = {};
__export(TelegramApi_credentials_exports, {
  TelegramApi: () => TelegramApi
});
module.exports = __toCommonJS(TelegramApi_credentials_exports);
class TelegramApi {
  constructor() {
    this.name = "telegramApi";
    this.displayName = "Telegram API";
    this.documentationUrl = "telegram";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: 'Chat with the <a href="https://telegram.me/botfather">bot father</a> to obtain the access token'
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "https://api.telegram.org",
        description: "Base URL for Telegram Bot API"
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.baseUrl}}/bot{{$credentials.accessToken}}",
        url: "/getMe"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TelegramApi
});
//# sourceMappingURL=TelegramApi.credentials.js.map