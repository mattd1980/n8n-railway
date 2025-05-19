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
var PayPalTrigger_node_exports = {};
__export(PayPalTrigger_node_exports, {
  PayPalTrigger: () => PayPalTrigger
});
module.exports = __toCommonJS(PayPalTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class PayPalTrigger {
  constructor() {
    this.description = {
      displayName: "PayPal Trigger",
      name: "payPalTrigger",
      icon: "file:paypal.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle PayPal events via webhooks",
      defaults: {
        name: "PayPal Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "payPalApi",
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
          required: true,
          default: [],
          description: 'The event to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          typeOptions: {
            loadOptionsMethod: "getEvents"
          },
          options: []
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the events types to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [
            {
              name: "*",
              value: "*",
              description: "Any time any event is triggered (Wildcard Event)"
            }
          ];
          let events;
          try {
            const endpoint = "/notifications/webhooks-event-types";
            events = await import_GenericFunctions.payPalApiRequest.call(this, endpoint, "GET");
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
          for (const event of events.event_types) {
            const eventName = (0, import_GenericFunctions.upperFist)(event.name);
            const eventId = event.name;
            const eventDescription = event.description;
            returnData.push({
              name: eventName,
              value: eventId,
              description: eventDescription
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
          const endpoint = `/notifications/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.payPalApiRequest.call(this, endpoint, "GET");
          } catch (error) {
            if (error.response && error.response.name === "INVALID_RESOURCE_ID") {
              delete webhookData.webhookId;
              return false;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events", []);
          const body = {
            url: webhookUrl,
            event_types: events.map((event) => {
              return { name: event };
            })
          };
          const endpoint = "/notifications/webhooks";
          const webhook = await import_GenericFunctions.payPalApiRequest.call(this, endpoint, "POST", body);
          if (webhook.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = webhook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/notifications/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.payPalApiRequest.call(this, endpoint, "DELETE", {});
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
    const webhookData = this.getWorkflowStaticData("node");
    const bodyData = this.getBodyData();
    const req = this.getRequestObject();
    const headerData = this.getHeaderData();
    const endpoint = "/notifications/verify-webhook-signature";
    const { env } = await this.getCredentials("payPalApi");
    if (env === "sanbox") {
      return {
        workflowData: [this.helpers.returnJsonArray(req.body)]
      };
    }
    if (headerData["paypal-auth-algo"] !== void 0 && headerData["paypal-cert-url"] !== void 0 && headerData["paypal-transmission-id"] !== void 0 && headerData["paypal-transmission-sig"] !== void 0 && headerData["paypal-transmission-time"] !== void 0) {
      const body = {
        auth_algo: headerData["paypal-auth-algo"],
        cert_url: headerData["paypal-cert-url"],
        transmission_id: headerData["paypal-transmission-id"],
        transmission_sig: headerData["paypal-transmission-sig"],
        transmission_time: headerData["paypal-transmission-time"],
        webhook_id: webhookData.webhookId,
        webhook_event: bodyData
      };
      const webhook = await import_GenericFunctions.payPalApiRequest.call(this, endpoint, "POST", body);
      if (webhook.verification_status !== "SUCCESS") {
        return {};
      }
    } else {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PayPalTrigger
});
//# sourceMappingURL=PayPalTrigger.node.js.map