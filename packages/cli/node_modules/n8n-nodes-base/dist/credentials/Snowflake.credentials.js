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
var Snowflake_credentials_exports = {};
__export(Snowflake_credentials_exports, {
  Snowflake: () => Snowflake
});
module.exports = __toCommonJS(Snowflake_credentials_exports);
class Snowflake {
  constructor() {
    this.name = "snowflake";
    this.displayName = "Snowflake";
    this.documentationUrl = "snowflake";
    this.properties = [
      {
        displayName: "Account",
        name: "account",
        type: "string",
        default: "",
        description: "Enter the name of your Snowflake account"
      },
      {
        displayName: "Database",
        name: "database",
        type: "string",
        default: "",
        description: "Specify the database you want to use after creating the connection"
      },
      {
        displayName: "Warehouse",
        name: "warehouse",
        type: "string",
        default: "",
        description: "The default virtual warehouse to use for the session after connecting. Used for performing queries, loading data, etc."
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "options",
        options: [
          {
            name: "Password",
            value: "password"
          },
          {
            name: "Key-Pair",
            value: "keyPair"
          }
        ],
        default: "password",
        description: "The way to authenticate with Snowflake"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            authentication: ["password"]
          }
        }
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        displayOptions: {
          show: {
            authentication: ["password"]
          }
        }
      },
      {
        displayName: "Private Key",
        name: "privateKey",
        type: "string",
        typeOptions: {
          password: true,
          rows: 4
        },
        default: "",
        required: true,
        displayOptions: {
          show: {
            authentication: ["keyPair"]
          }
        },
        description: "Private PEM key for Key-pair authentication with Snowflake"
      },
      {
        displayName: "Schema",
        name: "schema",
        type: "string",
        default: "",
        description: "Enter the schema you want to use after creating the connection"
      },
      {
        displayName: "Role",
        name: "role",
        type: "string",
        default: "",
        description: "Enter the security role you want to use after creating the connection"
      },
      {
        displayName: "Client Session Keep Alive",
        name: "clientSessionKeepAlive",
        type: "boolean",
        default: false,
        description: "Whether to keep alive the client session. By default, client connections typically time out approximately 3-4 hours after the most recent query was executed. If the parameter clientSessionKeepAlive is set to true, the client\u2019s connection to the server will be kept alive indefinitely, even if no queries are executed."
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Snowflake
});
//# sourceMappingURL=Snowflake.credentials.js.map