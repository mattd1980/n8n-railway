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
var ERPNextApi_credentials_exports = {};
__export(ERPNextApi_credentials_exports, {
  ERPNextApi: () => ERPNextApi
});
module.exports = __toCommonJS(ERPNextApi_credentials_exports);
class ERPNextApi {
  constructor() {
    this.name = "erpNextApi";
    this.displayName = "ERPNext API";
    this.documentationUrl = "erpnext";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "API Secret",
        name: "apiSecret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
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
        displayName: "Subdomain",
        name: "subdomain",
        type: "string",
        default: "",
        placeholder: "n8n",
        description: 'Subdomain of cloud-hosted ERPNext instance. For example, "n8n" is the subdomain in: <code>https://n8n.erpnext.com</code>',
        displayOptions: {
          show: {
            environment: ["cloudHosted"]
          }
        }
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "options",
        default: "erpnext.com",
        options: [
          {
            name: "erpnext.com",
            value: "erpnext.com"
          },
          {
            name: "frappe.cloud",
            value: "frappe.cloud"
          }
        ],
        description: "Domain for your cloud hosted ERPNext instance.",
        displayOptions: {
          show: {
            environment: ["cloudHosted"]
          }
        }
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://www.mydomain.com",
        description: "Fully qualified domain name of self-hosted ERPNext instance",
        displayOptions: {
          show: {
            environment: ["selfHosted"]
          }
        }
      },
      {
        displayName: "Ignore SSL Issues (Insecure)",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        description: "Whether to connect even if SSL certificate validation is not possible",
        default: false
      }
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=token {{$credentials.apiKey}}:{{$credentials.apiSecret}}"
        }
      }
    };
    this.test = {
      request: {
        baseURL: '={{$credentials.environment === "cloudHosted" ? "https://" + $credentials.subdomain + "." + $credentials.domain : $credentials.domain}}',
        url: "/api/method/frappe.auth.get_logged_user",
        skipSslCertificateValidation: "={{ $credentials.allowUnauthorizedCerts }}"
      },
      rules: [
        {
          type: "responseSuccessBody",
          properties: {
            key: "message",
            value: void 0,
            message: "Unable to authenticate, Check the credentials and the url"
          }
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ERPNextApi
});
//# sourceMappingURL=ERPNextApi.credentials.js.map