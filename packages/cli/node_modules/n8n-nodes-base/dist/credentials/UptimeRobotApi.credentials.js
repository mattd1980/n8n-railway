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
var UptimeRobotApi_credentials_exports = {};
__export(UptimeRobotApi_credentials_exports, {
  UptimeRobotApi: () => UptimeRobotApi
});
module.exports = __toCommonJS(UptimeRobotApi_credentials_exports);
class UptimeRobotApi {
  constructor() {
    this.name = "uptimeRobotApi";
    this.displayName = "Uptime Robot API";
    this.documentationUrl = "uptimeRobot";
    this.properties = [
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
  UptimeRobotApi
});
//# sourceMappingURL=UptimeRobotApi.credentials.js.map