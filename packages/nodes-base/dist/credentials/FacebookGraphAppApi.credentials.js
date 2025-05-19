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
var FacebookGraphAppApi_credentials_exports = {};
__export(FacebookGraphAppApi_credentials_exports, {
  FacebookGraphAppApi: () => FacebookGraphAppApi
});
module.exports = __toCommonJS(FacebookGraphAppApi_credentials_exports);
class FacebookGraphAppApi {
  constructor() {
    this.name = "facebookGraphAppApi";
    this.displayName = "Facebook Graph API (App)";
    this.documentationUrl = "facebookapp";
    this.extends = ["facebookGraphApi"];
    this.properties = [
      {
        displayName: "App Secret",
        name: "appSecret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "(Optional) When the app secret is set the node will verify this signature to validate the integrity and origin of the payload"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacebookGraphAppApi
});
//# sourceMappingURL=FacebookGraphAppApi.credentials.js.map