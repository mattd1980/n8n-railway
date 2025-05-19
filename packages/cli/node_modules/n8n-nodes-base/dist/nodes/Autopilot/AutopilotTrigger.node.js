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
var AutopilotTrigger_node_exports = {};
__export(AutopilotTrigger_node_exports, {
  AutopilotTrigger: () => AutopilotTrigger
});
module.exports = __toCommonJS(AutopilotTrigger_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AutopilotTrigger {
  constructor() {
    this.description = {
      displayName: "Autopilot Trigger",
      name: "autopilotTrigger",
      icon: "file:autopilot.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle Autopilot events via webhooks",
      defaults: {
        name: "Autopilot Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "autopilotApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Contact Added",
              value: "contactAdded"
            },
            {
              name: "Contact Added To List",
              value: "contactAddedToList"
            },
            {
              name: "Contact Entered Segment",
              value: "contactEnteredSegment"
            },
            {
              name: "Contact Left Segment",
              value: "contactLeftSegment"
            },
            {
              name: "Contact Removed From List",
              value: "contactRemovedFromList"
            },
            {
              name: "Contact Unsubscribed",
              value: "contactUnsubscribed"
            },
            {
              name: "Contact Updated",
              value: "contactUpdated"
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          const { hooks: webhooks } = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", "/hooks");
          for (const webhook of webhooks) {
            if (webhook.target_url === webhookUrl && webhook.event === (0, import_change_case.snakeCase)(event)) {
              webhookData.webhookId = webhook.hook_id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const body = {
            event: (0, import_change_case.snakeCase)(event),
            target_url: webhookUrl
          };
          const webhook = await import_GenericFunctions.autopilotApiRequest.call(this, "POST", "/hook", body);
          webhookData.webhookId = webhook.hook_id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.autopilotApiRequest.call(this, "DELETE", `/hook/${webhookData.webhookId}`);
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutopilotTrigger
});
//# sourceMappingURL=AutopilotTrigger.node.js.map