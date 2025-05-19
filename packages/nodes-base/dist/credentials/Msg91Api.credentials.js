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
var Msg91Api_credentials_exports = {};
__export(Msg91Api_credentials_exports, {
  Msg91Api: () => Msg91Api
});
module.exports = __toCommonJS(Msg91Api_credentials_exports);
class Msg91Api {
  constructor() {
    this.name = "msg91Api";
    this.displayName = "Msg91 Api";
    this.documentationUrl = "msg91";
    this.properties = [
      // User authentication key
      {
        displayName: "Authentication Key",
        name: "authkey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Msg91Api
});
//# sourceMappingURL=Msg91Api.credentials.js.map