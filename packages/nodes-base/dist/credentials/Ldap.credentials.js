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
var Ldap_credentials_exports = {};
__export(Ldap_credentials_exports, {
  Ldap: () => Ldap
});
module.exports = __toCommonJS(Ldap_credentials_exports);
class Ldap {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-name-unsuffixed
    this.name = "ldap";
    this.displayName = "LDAP";
    this.documentationUrl = "ldap";
    this.properties = [
      {
        displayName: "LDAP Server Address",
        name: "hostname",
        type: "string",
        default: "",
        required: true,
        description: "IP or domain of the LDAP server"
      },
      {
        displayName: "LDAP Server Port",
        name: "port",
        type: "string",
        default: "389",
        description: "Port used to connect to the LDAP server"
      },
      {
        displayName: "Binding DN",
        name: "bindDN",
        type: "string",
        default: "",
        description: "Distinguished Name of the user to connect as"
      },
      {
        displayName: "Binding Password",
        name: "bindPassword",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        description: "Password of the user provided in the Binding DN field above"
      },
      {
        displayName: "Connection Security",
        name: "connectionSecurity",
        type: "options",
        default: "none",
        options: [
          {
            name: "None",
            value: "none"
          },
          {
            name: "TLS",
            value: "tls"
          },
          {
            name: "STARTTLS",
            value: "startTls"
          }
        ]
      },
      {
        displayName: "Ignore SSL/TLS Issues",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL/TLS certificate validation is not possible",
        default: false,
        displayOptions: {
          hide: {
            connectionSecurity: ["none"]
          }
        }
      },
      {
        displayName: "CA Certificate",
        name: "caCertificate",
        typeOptions: {
          alwaysOpenEditWindow: true
        },
        displayOptions: {
          hide: {
            connectionSecurity: ["none"]
          }
        },
        type: "string",
        default: ""
      },
      {
        displayName: "Timeout",
        description: "Optional connection timeout in seconds",
        name: "timeout",
        type: "number",
        default: 300
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ldap
});
//# sourceMappingURL=Ldap.credentials.js.map