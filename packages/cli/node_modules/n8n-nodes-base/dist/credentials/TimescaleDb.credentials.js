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
var TimescaleDb_credentials_exports = {};
__export(TimescaleDb_credentials_exports, {
  TimescaleDb: () => TimescaleDb
});
module.exports = __toCommonJS(TimescaleDb_credentials_exports);
class TimescaleDb {
  constructor() {
    this.name = "timescaleDb";
    this.displayName = "TimescaleDB";
    this.documentationUrl = "timescaleDb";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "localhost"
      },
      {
        displayName: "Database",
        name: "database",
        type: "string",
        default: "postgres"
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: "postgres"
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
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        default: false,
        description: "Whether to connect even if SSL certificate validation is not possible"
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "options",
        displayOptions: {
          show: {
            allowUnauthorizedCerts: [false]
          }
        },
        options: [
          {
            name: "Allow",
            value: "allow"
          },
          {
            name: "Disable",
            value: "disable"
          },
          {
            name: "Require",
            value: "require"
          }
        ],
        default: "disable"
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 5432
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimescaleDb
});
//# sourceMappingURL=TimescaleDb.credentials.js.map