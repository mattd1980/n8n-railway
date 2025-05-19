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
var HttpCustomAuth_credentials_exports = {};
__export(HttpCustomAuth_credentials_exports, {
  HttpCustomAuth: () => HttpCustomAuth
});
module.exports = __toCommonJS(HttpCustomAuth_credentials_exports);
class HttpCustomAuth {
  constructor() {
    this.name = "httpCustomAuth";
    this.displayName = "Custom Auth";
    this.documentationUrl = "httpRequest";
    this.genericAuth = true;
    this.icon = "node:n8n-nodes-base.httpRequest";
    this.properties = [
      {
        displayName: "JSON",
        name: "json",
        type: "json",
        required: true,
        description: "Use json to specify authentication values for headers, body and qs.",
        placeholder: '{ "headers": { "key" : "value" }, "body": { "key": "value" }, "qs": { "key": "value" } }',
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpCustomAuth
});
//# sourceMappingURL=HttpCustomAuth.credentials.js.map