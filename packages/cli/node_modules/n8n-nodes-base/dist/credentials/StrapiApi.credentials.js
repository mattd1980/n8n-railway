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
var StrapiApi_credentials_exports = {};
__export(StrapiApi_credentials_exports, {
  StrapiApi: () => StrapiApi
});
module.exports = __toCommonJS(StrapiApi_credentials_exports);
class StrapiApi {
  constructor() {
    this.name = "strapiApi";
    this.displayName = "Strapi API";
    this.documentationUrl = "strapi";
    this.properties = [
      {
        displayName: "Make sure you are using a user account not an admin account",
        name: "notice",
        type: "notice",
        default: ""
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "https://api.example.com"
      },
      {
        displayName: "API Version",
        name: "apiVersion",
        default: "v3",
        type: "options",
        description: "The version of api to be used",
        options: [
          {
            name: "Version 4",
            value: "v4",
            description: "API version supported by Strapi 4"
          },
          {
            name: "Version 3",
            value: "v3",
            description: "API version supported by Strapi 3"
          }
        ]
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StrapiApi
});
//# sourceMappingURL=StrapiApi.credentials.js.map