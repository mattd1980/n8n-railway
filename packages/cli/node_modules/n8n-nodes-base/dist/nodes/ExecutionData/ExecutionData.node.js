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
var ExecutionData_node_exports = {};
__export(ExecutionData_node_exports, {
  ExecutionData: () => ExecutionData
});
module.exports = __toCommonJS(ExecutionData_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class ExecutionData {
  constructor() {
    this.description = {
      displayName: "Execution Data",
      name: "executionData",
      icon: "fa:tasks",
      group: ["input"],
      iconColor: "light-green",
      version: 1,
      description: "Add execution data for search",
      defaults: {
        name: "Execution Data",
        color: "#29A568"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Save important data using this node. It will be displayed on each execution for easy reference and you can filter by it.<br />Filtering is available on Pro and Enterprise plans. <a href='https://n8n.io/pricing/' target='_blank'>More Info</a>",
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          default: "save",
          noDataExpression: true,
          options: [
            {
              name: "Save Highlight Data (for Search/review)",
              value: "save",
              action: "Save Highlight Data (for search/review)"
            }
          ]
        },
        {
          displayName: "Data to Save",
          name: "dataToSave",
          placeholder: "Add Saved Field",
          type: "fixedCollection",
          typeOptions: {
            multipleValueButtonText: "Add Saved Field",
            multipleValues: true
          },
          displayOptions: {
            show: {
              operation: ["save"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Values",
              name: "values",
              values: [
                {
                  displayName: "Key",
                  name: "key",
                  type: "string",
                  default: "",
                  placeholder: "e.g. myKey"
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: "",
                  placeholder: "e.g. myValue"
                }
              ]
            }
          ]
        }
      ],
      hints: [
        {
          type: "warning",
          message: "Some keys are longer than 50 characters. They will be truncated.",
          displayCondition: "={{ $parameter.dataToSave.values.some((x) => x.key.length > 50) }}",
          whenToDisplay: "beforeExecution",
          location: "outputPane"
        },
        {
          type: "warning",
          message: "Some values are longer than 512 characters. They will be truncated.",
          displayCondition: "={{ $parameter.dataToSave.values.some((x) => x.value.length > 512) }}",
          whenToDisplay: "beforeExecution",
          location: "outputPane"
        }
      ]
    };
  }
  async execute() {
    const context = this.getWorkflowDataProxy(0);
    const items = this.getInputData();
    const operations = this.getNodeParameter("operation", 0);
    if (operations === "save") {
      for (let i = 0; i < items.length; i++) {
        const dataToSave = this.getNodeParameter("dataToSave", i, {}).values || [];
        const values = dataToSave.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {});
        context.$execution.customData.setAll(values);
      }
    }
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExecutionData
});
//# sourceMappingURL=ExecutionData.node.js.map