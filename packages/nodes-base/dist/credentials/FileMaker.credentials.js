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
var FileMaker_credentials_exports = {};
__export(FileMaker_credentials_exports, {
  FileMaker: () => FileMaker
});
module.exports = __toCommonJS(FileMaker_credentials_exports);
class FileMaker {
  constructor() {
    this.name = "fileMaker";
    this.displayName = "FileMaker API";
    this.documentationUrl = "fileMaker";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: ""
      },
      {
        displayName: "Database",
        name: "db",
        type: "string",
        default: ""
      },
      {
        displayName: "Login",
        name: "login",
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
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileMaker
});
//# sourceMappingURL=FileMaker.credentials.js.map