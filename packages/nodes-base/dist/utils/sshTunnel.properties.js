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
var sshTunnel_properties_exports = {};
__export(sshTunnel_properties_exports, {
  sshTunnelProperties: () => sshTunnelProperties
});
module.exports = __toCommonJS(sshTunnel_properties_exports);
const sshTunnelProperties = [
  {
    displayName: "SSH Tunnel",
    name: "sshTunnel",
    type: "boolean",
    default: false
  },
  {
    displayName: "SSH Authenticate with",
    name: "sshAuthenticateWith",
    type: "options",
    default: "password",
    options: [
      {
        name: "Password",
        value: "password"
      },
      {
        name: "Private Key",
        value: "privateKey"
      }
    ],
    displayOptions: {
      show: {
        sshTunnel: [true]
      }
    }
  },
  {
    displayName: "SSH Host",
    name: "sshHost",
    type: "string",
    default: "localhost",
    displayOptions: {
      show: {
        sshTunnel: [true]
      }
    }
  },
  {
    displayName: "SSH Port",
    name: "sshPort",
    type: "number",
    default: 22,
    displayOptions: {
      show: {
        sshTunnel: [true]
      }
    }
  },
  {
    displayName: "SSH User",
    name: "sshUser",
    type: "string",
    default: "root",
    displayOptions: {
      show: {
        sshTunnel: [true]
      }
    }
  },
  {
    displayName: "SSH Password",
    name: "sshPassword",
    type: "string",
    typeOptions: {
      password: true
    },
    default: "",
    displayOptions: {
      show: {
        sshTunnel: [true],
        sshAuthenticateWith: ["password"]
      }
    }
  },
  {
    displayName: "Private Key",
    name: "privateKey",
    // TODO: Rename to sshPrivateKey
    type: "string",
    typeOptions: {
      rows: 4,
      password: true
    },
    default: "",
    displayOptions: {
      show: {
        sshTunnel: [true],
        sshAuthenticateWith: ["privateKey"]
      }
    }
  },
  {
    displayName: "Passphrase",
    name: "passphrase",
    // TODO: Rename to sshPassphrase
    type: "string",
    default: "",
    description: "Passphrase used to create the key, if no passphrase was used leave empty",
    displayOptions: {
      show: {
        sshTunnel: [true],
        sshAuthenticateWith: ["privateKey"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sshTunnelProperties
});
//# sourceMappingURL=sshTunnel.properties.js.map