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
var MailerLiteTriggerV1_node_exports = {};
__export(MailerLiteTriggerV1_node_exports, {
  MailerLiteTriggerV1: () => MailerLiteTriggerV1
});
module.exports = __toCommonJS(MailerLiteTriggerV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../GenericFunctions");
class MailerLiteTriggerV1 {
  constructor(baseDescription) {
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const { webhooks } = await import_GenericFunctions.mailerliteApiRequest.call(this, "GET", endpoint, {});
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl && webhook.event === event) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const body = {
            url: webhookUrl,
            event
          };
          const responseData = await import_GenericFunctions.mailerliteApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.mailerliteApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
    this.description = {
      ...baseDescription,
      displayName: "MailerLite Trigger",
      name: "mailerLiteTrigger",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when MailerLite events occur",
      defaults: {
        name: "MailerLite Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailerLiteApi",
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
          options: [
            {
              name: "Campaign Sent",
              value: "campaign.sent",
              description: "Fired when campaign is sent"
            },
            {
              name: "Subscriber Added Through Webform",
              value: "subscriber.added_through_webform",
              description: "Fired when a subscriber is added though a form"
            },
            {
              name: "Subscriber Added to Group",
              value: "subscriber.add_to_group",
              description: "Fired when a subscriber is added to a group"
            },
            {
              name: "Subscriber Automation Completed",
              value: "subscriber.automation_complete",
              description: "Fired when subscriber finishes automation"
            },
            {
              name: "Subscriber Automation Triggered",
              value: "subscriber.automation_triggered",
              description: "Fired when subscriber starts automation"
            },
            {
              name: "Subscriber Bounced",
              value: "subscriber.bounced",
              description: "Fired when an email address bounces"
            },
            {
              name: "Subscriber Complained",
              value: "subscriber.complaint",
              description: "Fired when subscriber marks a campaign as a spam"
            },
            {
              name: "Subscriber Created",
              value: "subscriber.create",
              description: "Fired when a new subscriber is added to an account"
            },
            {
              name: "Subscriber Removed From Group",
              value: "subscriber.remove_from_group",
              description: "Fired when a subscriber is removed from a group"
            },
            {
              name: "Subscriber Unsubscribe",
              value: "subscriber.unsubscribe",
              description: "Fired when a subscriber becomes unsubscribed"
            },
            {
              name: "Subscriber Updated",
              value: "subscriber.update",
              description: "Fired when any of the subscriber's custom fields are updated"
            }
          ],
          required: true,
          default: [],
          description: "The events to listen to"
        }
      ]
    };
  }
  async webhook() {
    const body = this.getBodyData();
    const events = body.events;
    return {
      workflowData: [this.helpers.returnJsonArray(events)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailerLiteTriggerV1
});
//# sourceMappingURL=MailerLiteTriggerV1.node.js.map