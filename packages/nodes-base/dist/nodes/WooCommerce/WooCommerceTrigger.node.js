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
var WooCommerceTrigger_node_exports = {};
__export(WooCommerceTrigger_node_exports, {
  WooCommerceTrigger: () => WooCommerceTrigger
});
module.exports = __toCommonJS(WooCommerceTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class WooCommerceTrigger {
  constructor() {
    this.description = {
      displayName: "WooCommerce Trigger",
      name: "wooCommerceTrigger",
      icon: "file:wooCommerce.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle WooCommerce events via webhooks",
      defaults: {
        name: "WooCommerce Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wooCommerceApi",
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
          required: true,
          default: "",
          options: [
            {
              name: "coupon.created",
              value: "coupon.created"
            },
            {
              name: "coupon.deleted",
              value: "coupon.deleted"
            },
            {
              name: "coupon.updated",
              value: "coupon.updated"
            },
            {
              name: "customer.created",
              value: "customer.created"
            },
            {
              name: "customer.deleted",
              value: "customer.deleted"
            },
            {
              name: "customer.updated",
              value: "customer.updated"
            },
            {
              name: "order.created",
              value: "order.created"
            },
            {
              name: "order.deleted",
              value: "order.deleted"
            },
            {
              name: "order.updated",
              value: "order.updated"
            },
            {
              name: "product.created",
              value: "product.created"
            },
            {
              name: "product.deleted",
              value: "product.deleted"
            },
            {
              name: "product.updated",
              value: "product.updated"
            }
          ],
          description: "Determines which resource events the webhook is triggered for"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const currentEvent = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const webhooks = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "GET",
            endpoint,
            {},
            { status: "active", per_page: 100 }
          );
          for (const webhook of webhooks) {
            if (webhook.status === "active" && webhook.delivery_url === webhookUrl && webhook.topic === currentEvent) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const credentials = await this.getCredentials("wooCommerceApi");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const secret = (0, import_GenericFunctions.getAutomaticSecret)(credentials);
          const endpoint = "/webhooks";
          const body = {
            delivery_url: webhookUrl,
            topic: event,
            secret
          };
          const { id } = await import_GenericFunctions.woocommerceApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = id;
          webhookData.secret = secret;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.woocommerceApiRequest.call(this, "DELETE", endpoint, {}, { force: true });
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          delete webhookData.secret;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const headerData = this.getHeaderData();
    const webhookData = this.getWorkflowStaticData("node");
    if (headerData["x-wc-webhook-id"] === void 0) {
      return {};
    }
    const computedSignature = (0, import_crypto.createHmac)("sha256", webhookData.secret).update(req.rawBody).digest("base64");
    if (headerData["x-wc-webhook-signature"] !== computedSignature) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WooCommerceTrigger
});
//# sourceMappingURL=WooCommerceTrigger.node.js.map