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
var WiseApi_credentials_exports = {};
__export(WiseApi_credentials_exports, {
  WiseApi: () => WiseApi
});
module.exports = __toCommonJS(WiseApi_credentials_exports);
class WiseApi {
  constructor() {
    this.name = "wiseApi";
    this.displayName = "Wise API";
    this.documentationUrl = "wise";
    this.properties = [
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "live",
        options: [
          {
            name: "Live",
            value: "live"
          },
          {
            name: "Test",
            value: "test"
          }
        ]
      },
      {
        displayName: "Private Key (Optional)",
        name: "privateKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Optional private key used for Strong Customer Authentication (SCA). Only needed to retrieve statements, and execute transfers."
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WiseApi
});
//# sourceMappingURL=WiseApi.credentials.js.map