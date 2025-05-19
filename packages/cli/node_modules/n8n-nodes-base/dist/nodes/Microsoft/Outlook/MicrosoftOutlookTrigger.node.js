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
var MicrosoftOutlookTrigger_node_exports = {};
__export(MicrosoftOutlookTrigger_node_exports, {
  MicrosoftOutlookTrigger: () => MicrosoftOutlookTrigger
});
module.exports = __toCommonJS(MicrosoftOutlookTrigger_node_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./trigger/GenericFunctions");
var import_MessageDescription = require("./trigger/MessageDescription");
var import_methods = require("./v2/methods");
class MicrosoftOutlookTrigger {
  constructor() {
    this.description = {
      displayName: "Microsoft Outlook Trigger",
      name: "microsoftOutlookTrigger",
      icon: "file:outlook.svg",
      group: ["trigger"],
      version: 1,
      description: "Fetches emails from Microsoft Outlook and starts the workflow on specified polling intervals.",
      subtitle: '={{"Microsoft Outlook Trigger"}}',
      defaults: {
        name: "Microsoft Outlook Trigger"
      },
      credentials: [
        {
          name: "microsoftOutlookOAuth2Api",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Trigger On",
          name: "event",
          type: "options",
          default: "messageReceived",
          options: [
            {
              name: "Message Received",
              value: "messageReceived"
            }
          ]
        },
        ...import_MessageDescription.properties
      ]
    };
    this.methods = { loadOptions: import_methods.loadOptions };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    let responseData;
    const now = import_luxon.DateTime.now().toISO();
    const startDate = webhookData.lastTimeChecked || now;
    const endDate = now;
    try {
      const pollStartDate = startDate;
      const pollEndDate = endDate;
      responseData = await import_GenericFunctions.getPollResponse.call(this, pollStartDate, pollEndDate);
      if (!responseData?.length) {
        webhookData.lastTimeChecked = endDate;
        return null;
      }
    } catch (error) {
      if (this.getMode() === "manual" || !webhookData.lastTimeChecked) {
        throw error;
      }
      const workflow = this.getWorkflow();
      const node = this.getNode();
      this.logger.error(
        `There was a problem in '${node.name}' node in workflow '${workflow.id}': '${error.description}'`,
        {
          node: node.name,
          workflowId: workflow.id,
          error
        }
      );
    }
    webhookData.lastTimeChecked = endDate;
    if (Array.isArray(responseData) && responseData.length) {
      return [responseData];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOutlookTrigger
});
//# sourceMappingURL=MicrosoftOutlookTrigger.node.js.map