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
var RabbitMQ_credentials_exports = {};
__export(RabbitMQ_credentials_exports, {
  RabbitMQ: () => RabbitMQ
});
module.exports = __toCommonJS(RabbitMQ_credentials_exports);
class RabbitMQ {
  constructor() {
    this.name = "rabbitmq";
    this.displayName = "RabbitMQ";
    this.documentationUrl = "rabbitmq";
    this.properties = [
      {
        displayName: "Hostname",
        name: "hostname",
        type: "string",
        default: "",
        placeholder: "localhost"
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 5672
      },
      {
        displayName: "User",
        name: "username",
        type: "string",
        default: "",
        placeholder: "guest"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        placeholder: "guest"
      },
      {
        displayName: "Vhost",
        name: "vhost",
        type: "string",
        default: "/"
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "boolean",
        default: false
      },
      {
        displayName: "Passwordless",
        name: "passwordless",
        type: "boolean",
        displayOptions: {
          show: {
            ssl: [true]
          }
        },
        default: true,
        description: "Whether to use passwordless connection with certificates (SASL mechanism EXTERNAL)"
      },
      {
        displayName: "CA Certificates",
        name: "ca",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true]
          }
        },
        default: "",
        description: "SSL CA Certificates to use"
      },
      {
        displayName: "Client Certificate",
        name: "cert",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true],
            passwordless: [true]
          }
        },
        default: "",
        description: "SSL Client Certificate to use"
      },
      {
        displayName: "Client Key",
        name: "key",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true],
            passwordless: [true]
          }
        },
        default: "",
        description: "SSL Client Key to use"
      },
      {
        displayName: "Passphrase",
        name: "passphrase",
        type: "string",
        typeOptions: {
          password: true
        },
        displayOptions: {
          show: {
            ssl: [true],
            passwordless: [true]
          }
        },
        default: "",
        description: "SSL passphrase to use"
      }
      // {
      // 	displayName: 'Client ID',
      // 	name: 'clientId',
      // 	type: 'string',
      // 	default: '',
      // 	placeholder: 'my-app',
      // },
      // {
      // 	displayName: 'Brokers',
      // 	name: 'brokers',
      // 	type: 'string',
      // 	default: '',
      // 	placeholder: 'kafka1:9092,kafka2:9092',
      // },
      // {
      // 	displayName: 'Username',
      // 	name: 'username',
      // 	type: 'string',
      // 	default: '',
      // 	description: 'Optional username if authenticated is required.',
      // },
      // {
      // 	displayName: 'Password',
      // 	name: 'password',
      // 	type: 'string',
      // 	typeOptions: {
      // 		password: true,
      // 	},
      // 	default: '',
      // 	description: 'Optional password if authenticated is required.',
      // },
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RabbitMQ
});
//# sourceMappingURL=RabbitMQ.credentials.js.map