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
var AzureStorage_node_exports = {};
__export(AzureStorage_node_exports, {
  AzureStorage: () => AzureStorage
});
module.exports = __toCommonJS(AzureStorage_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class AzureStorage {
  constructor() {
    this.description = {
      displayName: "Azure Storage",
      name: "azureStorage",
      icon: {
        light: "file:azureStorage.svg",
        dark: "file:azureStorage.dark.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Interact with Azure Storage API",
      defaults: {
        name: "Azure Storage"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "azureStorageOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        },
        {
          name: "azureStorageSharedKeyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["sharedKey"]
            }
          }
        }
      ],
      requestDefaults: {
        baseURL: "={{ $credentials.baseUrl }}"
      },
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "OAuth2",
              value: "oAuth2"
            },
            {
              name: "Shared Key",
              value: "sharedKey"
            }
          ],
          default: "sharedKey"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Blob",
              value: "blob"
            },
            {
              name: "Container",
              value: "container"
            }
          ],
          default: "container"
        },
        ...import_descriptions.blobOperations,
        ...import_descriptions.blobFields,
        ...import_descriptions.containerOperations,
        ...import_descriptions.containerFields
      ]
    };
    this.methods = {
      loadOptions: {},
      listSearch: {
        getBlobs: import_GenericFunctions.getBlobs,
        getContainers: import_GenericFunctions.getContainers
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AzureStorage
});
//# sourceMappingURL=AzureStorage.node.js.map