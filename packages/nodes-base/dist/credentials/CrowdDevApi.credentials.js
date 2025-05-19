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
var CrowdDevApi_credentials_exports = {};
__export(CrowdDevApi_credentials_exports, {
  CrowdDevApi: () => CrowdDevApi
});
module.exports = __toCommonJS(CrowdDevApi_credentials_exports);
class CrowdDevApi {
  constructor() {
    this.name = "crowdDevApi";
    this.displayName = "crowd.dev API";
    this.documentationUrl = "crowddev";
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        type: "string",
        default: "https://app.crowd.dev"
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: ""
      },
      {
        displayName: "Token",
        name: "token",
        type: "string",
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
    // This allows the credential to be used by other parts of n8n
    // stating how this credential is injected as part of the request
    // An example is the Http Request node that can make generic calls
    // reusing this credential
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: '={{"Bearer " + $credentials.token}}'
        }
      }
    };
    // The block below tells how this credential can be tested
    this.test = {
      request: {
        method: "POST",
        baseURL: '={{$credentials.url.replace(/\\/$/, "") + "/api/tenant/" + $credentials.tenantId}}',
        url: "/member/query",
        skipSslCertificateValidation: "={{ $credentials.allowUnauthorizedCerts }}",
        body: {
          limit: 1,
          offset: 0
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrowdDevApi
});
//# sourceMappingURL=CrowdDevApi.credentials.js.map