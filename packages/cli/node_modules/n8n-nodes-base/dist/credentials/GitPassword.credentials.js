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
var GitPassword_credentials_exports = {};
__export(GitPassword_credentials_exports, {
  GitPassword: () => GitPassword
});
module.exports = __toCommonJS(GitPassword_credentials_exports);
class GitPassword {
  constructor() {
    this.name = "gitPassword";
    this.displayName = "Git";
    this.documentationUrl = "git";
    this.properties = [
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        description: "The username to authenticate with"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        description: "The password to use in combination with the user"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GitPassword
});
//# sourceMappingURL=GitPassword.credentials.js.map