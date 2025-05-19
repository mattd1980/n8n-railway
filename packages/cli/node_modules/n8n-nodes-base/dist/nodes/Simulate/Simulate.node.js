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
var Simulate_node_exports = {};
__export(Simulate_node_exports, {
  Simulate: () => Simulate
});
module.exports = __toCommonJS(Simulate_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_methods = require("./methods");
class Simulate {
  constructor() {
    this.description = {
      displayName: "Simulate",
      hidden: true,
      name: "simulate",
      group: ["organization"],
      version: 1,
      description: "Simulate a node",
      subtitle: "={{$parameter.subtitle || undefined}}",
      icon: "fa:arrow-right",
      defaults: {
        name: "Simulate",
        color: "#b0b0b0"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        import_descriptions.iconSelector,
        import_descriptions.subtitleProperty,
        {
          displayName: "Output",
          name: "output",
          type: "options",
          default: "all",
          noDataExpression: true,
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Returns all input items",
              value: "all"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Specify how many of input items to return",
              value: "specify"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Specify output as JSON",
              value: "custom"
            }
          ]
        },
        {
          displayName: "Number of Items",
          name: "numberOfItems",
          type: "number",
          default: 1,
          description: "Number input of items to return, if greater then input length all items will be returned",
          displayOptions: {
            show: {
              output: ["specify"]
            }
          },
          typeOptions: {
            minValue: 1
          }
        },
        {
          ...import_descriptions.jsonOutputProperty,
          displayOptions: {
            show: {
              output: ["custom"]
            }
          }
        },
        import_descriptions.executionDurationProperty
      ]
    };
    this.methods = { loadOptions: import_methods.loadOptions };
  }
  async execute() {
    const items = this.getInputData();
    let returnItems = [];
    const output = this.getNodeParameter("output", 0);
    if (output === "all") {
      returnItems = items;
    } else if (output === "specify") {
      const numberOfItems = this.getNodeParameter("numberOfItems", 0);
      returnItems = items.slice(0, numberOfItems);
    } else if (output === "custom") {
      let jsonOutput = this.getNodeParameter("jsonOutput", 0);
      if (typeof jsonOutput === "string") {
        try {
          jsonOutput = (0, import_n8n_workflow.jsonParse)(jsonOutput);
        } catch (error) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid JSON");
        }
      }
      if (!Array.isArray(jsonOutput)) {
        jsonOutput = [jsonOutput];
      }
      for (const item of jsonOutput) {
        returnItems.push({ json: item });
      }
    }
    const executionDuration = this.getNodeParameter("executionDuration", 0);
    if (executionDuration > 0) {
      await (0, import_n8n_workflow.sleep)(executionDuration);
    }
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Simulate
});
//# sourceMappingURL=Simulate.node.js.map