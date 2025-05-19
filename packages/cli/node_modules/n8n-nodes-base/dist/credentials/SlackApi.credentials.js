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
var SlackApi_credentials_exports = {};
__export(SlackApi_credentials_exports, {
  SlackApi: () => SlackApi
});
module.exports = __toCommonJS(SlackApi_credentials_exports);
class SlackApi {
  constructor() {
    this.name = "slackApi";
    this.displayName = "Slack API";
    this.documentationUrl = "slack";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://slack.com",
        url: "/api/users.profile.get"
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "error",
            value: "invalid_auth",
            message: "Invalid access token"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlackApi
});
//# sourceMappingURL=SlackApi.credentials.js.map