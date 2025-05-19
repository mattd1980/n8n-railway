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
var VenafiTlsProtectDatacenterApi_credentials_exports = {};
__export(VenafiTlsProtectDatacenterApi_credentials_exports, {
  VenafiTlsProtectDatacenterApi: () => VenafiTlsProtectDatacenterApi
});
module.exports = __toCommonJS(VenafiTlsProtectDatacenterApi_credentials_exports);
class VenafiTlsProtectDatacenterApi {
  constructor() {
    this.name = "venafiTlsProtectDatacenterApi";
    this.displayName = "Venafi TLS Protect Datacenter API";
    this.documentationUrl = "venafitlsprotectdatacenter";
    this.properties = [
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://example.com"
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: ""
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
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
        displayName: "Allow Self-Signed Certificates",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        default: true
      },
      {
        displayName: "Access Token",
        name: "token",
        type: "hidden",
        typeOptions: {
          expirable: true
        },
        default: ""
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "certificate:manage"
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.token}}"
        }
      }
    };
  }
  async preAuthentication(credentials) {
    const url = `${credentials.domain}/vedauth/authorize/oauth`;
    const requestOptions = {
      url,
      method: "POST",
      json: true,
      skipSslCertificateValidation: credentials.allowUnauthorizedCerts,
      body: {
        client_id: credentials.clientId,
        username: credentials.username,
        password: credentials.password,
        scope: credentials.scope
      }
    };
    const { access_token } = await this.helpers.httpRequest(requestOptions);
    return { token: access_token };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VenafiTlsProtectDatacenterApi
});
//# sourceMappingURL=VenafiTlsProtectDatacenterApi.credentials.js.map