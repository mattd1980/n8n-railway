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
var AzureCosmosDb_node_exports = {};
__export(AzureCosmosDb_node_exports, {
  AzureCosmosDb: () => AzureCosmosDb
});
module.exports = __toCommonJS(AzureCosmosDb_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_methods = require("./methods");
class AzureCosmosDb {
  constructor() {
    this.description = {
      displayName: "Azure Cosmos DB",
      name: "azureCosmosDb",
      icon: {
        light: "file:AzureCosmosDb.svg",
        dark: "file:AzureCosmosDb.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Interact with Azure Cosmos DB API",
      defaults: {
        name: "Azure Cosmos DB"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftAzureCosmosDbSharedKeyApi",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "=https://{{ $credentials.account }}.documents.azure.com/dbs/{{ $credentials.database }}",
        json: true,
        ignoreHttpStatusErrors: true
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Container",
              value: "container"
            },
            {
              name: "Item",
              value: "item"
            }
          ],
          default: "container"
        },
        ...import_descriptions.container.description,
        ...import_descriptions.item.description
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AzureCosmosDb
});
//# sourceMappingURL=AzureCosmosDb.node.js.map