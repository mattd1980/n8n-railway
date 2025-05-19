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
var N8nTrigger_node_exports = {};
__export(N8nTrigger_node_exports, {
  N8nTrigger: () => N8nTrigger
});
module.exports = __toCommonJS(N8nTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class N8nTrigger {
  constructor() {
    this.description = {
      displayName: "n8n Trigger",
      name: "n8nTrigger",
      icon: "file:n8nTrigger.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle events and perform actions on your n8n instance",
      eventTriggerDescription: "",
      mockManualExecution: true,
      defaults: {
        name: "n8n Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          required: true,
          default: [],
          description: `Specifies under which conditions an execution should happen:
				<ul>
					<li><b>Active Workflow Updated</b>: Triggers when this workflow is updated</li>
					<li><b>Instance Started</b>:  Triggers when this n8n instance is started or re-started</li>
					<li><b>Workflow Activated</b>: Triggers when this workflow is activated</li>
				</ul>`,
          options: [
            {
              name: "Active Workflow Updated",
              value: "update",
              description: "Triggers when this workflow is updated"
            },
            {
              name: "Instance Started",
              value: "init",
              description: "Triggers when this n8n instance is started or re-started"
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
    const events = this.getNodeParameter("events") || [];
    const activationMode = this.getActivationMode();
    if (events.includes(activationMode)) {
      let event;
      if (activationMode === "activate") {
        event = "Workflow activated";
      }
      if (activationMode === "update") {
        event = "Workflow updated";
      }
      if (activationMode === "init") {
        event = "Instance started";
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
  N8nTrigger
});
//# sourceMappingURL=N8nTrigger.node.js.map