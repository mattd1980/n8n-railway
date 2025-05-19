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
var AutomizyApi_credentials_exports = {};
__export(AutomizyApi_credentials_exports, {
  AutomizyApi: () => AutomizyApi
});
module.exports = __toCommonJS(AutomizyApi_credentials_exports);
class AutomizyApi {
  constructor() {
    this.name = "automizyApi";
    this.displayName = "Automizy API";
    this.documentationUrl = "automizy";
    this.properties = [
      {
        displayName: "This service may no longer exist and will be removed from n8n in a future release.",
        name: "deprecated",
        type: "notice",
        default: ""
      },
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutomizyApi
});
//# sourceMappingURL=AutomizyApi.credentials.js.map