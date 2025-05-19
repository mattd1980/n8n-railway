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
var BeeminderApi_credentials_exports = {};
__export(BeeminderApi_credentials_exports, {
  BeeminderApi: () => BeeminderApi
});
module.exports = __toCommonJS(BeeminderApi_credentials_exports);
class BeeminderApi {
  constructor() {
    this.name = "beeminderApi";
    this.displayName = "Beeminder API";
    this.documentationUrl = "beeminder";
    this.properties = [
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: ""
      },
      {
        displayName: "Auth Token",
        name: "authToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        body: {
          auth_token: "={{$credentials.authToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://www.beeminder.com/api/v1",
        url: "=/users/{{$credentials.user}}.json"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BeeminderApi
});
//# sourceMappingURL=BeeminderApi.credentials.js.map