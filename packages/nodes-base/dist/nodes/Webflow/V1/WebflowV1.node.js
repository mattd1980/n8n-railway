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
var WebflowV1_node_exports = {};
__export(WebflowV1_node_exports, {
  WebflowV1: () => WebflowV1
});
module.exports = __toCommonJS(WebflowV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ItemDescription = require("./ItemDescription");
var import_GenericFunctions = require("../GenericFunctions");
class WebflowV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getSites: import_GenericFunctions.getSites,
        getCollections: import_GenericFunctions.getCollections,
        getFields: import_GenericFunctions.getFields
      }
    };
    this.description = {
      ...baseDescription,
      version: 1,
      description: "Consume the Webflow API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Webflow"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "webflowApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "webflowOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Item",
              value: "item"
            }
          ],
          default: "item"
        },
        ...import_ItemDescription.itemOperations,
        ...import_ItemDescription.itemFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "item") {
          if (operation === "create") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const properties = this.getNodeParameter(
              "fieldsUi.fieldValues",
              i,
              []
            );
            const live = this.getNodeParameter("live", i);
            const fields = {};
            properties.forEach((data) => fields[data.fieldId] = data.fieldValue);
            const body = {
              fields
            };
            responseData = await import_GenericFunctions.webflowApiRequest.call(
              this,
              "POST",
              `/collections/${collectionId}/items`,
              body,
              { live }
            );
          } else if (operation === "delete") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const itemId = this.getNodeParameter("itemId", i);
            responseData = await import_GenericFunctions.webflowApiRequest.call(
              this,
              "DELETE",
              `/collections/${collectionId}/items/${itemId}`
            );
          } else if (operation === "get") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const itemId = this.getNodeParameter("itemId", i);
            responseData = await import_GenericFunctions.webflowApiRequest.call(
              this,
              "GET",
              `/collections/${collectionId}/items/${itemId}`
            );
            responseData = responseData.items;
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const collectionId = this.getNodeParameter("collectionId", i);
            const qs = {};
            if (returnAll) {
              responseData = await import_GenericFunctions.webflowApiRequestAllItems.call(
                this,
                "GET",
                `/collections/${collectionId}/items`,
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.webflowApiRequest.call(
                this,
                "GET",
                `/collections/${collectionId}/items`,
                {},
                qs
              );
              responseData = responseData.items;
            }
          } else if (operation === "update") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const itemId = this.getNodeParameter("itemId", i);
            const properties = this.getNodeParameter(
              "fieldsUi.fieldValues",
              i,
              []
            );
            const live = this.getNodeParameter("live", i);
            const fields = {};
            properties.forEach((data) => fields[data.fieldId] = data.fieldValue);
            const body = {
              fields
            };
            responseData = await import_GenericFunctions.webflowApiRequest.call(
              this,
              "PUT",
              `/collections/${collectionId}/items/${itemId}`,
              body,
              { live }
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebflowV1
});
//# sourceMappingURL=WebflowV1.node.js.map