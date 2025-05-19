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
var MailchimpTrigger_node_exports = {};
__export(MailchimpTrigger_node_exports, {
  MailchimpTrigger: () => MailchimpTrigger
});
module.exports = __toCommonJS(MailchimpTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class MailchimpTrigger {
  constructor() {
    this.description = {
      displayName: "Mailchimp Trigger",
      name: "mailchimpTrigger",
      icon: { light: "file:mailchimp.svg", dark: "file:mailchimp.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Handle Mailchimp events via webhooks",
      defaults: {
        name: "Mailchimp Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailchimpApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "mailchimpOAuth2Api",
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
          name: "setup",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: "webhook"
        },
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
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          required: true,
          default: "",
          description: 'The list that is gonna fire the event. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          options: []
        },
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          required: true,
          default: [],
          description: "The events that can trigger the webhook and whether they are enabled",
          options: [
            {
              name: "Campaign Sent",
              value: "campaign",
              description: "Whether the webhook is triggered when a campaign is sent or cancelled"
            },
            {
              name: "Cleaned",
              value: "cleaned",
              description: "Whether the webhook is triggered when a subscriber's email address is cleaned from the list"
            },
            {
              name: "Email Address Updated",
              value: "upemail",
              description: "Whether the webhook is triggered when a subscriber's email address is changed"
            },
            {
              name: "Profile Updated",
              value: "profile",
              description: "Whether the webhook is triggered when a subscriber's profile is updated"
            },
            {
              name: "Subscribe",
              value: "subscribe",
              description: "Whether the webhook is triggered when a list subscriber is added"
            },
            {
              name: "Unsubscribe",
              value: "unsubscribe",
              description: "Whether the webhook is triggered when a list member unsubscribes"
            }
          ]
        },
        {
          displayName: "Sources",
          name: "sources",
          type: "multiOptions",
          required: true,
          default: [],
          description: "The possible sources of any events that can trigger the webhook and whether they are enabled",
          options: [
            {
              name: "User",
              value: "user",
              description: "Whether the webhook is triggered by subscriber-initiated actions"
            },
            {
              name: "Admin",
              value: "admin",
              description: "Whether the webhook is triggered by admin-initiated actions in the web interface"
            },
            {
              name: "API",
              value: "api",
              description: "Whether the webhook is triggered by actions initiated via the API"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available lists to display them to user so that they can
        // select them easily
        async getLists() {
          const returnData = [];
          const response = await import_GenericFunctions.mailchimpApiRequest.call(this, "/lists", "GET");
          const lists = response.lists;
          for (const list of lists) {
            const listName = list.name;
            const listId = list.id;
            returnData.push({
              name: listName,
              value: listId
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
          const listId = this.getNodeParameter("list");
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const endpoint = `/lists/${listId}/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.mailchimpApiRequest.call(this, endpoint, "GET");
          } catch (error) {
            if (error instanceof import_n8n_workflow.NodeApiError && error.cause && "isAxiosError" in error.cause && "statusCode" in error.cause) {
              if (error.cause.statusCode === 404) {
                return false;
              }
              throw error;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const listId = this.getNodeParameter("list");
          const events = this.getNodeParameter("events", []);
          const sources = this.getNodeParameter("sources", []);
          const body = {
            url: webhookUrl,
            events: events.reduce((object, currentValue) => {
              object[currentValue] = true;
              return object;
            }, {}),
            sources: sources.reduce((object, currentValue) => {
              object[currentValue] = true;
              return object;
            }, {})
          };
          const endpoint = `/lists/${listId}/webhooks`;
          const webhook = await import_GenericFunctions.mailchimpApiRequest.call(this, endpoint, "POST", body);
          if (webhook.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = webhook.id;
          webhookData.events = events;
          webhookData.sources = sources;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const listId = this.getNodeParameter("list");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/lists/${listId}/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.mailchimpApiRequest.call(this, endpoint, "DELETE", {});
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.events;
            delete webhookData.sources;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const webhookData = this.getWorkflowStaticData("node");
    const webhookName = this.getWebhookName();
    if (webhookName === "setup") {
      const res = this.getResponseObject();
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    const req = this.getRequestObject();
    if (req.body.id !== webhookData.id) {
      return {};
    }
    if (
      // @ts-ignore
      !webhookData.events.includes(req.body.type) && // @ts-ignore
      !webhookData.sources.includes(req.body.type)
    ) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailchimpTrigger
});
//# sourceMappingURL=MailchimpTrigger.node.js.map