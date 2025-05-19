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
var InvoiceNinjaTrigger_node_exports = {};
__export(InvoiceNinjaTrigger_node_exports, {
  InvoiceNinjaTrigger: () => InvoiceNinjaTrigger
});
module.exports = __toCommonJS(InvoiceNinjaTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class InvoiceNinjaTrigger {
  constructor() {
    this.description = {
      displayName: "Invoice Ninja Trigger",
      name: "invoiceNinjaTrigger",
      icon: "file:invoiceNinja.svg",
      group: ["trigger"],
      version: [1, 2],
      description: "Starts the workflow when Invoice Ninja events occur",
      defaults: {
        name: "Invoice Ninja Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "invoiceNinjaApi",
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
          displayName: "API Version",
          name: "apiVersion",
          type: "options",
          isNodeSetting: true,
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          options: [
            {
              name: "Version 4",
              value: "v4"
            },
            {
              name: "Version 5",
              value: "v5"
            }
          ],
          default: "v4"
        },
        {
          displayName: "API Version",
          name: "apiVersion",
          type: "options",
          isNodeSetting: true,
          displayOptions: {
            show: {
              "@version": [2]
            }
          },
          options: [
            {
              name: "Version 4",
              value: "v4"
            },
            {
              name: "Version 5",
              value: "v5"
            }
          ],
          default: "v5"
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          options: [
            {
              name: "Client Created",
              value: "create_client"
            },
            {
              name: "Invoice Created",
              value: "create_invoice"
            },
            {
              name: "Payment Created",
              value: "create_payment"
            },
            {
              name: "Quote Created",
              value: "create_quote"
            },
            {
              name: "Vendor Created",
              value: "create_vendor"
            }
          ],
          default: "",
          required: true
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          const apiVersion = this.getNodeParameter("apiVersion", 0);
          if (webhookData.webhookId === void 0) {
            return false;
          }
          if (apiVersion === "v5") {
            const registeredWebhooks = await import_GenericFunctions.invoiceNinjaApiRequestAllItems.call(
              this,
              "data",
              "GET",
              "/webhooks"
            );
            for (const webhook of registeredWebhooks) {
              if (webhook.target_url === webhookUrl && webhook.is_deleted === false && webhook.event_id === import_GenericFunctions.eventID[event]) {
                webhookData.webhookId = webhook.id;
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
          const apiVersion = this.getNodeParameter("apiVersion", 0);
          let responseData;
          if (apiVersion === "v4") {
            const endpoint = "/hooks";
            const body = {
              target_url: webhookUrl,
              event
            };
            responseData = await import_GenericFunctions.invoiceNinjaApiRequest.call(this, "POST", endpoint, body);
            webhookData.webhookId = responseData.id;
          }
          if (apiVersion === "v5") {
            const endpoint = "/webhooks";
            const body = {
              target_url: webhookUrl,
              event_id: import_GenericFunctions.eventID[event]
            };
            responseData = await import_GenericFunctions.invoiceNinjaApiRequest.call(this, "POST", endpoint, body);
            webhookData.webhookId = responseData.data.id;
          }
          if (webhookData.webhookId === void 0) {
            return false;
          }
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const apiVersion = this.getNodeParameter("apiVersion", 0);
          const hooksEndpoint = apiVersion === "v4" ? "/hooks" : "/webhooks";
          if (webhookData.webhookId !== void 0) {
            const endpoint = `${hooksEndpoint}/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.invoiceNinjaApiRequest.call(this, "DELETE", endpoint);
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
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvoiceNinjaTrigger
});
//# sourceMappingURL=InvoiceNinjaTrigger.node.js.map