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
var CustomerIoApi_credentials_exports = {};
__export(CustomerIoApi_credentials_exports, {
  CustomerIoApi: () => CustomerIoApi
});
module.exports = __toCommonJS(CustomerIoApi_credentials_exports);
var import_n8n_workflow = require("n8n-workflow");
class CustomerIoApi {
  constructor() {
    this.name = "customerIoApi";
    this.displayName = "Customer.io API";
    this.documentationUrl = "customerIo";
    this.properties = [
      {
        displayName: "Tracking API Key",
        name: "trackingApiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Required for tracking API",
        required: true
      },
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: [
          {
            name: "EU region",
            value: "track-eu.customer.io"
          },
          {
            name: "Global region",
            value: "track.customer.io"
          }
        ],
        default: "track.customer.io",
        description: "Should be set based on your account region",
        hint: "The region will be omitted when being used with the HTTP node",
        required: true
      },
      {
        displayName: "Tracking Site ID",
        name: "trackingSiteId",
        type: "string",
        default: "",
        description: "Required for tracking API"
      },
      {
        displayName: "App API Key",
        name: "appApiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Required for App API"
      }
    ];
  }
  async authenticate(credentials, requestOptions) {
    const url = new URL(requestOptions.url ? requestOptions.url : requestOptions.uri);
    if (url.hostname === "track.customer.io" || url.hostname === "track-eu.customer.io" || url.hostname === "api.customer.io" || url.hostname === "api-eu.customer.io") {
      const basicAuthKey = Buffer.from(
        `${credentials.trackingSiteId}:${credentials.trackingApiKey}`
      ).toString("base64");
      Object.assign(requestOptions.headers, { Authorization: `Basic ${basicAuthKey}` });
    } else if (url.hostname === "beta-api.customer.io" || url.hostname === "beta-api-eu.customer.io") {
      Object.assign(requestOptions.headers, {
        Authorization: `Bearer ${credentials.appApiKey}`
      });
    } else {
      throw new import_n8n_workflow.ApplicationError("Unknown way of authenticating", { level: "warning" });
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerIoApi
});
//# sourceMappingURL=CustomerIoApi.credentials.js.map