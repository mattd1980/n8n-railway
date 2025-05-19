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
var AzureStorageSharedKeyApi_credentials_exports = {};
__export(AzureStorageSharedKeyApi_credentials_exports, {
  AzureStorageSharedKeyApi: () => AzureStorageSharedKeyApi
});
module.exports = __toCommonJS(AzureStorageSharedKeyApi_credentials_exports);
var import_node_crypto = require("node:crypto");
var import_GenericFunctions = require("../nodes/Microsoft/Storage/GenericFunctions");
class AzureStorageSharedKeyApi {
  constructor() {
    this.name = "azureStorageSharedKeyApi";
    this.displayName = "Azure Storage Shared Key API";
    this.documentationUrl = "azurestorage";
    this.properties = [
      {
        displayName: "Account",
        name: "account",
        description: "Account name",
        type: "string",
        default: ""
      },
      {
        displayName: "Key",
        name: "key",
        description: "Account key",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "hidden",
        default: '=https://{{ $self["account"] }}.blob.core.windows.net'
      }
    ];
  }
  async authenticate(credentials, requestOptions) {
    if (requestOptions.qs) {
      for (const [key, value] of Object.entries(requestOptions.qs)) {
        if (value === void 0) {
          delete requestOptions.qs[key];
        }
      }
    }
    if (requestOptions.headers) {
      for (const [key, value] of Object.entries(requestOptions.headers)) {
        if (value === void 0) {
          delete requestOptions.headers[key];
        }
      }
    }
    requestOptions.method ??= "GET";
    requestOptions.headers ??= {};
    const stringToSign = [
      requestOptions.method.toUpperCase(),
      requestOptions.headers[import_GenericFunctions.HeaderConstants.CONTENT_LANGUAGE] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.CONTENT_ENCODING] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.CONTENT_LENGTH] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.CONTENT_MD5] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.CONTENT_TYPE] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.DATE] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.IF_MODIFIED_SINCE] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.IF_MATCH] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.IF_NONE_MATCH] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.IF_UNMODIFIED_SINCE] ?? "",
      requestOptions.headers[import_GenericFunctions.HeaderConstants.RANGE] ?? "",
      (0, import_GenericFunctions.getCanonicalizedHeadersString)(requestOptions) + (0, import_GenericFunctions.getCanonicalizedResourceString)(requestOptions, credentials)
    ].join("\n");
    const signature = (0, import_node_crypto.createHmac)("sha256", Buffer.from(credentials.key, "base64")).update(stringToSign, "utf8").digest("base64");
    requestOptions.headers[import_GenericFunctions.HeaderConstants.AUTHORIZATION] = `SharedKey ${credentials.account}:${signature}`;
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AzureStorageSharedKeyApi
});
//# sourceMappingURL=AzureStorageSharedKeyApi.credentials.js.map