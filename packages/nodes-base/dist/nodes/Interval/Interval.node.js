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
var Interval_node_exports = {};
__export(Interval_node_exports, {
  Interval: () => Interval
});
module.exports = __toCommonJS(Interval_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Interval {
  constructor() {
    this.description = {
      displayName: "Interval",
      name: "interval",
      icon: "fa:hourglass",
      group: ["trigger", "schedule"],
      version: 1,
      hidden: true,
      description: "Triggers the workflow in a given interval",
      eventTriggerDescription: "",
      activationMessage: "Your interval trigger will now trigger executions on the schedule you have defined.",
      defaults: {
        name: "Interval",
        color: "#00FF00"
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
          displayName: "Interval",
          name: "interval",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 1,
          description: "Interval value"
        },
        {
          displayName: "Unit",
          name: "unit",
          type: "options",
          options: [
            {
              name: "Seconds",
              value: "seconds"
            },
            {
              name: "Minutes",
              value: "minutes"
            },
            {
              name: "Hours",
              value: "hours"
            }
          ],
          default: "seconds",
          description: "Unit of the interval value"
        }
      ]
    };
  }
  async trigger() {
    const interval = this.getNodeParameter("interval");
    const unit = this.getNodeParameter("unit");
    if (interval <= 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "The interval has to be set to at least 1 or higher!"
      );
    }
    let intervalValue = interval;
    if (unit === "minutes") {
      intervalValue *= 60;
    }
    if (unit === "hours") {
      intervalValue *= 60 * 60;
    }
    const executeTrigger = () => {
      this.emit([this.helpers.returnJsonArray([{}])]);
    };
    intervalValue *= 1e3;
    if (intervalValue > 2147483647) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "The interval value is too large.");
    }
    const intervalObj = setInterval(executeTrigger, intervalValue);
    async function closeFunction() {
      clearInterval(intervalObj);
    }
    async function manualTriggerFunction() {
      executeTrigger();
    }
    return {
      closeFunction,
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Interval
});
//# sourceMappingURL=Interval.node.js.map