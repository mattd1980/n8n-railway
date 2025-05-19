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
var KoBoToolboxApi_credentials_exports = {};
__export(KoBoToolboxApi_credentials_exports, {
  KoBoToolboxApi: () => KoBoToolboxApi
});
module.exports = __toCommonJS(KoBoToolboxApi_credentials_exports);
class KoBoToolboxApi {
  constructor() {
    this.name = "koBoToolboxApi";
    this.displayName = "KoBoToolbox API Token";
    // See https://support.kobotoolbox.org/api.html
    this.documentationUrl = "koBoToolbox";
    this.properties = [
      {
        displayName: "API Root URL",
        name: "URL",
        type: "string",
        default: "https://kf.kobotoolbox.org/"
      },
      {
        displayName: "API Token",
        name: "token",
        type: "string",
        typeOptions: { password: true },
        default: "",
        hint: "You can get your API token at https://[api-root]/token/?format=json (for a logged in user)"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Token {{$credentials.token}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.URL}}",
        url: "/api/v2/assets/",
        method: "GET"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KoBoToolboxApi
});
//# sourceMappingURL=KoBoToolboxApi.credentials.js.map