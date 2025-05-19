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
var Cockpit_node_exports = {};
__export(Cockpit_node_exports, {
  Cockpit: () => Cockpit
});
module.exports = __toCommonJS(Cockpit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CollectionDescription = require("./CollectionDescription");
var import_CollectionFunctions = require("./CollectionFunctions");
var import_FormDescription = require("./FormDescription");
var import_FormFunctions = require("./FormFunctions");
var import_GenericFunctions = require("./GenericFunctions");
var import_SingletonDescription = require("./SingletonDescription");
var import_SingletonFunctions = require("./SingletonFunctions");
class Cockpit {
  constructor() {
    this.description = {
      displayName: "Cockpit",
      name: "cockpit",
      icon: { light: "file:cockpit.svg", dark: "file:cockpit.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Consume Cockpit API",
      defaults: {
        name: "Cockpit"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "cockpitApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          default: "collection",
          options: [
            {
              name: "Collection",
              value: "collection"
            },
            {
              name: "Form",
              value: "form"
            },
            {
              name: "Singleton",
              value: "singleton"
            }
          ]
        },
        ...import_CollectionDescription.collectionOperations,
        ...import_CollectionDescription.collectionFields,
        ...import_FormDescription.formOperations,
        ...import_FormDescription.formFields,
        ...import_SingletonDescription.singletonOperations,
        ...import_SingletonDescription.singletonFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCollections() {
          const collections = await import_CollectionFunctions.getAllCollectionNames.call(this);
          return collections.map((itemName) => {
            return {
              name: itemName,
              value: itemName
            };
          });
        },
        async getSingletons() {
          const singletons = await import_SingletonFunctions.getAllSingletonNames.call(this);
          return singletons.map((itemName) => {
            return {
              name: itemName,
              value: itemName
            };
          });
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "collection") {
          const collectionName = this.getNodeParameter("collection", i);
          if (operation === "create") {
            const data = import_GenericFunctions.createDataFromParameters.call(this, i);
            responseData = await import_CollectionFunctions.createCollectionEntry.call(this, collectionName, data);
          } else if (operation === "getAll") {
            const options = this.getNodeParameter("options", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              options.limit = this.getNodeParameter("limit", i);
            }
            responseData = await import_CollectionFunctions.getAllCollectionEntries.call(this, collectionName, options);
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const data = import_GenericFunctions.createDataFromParameters.call(this, i);
            responseData = await import_CollectionFunctions.createCollectionEntry.call(this, collectionName, data, id);
          }
        } else if (resource === "form") {
          const formName = this.getNodeParameter("form", i);
          if (operation === "submit") {
            const form = import_GenericFunctions.createDataFromParameters.call(this, i);
            responseData = await import_FormFunctions.submitForm.call(this, formName, form);
          }
        } else if (resource === "singleton") {
          const singletonName = this.getNodeParameter("singleton", i);
          if (operation === "get") {
            responseData = await import_SingletonFunctions.getSingleton.call(this, singletonName);
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cockpit
});
//# sourceMappingURL=Cockpit.node.js.map