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
var Cron_node_exports = {};
__export(Cron_node_exports, {
  Cron: () => Cron
});
module.exports = __toCommonJS(Cron_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Cron {
  constructor() {
    this.description = {
      displayName: "Cron",
      name: "cron",
      icon: "fa:clock",
      group: ["trigger", "schedule"],
      version: 1,
      hidden: true,
      description: "Triggers the workflow at a specific time",
      eventTriggerDescription: "",
      activationMessage: "Your cron trigger will now trigger executions on the schedule you have defined.",
      defaults: {
        name: "Cron",
        color: "#29a568"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: `This workflow will run on the schedule you define here once you <a data-key="activate">activate</a> it.<br><br>For testing, you can also trigger it manually: by going back to the canvas and clicking 'execute workflow'`,
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Trigger Times",
          name: "triggerTimes",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add Time"
          },
          default: {},
          description: "Triggers for the workflow",
          placeholder: "Add Cron Time",
          options: import_n8n_workflow.NodeHelpers.cronNodeOptions
        }
      ]
    };
  }
  async trigger() {
    const triggerTimes = this.getNodeParameter("triggerTimes");
    const cronTimes = (triggerTimes.item || []).map(import_n8n_workflow.toCronExpression);
    const executeTrigger = () => {
      this.emit([this.helpers.returnJsonArray([{}])]);
    };
    cronTimes.forEach((cronTime) => this.helpers.registerCron(cronTime, executeTrigger));
    return {
      manualTriggerFunction: async () => executeTrigger()
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cron
});
//# sourceMappingURL=Cron.node.js.map