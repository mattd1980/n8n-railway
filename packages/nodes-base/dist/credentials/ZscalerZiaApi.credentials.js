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
var ZscalerZiaApi_credentials_exports = {};
__export(ZscalerZiaApi_credentials_exports, {
  ZscalerZiaApi: () => ZscalerZiaApi
});
module.exports = __toCommonJS(ZscalerZiaApi_credentials_exports);
var import_n8n_workflow = require("n8n-workflow");
class ZscalerZiaApi {
  constructor() {
    this.name = "zscalerZiaApi";
    this.displayName = "Zscaler ZIA API";
    this.documentationUrl = "zscalerzia";
    this.icon = "file:icons/Zscaler.svg";
    this.httpRequestNode = {
      name: "Zscaler ZIA",
      docsUrl: "https://help.zscaler.com/zia/getting-started-zia-api",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "Cookie",
        name: "cookie",
        type: "hidden",
        typeOptions: {
          expirable: true
        },
        default: ""
      },
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        default: "",
        placeholder: "e.g. zsapi.zscalerthree.net",
        required: true
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        required: true
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true
      },
      {
        displayName: "Api Key",
        name: "apiKey",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Cookie: "={{$credentials.cookie}}"
        }
      }
    };
    this.test = {
      request: {
        url: "=https://{{$credentials.baseUrl}}/api/v1/authSettings/exemptedUrls"
      }
    };
  }
  async preAuthentication(credentials) {
    const { baseUrl, username, password, apiKey } = credentials;
    const url = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const now = Date.now().toString();
    const obfuscate = (key, timestamp) => {
      const high = timestamp.substring(timestamp.length - 6);
      let low = (parseInt(high) >> 1).toString();
      let obfuscatedApiKey = "";
      while (low.length < 6) {
        low = "0" + low;
      }
      for (let i = 0; i < high.length; i++) {
        obfuscatedApiKey += key.charAt(parseInt(high.charAt(i)));
      }
      for (let j = 0; j < low.length; j++) {
        obfuscatedApiKey += key.charAt(parseInt(low.charAt(j)) + 2);
      }
      return obfuscatedApiKey;
    };
    const response = await this.helpers.httpRequest({
      method: "POST",
      baseURL: `https://${url}`,
      url: "/api/v1/authenticatedSession",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: {
        apiKey: obfuscate(apiKey, now),
        username,
        password,
        timestamp: now
      },
      returnFullResponse: true
    });
    const headers = response.headers;
    const cookie = headers["set-cookie"]?.find((entrt) => entrt.includes("JSESSIONID"))?.split(";")?.find((entry) => entry.includes("JSESSIONID"));
    if (!cookie) {
      throw new import_n8n_workflow.ApplicationError("No cookie returned. Please check your credentials.", {
        level: "warning"
      });
    }
    return { cookie };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZscalerZiaApi
});
//# sourceMappingURL=ZscalerZiaApi.credentials.js.map