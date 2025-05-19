"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Beeminder_node_exports = {};
__export(Beeminder_node_exports, {
  Beeminder: () => Beeminder
});
module.exports = __toCommonJS(Beeminder_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_Beeminder_node = require("./Beeminder.node.functions");
var import_GenericFunctions = require("./GenericFunctions");
class Beeminder {
  constructor() {
    this.description = {
      displayName: "Beeminder",
      name: "beeminder",
      group: ["output"],
      version: 1,
      description: "Consume Beeminder API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Beeminder"
      },
      usableAsTool: true,
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:beeminder.png",
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "beeminderApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          required: true,
          options: [
            {
              name: "Datapoint",
              value: "datapoint"
            }
          ],
          default: "datapoint"
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
              description: "Create datapoint for goal",
              action: "Create datapoint for goal"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a datapoint",
              action: "Delete a datapoint"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many datapoints for a goal",
              action: "Get many datapoints for a goal"
            },
            {
              name: "Update",
              value: "update",
              description: "Update a datapoint",
              action: "Update a datapoint"
            }
          ],
          default: "create",
          required: true
        },
        {
          displayName: "Goal Name or ID",
          name: "goalName",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getGoals"
          },
          displayOptions: {
            show: {
              resource: ["datapoint"]
            }
          },
          default: "",
          description: 'The name of the goal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          required: true
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["getAll"],
              resource: ["datapoint"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          displayOptions: {
            show: {
              operation: ["getAll"],
              resource: ["datapoint"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 300
          },
          default: 30,
          description: "Max number of results to return"
        },
        {
          displayName: "Value",
          name: "value",
          type: "number",
          default: 1,
          placeholder: "",
          description: "Datapoint value to send",
          displayOptions: {
            show: {
              resource: ["datapoint"],
              operation: ["create"]
            }
          },
          required: true
        },
        {
          displayName: "Datapoint ID",
          name: "datapointId",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operation: ["update", "delete"]
            }
          },
          required: true
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["datapoint"],
              operation: ["create"]
            }
          },
          options: [
            {
              displayName: "Comment",
              name: "comment",
              type: "string",
              default: ""
            },
            {
              displayName: "Timestamp",
              name: "timestamp",
              type: "dateTime",
              default: "",
              placeholder: "",
              description: 'Defaults to "now" if none is passed in, or the existing timestamp if the datapoint is being updated rather than created'
            },
            {
              displayName: "Request ID",
              name: "requestid",
              type: "string",
              default: "",
              placeholder: "",
              description: "String to uniquely identify a datapoint"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add field",
          default: {},
          displayOptions: {
            show: {
              resource: ["datapoint"],
              operation: ["getAll"]
            }
          },
          options: [
            {
              displayName: "Sort",
              name: "sort",
              type: "string",
              default: "id",
              placeholder: "",
              description: "Attribute to sort on"
            }
          ]
        },
        {
          displayName: "Update Fields",
          name: "updateFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["datapoint"],
              operation: ["update"]
            }
          },
          options: [
            {
              displayName: "Value",
              name: "value",
              type: "number",
              default: 1,
              placeholder: "",
              description: "Datapoint value to send"
            },
            {
              displayName: "Comment",
              name: "comment",
              type: "string",
              default: ""
            },
            {
              displayName: "Timestamp",
              name: "timestamp",
              type: "dateTime",
              default: "",
              placeholder: "",
              description: 'Defaults to "now" if none is passed in, or the existing timestamp if the datapoint is being updated rather than created'
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available groups to display them to user so that they can
        // select them easily
        async getGoals() {
          const credentials = await this.getCredentials("beeminderApi");
          const endpoint = `/users/${credentials.user}/goals.json`;
          const returnData = [];
          const goals = await import_GenericFunctions.beeminderApiRequest.call(this, "GET", endpoint);
          for (const goal of goals) {
            returnData.push({
              name: goal.slug,
              value: goal.slug
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const timezone = this.getTimezone();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let results;
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "datapoint") {
          const goalName = this.getNodeParameter("goalName", i);
          if (operation === "create") {
            const value = this.getNodeParameter("value", i);
            const options = this.getNodeParameter("additionalFields", i);
            const data = {
              value,
              goalName
            };
            Object.assign(data, options);
            if (data.timestamp) {
              data.timestamp = import_moment_timezone.default.tz(data.timestamp, timezone).unix();
            }
            results = await import_Beeminder_node.createDatapoint.call(this, data);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(results),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const data = {
              goalName
            };
            Object.assign(data, options);
            if (!returnAll) {
              data.count = this.getNodeParameter("limit", 0);
            }
            results = await import_Beeminder_node.getAllDatapoints.call(this, data);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(results),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            const datapointId = this.getNodeParameter("datapointId", i);
            const options = this.getNodeParameter("updateFields", i);
            const data = {
              goalName,
              datapointId
            };
            Object.assign(data, options);
            if (data.timestamp) {
              data.timestamp = import_moment_timezone.default.tz(data.timestamp, timezone).unix();
            }
            results = await import_Beeminder_node.updateDatapoint.call(this, data);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(results),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            const datapointId = this.getNodeParameter("datapointId", i);
            const data = {
              goalName,
              datapointId
            };
            results = await import_Beeminder_node.deleteDatapoint.call(this, data);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(results),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {}, itemIndex: i });
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
  Beeminder
});
//# sourceMappingURL=Beeminder.node.js.map