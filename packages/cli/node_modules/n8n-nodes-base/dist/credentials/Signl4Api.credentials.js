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
var Signl4Api_credentials_exports = {};
__export(Signl4Api_credentials_exports, {
  Signl4Api: () => Signl4Api
});
module.exports = __toCommonJS(Signl4Api_credentials_exports);
class Signl4Api {
  constructor() {
    this.name = "signl4Api";
    this.displayName = "SIGNL4 Webhook";
    this.documentationUrl = "signl4";
    this.properties = [
      {
        displayName: "Team Secret",
        name: "teamSecret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "The team secret is the last part of your SIGNL4 webhook URL"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Signl4Api
});
//# sourceMappingURL=Signl4Api.credentials.js.map