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
var Bubble_node_exports = {};
__export(Bubble_node_exports, {
  Bubble: () => Bubble
});
module.exports = __toCommonJS(Bubble_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ObjectDescription = require("./ObjectDescription");
class Bubble {
  constructor() {
    this.description = {
      displayName: "Bubble",
      name: "bubble",
      icon: { light: "file:bubble.svg", dark: "file:bubble.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Bubble Data API",
      defaults: {
        name: "Bubble"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "bubbleApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Object",
              value: "object"
            }
          ],
          default: "object"
        },
        ...import_ObjectDescription.objectOperations,
        ...import_ObjectDescription.objectFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const qs = {};
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      if (resource === "object") {
        if (operation === "create") {
          const typeNameInput = this.getNodeParameter("typeName", i);
          const typeName = typeNameInput.replace(/\s/g, "").toLowerCase();
          const { property } = this.getNodeParameter("properties", i);
          const body = {};
          property.forEach((data) => body[data.key] = data.value);
          responseData = await import_GenericFunctions.bubbleApiRequest.call(this, "POST", `/obj/${typeName}`, body, {});
        } else if (operation === "delete") {
          const typeNameInput = this.getNodeParameter("typeName", i);
          const typeName = typeNameInput.replace(/\s/g, "").toLowerCase();
          const objectId = this.getNodeParameter("objectId", i);
          const endpoint = `/obj/${typeName}/${objectId}`;
          responseData = await import_GenericFunctions.bubbleApiRequest.call(this, "DELETE", endpoint, {}, {});
          responseData = { success: true };
        } else if (operation === "get") {
          const typeNameInput = this.getNodeParameter("typeName", i);
          const typeName = typeNameInput.replace(/\s/g, "").toLowerCase();
          const objectId = this.getNodeParameter("objectId", i);
          const endpoint = `/obj/${typeName}/${objectId}`;
          responseData = await import_GenericFunctions.bubbleApiRequest.call(this, "GET", endpoint, {}, {});
          responseData = responseData.response;
        } else if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0);
          const typeNameInput = this.getNodeParameter("typeName", i);
          const typeName = typeNameInput.replace(/\s/g, "").toLowerCase();
          const endpoint = `/obj/${typeName}`;
          const jsonParameters = this.getNodeParameter("jsonParameters", 0);
          const options = this.getNodeParameter("options", i);
          if (!jsonParameters) {
            if (options.filters) {
              const { filter } = options.filters;
              qs.constraints = JSON.stringify(filter);
            }
          } else {
            const filter = options.filtersJson;
            const data = (0, import_GenericFunctions.validateJSON)(filter);
            if (data === void 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Filters must be a valid JSON", {
                itemIndex: i
              });
            }
            qs.constraints = JSON.stringify(data);
          }
          if (options.sort) {
            const { sortValue } = options.sort;
            Object.assign(qs, sortValue);
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.bubbleApiRequestAllItems.call(this, "GET", endpoint, {}, qs);
          } else {
            qs.limit = this.getNodeParameter("limit", 0);
            responseData = await import_GenericFunctions.bubbleApiRequest.call(this, "GET", endpoint, {}, qs);
            responseData = responseData.response.results;
          }
        } else if (operation === "update") {
          const typeNameInput = this.getNodeParameter("typeName", i);
          const typeName = typeNameInput.replace(/\s/g, "").toLowerCase();
          const objectId = this.getNodeParameter("objectId", i);
          const endpoint = `/obj/${typeName}/${objectId}`;
          const { property } = this.getNodeParameter("properties", i);
          const body = {};
          property.forEach((data) => body[data.key] = data.value);
          responseData = await import_GenericFunctions.bubbleApiRequest.call(this, "PATCH", endpoint, body, {});
          responseData = { success: true };
        }
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bubble
});
//# sourceMappingURL=Bubble.node.js.map