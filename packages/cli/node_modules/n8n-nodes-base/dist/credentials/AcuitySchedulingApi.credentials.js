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
var AcuitySchedulingApi_credentials_exports = {};
__export(AcuitySchedulingApi_credentials_exports, {
  AcuitySchedulingApi: () => AcuitySchedulingApi
});
module.exports = __toCommonJS(AcuitySchedulingApi_credentials_exports);
class AcuitySchedulingApi {
  constructor() {
    this.name = "acuitySchedulingApi";
    this.displayName = "Acuity Scheduling API";
    this.documentationUrl = "acuityScheduling";
    this.properties = [
      {
        displayName: "User ID",
        name: "userId",
        type: "string",
        default: ""
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcuitySchedulingApi
});
//# sourceMappingURL=AcuitySchedulingApi.credentials.js.map