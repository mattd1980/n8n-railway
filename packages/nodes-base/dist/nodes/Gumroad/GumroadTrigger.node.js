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
var GumroadTrigger_node_exports = {};
__export(GumroadTrigger_node_exports, {
  GumroadTrigger: () => GumroadTrigger
});
module.exports = __toCommonJS(GumroadTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GumroadTrigger {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/node-class-description-missing-subtitle
    this.description = {
      displayName: "Gumroad Trigger",
      name: "gumroadTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:gumroad.png",
      group: ["trigger"],
      version: 1,
      description: "Handle Gumroad events via webhooks",
      defaults: {
        name: "Gumroad Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gumroadApi",
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
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          required: true,
          default: "",
          options: [
            {
              name: "Cancellation",
              value: "cancellation",
              description: "When subscribed to this resource, you will be notified of cancellations of the user's subscribers"
            },
            {
              name: "Dispute",
              value: "dispute",
              description: "When subscribed to this resource, you will be notified of the disputes raised against user's sales"
            },
            {
              name: "Dispute Won",
              value: "dispute_won",
              description: "When subscribed to this resource, you will be notified of the sale disputes won"
            },
            {
              name: "Refund",
              value: "refund",
              description: "When subscribed to this resource, you will be notified of refunds to the user's sales"
            },
            {
              name: "Sale",
              value: "sale",
              description: "When subscribed to this resource, you will be notified of the user's sales"
            }
          ],
          description: "The resource is gonna fire the event"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const endpoint = "/resource_subscriptions";
          const { resource_subscriptions } = await import_GenericFunctions.gumroadApiRequest.call(this, "GET", endpoint);
          if (Array.isArray(resource_subscriptions)) {
            for (const resource of resource_subscriptions) {
              if (resource.id === webhookData.webhookId) {
                return true;
              }
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const resource = this.getNodeParameter("resource");
          const endpoint = "/resource_subscriptions";
          const body = {
            post_url: webhookUrl,
            resource_name: resource
          };
          const { resource_subscription } = await import_GenericFunctions.gumroadApiRequest.call(this, "PUT", endpoint, body);
          webhookData.webhookId = resource_subscription.id;
          return true;
        },
        async delete() {
          let responseData;
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/resource_subscriptions/${webhookData.webhookId}`;
          try {
            responseData = await import_GenericFunctions.gumroadApiRequest.call(this, "DELETE", endpoint);
          } catch (error) {
            return false;
          }
          if (!responseData.success) {
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
  GumroadTrigger
});
//# sourceMappingURL=GumroadTrigger.node.js.map