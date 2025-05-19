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
var ActiveCampaignTrigger_node_exports = {};
__export(ActiveCampaignTrigger_node_exports, {
  ActiveCampaignTrigger: () => ActiveCampaignTrigger
});
module.exports = __toCommonJS(ActiveCampaignTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class ActiveCampaignTrigger {
  constructor() {
    this.description = {
      displayName: "ActiveCampaign Trigger",
      name: "activeCampaignTrigger",
      icon: { light: "file:activeCampaign.svg", dark: "file:activeCampaign.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Handle ActiveCampaign events via webhooks",
      defaults: {
        name: "ActiveCampaign Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "activeCampaignApi",
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
          displayName: "Event Names or IDs",
          name: "events",
          type: "multiOptions",
          description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getEvents"
          },
          default: [],
          options: []
        },
        {
          displayName: "Source",
          name: "sources",
          type: "multiOptions",
          options: [
            {
              name: "Public",
              value: "public",
              description: "Run the hooks when a contact triggers the action"
            },
            {
              name: "Admin",
              value: "admin",
              description: "Run the hooks when an admin user triggers the action"
            },
            {
              name: "Api",
              value: "api",
              description: "Run the hooks when an API call triggers the action"
            },
            {
              name: "System",
              value: "system",
              description: "Run the hooks when automated systems triggers the action"
            }
          ],
          default: []
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the events to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [];
          const events = await import_GenericFunctions.activeCampaignApiRequestAllItems.call(
            this,
            "GET",
            "/api/3/webhook/events",
            {},
            {},
            "webhookEvents"
          );
          for (const event of events) {
            const eventName = event;
            const eventId = event;
            returnData.push({
              name: eventName,
              value: eventId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const endpoint = `/api/3/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.activeCampaignApiRequest.call(this, "GET", endpoint, {});
          } catch (error) {
            return false;
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events", []);
          const sources = this.getNodeParameter("sources", "");
          const body = {
            webhook: {
              name: `n8n-webhook:${webhookUrl}`,
              url: webhookUrl,
              events,
              sources
            }
          };
          const { webhook } = await import_GenericFunctions.activeCampaignApiRequest.call(
            this,
            "POST",
            "/api/3/webhooks",
            body
          );
          webhookData.webhookId = webhook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.activeCampaignApiRequest.call(
              this,
              "DELETE",
              `/api/3/webhooks/${webhookData.webhookId}`,
              {}
            );
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
  ActiveCampaignTrigger
});
//# sourceMappingURL=ActiveCampaignTrigger.node.js.map