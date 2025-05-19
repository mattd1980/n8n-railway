"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SseTrigger_node_exports = {};
__export(SseTrigger_node_exports, {
  SseTrigger: () => SseTrigger
});
module.exports = __toCommonJS(SseTrigger_node_exports);
var import_eventsource = __toESM(require("eventsource"));
var import_n8n_workflow = require("n8n-workflow");
class SseTrigger {
  constructor() {
    this.description = {
      displayName: "SSE Trigger",
      name: "sseTrigger",
      icon: "fa:cloud-download-alt",
      iconColor: "dark-blue",
      group: ["trigger"],
      version: 1,
      description: "Triggers the workflow when Server-Sent Events occur",
      eventTriggerDescription: "",
      activationMessage: "You can now make calls to your SSE URL to trigger executions.",
      defaults: {
        name: "SSE Trigger",
        color: "#225577"
      },
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: "<b>While building your workflow</b>, click the 'execute step' button, then trigger an SSE event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time a change is detected, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
          active: "<b>While building your workflow</b>, click the 'execute step' button, then trigger an SSE event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time a change is detected, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
        },
        activationHint: "Once you\u2019ve finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won\u2019t see those executions here)."
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "URL",
          name: "url",
          type: "string",
          default: "",
          placeholder: "http://example.com",
          description: "The URL to receive the SSE from",
          required: true
        }
      ]
    };
  }
  async trigger() {
    const url = this.getNodeParameter("url");
    const eventSource = new import_eventsource.default(url);
    eventSource.onmessage = (event) => {
      const eventData = (0, import_n8n_workflow.jsonParse)(event.data, {
        errorMessage: "Invalid JSON for event data"
      });
      this.emit([this.helpers.returnJsonArray([eventData])]);
    };
    async function closeFunction() {
      eventSource.close();
    }
    return {
      closeFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SseTrigger
});
//# sourceMappingURL=SseTrigger.node.js.map