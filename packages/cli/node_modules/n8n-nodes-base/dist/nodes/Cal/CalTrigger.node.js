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
var CalTrigger_node_exports = {};
__export(CalTrigger_node_exports, {
  CalTrigger: () => CalTrigger
});
module.exports = __toCommonJS(CalTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class CalTrigger {
  constructor() {
    this.description = {
      displayName: "Cal.com Trigger",
      name: "calTrigger",
      icon: { light: "file:cal.svg", dark: "file:cal.dark.svg" },
      group: ["trigger"],
      version: [1, 2],
      subtitle: '=Events: {{$parameter["events"].join(", ")}}',
      description: "Handle Cal.com events via webhooks",
      defaults: {
        name: "Cal.com Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "calApi",
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
              name: "Booking Cancelled",
              value: "BOOKING_CANCELLED",
              description: "Receive notifications when a Cal event is canceled"
            },
            {
              name: "Booking Created",
              value: "BOOKING_CREATED",
              description: "Receive notifications when a new Cal event is created"
            },
            {
              name: "Booking Rescheduled",
              value: "BOOKING_RESCHEDULED",
              description: "Receive notifications when a Cal event is rescheduled"
            },
            {
              name: "Meeting Ended",
              value: "MEETING_ENDED",
              description: "Receive notifications when a Cal event or meeting has ended"
            }
          ],
          default: [],
          required: true
        },
        {
          displayName: "API Version",
          name: "version",
          type: "options",
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          isNodeSetting: true,
          options: [
            {
              name: "Before v2.0",
              value: 1
            },
            {
              name: "v2.0 Onwards",
              value: 2
            }
          ],
          default: 1
        },
        {
          displayName: "API Version",
          name: "version",
          type: "options",
          displayOptions: {
            show: {
              "@version": [2]
            }
          },
          isNodeSetting: true,
          options: [
            {
              name: "Before v2.0",
              value: 1
            },
            {
              name: "v2.0 Onwards",
              value: 2
            }
          ],
          default: 2
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "App ID",
              name: "appId",
              type: "string",
              description: "The ID of the App to monitor",
              default: ""
            },
            {
              displayName: "EventType Name or ID",
              name: "eventTypeId",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getEventTypes"
              },
              description: 'The EventType to monitor. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
              default: ""
            },
            {
              displayName: "Payload Template",
              name: "payloadTemplate",
              type: "string",
              description: "Template to customize the webhook payload",
              default: "",
              typeOptions: {
                rows: 4
              }
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getEventTypes() {
          const returnData = [];
          const data = await import_GenericFunctions.calApiRequest.call(this, "GET", "/event-types", {});
          for (const item of data.event_types) {
            returnData.push({
              name: item.title,
              value: item.id
            });
          }
          return (0, import_GenericFunctions.sortOptionParameters)(returnData);
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const version = this.getNodeParameter("version", 0);
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const data = version === 2 ? await import_GenericFunctions.calApiRequest.call(this, "GET", "/webhooks", {}) : await import_GenericFunctions.calApiRequest.call(this, "GET", "/hooks", {});
          for (const webhook of data.webhooks) {
            if (webhook.subscriberUrl === webhookUrl) {
              for (const event of events) {
                if (!webhook.eventTriggers.includes(event)) {
                  return false;
                }
              }
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const version = this.getNodeParameter("version", 0);
          const webhookData = this.getWorkflowStaticData("node");
          const subscriberUrl = this.getNodeWebhookUrl("default");
          const eventTriggers = this.getNodeParameter("events");
          const options = this.getNodeParameter("options");
          const active = true;
          const body = {
            subscriberUrl,
            eventTriggers,
            active,
            ...options
          };
          const responseData = version === 2 ? await import_GenericFunctions.calApiRequest.call(this, "POST", "/webhooks", body) : await import_GenericFunctions.calApiRequest.call(this, "POST", "/hooks", body);
          if (responseData.webhook.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.webhook.id;
          return true;
        },
        async delete() {
          const version = this.getNodeParameter("version", 0);
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = version === 2 ? `/webhooks/${webhookData.webhookId}` : `/hooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.calApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    return {
      workflowData: [
        this.helpers.returnJsonArray({
          triggerEvent: req.body.triggerEvent,
          createdAt: req.body.createdAt,
          ...req.body.payload
        })
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalTrigger
});
//# sourceMappingURL=CalTrigger.node.js.map