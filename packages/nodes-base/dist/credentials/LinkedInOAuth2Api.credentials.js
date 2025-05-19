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
var LinkedInOAuth2Api_credentials_exports = {};
__export(LinkedInOAuth2Api_credentials_exports, {
  LinkedInOAuth2Api: () => LinkedInOAuth2Api
});
module.exports = __toCommonJS(LinkedInOAuth2Api_credentials_exports);
class LinkedInOAuth2Api {
  constructor() {
    this.name = "linkedInOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "LinkedIn OAuth2 API";
    this.documentationUrl = "linkedIn";
    this.properties = [
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Organization Support",
        name: "organizationSupport",
        type: "boolean",
        default: true,
        description: "Whether to request permissions to post as an organization"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://www.linkedin.com/oauth/v2/authorization",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://www.linkedin.com/oauth/v2/accessToken",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: '=w_member_social{{$self["organizationSupport"] === true ? ",w_organization_social": $self["legacy"] === true ? ",r_liteprofile,r_emailaddress" : ",profile,email,openid"}}',
        description: 'Standard scopes for posting on behalf of a user or organization. See <a href="https://docs.microsoft.com/en-us/linkedin/marketing/getting-started#available-permissions"> this resource </a>.'
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: ""
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "body"
      },
      {
        displayName: "Legacy",
        name: "legacy",
        type: "boolean",
        default: true,
        description: "Whether to use the legacy API"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkedInOAuth2Api
});
//# sourceMappingURL=LinkedInOAuth2Api.credentials.js.map