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
var MicrosoftTeamsTrigger_node_exports = {};
__export(MicrosoftTeamsTrigger_node_exports, {
  MicrosoftTeamsTrigger: () => MicrosoftTeamsTrigger
});
module.exports = __toCommonJS(MicrosoftTeamsTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils_trigger = require("./v2/helpers/utils-trigger");
var import_methods = require("./v2/methods");
var import_transport = require("./v2/transport");
class MicrosoftTeamsTrigger {
  constructor() {
    this.description = {
      displayName: "Microsoft Teams Trigger",
      name: "microsoftTeamsTrigger",
      icon: "file:teams.svg",
      group: ["trigger"],
      version: 1,
      description: "Triggers workflows in n8n based on events from Microsoft Teams, such as new messages or team updates, using specified configurations.",
      subtitle: "Microsoft Teams Trigger",
      defaults: {
        name: "Microsoft Teams Trigger"
      },
      credentials: [
        {
          name: "microsoftTeamsOAuth2Api",
          required: true
        }
      ],
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
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
          displayName: "Trigger On",
          name: "event",
          type: "options",
          default: "newChannelMessage",
          options: [
            {
              name: "New Channel",
              value: "newChannel",
              description: "A new channel is created"
            },
            {
              name: "New Channel Message",
              value: "newChannelMessage",
              description: "A message is posted to a channel"
            },
            {
              name: "New Chat",
              value: "newChat",
              description: "A new chat is created"
            },
            {
              name: "New Chat Message",
              value: "newChatMessage",
              description: "A message is posted to a chat"
            },
            {
              name: "New Team Member",
              value: "newTeamMember",
              description: "A new member is added to a team"
            }
          ],
          description: "Select the event to trigger the workflow"
        },
        {
          displayName: "Watch All Teams",
          name: "watchAllTeams",
          type: "boolean",
          default: false,
          description: "Whether to watch for the event in all the available teams",
          displayOptions: {
            show: {
              event: ["newChannel", "newChannelMessage", "newTeamMember"]
            }
          }
        },
        {
          displayName: "Team",
          name: "teamId",
          type: "resourceLocator",
          default: {
            mode: "list",
            value: ""
          },
          required: true,
          description: "Select a team from the list, enter an ID or a URL",
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a team...",
              typeOptions: {
                searchListMethod: "getTeams",
                searchable: true
              }
            },
            {
              displayName: "By ID",
              name: "id",
              type: "string",
              placeholder: "e.g., 61165b04-e4cc-4026-b43f-926b4e2a7182"
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "e.g., https://teams.microsoft.com/l/team/19%3A...groupId=your-team-id&tenantId=...",
              extractValue: {
                type: "regex",
                regex: /groupId=([0-9a-fA-F-]{36})/
              }
            }
          ],
          displayOptions: {
            show: {
              event: ["newChannel", "newChannelMessage", "newTeamMember"],
              watchAllTeams: [false]
            }
          }
        },
        {
          displayName: "Watch All Channels",
          name: "watchAllChannels",
          type: "boolean",
          default: false,
          description: "Whether to watch for the event in all the available channels",
          displayOptions: {
            show: {
              event: ["newChannelMessage"],
              watchAllTeams: [false]
            }
          }
        },
        {
          displayName: "Channel",
          name: "channelId",
          type: "resourceLocator",
          default: {
            mode: "list",
            value: ""
          },
          required: true,
          description: "Select a channel from the list, enter an ID or a URL",
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a channel...",
              typeOptions: {
                searchListMethod: "getChannels",
                searchable: true
              }
            },
            {
              displayName: "By ID",
              name: "id",
              type: "string",
              placeholder: "e.g., 19:-xlxyqXNSCxpI1SDzgQ_L9ZvzSR26pgphq1BJ9y7QJE1@thread.tacv2"
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "e.g., https://teams.microsoft.com/l/channel/19%3A...@thread.tacv2/...",
              extractValue: {
                type: "regex",
                regex: /channel\/([^\/?]+)/
              }
            }
          ],
          displayOptions: {
            show: {
              event: ["newChannelMessage"],
              watchAllTeams: [false],
              watchAllChannels: [false]
            }
          }
        },
        {
          displayName: "Watch All Chats",
          name: "watchAllChats",
          type: "boolean",
          default: false,
          description: "Whether to watch for the event in all the available chats",
          displayOptions: {
            show: {
              event: ["newChatMessage"]
            }
          }
        },
        {
          displayName: "Chat",
          name: "chatId",
          type: "resourceLocator",
          default: {
            mode: "list",
            value: ""
          },
          required: true,
          description: "Select a chat from the list, enter an ID or a URL",
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a chat...",
              typeOptions: {
                searchListMethod: "getChats",
                searchable: true
              }
            },
            {
              displayName: "By ID",
              name: "id",
              type: "string",
              placeholder: "19:7e2f1174-e8ee-4859-b8b1-a8d1cc63d276@unq.gbl.spaces"
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://teams.microsoft.com/_#/conversations/CHAT_ID",
              extractValue: {
                type: "regex",
                regex: /conversations\/([^\/?]+)/i
              }
            }
          ],
          displayOptions: {
            show: {
              event: ["newChatMessage"],
              watchAllChats: [false]
            }
          }
        }
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const event = this.getNodeParameter("event", 0);
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          try {
            const subscriptions = await import_transport.microsoftApiRequestAllItems.call(
              this,
              "value",
              "GET",
              "/v1.0/subscriptions"
            );
            const matchingSubscriptions = subscriptions.filter(
              (subscription) => subscription.notificationUrl === webhookUrl
            );
            const now = /* @__PURE__ */ new Date();
            const thresholdMs = 5 * 60 * 1e3;
            const validSubscriptions = matchingSubscriptions.filter((subscription) => {
              const expiration = new Date(subscription.expirationDateTime);
              return expiration.getTime() - now.getTime() > thresholdMs;
            });
            const resourcePaths = await import_utils_trigger.getResourcePath.call(this, event);
            const requiredResources = Array.isArray(resourcePaths) ? resourcePaths : [resourcePaths];
            const subscribedResources = validSubscriptions.map((sub) => sub.resource);
            const allResourcesSubscribed = requiredResources.every(
              (resource) => subscribedResources.includes(resource)
            );
            if (allResourcesSubscribed) {
              webhookData.subscriptionIds = validSubscriptions.map((sub) => sub.id);
              return true;
            }
            return false;
          } catch (error) {
            return false;
          }
        },
        async create() {
          const event = this.getNodeParameter("event", 0);
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          if (!webhookUrl || !webhookUrl.startsWith("https://")) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), {
              message: "Invalid Notification URL",
              description: `The webhook URL "${webhookUrl}" is invalid. Microsoft Graph requires an HTTPS URL.`
            });
          }
          const resourcePaths = await import_utils_trigger.getResourcePath.call(this, event);
          const subscriptionIds = [];
          if (Array.isArray(resourcePaths)) {
            await Promise.all(
              resourcePaths.map(async (resource) => {
                const subscription = await import_utils_trigger.createSubscription.call(this, webhookUrl, resource);
                subscriptionIds.push(subscription.id);
                return subscription;
              })
            );
            webhookData.subscriptionIds = subscriptionIds;
          } else {
            const subscription = await import_utils_trigger.createSubscription.call(this, webhookUrl, resourcePaths);
            webhookData.subscriptionIds = [subscription.id];
          }
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const storedIds = webhookData.subscriptionIds;
          if (!Array.isArray(storedIds)) {
            return false;
          }
          try {
            await Promise.all(
              storedIds.map(async (subscriptionId) => {
                try {
                  await import_transport.microsoftApiRequest.call(
                    this,
                    "DELETE",
                    `/v1.0/subscriptions/${subscriptionId}`
                  );
                } catch (error) {
                  if (error.httpStatusCode !== 404) {
                    throw error;
                  }
                }
              })
            );
            delete webhookData.subscriptionIds;
            return true;
          } catch (error) {
            return false;
          }
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const res = this.getResponseObject();
    if (req.query.validationToken) {
      res.status(200).send(req.query.validationToken);
      return { noWebhookResponse: true };
    }
    const eventNotifications = req.body.value;
    const response = {
      workflowData: eventNotifications.map((event) => [
        {
          json: event.resourceData ?? event
        }
      ])
    };
    return response;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftTeamsTrigger
});
//# sourceMappingURL=MicrosoftTeamsTrigger.node.js.map