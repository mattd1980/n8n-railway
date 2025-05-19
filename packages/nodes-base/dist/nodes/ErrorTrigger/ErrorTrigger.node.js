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
var ErrorTrigger_node_exports = {};
__export(ErrorTrigger_node_exports, {
  ErrorTrigger: () => ErrorTrigger
});
module.exports = __toCommonJS(ErrorTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class ErrorTrigger {
  constructor() {
    this.description = {
      displayName: "Error Trigger",
      name: "errorTrigger",
      icon: "fa:bug",
      iconColor: "blue",
      group: ["trigger"],
      version: 1,
      description: "Triggers the workflow when another workflow has an error",
      eventTriggerDescription: "",
      mockManualExecution: true,
      maxNodes: 1,
      defaults: {
        name: "Error Trigger",
        color: "#0000FF"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: 'This node will trigger when there is an error in another workflow, as long as that workflow is set up to do so. <a href="https://docs.n8n.io/integrations/core-nodes/n8n-nodes-base.errortrigger" target="_blank">More info<a>',
          name: "notice",
          type: "notice",
          default: ""
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const mode = this.getMode();
    if (mode === "manual" && items.length === 1 && Object.keys(items[0].json).length === 0 && items[0].binary === void 0) {
      const restApiUrl = this.getRestApiUrl();
      const urlParts = restApiUrl.split("/");
      urlParts.pop();
      urlParts.push("execution");
      const id = 231;
      items[0].json = {
        execution: {
          id,
          url: `${urlParts.join("/")}/workflow/1/${id}`,
          retryOf: "34",
          error: {
            message: "Example Error Message",
            stack: "Stacktrace"
          },
          lastNodeExecuted: "Node With Error",
          mode: "manual"
        },
        workflow: {
          id: "1",
          name: "Example Workflow"
        }
      };
    }
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorTrigger
});
//# sourceMappingURL=ErrorTrigger.node.js.map