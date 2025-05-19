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
var Smtp_credentials_exports = {};
__export(Smtp_credentials_exports, {
  Smtp: () => Smtp
});
module.exports = __toCommonJS(Smtp_credentials_exports);
class Smtp {
  constructor() {
    this.name = "smtp";
    this.displayName = "SMTP";
    this.documentationUrl = "sendemail";
    this.properties = [
      {
        displayName: "User",
        name: "user",
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
      },
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: ""
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 465
      },
      {
        displayName: "SSL/TLS",
        name: "secure",
        type: "boolean",
        default: true
      },
      {
        displayName: "Disable STARTTLS",
        name: "disableStartTls",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            secure: [false]
          }
        }
      },
      {
        displayName: "Client Host Name",
        name: "hostName",
        type: "string",
        default: "",
        placeholder: "",
        description: "The hostname of the client, used for identifying to the server"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Smtp
});
//# sourceMappingURL=Smtp.credentials.js.map