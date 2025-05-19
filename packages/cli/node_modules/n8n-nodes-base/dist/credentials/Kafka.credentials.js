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
var Kafka_credentials_exports = {};
__export(Kafka_credentials_exports, {
  Kafka: () => Kafka
});
module.exports = __toCommonJS(Kafka_credentials_exports);
class Kafka {
  constructor() {
    this.name = "kafka";
    this.displayName = "Kafka";
    this.documentationUrl = "kafka";
    this.properties = [
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        placeholder: "my-app",
        hint: 'Will not affect the connection, but will be used to identify the client in the Kafka server logs. Read more <a href="https://kafka.apache.org/documentation/#design_quotasgroups">here</a>'
      },
      {
        displayName: "Brokers",
        name: "brokers",
        type: "string",
        default: "",
        placeholder: "kafka1:9092,kafka2:9092"
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "boolean",
        default: true
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "boolean",
        default: false
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        displayOptions: {
          show: {
            authentication: [true]
          }
        },
        default: "",
        description: "Optional username if authenticated is required"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        displayOptions: {
          show: {
            authentication: [true]
          }
        },
        typeOptions: {
          password: true
        },
        default: "",
        description: "Optional password if authenticated is required"
      },
      {
        displayName: "SASL Mechanism",
        name: "saslMechanism",
        type: "options",
        displayOptions: {
          show: {
            authentication: [true]
          }
        },
        options: [
          {
            name: "Plain",
            value: "plain"
          },
          {
            name: "scram-sha-256",
            value: "scram-sha-256"
          },
          {
            name: "scram-sha-512",
            value: "scram-sha-512"
          }
        ],
        default: "plain"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Kafka
});
//# sourceMappingURL=Kafka.credentials.js.map