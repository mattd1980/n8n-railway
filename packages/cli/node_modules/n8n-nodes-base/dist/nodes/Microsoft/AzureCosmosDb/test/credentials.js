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
var credentials_exports = {};
__export(credentials_exports, {
  credentials: () => credentials
});
module.exports = __toCommonJS(credentials_exports);
const credentials = {
  microsoftAzureCosmosDbSharedKeyApi: {
    account: "n8n-us-east-account",
    key: "I3rwpzP0XoFpNzJ7hRIUXjwgpD1qaVKi71NZBbk7oOHUXrbd80WAoIAAoRaT47W9hHO3b6us1yABACDbVdilag==",
    database: "database_1",
    baseUrl: "https://n8n-us-east-account.documents.azure.com/dbs/database_1"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  credentials
});
//# sourceMappingURL=credentials.js.map