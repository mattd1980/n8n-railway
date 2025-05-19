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
var DropboxApi_credentials_exports = {};
__export(DropboxApi_credentials_exports, {
  DropboxApi: () => DropboxApi
});
module.exports = __toCommonJS(DropboxApi_credentials_exports);
class DropboxApi {
  constructor() {
    this.name = "dropboxApi";
    this.displayName = "Dropbox API";
    this.documentationUrl = "dropbox";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "APP Access Type",
        name: "accessType",
        type: "options",
        options: [
          {
            name: "App Folder",
            value: "folder"
          },
          {
            name: "Full Dropbox",
            value: "full"
          }
        ],
        default: "full"
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
        baseURL: "https://api.dropboxapi.com/2",
        url: "/users/get_current_account",
        method: "POST"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropboxApi
});
//# sourceMappingURL=DropboxApi.credentials.js.map