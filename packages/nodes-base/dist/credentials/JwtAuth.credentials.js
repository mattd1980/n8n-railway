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
var JwtAuth_credentials_exports = {};
__export(JwtAuth_credentials_exports, {
  JwtAuth: () => JwtAuth
});
module.exports = __toCommonJS(JwtAuth_credentials_exports);
const algorithms = [
  {
    name: "HS256",
    value: "HS256"
  },
  {
    name: "HS384",
    value: "HS384"
  },
  {
    name: "HS512",
    value: "HS512"
  },
  {
    name: "RS256",
    value: "RS256"
  },
  {
    name: "RS384",
    value: "RS384"
  },
  {
    name: "RS512",
    value: "RS512"
  },
  {
    name: "ES256",
    value: "ES256"
  },
  {
    name: "ES384",
    value: "ES384"
  },
  {
    name: "ES512",
    value: "ES512"
  },
  {
    name: "PS256",
    value: "PS256"
  },
  {
    name: "PS384",
    value: "PS384"
  },
  {
    name: "PS512",
    value: "PS512"
  },
  {
    name: "none",
    value: "none"
  }
];
class JwtAuth {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-name-unsuffixed
    this.name = "jwtAuth";
    this.displayName = "JWT Auth";
    this.documentationUrl = "jwt";
    this.icon = "file:icons/jwt.svg";
    this.properties = [
      {
        displayName: "Key Type",
        name: "keyType",
        type: "options",
        description: "Choose either the secret passphrase or PEM encoded public keys",
        options: [
          {
            name: "Passphrase",
            value: "passphrase"
          },
          {
            name: "PEM Key",
            value: "pemKey"
          }
        ],
        default: "passphrase"
      },
      {
        displayName: "Secret",
        name: "secret",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        displayOptions: {
          show: {
            keyType: ["passphrase"]
          }
        }
      },
      {
        displayName: "Private Key",
        name: "privateKey",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            keyType: ["pemKey"]
          }
        },
        default: ""
      },
      {
        displayName: "Public Key",
        name: "publicKey",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            keyType: ["pemKey"]
          }
        },
        default: ""
      },
      {
        displayName: "Algorithm",
        name: "algorithm",
        type: "options",
        default: "HS256",
        options: algorithms
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JwtAuth
});
//# sourceMappingURL=JwtAuth.credentials.js.map