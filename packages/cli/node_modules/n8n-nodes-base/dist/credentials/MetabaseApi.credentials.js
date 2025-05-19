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
var MetabaseApi_credentials_exports = {};
__export(MetabaseApi_credentials_exports, {
  MetabaseApi: () => MetabaseApi
});
module.exports = __toCommonJS(MetabaseApi_credentials_exports);
class MetabaseApi {
  constructor() {
    this.name = "metabaseApi";
    this.displayName = "Metabase API";
    this.documentationUrl = "metabase";
    this.properties = [
      {
        displayName: "Session Token",
        name: "sessionToken",
        type: "hidden",
        typeOptions: {
          expirable: true
        },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: ""
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "X-Metabase-Session": "={{$credentials.sessionToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials?.url}}",
        url: "/api/user/current"
      }
    };
  }
  // method will only be called if "sessionToken" (the expirable property)
  // is empty or is expired
  async preAuthentication(credentials) {
    const url = credentials.url;
    const { id } = await this.helpers.httpRequest({
      method: "POST",
      url: `${url.endsWith("/") ? url.slice(0, -1) : url}/api/session`,
      body: {
        username: credentials.username,
        password: credentials.password
      }
    });
    return { sessionToken: id };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MetabaseApi
});
//# sourceMappingURL=MetabaseApi.credentials.js.map