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
var SshPrivateKey_credentials_exports = {};
__export(SshPrivateKey_credentials_exports, {
  SshPrivateKey: () => SshPrivateKey
});
module.exports = __toCommonJS(SshPrivateKey_credentials_exports);
class SshPrivateKey {
  constructor() {
    this.name = "sshPrivateKey";
    this.displayName = "SSH Private Key";
    this.documentationUrl = "ssh";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        required: true,
        type: "string",
        default: "",
        placeholder: "localhost"
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
        type: "string",
        default: ""
      },
      {
        displayName: "Private Key",
        name: "privateKey",
        type: "string",
        typeOptions: {
          rows: 4,
          password: true
        },
        default: ""
      },
      {
        displayName: "Passphrase",
        name: "passphrase",
        type: "string",
        default: "",
        description: "Passphase used to create the key, if no passphase was used leave empty",
        typeOptions: { password: true }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SshPrivateKey
});
//# sourceMappingURL=SshPrivateKey.credentials.js.map