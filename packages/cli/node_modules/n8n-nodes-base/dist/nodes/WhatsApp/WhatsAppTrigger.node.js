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
var WhatsAppTrigger_node_exports = {};
__export(WhatsAppTrigger_node_exports, {
  WhatsAppTrigger: () => WhatsAppTrigger,
  filterStatuses: () => filterStatuses
});
module.exports = __toCommonJS(WhatsAppTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
const filterStatuses = (events, allowedStatuses) => {
  if (!allowedStatuses) return events;
  if (!allowedStatuses.length) {
    return events.filter((event) => event?.statuses ? false : true);
  }
  if (!allowedStatuses.includes("all")) {
    return events.filter((event) => {
      const statuses = event.statuses;
      if (statuses?.length) {
        return statuses.some((status) => allowedStatuses.includes(status.status));
      }
      return true;
    });
  }
  return events;
};
class WhatsAppTrigger {
  constructor() {
    this.description = {
      displayName: "WhatsApp Trigger",
      name: "whatsAppTrigger",
      icon: "file:whatsapp.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle WhatsApp events via webhooks",
      defaults: {
        name: "WhatsApp Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "whatsAppTriggerApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "setup",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: "webhook"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Due to Facebook API limitations, you can use just one WhatsApp trigger for each Facebook App",
          name: "whatsAppNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Trigger On",
          name: "updates",
          type: "multiOptions",
          required: true,
          default: [],
          options: [
            {
              name: "Account Review Update",
              value: "account_review_update"
            },
            {
              name: "Account Update",
              value: "account_update"
            },
            {
              name: "Business Capability Update",
              value: "business_capability_update"
            },
            {
              name: "Message Template Quality Update",
              value: "message_template_quality_update"
            },
            {
              name: "Message Template Status Update",
              value: "message_template_status_update"
            },
            {
              name: "Messages",
              value: "messages"
            },
            {
              name: "Phone Number Name Update",
              value: "phone_number_name_update"
            },
            {
              name: "Phone Number Quality Update",
              value: "phone_number_quality_update"
            },
            {
              name: "Security",
              value: "security"
            },
            {
              name: "Template Category Update",
              value: "template_category_update"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              // https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#message-status-updates
              displayName: "Receive Message Status Updates",
              name: "messageStatusUpdates",
              type: "multiOptions",
              default: ["all"],
              description: "WhatsApp sends notifications to the Trigger when the status of a message changes (for example from Sent to Delivered and from Delivered to Read). To avoid multiple executions for one WhatsApp message, you can set the Trigger to execute only on selected message status updates.",
              options: [
                {
                  name: "All",
                  value: "all"
                },
                {
                  name: "Deleted",
                  value: "deleted"
                },
                {
                  name: "Delivered",
                  value: "delivered"
                },
                {
                  name: "Failed",
                  value: "failed"
                },
                {
                  name: "Read",
                  value: "read"
                },
                {
                  name: "Sent",
                  value: "sent"
                }
              ]
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const credentials = await this.getCredentials("whatsAppTriggerApi");
          const updates = this.getNodeParameter("updates", []);
          const subscribedEvents = updates.sort().join(",");
          const appId = credentials.clientId;
          const webhooks = await import_GenericFunctions.appWebhookSubscriptionList.call(this, appId);
          const subscription = webhooks.find(
            (webhook) => webhook.object === "whatsapp_business_account" && webhook.fields.map((x) => x.name).sort().join(",") === subscribedEvents && webhook.active
          );
          if (!subscription) {
            return false;
          }
          if (subscription.callback_url !== webhookUrl) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The WhatsApp App ID ${appId} already has a webhook subscription. Delete it or use another App before executing the trigger. Due to WhatsApp API limitations, you can have just one trigger per App.`,
              { level: "warning" }
            );
          }
          if (subscription?.fields.map((x) => x.name).sort().join(",") !== subscribedEvents) {
            await import_GenericFunctions.appWebhookSubscriptionDelete.call(this, appId, "whatsapp_business_account");
            return false;
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const credentials = await this.getCredentials("whatsAppTriggerApi");
          const appId = credentials.clientId;
          const updates = this.getNodeParameter("updates", []);
          const verifyToken = this.getNode().id;
          await import_GenericFunctions.appWebhookSubscriptionCreate.call(this, appId, {
            object: "whatsapp_business_account",
            callback_url: webhookUrl,
            verify_token: verifyToken,
            fields: JSON.stringify(updates),
            include_values: true
          });
          return true;
        },
        async delete() {
          const credentials = await this.getCredentials("whatsAppTriggerApi");
          const appId = credentials.clientId;
          await import_GenericFunctions.appWebhookSubscriptionDelete.call(this, appId, "whatsapp_business_account");
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    const query = this.getQueryData();
    const res = this.getResponseObject();
    const req = this.getRequestObject();
    const headerData = this.getHeaderData();
    const credentials = await this.getCredentials("whatsAppTriggerApi");
    if (this.getWebhookName() === "setup") {
      if (query["hub.challenge"]) {
        if (this.getNode().id !== query["hub.verify_token"]) {
          return {};
        }
        res.status(200).send(query["hub.challenge"]).end();
        return { noWebhookResponse: true };
      }
    }
    const computedSignature = (0, import_crypto.createHmac)("sha256", credentials.clientSecret).update(req.rawBody).digest("hex");
    if (headerData["x-hub-signature-256"] !== `sha256=${computedSignature}`) {
      return {};
    }
    if (bodyData.object !== "whatsapp_business_account") {
      return {};
    }
    const events = await Promise.all(
      bodyData.entry.map((entry) => entry.changes).flat().map((change) => ({ ...change.value, field: change.field }))
    );
    const options = this.getNodeParameter("options", {});
    const returnData = filterStatuses(events, options.messageStatusUpdates);
    if (returnData.length === 0) return {};
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsAppTrigger,
  filterStatuses
});
//# sourceMappingURL=WhatsAppTrigger.node.js.map