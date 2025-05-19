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
var BrevoTrigger_node_exports = {};
__export(BrevoTrigger_node_exports, {
  BrevoTrigger: () => BrevoTrigger
});
module.exports = __toCommonJS(BrevoTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class BrevoTrigger {
  constructor() {
    this.description = {
      credentials: [
        {
          name: "sendInBlueApi",
          required: true,
          displayOptions: {
            show: {}
          }
        }
      ],
      displayName: "Brevo Trigger",
      defaults: {
        name: "Brevo Trigger"
      },
      description: "Starts the workflow when Brevo events occur",
      group: ["trigger"],
      icon: "file:brevo.svg",
      inputs: [],
      // keep sendinblue name for backward compatibility
      name: "sendInBlueTrigger",
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      version: 1,
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhooks"
        }
      ],
      properties: [
        {
          displayName: "Resource",
          default: "transactional",
          name: "type",
          options: [
            { name: "Inbound", value: "inbound" },
            { name: "Marketing", value: "marketing" },
            { name: "Transactional", value: "transactional" }
          ],
          required: true,
          type: "options"
        },
        {
          displayName: "Trigger On",
          displayOptions: {
            show: {
              type: ["transactional"]
            }
          },
          name: "events",
          placeholder: "Add Event",
          options: [
            {
              name: "Email Blocked",
              value: "blocked",
              description: "Triggers when transactional email is blocked"
            },
            {
              name: "Email Clicked",
              value: "click",
              description: "Triggers when transactional email is clicked"
            },
            {
              name: "Email Deferred",
              value: "deferred",
              description: "Triggers when transactional email is deferred"
            },
            {
              name: "Email Delivered",
              value: "delivered",
              description: "Triggers when transactional email is delivered"
            },
            {
              name: "Email Hard Bounce",
              value: "hardBounce",
              description: "Triggers when transactional email is hard bounced"
            },
            {
              name: "Email Invalid",
              value: "invalid",
              description: "Triggers when transactional email is invalid"
            },
            {
              name: "Email Marked Spam",
              value: "spam",
              description: "Triggers when transactional email is set to spam"
            },
            {
              name: "Email Opened",
              value: "opened",
              description: "Triggers when transactional email is opened"
            },
            {
              name: "Email Sent",
              value: "request",
              description: "Triggers when transactional email is sent"
            },
            {
              name: "Email Soft-Bounce",
              value: "softBounce",
              description: "Triggers when transactional email is soft bounced"
            },
            {
              name: "Email Unique Open",
              value: "uniqueOpened",
              description: "Triggers when transactional email is unique opened"
            },
            {
              name: "Email Unsubscribed",
              value: "unsubscribed",
              description: "Triggers when transactional email is unsubscribed"
            }
          ],
          default: [],
          required: true,
          type: "multiOptions"
        },
        {
          displayName: "Trigger On",
          displayOptions: {
            show: {
              type: ["marketing"]
            }
          },
          name: "events",
          placeholder: "Add Event",
          options: [
            {
              name: "Marketing Email Clicked",
              value: "click",
              description: "Triggers when marketing email is clicked"
            },
            {
              name: "Marketing Email Delivered",
              value: "delivered",
              description: "Triggers when marketing email is delivered"
            },
            {
              name: "Marketing Email Hard Bounce",
              value: "hardBounce",
              description: "Triggers when marketing email is hard bounced"
            },
            {
              name: "Marketing Email List Addition",
              value: "listAddition",
              description: "Triggers when marketing email is clicked"
            },
            {
              name: "Marketing Email Opened",
              value: "opened",
              description: "Triggers when marketing email is opened"
            },
            {
              name: "Marketing Email Soft Bounce",
              value: "softBounce",
              description: "Triggers when marketing email is soft bounced"
            },
            {
              name: "Marketing Email Spam",
              value: "spam",
              description: "Triggers when marketing email is spam"
            },
            {
              name: "Marketing Email Unsubscribed",
              value: "unsubscribed",
              description: "Triggers when marketing email is unsubscribed"
            }
          ],
          default: [],
          required: true,
          type: "multiOptions"
        },
        {
          displayName: "Trigger On",
          displayOptions: {
            show: {
              type: ["inbound"]
            }
          },
          name: "events",
          placeholder: "Add Event",
          options: [
            {
              name: "Inbound Email Processed",
              value: "inboundEmailProcessed",
              description: "Triggers when inbound email is processed"
            }
          ],
          default: [],
          required: true,
          type: "multiOptions"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const type = this.getNodeParameter("type");
          const events = this.getNodeParameter("events");
          try {
            const { webhooks } = await import_GenericFunctions.BrevoWebhookApi.fetchWebhooks(this, type);
            for (const webhook of webhooks) {
              if (webhook.type === type && webhook.events.every((event) => events.includes(event)) && webhookUrl === webhook.url) {
                webhookData.webhookId = webhook.id;
                return true;
              }
            }
            return false;
          } catch (err) {
            return false;
          }
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const type = this.getNodeParameter("type");
          const events = this.getNodeParameter("events");
          const responseData = await import_GenericFunctions.BrevoWebhookApi.createWebHook(this, type, events, webhookUrl);
          if (responseData?.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            try {
              await import_GenericFunctions.BrevoWebhookApi.deleteWebhook(this, webhookData.webhookId);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
            delete webhookData.hookSecret;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrevoTrigger
});
//# sourceMappingURL=BrevoTrigger.node.js.map