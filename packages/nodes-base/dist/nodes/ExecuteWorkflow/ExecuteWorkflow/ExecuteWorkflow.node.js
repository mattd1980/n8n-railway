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
var ExecuteWorkflow_node_exports = {};
__export(ExecuteWorkflow_node_exports, {
  ExecuteWorkflow: () => ExecuteWorkflow
});
module.exports = __toCommonJS(ExecuteWorkflow_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_methods = require("./methods");
var import_utilities = require("../../../utils/utilities");
var import_GenericFunctions2 = require("../../../utils/workflowInputsResourceMapping/GenericFunctions");
class ExecuteWorkflow {
  constructor() {
    this.description = {
      displayName: "Execute Sub-workflow",
      name: "executeWorkflow",
      icon: "fa:sign-in-alt",
      iconColor: "orange-red",
      group: ["transform"],
      version: [1, 1.1, 1.2],
      subtitle: '={{"Workflow: " + $parameter["workflowId"]}}',
      description: "Execute another workflow",
      defaults: {
        name: "Execute Workflow",
        color: "#ff6d5a"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "hidden",
          noDataExpression: true,
          default: "call_workflow",
          options: [
            {
              name: "Execute a Sub-Workflow",
              value: "call_workflow"
            }
          ]
        },
        {
          displayName: "This node is out of date. Please upgrade by removing it and adding a new one",
          name: "outdatedVersionWarning",
          type: "notice",
          displayOptions: { show: { "@version": [{ _cnd: { lte: 1.1 } }] } },
          default: ""
        },
        {
          displayName: "Source",
          name: "source",
          type: "options",
          options: [
            {
              name: "Database",
              value: "database",
              description: "Load the workflow from the database by ID"
            },
            {
              name: "Local File",
              value: "localFile",
              description: "Load the workflow from a locally saved file"
            },
            {
              name: "Parameter",
              value: "parameter",
              description: "Load the workflow from a parameter"
            },
            {
              name: "URL",
              value: "url",
              description: "Load the workflow from an URL"
            }
          ],
          default: "database",
          description: "Where to get the workflow to execute from",
          displayOptions: { show: { "@version": [{ _cnd: { lte: 1.1 } }] } }
        },
        {
          displayName: "Source",
          name: "source",
          type: "options",
          options: [
            {
              name: "Database",
              value: "database",
              description: "Load the workflow from the database by ID"
            },
            {
              name: "Define Below",
              value: "parameter",
              description: "Pass the JSON code of a workflow"
            }
          ],
          default: "database",
          description: "Where to get the workflow to execute from",
          displayOptions: { show: { "@version": [{ _cnd: { gte: 1.2 } }] } }
        },
        // ----------------------------------
        //         source:database
        // ----------------------------------
        {
          displayName: "Workflow ID",
          name: "workflowId",
          type: "string",
          displayOptions: {
            show: {
              source: ["database"],
              "@version": [1]
            }
          },
          default: "",
          required: true,
          hint: "Can be found in the URL of the workflow",
          description: "Note on using an expression here: if this node is set to run once with all items, they will all be sent to the <em>same</em> workflow. That workflow's ID will be calculated by evaluating the expression for the <strong>first input item</strong>."
        },
        {
          displayName: "Workflow",
          name: "workflowId",
          type: "workflowSelector",
          displayOptions: {
            show: {
              source: ["database"],
              "@version": [{ _cnd: { gte: 1.1 } }]
            }
          },
          default: "",
          required: true
        },
        // ----------------------------------
        //         source:localFile
        // ----------------------------------
        {
          displayName: "Workflow Path",
          name: "workflowPath",
          type: "string",
          displayOptions: {
            show: {
              source: ["localFile"]
            }
          },
          default: "",
          placeholder: "/data/workflow.json",
          required: true,
          description: "The path to local JSON workflow file to execute"
        },
        // ----------------------------------
        //         source:parameter
        // ----------------------------------
        {
          displayName: "Workflow JSON",
          name: "workflowJson",
          type: "json",
          typeOptions: {
            rows: 10
          },
          displayOptions: {
            show: {
              source: ["parameter"]
            }
          },
          default: "\n\n\n",
          required: true,
          description: "The workflow JSON code to execute"
        },
        // ----------------------------------
        //         source:url
        // ----------------------------------
        {
          displayName: "Workflow URL",
          name: "workflowUrl",
          type: "string",
          displayOptions: {
            show: {
              source: ["url"]
            }
          },
          default: "",
          placeholder: "https://example.com/workflow.json",
          required: true,
          description: "The URL from which to load the workflow from"
        },
        {
          displayName: 'Any data you pass into this node will be output by the Execute Workflow Trigger. <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/" target="_blank">More info</a>',
          name: "executeWorkflowNotice",
          type: "notice",
          default: "",
          displayOptions: { show: { "@version": [{ _cnd: { lte: 1.1 } }] } }
        },
        {
          displayName: "Workflow Inputs",
          name: "workflowInputs",
          type: "resourceMapper",
          noDataExpression: true,
          default: {
            mappingMode: "defineBelow",
            value: null
          },
          required: true,
          typeOptions: {
            loadOptionsDependsOn: ["workflowId.value"],
            resourceMapper: {
              localResourceMapperMethod: "loadSubWorkflowInputs",
              valuesLabel: "Workflow Inputs",
              mode: "map",
              fieldWords: {
                singular: "input",
                plural: "inputs"
              },
              addAllFields: true,
              multiKeyMatch: false,
              supportAutoMap: false,
              showTypeConversionOptions: true
            }
          },
          displayOptions: {
            show: {
              source: ["database"],
              "@version": [{ _cnd: { gte: 1.2 } }]
            },
            hide: {
              workflowId: [""]
            }
          }
        },
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          noDataExpression: true,
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Run once with all items",
              value: "once",
              description: "Pass all items into a single execution of the sub-workflow"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Run once for each item",
              value: "each",
              description: "Call the sub-workflow individually for each item"
            }
          ],
          default: "once"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Wait For Sub-Workflow Completion",
              name: "waitForSubWorkflow",
              type: "boolean",
              default: true,
              description: "Whether the main workflow should wait for the sub-workflow to complete its execution before proceeding"
            }
          ]
        }
      ],
      hints: [
        {
          type: "info",
          message: "Note on using an expression for workflow ID: Since this node is set to run once with all items, they will all be sent to the <em>same</em> workflow. That workflow's ID will be calculated by evaluating the expression for the <strong>first input item</strong>.",
          displayCondition: '={{ $rawParameter.workflowId.startsWith("=") && $parameter.mode === "once" && $nodeVersion >= 1.2 }}',
          whenToDisplay: "always",
          location: "outputPane"
        }
      ]
    };
    this.methods = {
      localResourceMapping: import_methods.localResourceMapping
    };
  }
  async execute() {
    const source = this.getNodeParameter("source", 0);
    const mode = this.getNodeParameter("mode", 0, false);
    const items = import_GenericFunctions2.getCurrentWorkflowInputData.call(this);
    const workflowProxy = this.getWorkflowDataProxy(0);
    const currentWorkflowId = workflowProxy.$workflow.id;
    if (mode === "each") {
      const returnData = [];
      for (let i = 0; i < items.length; i++) {
        try {
          const waitForSubWorkflow = this.getNodeParameter(
            "options.waitForSubWorkflow",
            i,
            true
          );
          const workflowInfo = await import_GenericFunctions.getWorkflowInfo.call(this, source, i);
          if (waitForSubWorkflow) {
            const executionResult = await this.executeWorkflow(
              workflowInfo,
              [items[i]],
              void 0,
              {
                parentExecution: {
                  executionId: workflowProxy.$execution.id,
                  workflowId: workflowProxy.$workflow.id
                }
              }
            );
            const workflowResult = executionResult.data;
            for (const [outputIndex, outputData] of workflowResult.entries()) {
              for (const item of outputData) {
                item.pairedItem = { item: i };
                item.metadata = {
                  subExecution: {
                    executionId: executionResult.executionId,
                    workflowId: workflowInfo.id ?? currentWorkflowId
                  }
                };
              }
              if (returnData[outputIndex] === void 0) {
                returnData[outputIndex] = [];
              }
              returnData[outputIndex].push(...outputData);
            }
          } else {
            const executionResult = await this.executeWorkflow(
              workflowInfo,
              [items[i]],
              void 0,
              {
                doNotWaitToFinish: true,
                parentExecution: {
                  executionId: workflowProxy.$execution.id,
                  workflowId: workflowProxy.$workflow.id
                }
              }
            );
            if (returnData.length === 0) {
              returnData.push([]);
            }
            returnData[0].push({
              ...items[i],
              metadata: {
                subExecution: {
                  workflowId: workflowInfo.id ?? currentWorkflowId,
                  executionId: executionResult.executionId
                }
              }
            });
          }
        } catch (error) {
          if (this.continueOnFail()) {
            if (returnData[i] === void 0) {
              returnData[i] = [];
            }
            const metadata = (0, import_n8n_workflow.parseErrorMetadata)(error);
            returnData[i].push({
              json: { error: error.message },
              pairedItem: { item: i },
              metadata
            });
            continue;
          }
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            message: `Error executing workflow with item at index ${i}`,
            description: error.message,
            itemIndex: i
          });
        }
      }
      this.setMetadata({
        subExecutionsCount: items.length
      });
      return returnData;
    } else {
      try {
        const waitForSubWorkflow = this.getNodeParameter(
          "options.waitForSubWorkflow",
          0,
          true
        );
        const workflowInfo = await import_GenericFunctions.getWorkflowInfo.call(this, source);
        const executionResult = await this.executeWorkflow(
          workflowInfo,
          items,
          void 0,
          {
            doNotWaitToFinish: !waitForSubWorkflow,
            parentExecution: {
              executionId: workflowProxy.$execution.id,
              workflowId: workflowProxy.$workflow.id
            }
          }
        );
        this.setMetadata({
          subExecution: {
            executionId: executionResult.executionId,
            workflowId: workflowInfo.id ?? workflowProxy.$workflow.id
          },
          subExecutionsCount: 1
        });
        if (!waitForSubWorkflow) {
          return [items];
        }
        const workflowResult = executionResult.data;
        const fallbackPairedItemData = (0, import_utilities.generatePairedItemData)(items.length);
        for (const output of workflowResult) {
          const sameLength = output.length === items.length;
          for (const [itemIndex, item] of output.entries()) {
            if (item.pairedItem) continue;
            if (sameLength) {
              item.pairedItem = { item: itemIndex };
            } else {
              item.pairedItem = fallbackPairedItemData;
            }
          }
        }
        return workflowResult;
      } catch (error) {
        const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
        if (this.continueOnFail()) {
          const metadata = (0, import_n8n_workflow.parseErrorMetadata)(error);
          return [
            [
              {
                json: { error: error.message },
                metadata,
                pairedItem
              }
            ]
          ];
        }
        throw error;
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExecuteWorkflow
});
//# sourceMappingURL=ExecuteWorkflow.node.js.map