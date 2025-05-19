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
var WorkableApi_credentials_exports = {};
__export(WorkableApi_credentials_exports, {
  WorkableApi: () => WorkableApi
});
module.exports = __toCommonJS(WorkableApi_credentials_exports);
class WorkableApi {
  constructor() {
    this.name = "workableApi";
    this.displayName = "Workable API";
    this.documentationUrl = "workable";
    this.properties = [
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: ""
      },
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkableApi
});
//# sourceMappingURL=WorkableApi.credentials.js.map