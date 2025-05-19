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
var PostmarkTrigger_node_exports = {};
__export(PostmarkTrigger_node_exports, {
  PostmarkTrigger: () => PostmarkTrigger
});
module.exports = __toCommonJS(PostmarkTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class PostmarkTrigger {
  constructor() {
    this.description = {
      displayName: "Postmark Trigger",
      name: "postmarkTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:postmark.png",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Postmark events occur",
      defaults: {
        name: "Postmark Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "postmarkApi",
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
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Bounce",
              value: "bounce",
              description: "Trigger on bounce"
            },
            {
              name: "Click",
              value: "click",
              description: "Trigger on click"
            },
            {
              name: "Delivery",
              value: "delivery",
              description: "Trigger on delivery"
            },
            {
              name: "Open",
              value: "open",
              description: "Trigger webhook on open"
            },
            {
              name: "Spam Complaint",
              value: "spamComplaint",
              description: "Trigger on spam complaint"
            },
            {
              name: "Subscription Change",
              value: "subscriptionChange",
              description: "Trigger on subscription change"
            }
          ],
          default: [],
          required: true,
          description: "Webhook events that will be enabled for that endpoint"
        },
        {
          displayName: "First Open",
          name: "firstOpen",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: 'Only fires on first open for event "Open"',
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              events: ["open"]
            }
          }
        },
        {
          displayName: "Include Content",
          name: "includeContent",
          description: 'Whether to include message content for events "Bounce" and "Spam Complaint"',
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              events: ["bounce", "spamComplaint"]
            }
          }
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          if (events.includes("bounce") || events.includes("spamComplaint")) {
            if (this.getNodeParameter("includeContent")) {
              events.push("includeContent");
            }
          }
          if (events.includes("open")) {
            if (this.getNodeParameter("firstOpen")) {
              events.push("firstOpen");
            }
          }
          const endpoint = "/webhooks";
          const responseData = await import_GenericFunctions.postmarkApiRequest.call(this, "GET", endpoint, {});
          if (responseData.Webhooks.length === 0) {
            return false;
          }
          for (const webhook of responseData.Webhooks) {
            if (webhook.Url === webhookUrl && (0, import_GenericFunctions.eventExists)(events, (0, import_GenericFunctions.convertTriggerObjectToStringArray)(webhook))) {
              webhookData.webhookId = webhook.ID;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const endpoint = "/webhooks";
          const body = {
            Url: webhookUrl,
            Triggers: {
              Open: {
                Enabled: false,
                PostFirstOpenOnly: false
              },
              Click: {
                Enabled: false
              },
              Delivery: {
                Enabled: false
              },
              Bounce: {
                Enabled: false,
                IncludeContent: false
              },
              SpamComplaint: {
                Enabled: false,
                IncludeContent: false
              },
              SubscriptionChange: {
                Enabled: false
              }
            }
          };
          const events = this.getNodeParameter("events");
          if (events.includes("open")) {
            body.Triggers.Open.Enabled = true;
            body.Triggers.Open.PostFirstOpenOnly = this.getNodeParameter("firstOpen");
          }
          if (events.includes("click")) {
            body.Triggers.Click.Enabled = true;
          }
          if (events.includes("delivery")) {
            body.Triggers.Delivery.Enabled = true;
          }
          if (events.includes("bounce")) {
            body.Triggers.Bounce.Enabled = true;
            body.Triggers.Bounce.IncludeContent = this.getNodeParameter("includeContent");
          }
          if (events.includes("spamComplaint")) {
            body.Triggers.SpamComplaint.Enabled = true;
            body.Triggers.SpamComplaint.IncludeContent = this.getNodeParameter(
              "includeContent"
            );
          }
          if (events.includes("subscriptionChange")) {
            body.Triggers.SubscriptionChange.Enabled = true;
          }
          const responseData = await import_GenericFunctions.postmarkApiRequest.call(this, "POST", endpoint, body);
          if (responseData.ID === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = responseData.ID;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            const body = {};
            try {
              await import_GenericFunctions.postmarkApiRequest.call(this, "DELETE", endpoint, body);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
          }
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
  PostmarkTrigger
});
//# sourceMappingURL=PostmarkTrigger.node.js.map