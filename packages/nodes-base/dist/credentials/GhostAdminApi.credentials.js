"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GhostAdminApi_credentials_exports = {};
__export(GhostAdminApi_credentials_exports, {
  GhostAdminApi: () => GhostAdminApi
});
module.exports = __toCommonJS(GhostAdminApi_credentials_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
class GhostAdminApi {
  constructor() {
    this.name = "ghostAdminApi";
    this.displayName = "Ghost Admin API";
    this.documentationUrl = "ghost";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "",
        placeholder: "http://localhost:3001"
      },
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}",
        url: "/ghost/api/v2/admin/pages/"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const [id, secret] = credentials.apiKey.split(":");
    const token = import_jsonwebtoken.default.sign({}, Buffer.from(secret, "hex"), {
      keyid: id,
      algorithm: "HS256",
      expiresIn: "5m",
      audience: "/v2/admin/"
    });
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Ghost ${token}`
    };
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GhostAdminApi
});
//# sourceMappingURL=GhostAdminApi.credentials.js.map