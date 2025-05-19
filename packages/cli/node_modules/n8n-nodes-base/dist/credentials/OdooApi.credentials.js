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
var OdooApi_credentials_exports = {};
__export(OdooApi_credentials_exports, {
  OdooApi: () => OdooApi
});
module.exports = __toCommonJS(OdooApi_credentials_exports);
class OdooApi {
  constructor() {
    this.name = "odooApi";
    this.displayName = "Odoo API";
    this.documentationUrl = "odoo";
    this.properties = [
      {
        displayName: "Site URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://my-organization.odoo.com",
        required: true
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        placeholder: "user@email.com",
        required: true
      },
      {
        displayName: "Password or API Key",
        name: "password",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        },
        required: true
      },
      {
        displayName: "Database Name",
        name: "db",
        type: "string",
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OdooApi
});
//# sourceMappingURL=OdooApi.credentials.js.map