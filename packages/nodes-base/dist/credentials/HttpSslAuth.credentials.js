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
var HttpSslAuth_credentials_exports = {};
__export(HttpSslAuth_credentials_exports, {
  HttpSslAuth: () => HttpSslAuth
});
module.exports = __toCommonJS(HttpSslAuth_credentials_exports);
class HttpSslAuth {
  constructor() {
    this.name = "httpSslAuth";
    this.displayName = "SSL Certificates";
    this.documentationUrl = "httpRequest";
    this.icon = "node:n8n-nodes-base.httpRequest";
    this.properties = [
      {
        displayName: "CA",
        name: "ca",
        type: "string",
        description: "Certificate Authority certificate",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Certificate",
        name: "cert",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Private Key",
        name: "key",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Passphrase",
        name: "passphrase",
        type: "string",
        description: "Optional passphrase for the private key, if the private key is encrypted",
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
  HttpSslAuth
});
//# sourceMappingURL=HttpSslAuth.credentials.js.map