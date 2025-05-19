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
var MauticTrigger_node_exports = {};
__export(MauticTrigger_node_exports, {
  MauticTrigger: () => MauticTrigger
});
module.exports = __toCommonJS(MauticTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
var import_GenericFunctions = require("./GenericFunctions");
class MauticTrigger {
  constructor() {
    this.description = {
      displayName: "Mautic Trigger",
      name: "mauticTrigger",
      icon: "file:mautic.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Mautic events via webhooks",
      defaults: {
        name: "Mautic Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mauticApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["credentials"]
            }
          }
        },
        {
          name: "mauticOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
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
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Credentials",
              value: "credentials"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "credentials"
        },
        {
          displayName: "Event Names or IDs",
          name: "events",
          type: "multiOptions",
          description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          required: true,
          typeOptions: {
            loadOptionsMethod: "getEvents"
          },
          default: []
        },
        {
          displayName: "Events Order",
          name: "eventsOrder",
          type: "options",
          default: "ASC",
          options: [
            {
              name: "ASC",
              value: "ASC"
            },
            {
              name: "DESC",
              value: "DESC"
            }
          ],
          description: "Order direction for queued events in one webhook. Can be \u201CDESC\u201D or \u201CASC\u201D."
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the events to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [];
          const { triggers } = await import_GenericFunctions.mauticApiRequest.call(this, "GET", "/hooks/triggers");
          for (const [key, value] of Object.entries(triggers)) {
            const eventId = key;
            const eventName = value.label;
            const eventDecription = value.description;
            returnData.push({
              name: eventName,
              value: eventId,
              description: eventDecription
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
          const endpoint = `/hooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.mauticApiRequest.call(this, "GET", endpoint, {});
          } catch (error) {
            return false;
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events", 0);
          const eventsOrder = this.getNodeParameter("eventsOrder", 0);
          const urlParts = (0, import_url.parse)(webhookUrl);
          const body = {
            name: `n8n-webhook:${urlParts.path}`,
            description: "n8n webhook",
            webhookUrl,
            triggers: events,
            eventsOrderbyDir: eventsOrder,
            isPublished: true
          };
          const { hook } = await import_GenericFunctions.mauticApiRequest.call(this, "POST", "/hooks/new", body);
          webhookData.webhookId = hook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.mauticApiRequest.call(this, "DELETE", `/hooks/${webhookData.webhookId}/delete`);
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
  MauticTrigger
});
//# sourceMappingURL=MauticTrigger.node.js.map