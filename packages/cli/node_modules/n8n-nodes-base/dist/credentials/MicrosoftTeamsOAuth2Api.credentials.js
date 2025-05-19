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
var MicrosoftTeamsOAuth2Api_credentials_exports = {};
__export(MicrosoftTeamsOAuth2Api_credentials_exports, {
  MicrosoftTeamsOAuth2Api: () => MicrosoftTeamsOAuth2Api
});
module.exports = __toCommonJS(MicrosoftTeamsOAuth2Api_credentials_exports);
class MicrosoftTeamsOAuth2Api {
  constructor() {
    this.name = "microsoftTeamsOAuth2Api";
    this.extends = ["microsoftOAuth2Api"];
    this.displayName = "Microsoft Teams OAuth2 API";
    this.documentationUrl = "microsoft";
    this.properties = [
      //https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "openid offline_access User.ReadWrite.All Group.ReadWrite.All Chat.ReadWrite"
      },
      {
        displayName: `
      Microsoft Teams Trigger requires the following permissions:
      <br><code>ChannelMessage.Read.All</code>
      <br><code>Chat.Read.All</code>
      <br><code>Team.ReadBasic.All</code>
      <br><code>Subscription.ReadWrite.All</code>
      <br>Configure these permissions in <a href="https://portal.azure.com">Microsoft Entra</a>
    `,
        name: "notice",
        type: "notice",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftTeamsOAuth2Api
});
//# sourceMappingURL=MicrosoftTeamsOAuth2Api.credentials.js.map