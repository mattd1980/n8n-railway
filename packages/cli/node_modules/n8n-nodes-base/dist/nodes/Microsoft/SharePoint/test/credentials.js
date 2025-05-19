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
var credentials_exports = {};
__export(credentials_exports, {
  credentials: () => credentials
});
module.exports = __toCommonJS(credentials_exports);
const credentials = {
  microsoftSharePointOAuth2Api: {
    grantType: "authorizationCode",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    accessTokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    scope: "openid offline_access https://mydomain.sharepoint.com/.default",
    authQueryParameters: "response_mode=query",
    authentication: "body",
    oauthTokenData: {
      token_type: "Bearer",
      scope: "https://mydomain.sharepoint.com/Sites.Manage.All https://mydomain.sharepoint.com/Sites.Read.All https://mydomain.sharepoint.com/Sites.ReadWrite.All https://mydomain.sharepoint.com/Sites.Selected https://mydomain.sharepoint.com/User.Read https://mydomain.sharepoint.com/.default",
      expires_in: 4763,
      ext_expires_in: 4763,
      access_token: "ACCESSTOKEN",
      refresh_token: "REFRESHTOKEN",
      id_token: "IDTOKEN",
      callbackQueryString: {
        session_state: "SESSIONSTATE"
      }
    },
    subdomain: "mydomain",
    baseUrl: "https://mydomain.sharepoint.com/_api/v2.0"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  credentials
});
//# sourceMappingURL=credentials.js.map