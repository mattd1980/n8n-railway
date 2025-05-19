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
var MicrosoftSql_credentials_exports = {};
__export(MicrosoftSql_credentials_exports, {
  MicrosoftSql: () => MicrosoftSql
});
module.exports = __toCommonJS(MicrosoftSql_credentials_exports);
class MicrosoftSql {
  constructor() {
    this.name = "microsoftSql";
    this.displayName = "Microsoft SQL";
    this.documentationUrl = "microsoftSql";
    this.properties = [
      {
        displayName: "Server",
        name: "server",
        type: "string",
        default: "localhost"
      },
      {
        displayName: "Database",
        name: "database",
        type: "string",
        default: "master"
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: "sa"
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
        displayName: "Port",
        name: "port",
        type: "number",
        default: 1433
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: ""
      },
      {
        displayName: "TLS",
        name: "tls",
        type: "boolean",
        default: true
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        default: false,
        description: "Whether to connect even if SSL certificate validation is not possible"
      },
      {
        displayName: "Connect Timeout",
        name: "connectTimeout",
        type: "number",
        default: 15e3,
        description: "Connection timeout in ms"
      },
      {
        displayName: "Request Timeout",
        name: "requestTimeout",
        type: "number",
        default: 15e3,
        description: "Request timeout in ms"
      },
      {
        displayName: "TDS Version",
        name: "tdsVersion",
        type: "options",
        options: [
          {
            name: "7_4 (SQL Server 2012 ~ 2019)",
            value: "7_4"
          },
          {
            name: "7_3_B (SQL Server 2008R2)",
            value: "7_3_B"
          },
          {
            name: "7_3_A (SQL Server 2008)",
            value: "7_3_A"
          },
          {
            name: "7_2 (SQL Server 2005)",
            value: "7_2"
          },
          {
            name: "7_1 (SQL Server 2000)",
            value: "7_1"
          }
        ],
        default: "7_4",
        description: "The version of TDS to use. If server doesn't support specified version, negotiated version is used instead."
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftSql
});
//# sourceMappingURL=MicrosoftSql.credentials.js.map