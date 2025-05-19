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
var NextCloudApi_credentials_exports = {};
__export(NextCloudApi_credentials_exports, {
  NextCloudApi: () => NextCloudApi
});
module.exports = __toCommonJS(NextCloudApi_credentials_exports);
class NextCloudApi {
  constructor() {
    this.name = "nextCloudApi";
    this.displayName = "NextCloud API";
    this.documentationUrl = "nextCloud";
    this.properties = [
      {
        displayName: "Web DAV URL",
        name: "webDavUrl",
        type: "string",
        placeholder: "https://nextcloud.example.com/remote.php/webdav",
        default: ""
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.webDavUrl.replace('/remote.php/webdav', '')}}",
        url: "/ocs/v1.php/cloud/capabilities",
        headers: { "OCS-APIRequest": true }
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    requestOptions.auth = {
      username: credentials.user,
      password: credentials.password
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NextCloudApi
});
//# sourceMappingURL=NextCloudApi.credentials.js.map