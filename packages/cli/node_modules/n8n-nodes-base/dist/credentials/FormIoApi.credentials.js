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
var FormIoApi_credentials_exports = {};
__export(FormIoApi_credentials_exports, {
  FormIoApi: () => FormIoApi
});
module.exports = __toCommonJS(FormIoApi_credentials_exports);
class FormIoApi {
  constructor() {
    this.name = "formIoApi";
    this.displayName = "Form.io API";
    this.documentationUrl = "formIoTrigger";
    this.properties = [
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "cloudHosted",
        options: [
          {
            name: "Cloud-Hosted",
            value: "cloudHosted"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "Self-Hosted Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://www.mydomain.com",
        displayOptions: {
          show: {
            environment: ["selfHosted"]
          }
        }
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
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
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormIoApi
});
//# sourceMappingURL=FormIoApi.credentials.js.map