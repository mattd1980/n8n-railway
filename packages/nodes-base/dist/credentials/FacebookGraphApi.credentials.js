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
var FacebookGraphApi_credentials_exports = {};
__export(FacebookGraphApi_credentials_exports, {
  FacebookGraphApi: () => FacebookGraphApi
});
module.exports = __toCommonJS(FacebookGraphApi_credentials_exports);
class FacebookGraphApi {
  constructor() {
    this.name = "facebookGraphApi";
    this.displayName = "Facebook Graph API";
    this.documentationUrl = "facebookgraph";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        qs: {
          access_token: "={{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://graph.facebook.com/v8.0",
        url: "/me"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacebookGraphApi
});
//# sourceMappingURL=FacebookGraphApi.credentials.js.map