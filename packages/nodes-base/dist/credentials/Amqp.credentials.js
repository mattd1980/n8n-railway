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
var Amqp_credentials_exports = {};
__export(Amqp_credentials_exports, {
  Amqp: () => Amqp
});
module.exports = __toCommonJS(Amqp_credentials_exports);
class Amqp {
  constructor() {
    this.name = "amqp";
    this.displayName = "AMQP";
    this.documentationUrl = "amqp";
    this.properties = [
      {
        displayName: "Hostname",
        name: "hostname",
        type: "string",
        placeholder: "e.g. localhost",
        default: ""
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
        placeholder: "e.g. guest",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        placeholder: "e.g. guest",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Transport Type",
        name: "transportType",
        type: "string",
        placeholder: "e.g. tcp",
        default: "",
        hint: "Optional transport type to use, either tcp or tls"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Amqp
});
//# sourceMappingURL=Amqp.credentials.js.map