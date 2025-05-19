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
var GetResponseTrigger_node_exports = {};
__export(GetResponseTrigger_node_exports, {
  GetResponseTrigger: () => GetResponseTrigger
});
module.exports = __toCommonJS(GetResponseTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GetResponseTrigger {
  constructor() {
    this.description = {
      displayName: "GetResponse Trigger",
      name: "getResponseTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:getResponse.png",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when GetResponse events occur",
      defaults: {
        name: "GetResponse Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "getResponseApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "getResponseOAuth2Api",
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
          httpMethod: "GET",
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
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Customer Subscribed",
              value: "subscribe",
              description: "Receive notifications when a customer is subscribed to a list"
            },
            {
              name: "Customer Unsubscribed",
              value: "unsubscribe",
              description: "Receive notifications when a customer is unsubscribed from a list"
            },
            {
              name: "Email Clicked",
              value: "click",
              description: "Receive notifications when a email is clicked"
            },
            {
              name: "Email Opened",
              value: "open",
              description: "Receive notifications when a email is opened"
            },
            {
              name: "Survey Submitted",
              value: "survey",
              description: "Receive notifications when a survey is submitted"
            }
          ],
          default: [],
          required: true
        },
        {
          displayName: "List Names or IDs",
          name: "listIds",
          type: "multiOptions",
          description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          default: []
        },
        {
          displayName: "Options",
          name: "options",
          placeholder: "Add option",
          type: "collection",
          default: {},
          options: [
            {
              displayName: "Delete Current Subscription",
              name: "delete",
              type: "boolean",
              default: false,
              description: "Whether to delete the current subscription"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available teams to display them to user so that they can
        // select them easily
        async getLists() {
          const returnData = [];
          const lists = await import_GenericFunctions.getResponseApiRequestAllItems.call(this, "GET", "/campaigns");
          returnData.push({ name: "*", value: "*" });
          for (const list of lists) {
            returnData.push({
              name: list.name,
              value: list.campaignId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const deleteCurrentSubscription = this.getNodeParameter("options.delete", false);
          try {
            const data = await import_GenericFunctions.getresponseApiRequest.call(this, "GET", "/accounts/callbacks", {});
            if (data.url !== webhookUrl) {
              if (!deleteCurrentSubscription) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), data, {
                  message: `The webhook (${data.url}) is active in the account. Delete it manually or set the parameter "Delete Current Subscription" to true, and the node will delete it for you.`
                });
              }
            }
          } catch (error) {
            if (error.httpCode === "404") {
              return false;
            }
          }
          await import_GenericFunctions.getresponseApiRequest.call(this, "DELETE", "/accounts/callbacks");
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          const body = {
            url: webhookUrl,
            actions: events.reduce(
              (accumulator, currentValue) => {
                accumulator[currentValue] = true;
                return accumulator;
              },
              {}
            )
          };
          await import_GenericFunctions.getresponseApiRequest.call(this, "POST", "/accounts/callbacks", body);
          return true;
        },
        async delete() {
          try {
            await import_GenericFunctions.getresponseApiRequest.call(this, "DELETE", "/accounts/callbacks");
          } catch (error) {
            return false;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const query = this.getQueryData();
    const listIds = this.getNodeParameter("listIds");
    if (!listIds.includes("*") && !listIds.includes(query.CAMPAIGN_ID)) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(query)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetResponseTrigger
});
//# sourceMappingURL=GetResponseTrigger.node.js.map