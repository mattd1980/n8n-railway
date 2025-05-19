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
var ZabbixApi_credentials_exports = {};
__export(ZabbixApi_credentials_exports, {
  ZabbixApi: () => ZabbixApi
});
module.exports = __toCommonJS(ZabbixApi_credentials_exports);
class ZabbixApi {
  constructor() {
    this.name = "zabbixApi";
    this.displayName = "Zabbix API";
    this.documentationUrl = "zabbix";
    this.icon = "file:icons/Zabbix.svg";
    this.httpRequestNode = {
      name: "Zabbix",
      docsUrl: "https://www.zabbix.com/documentation/current/en/manual/api",
      apiBaseUrl: ""
    };
    this.properties = [
      {
        displayName: "URL",
        name: "url",
        required: true,
        type: "string",
        default: ""
      },
      {
        displayName: "API Token",
        name: "apiToken",
        required: true,
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiToken}}",
          "Content-Type": "application/json-rpc"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.url}}".replace(/\/$/, ""),
        url: "/api_jsonrpc.php",
        method: "POST",
        body: {
          jsonrpc: "2.0",
          method: "host.get",
          params: {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
          },
          id: 2
        }
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "result",
            value: void 0,
            message: "Invalid access token"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZabbixApi
});
//# sourceMappingURL=ZabbixApi.credentials.js.map