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
var SupabaseApi_credentials_exports = {};
__export(SupabaseApi_credentials_exports, {
  SupabaseApi: () => SupabaseApi
});
module.exports = __toCommonJS(SupabaseApi_credentials_exports);
class SupabaseApi {
  constructor() {
    this.name = "supabaseApi";
    this.displayName = "Supabase API";
    this.documentationUrl = "supabase";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        placeholder: "https://your_account.supabase.co",
        default: ""
      },
      {
        displayName: "Service Role Secret",
        name: "serviceRole",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          apikey: "={{$credentials.serviceRole}}",
          Authorization: "=Bearer {{$credentials.serviceRole}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.host}}/rest/v1",
        headers: {
          Prefer: "return=representation"
        },
        url: "/"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SupabaseApi
});
//# sourceMappingURL=SupabaseApi.credentials.js.map