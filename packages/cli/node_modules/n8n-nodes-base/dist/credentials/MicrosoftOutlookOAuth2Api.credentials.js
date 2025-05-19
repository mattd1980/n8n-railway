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
var MicrosoftOutlookOAuth2Api_credentials_exports = {};
__export(MicrosoftOutlookOAuth2Api_credentials_exports, {
  MicrosoftOutlookOAuth2Api: () => MicrosoftOutlookOAuth2Api
});
module.exports = __toCommonJS(MicrosoftOutlookOAuth2Api_credentials_exports);
const scopes = [
  "openid",
  "offline_access",
  "Contacts.Read",
  "Contacts.ReadWrite",
  "Calendars.Read",
  "Calendars.Read.Shared",
  "Calendars.ReadWrite",
  "Mail.ReadWrite",
  "Mail.ReadWrite.Shared",
  "Mail.Send",
  "Mail.Send.Shared",
  "MailboxSettings.Read"
];
class MicrosoftOutlookOAuth2Api {
  constructor() {
    this.name = "microsoftOutlookOAuth2Api";
    this.extends = ["microsoftOAuth2Api"];
    this.displayName = "Microsoft Outlook OAuth2 API";
    this.documentationUrl = "microsoft";
    this.properties = [
      //https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: scopes.join(" ")
      },
      {
        displayName: "Use Shared Mailbox",
        name: "useShared",
        type: "boolean",
        default: false
      },
      {
        displayName: "User Principal Name",
        name: "userPrincipalName",
        description: "Target user's UPN or ID",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            useShared: [true]
          }
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOutlookOAuth2Api
});
//# sourceMappingURL=MicrosoftOutlookOAuth2Api.credentials.js.map