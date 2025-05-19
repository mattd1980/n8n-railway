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
var AirtableTokenApi_credentials_exports = {};
__export(AirtableTokenApi_credentials_exports, {
  AirtableTokenApi: () => AirtableTokenApi
});
module.exports = __toCommonJS(AirtableTokenApi_credentials_exports);
class AirtableTokenApi {
  constructor() {
    this.name = "airtableTokenApi";
    this.displayName = "Airtable Personal Access Token API";
    this.documentationUrl = "airtable";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: `Make sure you enabled the following scopes for your token:<br>
				<code>data.records:read</code><br>
				<code>data.records:write</code><br>
				<code>schema.bases:read</code><br>
				`,
        name: "notice",
        type: "notice",
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.accessToken}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "https://api.airtable.com/v0/meta/whoami"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AirtableTokenApi
});
//# sourceMappingURL=AirtableTokenApi.credentials.js.map