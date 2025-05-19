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
var Kitemaker_node_exports = {};
__export(Kitemaker_node_exports, {
  Kitemaker: () => Kitemaker
});
module.exports = __toCommonJS(Kitemaker_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_mutations = require("./mutations");
var import_queries = require("./queries");
class Kitemaker {
  constructor() {
    this.description = {
      displayName: "Kitemaker",
      name: "kitemaker",
      icon: { light: "file:kitemaker.svg", dark: "file:kitemaker.dark.svg" },
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
      description: "Consume the Kitemaker GraphQL API",
      defaults: {
        name: "Kitemaker"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "kitemakerApi",
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
              name: "Organization",
              value: "organization"
            },
            {
              name: "Space",
              value: "space"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "Work Item",
              value: "workItem"
            }
          ],
          default: "workItem",
          required: true
        },
        ...import_descriptions.organizationOperations,
        ...import_descriptions.spaceOperations,
        ...import_descriptions.spaceFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields,
        ...import_descriptions.workItemOperations,
        ...import_descriptions.workItemFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getLabels() {
          const responseData = await import_GenericFunctions.kitemakerRequest.call(this, { query: import_queries.getLabels });
          const {
            data: {
              organization: { spaces }
            }
          } = responseData;
          return (0, import_GenericFunctions.createLoadOptions)(spaces[0].labels);
        },
        async getSpaces() {
          const responseData = await import_GenericFunctions.kitemakerRequest.call(this, { query: import_queries.getSpaces });
          const {
            data: {
              organization: { spaces }
            }
          } = responseData;
          return (0, import_GenericFunctions.createLoadOptions)(spaces);
        },
        async getStatuses() {
          const spaceId = this.getNodeParameter("spaceId", 0);
          if (!spaceId.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please choose a space to set for the work item to create."
            );
          }
          const responseData = await import_GenericFunctions.kitemakerRequest.call(this, { query: import_queries.getStatuses });
          const {
            data: {
              organization: { spaces }
            }
          } = responseData;
          const space = spaces.find((e) => e.id === spaceId);
          return (0, import_GenericFunctions.createLoadOptions)(space.statuses);
        },
        async getUsers() {
          const responseData = await import_GenericFunctions.kitemakerRequest.call(this, { query: import_queries.getUsers });
          const {
            data: {
              organization: { users }
            }
          } = responseData;
          return (0, import_GenericFunctions.createLoadOptions)(users);
        },
        async getWorkItems() {
          const spaceId = this.getNodeParameter("spaceId", 0);
          const responseData = await import_GenericFunctions.kitemakerRequest.call(this, {
            query: import_queries.getWorkItems,
            variables: { spaceId }
          });
          const {
            data: {
              workItems: { workItems }
            }
          } = responseData;
          return (0, import_GenericFunctions.createLoadOptions)(workItems);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      if (resource === "organization") {
        if (operation === "get") {
          responseData = await import_GenericFunctions.kitemakerRequest.call(this, {
            query: import_queries.getOrganization
          });
          responseData = responseData.data.organization;
        }
      } else if (resource === "space") {
        if (operation === "getAll") {
          const allItems = await import_GenericFunctions.kitemakerRequestAllItems.call(this, {
            query: import_queries.getAllSpaces,
            variables: {}
          });
          responseData = allItems;
        }
      } else if (resource === "user") {
        if (operation === "getAll") {
          const allItems = await import_GenericFunctions.kitemakerRequestAllItems.call(this, {
            query: import_queries.getAllUsers,
            variables: {}
          });
          responseData = allItems;
        }
      } else if (resource === "workItem") {
        if (operation === "create") {
          const input = {
            title: this.getNodeParameter("title", i),
            statusId: this.getNodeParameter("statusId", i)
          };
          if (!input.statusId.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please enter a status to set for the work item to create.",
              { itemIndex: i }
            );
          }
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (Object.keys(additionalFields).length) {
            Object.assign(input, additionalFields);
          }
          responseData = await import_GenericFunctions.kitemakerRequest.call(this, {
            query: import_mutations.createWorkItem,
            variables: { input }
          });
          responseData = responseData.data.createWorkItem.workItem;
        } else if (operation === "get") {
          const workItemId = this.getNodeParameter("workItemId", i);
          responseData = await import_GenericFunctions.kitemakerRequest.call(this, {
            query: import_queries.getWorkItem,
            variables: { workItemId }
          });
          responseData = responseData.data.workItem;
        } else if (operation === "getAll") {
          const allItems = await import_GenericFunctions.kitemakerRequestAllItems.call(this, {
            query: import_queries.getAllWorkItems,
            variables: {
              spaceId: this.getNodeParameter("spaceId", i)
            }
          });
          responseData = allItems;
        } else if (operation === "update") {
          const input = {
            id: this.getNodeParameter("workItemId", i)
          };
          const updateFields = this.getNodeParameter("updateFields", i);
          if (!Object.keys(updateFields).length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please enter at least one field to update for the work item.",
              { itemIndex: i }
            );
          }
          Object.assign(input, updateFields);
          responseData = await import_GenericFunctions.kitemakerRequest.call(this, {
            query: import_mutations.editWorkItem,
            variables: { input }
          });
          responseData = responseData.data.editWorkItem.workItem;
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
  Kitemaker
});
//# sourceMappingURL=Kitemaker.node.js.map