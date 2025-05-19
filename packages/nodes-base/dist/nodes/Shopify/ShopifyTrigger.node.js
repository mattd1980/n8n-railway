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
var ShopifyTrigger_node_exports = {};
__export(ShopifyTrigger_node_exports, {
  ShopifyTrigger: () => ShopifyTrigger
});
module.exports = __toCommonJS(ShopifyTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class ShopifyTrigger {
  constructor() {
    this.description = {
      displayName: "Shopify Trigger",
      name: "shopifyTrigger",
      icon: "file:shopify.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle Shopify events via webhooks",
      defaults: {
        name: "Shopify Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "shopifyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "shopifyAccessTokenApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "shopifyOAuth2Api",
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
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            },
            {
              name: "API Key",
              value: "apiKey"
            }
          ],
          default: "apiKey"
        },
        {
          displayName: "Trigger On",
          name: "topic",
          type: "options",
          default: "",
          options: [
            {
              name: "App Uninstalled",
              value: "app/uninstalled"
            },
            {
              name: "Cart Created",
              value: "carts/create"
            },
            {
              name: "Cart Updated",
              value: "carts/update"
            },
            {
              name: "Checkout Created",
              value: "checkouts/create"
            },
            {
              name: "Checkout Delete",
              value: "checkouts/delete"
            },
            {
              name: "Checkout Update",
              value: "checkouts/update"
            },
            {
              name: "Collection Created",
              value: "collections/create"
            },
            {
              name: "Collection Deleted",
              value: "collections/delete"
            },
            {
              name: "Collection Listings Added",
              value: "collection_listings/add"
            },
            {
              name: "Collection Listings Removed",
              value: "collection_listings/remove"
            },
            {
              name: "Collection Listings Updated",
              value: "collection_listings/update"
            },
            {
              name: "Collection Updated",
              value: "collections/update"
            },
            {
              name: "Customer Created",
              value: "customers/create"
            },
            {
              name: "Customer Deleted",
              value: "customers/delete"
            },
            {
              name: "Customer Disabled",
              value: "customers/disable"
            },
            {
              name: "Customer Enabled",
              value: "customers/enable"
            },
            {
              name: "Customer Groups Created",
              value: "customer_groups/create"
            },
            {
              name: "Customer Groups Deleted",
              value: "customer_groups/delete"
            },
            {
              name: "Customer Groups Updated",
              value: "customer_groups/update"
            },
            {
              name: "Customer Updated",
              value: "customers/update"
            },
            {
              name: "Draft Orders Created",
              value: "draft_orders/create"
            },
            {
              name: "Draft Orders Deleted",
              value: "draft_orders/delete"
            },
            {
              name: "Draft Orders Updated",
              value: "draft_orders/update"
            },
            {
              name: "Fulfillment Created",
              value: "fulfillments/create"
            },
            {
              name: "Fulfillment Events Created",
              value: "fulfillment_events/create"
            },
            {
              name: "Fulfillment Events Deleted",
              value: "fulfillment_events/delete"
            },
            {
              name: "Fulfillment Updated",
              value: "fulfillments/update"
            },
            {
              name: "Inventory Items Created",
              value: "inventory_items/create"
            },
            {
              name: "Inventory Items Deleted",
              value: "inventory_items/delete"
            },
            {
              name: "Inventory Items Updated",
              value: "inventory_items/update"
            },
            {
              name: "Inventory Levels Connected",
              value: "inventory_levels/connect"
            },
            {
              name: "Inventory Levels Disconnected",
              value: "inventory_levels/disconnect"
            },
            {
              name: "Inventory Levels Updated",
              value: "inventory_levels/update"
            },
            {
              name: "Locale Created",
              value: "locales/create"
            },
            {
              name: "Locale Updated",
              value: "locales/update"
            },
            {
              name: "Location Created",
              value: "locations/create"
            },
            {
              name: "Location Deleted",
              value: "locations/delete"
            },
            {
              name: "Location Updated",
              value: "locations/update"
            },
            {
              name: "Order Cancelled",
              value: "orders/cancelled"
            },
            {
              name: "Order Created",
              value: "orders/create"
            },
            {
              name: "Order Fulfilled",
              value: "orders/fulfilled"
            },
            {
              name: "Order Paid",
              value: "orders/paid"
            },
            {
              name: "Order Partially Fulfilled",
              value: "orders/partially_fulfilled"
            },
            {
              name: "Order Transactions Created",
              value: "order_transactions/create"
            },
            {
              name: "Order Updated",
              value: "orders/updated"
            },
            {
              name: "Orders Deleted",
              value: "orders/delete"
            },
            {
              name: "Product Created",
              value: "products/create"
            },
            {
              name: "Product Deleted",
              value: "products/delete"
            },
            {
              name: "Product Listings Added",
              value: "product_listings/add"
            },
            {
              name: "Product Listings Removed",
              value: "product_listings/remove"
            },
            {
              name: "Product Listings Updated",
              value: "product_listings/update"
            },
            {
              name: "Product Updated",
              value: "products/update"
            },
            {
              name: "Refund Created",
              value: "refunds/create"
            },
            {
              name: "Shop Updated",
              value: "shop/update"
            },
            {
              name: "Tender Transactions Created",
              value: "tender_transactions/create"
            },
            {
              name: "Theme Created",
              value: "themes/create"
            },
            {
              name: "Theme Deleted",
              value: "themes/delete"
            },
            {
              name: "Theme Published",
              value: "themes/publish"
            },
            {
              name: "Theme Updated",
              value: "themes/update"
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const topic = this.getNodeParameter("topic");
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const endpoint = "/webhooks";
          const { webhooks } = await import_GenericFunctions.shopifyApiRequest.call(this, "GET", endpoint, {}, { topic });
          for (const webhook of webhooks) {
            if (webhook.address === webhookUrl) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const topic = this.getNodeParameter("topic");
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = "/webhooks.json";
          const body = {
            webhook: {
              topic,
              address: webhookUrl,
              format: "json"
            }
          };
          const responseData = await import_GenericFunctions.shopifyApiRequest.call(this, "POST", endpoint, body);
          if (responseData.webhook === void 0 || responseData.webhook.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.webhook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}.json`;
            try {
              await import_GenericFunctions.shopifyApiRequest.call(this, "DELETE", endpoint, {});
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
    const headerData = this.getHeaderData();
    const req = this.getRequestObject();
    const authentication = this.getNodeParameter("authentication");
    let secret = "";
    if (authentication === "apiKey") {
      const credentials = await this.getCredentials("shopifyApi");
      secret = credentials.sharedSecret;
    }
    if (authentication === "accessToken") {
      const credentials = await this.getCredentials("shopifyAccessTokenApi");
      secret = credentials.appSecretKey;
    }
    if (authentication === "oAuth2") {
      const credentials = await this.getCredentials("shopifyOAuth2Api");
      secret = credentials.clientSecret;
    }
    const topic = this.getNodeParameter("topic");
    if (headerData["x-shopify-topic"] !== void 0 && headerData["x-shopify-hmac-sha256"] !== void 0 && headerData["x-shopify-shop-domain"] !== void 0 && headerData["x-shopify-api-version"] !== void 0) {
      const computedSignature = (0, import_crypto.createHmac)("sha256", secret).update(req.rawBody).digest("base64");
      if (headerData["x-shopify-hmac-sha256"] !== computedSignature) {
        return {};
      }
      if (topic !== headerData["x-shopify-topic"]) {
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
  ShopifyTrigger
});
//# sourceMappingURL=ShopifyTrigger.node.js.map