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
var TwakeServerApi_credentials_exports = {};
__export(TwakeServerApi_credentials_exports, {
  TwakeServerApi: () => TwakeServerApi
});
module.exports = __toCommonJS(TwakeServerApi_credentials_exports);
class TwakeServerApi {
  constructor() {
    this.name = "twakeServerApi";
    this.displayName = "Twake Server API";
    this.icon = "file:icons/Twake.png";
    this.documentationUrl = "twake";
    this.httpRequestNode = {
      name: "Twake Server",
      docsUrl: "https://doc.twake.app/developers-api/home",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Host URL",
        name: "hostUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "Public ID",
        name: "publicId",
        type: "string",
        default: ""
      },
      {
        displayName: "Private API Key",
        name: "privateApiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TwakeServerApi
});
//# sourceMappingURL=TwakeServerApi.credentials.js.map