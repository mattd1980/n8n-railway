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
var SalesforceJwtApi_credentials_exports = {};
__export(SalesforceJwtApi_credentials_exports, {
  SalesforceJwtApi: () => SalesforceJwtApi
});
module.exports = __toCommonJS(SalesforceJwtApi_credentials_exports);
var import_axios = __toESM(require("axios"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_moment_timezone = __toESM(require("moment-timezone"));
class SalesforceJwtApi {
  constructor() {
    this.name = "salesforceJwtApi";
    this.displayName = "Salesforce JWT API";
    this.documentationUrl = "salesforce";
    this.properties = [
      {
        displayName: "Environment Type",
        name: "environment",
        type: "options",
        options: [
          {
            name: "Production",
            value: "production"
          },
          {
            name: "Sandbox",
            value: "sandbox"
          }
        ],
        default: "production"
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: "",
        required: true,
        description: "Consumer Key from Salesforce Connected App"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Private Key",
        name: "privateKey",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true,
        description: "Use the multiline editor. Make sure it is in standard PEM key format:<br />-----BEGIN PRIVATE KEY-----<br />KEY DATA GOES HERE<br />-----END PRIVATE KEY-----"
      }
    ];
    this.test = {
      request: {
        baseURL: '={{$credentials?.environment === "sandbox" ? "https://test.salesforce.com" : "https://login.salesforce.com"}}',
        url: "/services/oauth2/userinfo",
        method: "GET"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const now = (0, import_moment_timezone.default)().unix();
    const authUrl = credentials.environment === "sandbox" ? "https://test.salesforce.com" : "https://login.salesforce.com";
    const signature = import_jsonwebtoken.default.sign(
      {
        iss: credentials.clientId,
        sub: credentials.username,
        aud: authUrl,
        exp: now + 3 * 60
      },
      credentials.privateKey,
      {
        algorithm: "RS256",
        header: {
          alg: "RS256"
        }
      }
    );
    const axiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: signature
      }).toString(),
      url: `${authUrl}/services/oauth2/token`,
      responseType: "json"
    };
    const result = await (0, import_axios.default)(axiosRequestConfig);
    const { access_token } = result.data;
    return {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: `Bearer ${access_token}`
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SalesforceJwtApi
});
//# sourceMappingURL=SalesforceJwtApi.credentials.js.map