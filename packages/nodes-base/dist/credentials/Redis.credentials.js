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
var Redis_credentials_exports = {};
__export(Redis_credentials_exports, {
  Redis: () => Redis
});
module.exports = __toCommonJS(Redis_credentials_exports);
class Redis {
  constructor() {
    this.name = "redis";
    this.displayName = "Redis";
    this.documentationUrl = "redis";
    this.properties = [
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
        displayName: "User",
        name: "user",
        type: "string",
        default: "",
        hint: "Leave blank for password-only auth"
      },
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "localhost"
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 6379
      },
      {
        displayName: "Database Number",
        name: "database",
        type: "number",
        default: 0
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "boolean",
        default: false
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Redis
});
//# sourceMappingURL=Redis.credentials.js.map