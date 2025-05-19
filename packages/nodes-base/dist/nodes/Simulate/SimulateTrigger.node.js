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
var SimulateTrigger_node_exports = {};
__export(SimulateTrigger_node_exports, {
  SimulateTrigger: () => SimulateTrigger
});
module.exports = __toCommonJS(SimulateTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_methods = require("./methods");
class SimulateTrigger {
  constructor() {
    this.description = {
      hidden: true,
      displayName: "Simulate Trigger",
      name: "simulateTrigger",
      subtitle: "={{$parameter.subtitle || undefined}}",
      icon: "fa:arrow-right",
      group: ["trigger"],
      version: 1,
      description: "Simulate a trigger node",
      defaults: {
        name: "Simulate Trigger",
        color: "#b0b0b0"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        { ...import_descriptions.iconSelector, default: "n8n-nodes-base.manualTrigger" },
        import_descriptions.subtitleProperty,
        { ...import_descriptions.jsonOutputProperty, displayName: "Output (JSON)" },
        import_descriptions.executionDurationProperty
      ]
    };
    this.methods = { loadOptions: import_methods.loadOptions };
  }
  async trigger() {
    const returnItems = [];
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
    const executionDuration = this.getNodeParameter("executionDuration", 0);
    if (executionDuration > 0) {
      await (0, import_n8n_workflow.sleep)(executionDuration);
    }
    const manualTriggerFunction = async () => {
      this.emit([returnItems]);
    };
    return {
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SimulateTrigger
});
//# sourceMappingURL=SimulateTrigger.node.js.map