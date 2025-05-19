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
var S3_credentials_exports = {};
__export(S3_credentials_exports, {
  S3: () => S3
});
module.exports = __toCommonJS(S3_credentials_exports);
class S3 {
  constructor() {
    this.name = "s3";
    this.displayName = "S3";
    this.documentationUrl = "s3";
    this.properties = [
      {
        displayName: "S3 Endpoint",
        name: "endpoint",
        type: "string",
        default: ""
      },
      {
        displayName: "Region",
        name: "region",
        type: "string",
        default: "us-east-1"
      },
      {
        displayName: "Access Key ID",
        name: "accessKeyId",
        type: "string",
        default: ""
      },
      {
        displayName: "Secret Access Key",
        name: "secretAccessKey",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      },
      {
        displayName: "Force Path Style",
        name: "forcePathStyle",
        type: "boolean",
        default: false
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "ignoreSSLIssues",
        type: "boolean",
        default: false,
        description: "Whether to connect even if SSL certificate validation is not possible"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  S3
});
//# sourceMappingURL=S3.credentials.js.map