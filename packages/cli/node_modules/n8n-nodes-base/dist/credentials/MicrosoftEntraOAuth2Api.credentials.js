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
var MicrosoftEntraOAuth2Api_credentials_exports = {};
__export(MicrosoftEntraOAuth2Api_credentials_exports, {
  MicrosoftEntraOAuth2Api: () => MicrosoftEntraOAuth2Api
});
module.exports = __toCommonJS(MicrosoftEntraOAuth2Api_credentials_exports);
const defaultScopes = [
  "openid",
  "offline_access",
  "AccessReview.ReadWrite.All",
  "Directory.ReadWrite.All",
  "NetworkAccessPolicy.ReadWrite.All",
  "DelegatedAdminRelationship.ReadWrite.All",
  "EntitlementManagement.ReadWrite.All",
  "User.ReadWrite.All",
  "Directory.AccessAsUser.All",
  "Sites.FullControl.All",
  "GroupMember.ReadWrite.All"
];
class MicrosoftEntraOAuth2Api {
  constructor() {
    this.name = "microsoftEntraOAuth2Api";
    this.displayName = "Microsoft Entra ID (Azure Active Directory) API";
    this.extends = ["microsoftOAuth2Api"];
    this.documentationUrl = "microsoftentra";
    this.properties = [
      {
        displayName: "Custom Scopes",
        name: "customScopes",
        type: "boolean",
        default: false,
        description: "Define custom scopes"
      },
      {
        displayName: "The default scopes needed for the node to work are already set, If you change these the node may not function correctly.",
        name: "customScopesNotice",
        type: "notice",
        default: "",
        displayOptions: {
          show: {
            customScopes: [true]
          }
        }
      },
      {
        displayName: "Enabled Scopes",
        name: "enabledScopes",
        type: "string",
        displayOptions: {
          show: {
            customScopes: [true]
          }
        },
        default: defaultScopes.join(" "),
        description: "Scopes that should be enabled"
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        // Sites.FullControl.All required to update user specific properties https://github.com/microsoftgraph/msgraph-sdk-dotnet/issues/1316
        default: '={{$self["customScopes"] ? $self["enabledScopes"] : "' + defaultScopes.join(" ") + '"}}'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftEntraOAuth2Api
});
//# sourceMappingURL=MicrosoftEntraOAuth2Api.credentials.js.map