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
var MySql_credentials_exports = {};
__export(MySql_credentials_exports, {
  MySql: () => MySql
});
module.exports = __toCommonJS(MySql_credentials_exports);
var import_sshTunnel = require("../utils/sshTunnel.properties");
class MySql {
  constructor() {
    this.name = "mySql";
    this.displayName = "MySQL";
    this.documentationUrl = "mySql";
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
        default: "mysql"
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: "mysql"
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
        default: 3306
      },
      {
        displayName: "Connect Timeout",
        name: "connectTimeout",
        type: "number",
        default: 1e4,
        description: "The milliseconds before a timeout occurs during the initial connection to the MySQL server"
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "boolean",
        default: false
      },
      {
        displayName: "CA Certificate",
        name: "caCertificate",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true]
          }
        },
        type: "string",
        default: ""
      },
      {
        displayName: "Client Private Key",
        name: "clientPrivateKey",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true]
          }
        },
        type: "string",
        default: ""
      },
      {
        displayName: "Client Certificate",
        name: "clientCertificate",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true]
          }
        },
        type: "string",
        default: ""
      },
      ...import_sshTunnel.sshTunnelProperties
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MySql
});
//# sourceMappingURL=MySql.credentials.js.map