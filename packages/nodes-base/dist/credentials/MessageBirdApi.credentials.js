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
var MessageBirdApi_credentials_exports = {};
__export(MessageBirdApi_credentials_exports, {
  MessageBirdApi: () => MessageBirdApi
});
module.exports = __toCommonJS(MessageBirdApi_credentials_exports);
class MessageBirdApi {
  constructor() {
    this.name = "messageBirdApi";
    this.displayName = "MessageBird API";
    this.documentationUrl = "messageBird";
    this.properties = [
      {
        displayName: "API Key",
        name: "accessKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageBirdApi
});
//# sourceMappingURL=MessageBirdApi.credentials.js.map