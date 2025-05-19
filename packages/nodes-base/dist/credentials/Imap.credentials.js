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
var Imap_credentials_exports = {};
__export(Imap_credentials_exports, {
  Imap: () => Imap,
  isCredentialsDataImap: () => isCredentialsDataImap
});
module.exports = __toCommonJS(Imap_credentials_exports);
class Imap {
  constructor() {
    this.name = "imap";
    this.displayName = "IMAP";
    this.documentationUrl = "imap";
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
        default: 993
      },
      {
        displayName: "SSL/TLS",
        name: "secure",
        type: "boolean",
        default: true
      },
      {
        displayName: "Allow Self-Signed Certificates",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
  }
}
function isCredentialsDataImap(candidate) {
  const o = candidate;
  return o.host !== void 0 && o.password !== void 0 && o.port !== void 0 && o.secure !== void 0 && o.user !== void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Imap,
  isCredentialsDataImap
});
//# sourceMappingURL=Imap.credentials.js.map