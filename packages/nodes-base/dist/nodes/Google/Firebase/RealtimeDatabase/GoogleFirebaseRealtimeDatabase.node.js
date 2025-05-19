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
var GoogleFirebaseRealtimeDatabase_node_exports = {};
__export(GoogleFirebaseRealtimeDatabase_node_exports, {
  GoogleFirebaseRealtimeDatabase: () => GoogleFirebaseRealtimeDatabase
});
module.exports = __toCommonJS(GoogleFirebaseRealtimeDatabase_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleFirebaseRealtimeDatabase {
  constructor() {
    this.description = {
      displayName: "Google Cloud Realtime Database",
      name: "googleFirebaseRealtimeDatabase",
      icon: "file:googleFirebaseRealtimeDatabase.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Interact with Google Firebase - Realtime Database API",
      defaults: {
        name: "Google Cloud Realtime Database"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleFirebaseRealtimeDatabaseOAuth2Api"
        }
      ],
      properties: [
        {
          displayName: "Project Name or ID",
          name: "projectId",
          type: "options",
          default: "",
          typeOptions: {
            loadOptionsMethod: "getProjects"
          },
          description: 'As displayed in firebase console URL. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          required: true
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Create",
              value: "create",
              description: "Write data to a database",
              action: "Write data to a database"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete data from a database",
              action: "Delete data from a database"
            },
            {
              name: "Get",
              value: "get",
              description: "Get a record from a database",
              action: "Get a record from a database"
            },
            {
              name: "Push",
              value: "push",
              description: "Append to a list of data",
              action: "Append to a list of data"
            },
            {
              name: "Update",
              value: "update",
              description: "Update item on a database",
              action: "Update item in a database"
            }
          ],
          default: "create",
          required: true
        },
        {
          displayName: "Object Path",
          name: "path",
          type: "string",
          default: "",
          placeholder: "e.g. /app/users",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-json
          description: "Object path on database. Do not append .json.",
          required: true,
          displayOptions: {
            hide: {
              operation: ["get"]
            }
          }
        },
        {
          displayName: "Object Path",
          name: "path",
          type: "string",
          default: "",
          placeholder: "e.g. /app/users",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-json
          description: "Object path on database. Do not append .json.",
          hint: "Leave blank to get a whole database object",
          displayOptions: {
            show: {
              operation: ["get"]
            }
          }
        },
        {
          displayName: "Columns / Attributes",
          name: "attributes",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operation: ["create", "push", "update"]
            }
          },
          description: "Attributes to save",
          required: true,
          placeholder: "age, name, city"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getProjects() {
          const projects = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "",
            "GET",
            "results",
            {},
            {},
            {},
            "https://firebase.googleapis.com/v1beta1/projects"
          );
          const returnData = projects.filter(
            (project) => project.resources.realtimeDatabaseInstance
          ).map((project) => ({
            name: project.projectId,
            value: project.resources.realtimeDatabaseInstance
          }));
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const operation = this.getNodeParameter("operation", 0);
    if (["push", "create", "update"].includes(operation) && items.length === 1 && Object.keys(items[0].json).length === 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The ${operation} operation needs input data`);
    }
    for (let i = 0; i < length; i++) {
      try {
        const projectId = this.getNodeParameter("projectId", i);
        let method = "GET", attributes = "";
        const document = {};
        if (operation === "create") {
          method = "PUT";
          attributes = this.getNodeParameter("attributes", i);
        } else if (operation === "delete") {
          method = "DELETE";
        } else if (operation === "get") {
          method = "GET";
        } else if (operation === "push") {
          method = "POST";
          attributes = this.getNodeParameter("attributes", i);
        } else if (operation === "update") {
          method = "PATCH";
          attributes = this.getNodeParameter("attributes", i);
        }
        if (attributes) {
          const attributeList = attributes.split(",").map((el) => el.trim());
          attributeList.map((attribute) => {
            if (items[i].json.hasOwnProperty(attribute)) {
              document[attribute] = items[i].json[attribute];
            }
          });
        }
        responseData = await import_GenericFunctions.googleApiRequest.call(
          this,
          projectId,
          method,
          this.getNodeParameter("path", i),
          document
        );
        if (responseData === null) {
          if (operation === "get") {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
              message: "Requested entity was not found."
            });
          } else if (method === "DELETE") {
            responseData = { success: true };
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
      if (typeof responseData === "string" || typeof responseData === "number") {
        responseData = {
          [this.getNodeParameter("path", i)]: responseData
        };
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
  GoogleFirebaseRealtimeDatabase
});
//# sourceMappingURL=GoogleFirebaseRealtimeDatabase.node.js.map