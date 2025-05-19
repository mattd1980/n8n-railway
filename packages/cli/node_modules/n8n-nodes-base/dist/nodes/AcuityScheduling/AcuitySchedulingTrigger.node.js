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
var AcuitySchedulingTrigger_node_exports = {};
__export(AcuitySchedulingTrigger_node_exports, {
  AcuitySchedulingTrigger: () => AcuitySchedulingTrigger
});
module.exports = __toCommonJS(AcuitySchedulingTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AcuitySchedulingTrigger {
  constructor() {
    this.description = {
      displayName: "Acuity Scheduling Trigger",
      name: "acuitySchedulingTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:acuityScheduling.png",
      group: ["trigger"],
      version: 1,
      description: "Handle Acuity Scheduling events via webhooks",
      defaults: {
        name: "Acuity Scheduling Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "acuitySchedulingApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "acuitySchedulingOAuth2Api",
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
              name: "API Key",
              value: "apiKey"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiKey"
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "appointment.canceled",
              value: "appointment.canceled",
              description: "Is called whenever an appointment is canceled"
            },
            {
              name: "appointment.changed",
              value: "appointment.changed",
              description: "Is called when the appointment is changed in any way"
            },
            {
              name: "appointment.rescheduled",
              value: "appointment.rescheduled",
              description: "Is called when the appointment is rescheduled to a new time"
            },
            {
              name: "appointment.scheduled",
              value: "appointment.scheduled",
              description: "Is called once when an appointment is initially booked"
            },
            {
              name: "order.completed",
              value: "order.completed",
              description: "Is called when an order is completed"
            }
          ]
        },
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default does the webhook-data only contain the ID of the object. If this option gets activated, it will resolve the data automatically."
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
          const endpoint = "/webhooks";
          const webhooks = await import_GenericFunctions.acuitySchedulingApiRequest.call(this, "GET", endpoint);
          if (Array.isArray(webhooks)) {
            for (const webhook of webhooks) {
              if (webhook.id === webhookData.webhookId) {
                return true;
              }
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const body = {
            target: webhookUrl,
            event
          };
          const { id } = await import_GenericFunctions.acuitySchedulingApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.acuitySchedulingApiRequest.call(this, "DELETE", endpoint);
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
    const resolveData = this.getNodeParameter("resolveData", false);
    if (!resolveData) {
      return {
        workflowData: [this.helpers.returnJsonArray(req.body)]
      };
    }
    const event = this.getNodeParameter("event", false);
    const eventType = event.split(".").shift();
    const endpoint = `/${eventType}s/${req.body.id}`;
    const responseData = await import_GenericFunctions.acuitySchedulingApiRequest.call(this, "GET", endpoint, {});
    return {
      workflowData: [this.helpers.returnJsonArray(responseData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcuitySchedulingTrigger
});
//# sourceMappingURL=AcuitySchedulingTrigger.node.js.map