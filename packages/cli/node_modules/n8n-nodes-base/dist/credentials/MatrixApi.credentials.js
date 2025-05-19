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
var MatrixApi_credentials_exports = {};
__export(MatrixApi_credentials_exports, {
  MatrixApi: () => MatrixApi
});
module.exports = __toCommonJS(MatrixApi_credentials_exports);
class MatrixApi {
  constructor() {
    this.name = "matrixApi";
    this.displayName = "Matrix API";
    this.documentationUrl = "matrix";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Homeserver URL",
        name: "homeserverUrl",
        type: "string",
        default: "https://matrix-client.matrix.org"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MatrixApi
});
//# sourceMappingURL=MatrixApi.credentials.js.map