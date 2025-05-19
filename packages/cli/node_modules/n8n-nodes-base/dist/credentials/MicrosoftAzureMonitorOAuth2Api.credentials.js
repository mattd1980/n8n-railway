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
var MicrosoftAzureMonitorOAuth2Api_credentials_exports = {};
__export(MicrosoftAzureMonitorOAuth2Api_credentials_exports, {
  MicrosoftAzureMonitorOAuth2Api: () => MicrosoftAzureMonitorOAuth2Api
});
module.exports = __toCommonJS(MicrosoftAzureMonitorOAuth2Api_credentials_exports);
class MicrosoftAzureMonitorOAuth2Api {
  constructor() {
    this.name = "microsoftAzureMonitorOAuth2Api";
    this.displayName = "Microsoft Azure Monitor OAuth2 API";
    this.extends = ["oAuth2Api"];
    this.documentationUrl = "microsoftazuremonitor";
    this.icon = "file:icons/Microsoft.svg";
    this.httpRequestNode = {
      name: "Microsoft Azure Monitor",
      docsUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/api/request-format",
      apiBaseUrlPlaceholder: "https://api.loganalytics.azure.com/v1/workspaces/[workspace_id]/query"
    };
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "options",
        options: [
          {
            name: "Authorization Code",
            value: "authorizationCode"
          },
          {
            name: "Client Credentials",
            value: "clientCredentials"
          }
        ],
        default: "authorizationCode"
      },
      {
        displayName: "Tenant ID",
        required: true,
        name: "tenantId",
        type: "string",
        default: ""
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "Azure Log Analytics",
            value: "https://api.loganalytics.azure.com"
          },
          {
            name: "Log Analytics",
            value: "https://api.loganalytics.io"
          },
          {
            name: "Azure Monitor",
            value: "https://monitor.azure.com"
          },
          {
            name: "Azure Management",
            value: "https://management.azure.com"
          }
        ],
        default: "https://api.loganalytics.azure.com"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: '=https://login.microsoftonline.com/{{$self["tenantId"]}}/oauth2/authorize'
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: '=https://login.microsoftonline.com/{{$self["tenantId"]}}/oauth2/{{$self["grantType"] === "clientCredentials" ? "v2.0/" : ""}}token'
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: '={{$self["grantType"] === "clientCredentials" ? "" : "resource=" + $self["resource"]}}'
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: '={{$self["grantType"] === "clientCredentials" ? $self["resource"] + "/.default" : ""}}'
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftAzureMonitorOAuth2Api
});
//# sourceMappingURL=MicrosoftAzureMonitorOAuth2Api.credentials.js.map