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
var DiscordWebhookApi_credentials_exports = {};
__export(DiscordWebhookApi_credentials_exports, {
  DiscordWebhookApi: () => DiscordWebhookApi
});
module.exports = __toCommonJS(DiscordWebhookApi_credentials_exports);
class DiscordWebhookApi {
  constructor() {
    this.name = "discordWebhookApi";
    this.displayName = "Discord Webhook";
    this.documentationUrl = "discord";
    this.properties = [
      {
        displayName: "Webhook URL",
        name: "webhookUri",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://discord.com/api/webhooks/ID/TOKEN",
        typeOptions: {
          password: true
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordWebhookApi
});
//# sourceMappingURL=DiscordWebhookApi.credentials.js.map