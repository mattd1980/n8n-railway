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
var DiscordBotApi_credentials_exports = {};
__export(DiscordBotApi_credentials_exports, {
  DiscordBotApi: () => DiscordBotApi
});
module.exports = __toCommonJS(DiscordBotApi_credentials_exports);
class DiscordBotApi {
  constructor() {
    this.name = "discordBotApi";
    this.displayName = "Discord Bot API";
    this.documentationUrl = "discord";
    this.properties = [
      {
        displayName: "Bot Token",
        name: "botToken",
        type: "string",
        default: "",
        required: true,
        typeOptions: {
          password: true
        }
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bot {{$credentials.botToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://discord.com/api/v10/",
        url: "/users/@me/guilds"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordBotApi
});
//# sourceMappingURL=DiscordBotApi.credentials.js.map