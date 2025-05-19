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
var WorkflowTrigger_node_exports = {};
__export(WorkflowTrigger_node_exports, {
  WorkflowTrigger: () => WorkflowTrigger
});
module.exports = __toCommonJS(WorkflowTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class WorkflowTrigger {
  constructor() {
    this.description = {
      displayName: "Workflow Trigger",
      hidden: true,
      name: "workflowTrigger",
      icon: "fa:network-wired",
      iconColor: "orange-red",
      group: ["trigger"],
      version: 1,
      description: "Triggers based on various lifecycle events, like when a workflow is activated",
      eventTriggerDescription: "",
      mockManualExecution: true,
      activationMessage: "Your workflow will now trigger executions on the event you have defined.",
      defaults: {
        name: "Workflow Trigger",
        color: "#ff6d5a"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "This node is deprecated and would not be updated in the future. Please use 'n8n Trigger' node instead.",
          name: "oldVersionNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          required: true,
          default: [],
          description: `Specifies under which conditions an execution should happen:
					<ul>
						<li><b>Active Workflow Updated</b>: Triggers when this workflow is updated</li>
						<li><b>Workflow Activated</b>: Triggers when this workflow is activated</li>
					</ul>`,
          options: [
            {
              name: "Active Workflow Updated",
              value: "update",
              description: "Triggers when this workflow is updated"
            },
            {
              name: "Workflow Activated",
              value: "activate",
              description: "Triggers when this workflow is activated"
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const events = this.getNodeParameter("events", []);
    const activationMode = this.getActivationMode();
    if (events.includes(activationMode)) {
      let event;
      if (activationMode === "activate") {
        event = "Workflow activated";
      }
      if (activationMode === "update") {
        event = "Workflow updated";
      }
      this.emit([
        this.helpers.returnJsonArray([
          { event, timestamp: (/* @__PURE__ */ new Date()).toISOString(), workflow_id: this.getWorkflow().id }
        ])
      ]);
    }
    const manualTriggerFunction = async () => {
      this.emit([
        this.helpers.returnJsonArray([
          {
            event: "Manual execution",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            workflow_id: this.getWorkflow().id
          }
        ])
      ]);
    };
    return {
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkflowTrigger
});
//# sourceMappingURL=WorkflowTrigger.node.js.map