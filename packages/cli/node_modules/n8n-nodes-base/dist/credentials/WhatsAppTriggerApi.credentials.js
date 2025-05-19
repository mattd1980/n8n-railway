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
var WhatsAppTriggerApi_credentials_exports = {};
__export(WhatsAppTriggerApi_credentials_exports, {
  WhatsAppTriggerApi: () => WhatsAppTriggerApi
});
module.exports = __toCommonJS(WhatsAppTriggerApi_credentials_exports);
class WhatsAppTriggerApi {
  constructor() {
    this.name = "whatsAppTriggerApi";
    this.displayName = "WhatsApp OAuth API";
    this.documentationUrl = "whatsApp";
    this.properties = [
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true
      }
    ];
    this.test = {
      request: {
        method: "POST",
        baseURL: "https://graph.facebook.com/v19.0/oauth/access_token",
        body: {
          client_id: "={{$credentials.clientId}}",
          client_secret: "={{$credentials.clientSecret}}",
          grant_type: "client_credentials"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsAppTriggerApi
});
//# sourceMappingURL=WhatsAppTriggerApi.credentials.js.map