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
var Rundeck_node_exports = {};
__export(Rundeck_node_exports, {
  Rundeck: () => Rundeck
});
module.exports = __toCommonJS(Rundeck_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_RundeckApi = require("./RundeckApi");
class Rundeck {
  constructor() {
    this.description = {
      displayName: "Rundeck",
      name: "rundeck",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:rundeck.png",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Manage Rundeck API",
      defaults: {
        name: "Rundeck"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "rundeckApi",
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
              name: "Job",
              value: "job"
            }
          ],
          default: "job"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Execute",
              value: "execute",
              description: "Execute a job",
              action: "Execute a job"
            },
            {
              name: "Get Metadata",
              value: "getMetadata",
              description: "Get metadata of a job",
              action: "Get metadata of a job"
            }
          ],
          default: "execute"
        },
        // ----------------------------------
        //         job:execute
        // ----------------------------------
        {
          displayName: "Job ID",
          name: "jobid",
          type: "string",
          displayOptions: {
            show: {
              operation: ["execute"],
              resource: ["job"]
            }
          },
          default: "",
          placeholder: "Rundeck Job ID",
          required: true,
          description: "The job ID to execute"
        },
        {
          displayName: "Arguments",
          name: "arguments",
          placeholder: "Add Argument",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              operation: ["execute"],
              resource: ["job"]
            }
          },
          default: {},
          options: [
            {
              name: "arguments",
              displayName: "Arguments",
              values: [
                {
                  displayName: "Name",
                  name: "name",
                  type: "string",
                  default: ""
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: ""
                }
              ]
            }
          ]
        },
        {
          displayName: "Filter",
          name: "filter",
          type: "string",
          displayOptions: {
            show: {
              operation: ["execute"],
              resource: ["job"]
            }
          },
          default: "",
          placeholder: "Add Filters",
          description: "Filter Rundeck nodes by name"
        },
        // ----------------------------------
        //         job:getMetadata
        // ----------------------------------
        {
          displayName: "Job ID",
          name: "jobid",
          type: "string",
          displayOptions: {
            show: {
              operation: ["getMetadata"],
              resource: ["job"]
            }
          },
          default: "",
          placeholder: "Rundeck Job ID",
          required: true,
          description: "The job ID to get metadata off"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const operation = this.getNodeParameter("operation", 0);
    const resource = this.getNodeParameter("resource", 0);
    const rundeckApi = new import_RundeckApi.RundeckApi(this);
    await rundeckApi.init();
    for (let i = 0; i < length; i++) {
      if (resource === "job") {
        if (operation === "execute") {
          const jobid = this.getNodeParameter("jobid", i);
          const rundeckArguments = this.getNodeParameter("arguments", i).arguments;
          const filter = this.getNodeParameter("filter", i);
          const response = await rundeckApi.executeJob(jobid, rundeckArguments, filter);
          returnData.push(response);
        } else if (operation === "getMetadata") {
          const jobid = this.getNodeParameter("jobid", i);
          const response = await rundeckApi.getJobMetadata(jobid);
          returnData.push(response);
        } else {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not supported!`,
            { itemIndex: i }
          );
        }
      } else {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The resource "${resource}" is not supported!`,
          { itemIndex: i }
        );
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Rundeck
});
//# sourceMappingURL=Rundeck.node.js.map