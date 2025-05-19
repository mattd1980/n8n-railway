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
var ManualTrigger_node_exports = {};
__export(ManualTrigger_node_exports, {
  ManualTrigger: () => ManualTrigger
});
module.exports = __toCommonJS(ManualTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class ManualTrigger {
  constructor() {
    this.description = {
      displayName: "Manual Trigger",
      name: "manualTrigger",
      icon: "fa:mouse-pointer",
      group: ["trigger"],
      version: 1,
      description: "Runs the flow on clicking a button in n8n",
      eventTriggerDescription: "",
      maxNodes: 1,
      defaults: {
        name: "When clicking \u2018Execute workflow\u2019",
        color: "#909298"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: 'This node is where the workflow execution starts (when you click the \u2018test\u2019 button on the canvas).<br><br> <a data-action="showNodeCreator">Explore other ways to trigger your workflow</a> (e.g on a schedule, or a webhook)',
          name: "notice",
          type: "notice",
          default: ""
        }
      ]
    };
  }
  async trigger() {
    const manualTriggerFunction = async () => {
      this.emit([this.helpers.returnJsonArray([{}])]);
    };
    return {
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ManualTrigger
});
//# sourceMappingURL=ManualTrigger.node.js.map