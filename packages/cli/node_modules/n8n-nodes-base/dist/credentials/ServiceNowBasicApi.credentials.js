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
var ServiceNowBasicApi_credentials_exports = {};
__export(ServiceNowBasicApi_credentials_exports, {
  ServiceNowBasicApi: () => ServiceNowBasicApi
});
module.exports = __toCommonJS(ServiceNowBasicApi_credentials_exports);
class ServiceNowBasicApi {
  constructor() {
    this.name = "serviceNowBasicApi";
    this.extends = ["httpBasicAuth"];
    this.displayName = "ServiceNow Basic Auth API";
    this.documentationUrl = "serviceNow";
    this.properties = [
      {
        displayName: "User",
        name: "user",
        type: "string",
        required: true,
        default: ""
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        required: true,
        typeOptions: {
          password: true
        },
        default: ""
      },
      {
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        hint: "The subdomain can be extracted from the URL. If the URL is: https://dev99890.service-now.com the subdomain is dev99890",
        required: true
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        auth: {
          username: "={{$credentials.user}}",
          password: "={{$credentials.password}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: "=https://{{$credentials?.subdomain}}.service-now.com",
        url: "/api/now/table/sys_user_role"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServiceNowBasicApi
});
//# sourceMappingURL=ServiceNowBasicApi.credentials.js.map