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
var helpers_exports = {};
__export(helpers_exports, {
  getCredentialsType: () => getCredentialsType,
  requestApi: () => requestApi
});
module.exports = __toCommonJS(helpers_exports);
const getCredentialsType = (authentication) => {
  let credentialType = "";
  switch (authentication) {
    case "botToken":
      credentialType = "discordBotApi";
      break;
    case "oAuth2":
      credentialType = "discordOAuth2Api";
      break;
    case "webhook":
      credentialType = "discordWebhookApi";
      break;
    default:
      credentialType = "discordBotApi";
  }
  return credentialType;
};
async function requestApi(options, credentialType, endpoint) {
  let response;
  if (credentialType === "discordOAuth2Api" && endpoint !== "/users/@me/guilds") {
    const credentials = await this.getCredentials("discordOAuth2Api");
    options.headers.Authorization = `Bot ${credentials.botToken}`;
    response = await this.helpers.request({ ...options, resolveWithFullResponse: true });
  } else {
    response = await this.helpers.requestWithAuthentication.call(this, credentialType, {
      ...options,
      resolveWithFullResponse: true
    });
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCredentialsType,
  requestApi
});
//# sourceMappingURL=helpers.js.map