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
var DiscordOAuth2Api_credentials_exports = {};
__export(DiscordOAuth2Api_credentials_exports, {
  DiscordOAuth2Api: () => DiscordOAuth2Api
});
module.exports = __toCommonJS(DiscordOAuth2Api_credentials_exports);
class DiscordOAuth2Api {
  constructor() {
    this.name = "discordOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Discord OAuth2 API";
    this.documentationUrl = "discord";
    this.properties = [
      {
        displayName: "Bot Token",
        name: "botToken",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      },
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://discord.com/api/oauth2/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://discord.com/api/oauth2/token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "identify guilds guilds.join bot",
        required: true
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: "permissions=1642758929655"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordOAuth2Api
});
//# sourceMappingURL=DiscordOAuth2Api.credentials.js.map