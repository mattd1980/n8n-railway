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
var JenkinsApi_credentials_exports = {};
__export(JenkinsApi_credentials_exports, {
  JenkinsApi: () => JenkinsApi
});
module.exports = __toCommonJS(JenkinsApi_credentials_exports);
class JenkinsApi {
  constructor() {
    this.name = "jenkinsApi";
    this.displayName = "Jenkins API";
    this.documentationUrl = "jenkins";
    this.properties = [
      {
        displayName: "Jenkins Username",
        name: "username",
        type: "string",
        default: ""
      },
      {
        displayName: "Personal API Token",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Jenkins Instance URL",
        name: "baseUrl",
        type: "string",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JenkinsApi
});
//# sourceMappingURL=JenkinsApi.credentials.js.map