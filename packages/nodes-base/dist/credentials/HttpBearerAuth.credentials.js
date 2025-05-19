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
var HttpBearerAuth_credentials_exports = {};
__export(HttpBearerAuth_credentials_exports, {
  HttpBearerAuth: () => HttpBearerAuth
});
module.exports = __toCommonJS(HttpBearerAuth_credentials_exports);
class HttpBearerAuth {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-name-unsuffixed
    this.name = "httpBearerAuth";
    this.displayName = "Bearer Auth";
    this.documentationUrl = "httpRequest";
    this.genericAuth = true;
    this.icon = "node:n8n-nodes-base.httpRequest";
    this.properties = [
      {
        displayName: "Bearer Token",
        name: "token",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: 'This credential uses the "Authorization" header. To use a custom header, use a "Custom Auth" credential instead',
        name: "useCustomAuth",
        type: "notice",
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "Bearer ={{$credentials.token}}"
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpBearerAuth
});
//# sourceMappingURL=HttpBearerAuth.credentials.js.map