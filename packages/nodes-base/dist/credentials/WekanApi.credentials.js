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
var WekanApi_credentials_exports = {};
__export(WekanApi_credentials_exports, {
  WekanApi: () => WekanApi
});
module.exports = __toCommonJS(WekanApi_credentials_exports);
class WekanApi {
  constructor() {
    this.name = "wekanApi";
    this.displayName = "Wekan API";
    this.documentationUrl = "wekan";
    this.properties = [
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
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://wekan.yourdomain.com"
      },
      {
        displayName: "Session Token",
        name: "token",
        type: "hidden",
        typeOptions: {
          expirable: true
        },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.token}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
        url: "/api/user"
      }
    };
  }
  async preAuthentication(credentials) {
    const url = credentials.url;
    const { token } = await this.helpers.httpRequest({
      method: "POST",
      url: `${url.endsWith("/") ? url.slice(0, -1) : url}/users/login`,
      body: {
        username: credentials.username,
        password: credentials.password
      }
    });
    return { token };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WekanApi
});
//# sourceMappingURL=WekanApi.credentials.js.map