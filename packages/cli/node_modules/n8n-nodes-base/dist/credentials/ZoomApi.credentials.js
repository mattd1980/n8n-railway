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
var ZoomApi_credentials_exports = {};
__export(ZoomApi_credentials_exports, {
  ZoomApi: () => ZoomApi
});
module.exports = __toCommonJS(ZoomApi_credentials_exports);
class ZoomApi {
  constructor() {
    this.name = "zoomApi";
    this.displayName = "Zoom API";
    this.documentationUrl = "zoom";
    this.properties = [
      {
        displayName: 'On 1 June, 2023 Zoom will remove JWT App support. You will have to connect to Zoom using the Oauth2 auth method. <a target="_blank" href="https://marketplace.zoom.us/docs/guides/build/jwt-app/jwt-faq/">More details (zoom.us)</a>',
        name: "notice",
        type: "notice",
        default: ""
      },
      {
        displayName: "JWT Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
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
        baseURL: "https://api.zoom.us/v2",
        url: "/users/me"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZoomApi
});
//# sourceMappingURL=ZoomApi.credentials.js.map