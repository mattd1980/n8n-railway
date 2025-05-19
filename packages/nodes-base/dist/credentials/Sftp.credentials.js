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
var Sftp_credentials_exports = {};
__export(Sftp_credentials_exports, {
  Sftp: () => Sftp
});
module.exports = __toCommonJS(Sftp_credentials_exports);
class Sftp {
  constructor() {
    this.name = "sftp";
    this.displayName = "SFTP";
    this.documentationUrl = "ftp";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        required: true,
        type: "string",
        default: ""
      },
      {
        displayName: "Port",
        name: "port",
        required: true,
        type: "number",
        default: 22
      },
      {
        displayName: "Username",
        name: "username",
        required: true,
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
        displayName: "Private Key",
        name: "privateKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "String that contains a private key for either key-based or hostbased user authentication (OpenSSH format)"
      },
      {
        displayName: "Passphrase",
        name: "passphrase",
        typeOptions: {
          password: true
        },
        type: "string",
        default: "",
        description: "For an encrypted private key, this is the passphrase used to decrypt it"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sftp
});
//# sourceMappingURL=Sftp.credentials.js.map