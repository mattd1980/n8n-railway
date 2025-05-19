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
  azureStorageOAuth2Api: {
    grantType: "authorizationCode",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    accessTokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "CLIENTID",
    clientSecret: "CLIENTSECRET",
    scope: "https://storage.azure.com/user_impersonation",
    authQueryParameters: "response_mode=query",
    authentication: "body",
    oauthTokenData: {
      token_type: "Bearer",
      scope: "https://storage.azure.com/user_impersonation",
      expires_in: 4730,
      ext_expires_in: 4730,
      access_token: "ACCESSTOKEN",
      callbackQueryString: {
        session_state: "SESSIONSTATE"
      }
    },
    account: "myaccount",
    baseUrl: "https://myaccount.blob.core.windows.net"
  },
  azureStorageSharedKeyApi: {
    account: "devstoreaccount1",
    key: "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==",
    baseUrl: "https://myaccount.blob.core.windows.net"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  credentials
});
//# sourceMappingURL=credentials.js.map