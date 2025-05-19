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
var HttpHeaderAuth_credentials_exports = {};
__export(HttpHeaderAuth_credentials_exports, {
  HttpHeaderAuth: () => HttpHeaderAuth
});
module.exports = __toCommonJS(HttpHeaderAuth_credentials_exports);
class HttpHeaderAuth {
  constructor() {
    this.name = "httpHeaderAuth";
    this.displayName = "Header Auth";
    this.documentationUrl = "httpRequest";
    this.genericAuth = true;
    this.icon = "node:n8n-nodes-base.httpRequest";
    this.properties = [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: 'To send multiple headers, use a "Custom Auth" credential instead',
        name: "useCustomAuth",
        type: "notice",
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          "={{$credentials.name}}": "={{$credentials.value}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpHeaderAuth
});
//# sourceMappingURL=HttpHeaderAuth.credentials.js.map