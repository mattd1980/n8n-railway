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
var MailjetTrigger_node_exports = {};
__export(MailjetTrigger_node_exports, {
  MailjetTrigger: () => MailjetTrigger
});
module.exports = __toCommonJS(MailjetTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class MailjetTrigger {
  constructor() {
    this.description = {
      displayName: "Mailjet Trigger",
      name: "mailjetTrigger",
      icon: "file:mailjet.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Mailjet events via webhooks",
      defaults: {
        name: "Mailjet Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailjetEmailApi",
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
          default: "open",
          options: [
            {
              name: "email.blocked",
              value: "blocked"
            },
            {
              name: "email.bounce",
              value: "bounce"
            },
            {
              name: "email.open",
              value: "open"
            },
            {
              name: "email.sent",
              value: "sent"
            },
            {
              name: "email.spam",
              value: "spam"
            },
            {
              name: "email.unsub",
              value: "unsub"
            }
          ],
          description: "Determines which resource events the webhook is triggered for"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const endpoint = "/v3/rest/eventcallbackurl";
          const responseData = await import_GenericFunctions.mailjetApiRequest.call(this, "GET", endpoint);
          const event = this.getNodeParameter("event");
          const webhookUrl = this.getNodeWebhookUrl("default");
          for (const webhook of responseData.Data) {
            if (webhook.EventType === event && webhook.Url === webhookUrl) {
              const webhookData = this.getWorkflowStaticData("node");
              webhookData.webhookId = webhook.ID;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const endpoint = "/v3/rest/eventcallbackurl";
          const body = {
            Url: webhookUrl,
            EventType: event,
            Status: "alive",
            isBackup: "false"
          };
          const { Data } = await import_GenericFunctions.mailjetApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = Data[0].ID;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/v3/rest/eventcallbackurl/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.mailjetApiRequest.call(this, "DELETE", endpoint);
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
  MailjetTrigger
});
//# sourceMappingURL=MailjetTrigger.node.js.map