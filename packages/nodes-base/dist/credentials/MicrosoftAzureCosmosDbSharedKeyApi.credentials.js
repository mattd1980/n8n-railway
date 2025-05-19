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
var MicrosoftAzureCosmosDbSharedKeyApi_credentials_exports = {};
__export(MicrosoftAzureCosmosDbSharedKeyApi_credentials_exports, {
  MicrosoftAzureCosmosDbSharedKeyApi: () => MicrosoftAzureCosmosDbSharedKeyApi
});
module.exports = __toCommonJS(MicrosoftAzureCosmosDbSharedKeyApi_credentials_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("../nodes/Microsoft/AzureCosmosDb/helpers/constants");
class MicrosoftAzureCosmosDbSharedKeyApi {
  constructor() {
    this.name = "microsoftAzureCosmosDbSharedKeyApi";
    this.displayName = "Microsoft Azure Cosmos DB API";
    this.documentationUrl = "azurecosmosdb";
    this.properties = [
      {
        displayName: "Account",
        name: "account",
        default: "",
        description: "Account name",
        required: true,
        type: "string"
      },
      {
        displayName: "Key",
        name: "key",
        default: "",
        description: "Account key",
        required: true,
        type: "string",
        typeOptions: {
          password: true
        }
      },
      {
        displayName: "Database",
        name: "database",
        default: "",
        description: "Database name",
        required: true,
        type: "string"
      }
    ];
    this.test = {
      request: {
        baseURL: "=https://{{ $credentials.account }}.documents.azure.com/dbs/{{ $credentials.database }}",
        url: "/colls"
      }
    };
  }
  async authenticate(credentials, requestOptions) {
    const date = (/* @__PURE__ */ new Date()).toUTCString();
    requestOptions.headers ??= {};
    requestOptions.headers = {
      ...requestOptions.headers,
      "x-ms-date": date,
      "x-ms-version": import_constants.CURRENT_VERSION,
      "Cache-Control": "no-cache"
    };
    const url = new URL(
      requestOptions.uri ?? requestOptions.baseURL + requestOptions.url
    );
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const foundResource = import_constants.RESOURCE_TYPES.map((type2) => ({
      type: type2,
      index: pathSegments.lastIndexOf(type2)
    })).filter(({ index: index2 }) => index2 !== -1).sort((a, b) => b.index - a.index).shift();
    if (!foundResource) {
      throw new import_n8n_workflow.OperationalError("Unable to determine the resource type from the URL");
    }
    const { type, index } = foundResource;
    const resourceId = pathSegments[index + 1] !== void 0 ? `${pathSegments.slice(0, index).join("/")}/${type}/${pathSegments[index + 1]}` : pathSegments.slice(0, index).join("/");
    const key = Buffer.from(credentials.key, "base64");
    const payload = `${(requestOptions.method ?? "GET").toLowerCase()}
${type.toLowerCase()}
${resourceId}
${date.toLowerCase()}

`;
    const hmacSha256 = (0, import_crypto.createHmac)("sha256", key);
    const signature = hmacSha256.update(payload, "utf8").digest("base64");
    requestOptions.headers[import_constants.HeaderConstants.AUTHORIZATION] = encodeURIComponent(
      `type=master&ver=1.0&sig=${signature}`
    );
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftAzureCosmosDbSharedKeyApi
});
//# sourceMappingURL=MicrosoftAzureCosmosDbSharedKeyApi.credentials.js.map