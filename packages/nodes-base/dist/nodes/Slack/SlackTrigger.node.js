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
var SlackTrigger_node_exports = {};
__export(SlackTrigger_node_exports, {
  SlackTrigger: () => SlackTrigger
});
module.exports = __toCommonJS(SlackTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SlackTriggerHelpers = require("./SlackTriggerHelpers");
var import_GenericFunctions = require("./V2/GenericFunctions");
class SlackTrigger {
  constructor() {
    this.description = {
      displayName: "Slack Trigger",
      name: "slackTrigger",
      icon: "file:slack.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["eventFilter"].join(", ")}}',
      description: "Handle Slack events via webhooks",
      defaults: {
        name: "Slack Trigger"
      },
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
      credentials: [
        {
          name: "slackApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "hidden",
          default: "accessToken"
        },
        {
          displayName: 'Set up a webhook in your Slack app to enable this node. <a href="https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger/#configure-a-webhook-in-slack" target="_blank">More info</a>',
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Trigger On",
          name: "trigger",
          type: "multiOptions",
          options: [
            {
              name: "Any Event",
              value: "any_event",
              description: "Triggers on any event"
            },
            {
              name: "Bot / App Mention",
              value: "app_mention",
              description: "When your bot or app is mentioned in a channel the app is added to"
            },
            {
              name: "File Made Public",
              value: "file_public",
              description: "When a file is made public"
            },
            {
              name: "File Shared",
              value: "file_share",
              description: "When a file is shared in a channel the app is added to"
            },
            {
              name: "New Message Posted to Channel",
              value: "message",
              description: "When a message is posted to a channel the app is added to"
            },
            {
              name: "New Public Channel Created",
              value: "channel_created",
              description: "When a new public channel is created"
            },
            {
              name: "New User",
              value: "team_join",
              description: "When a new user is added to Slack"
            },
            {
              name: "Reaction Added",
              value: "reaction_added",
              description: "When a reaction is added to a message the app is added to"
            }
          ],
          default: []
        },
        {
          displayName: "Watch Whole Workspace",
          name: "watchWorkspace",
          type: "boolean",
          default: false,
          description: "Whether to watch for the event in the whole workspace, rather than a specific channel",
          displayOptions: {
            show: {
              trigger: ["any_event", "message", "reaction_added", "file_share", "app_mention"]
            }
          }
        },
        {
          displayName: "This will use one execution for every event in any channel your bot is in, use with caution",
          name: "notice",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              trigger: ["any_event", "message", "reaction_added", "file_share", "app_mention"],
              watchWorkspace: [true]
            }
          }
        },
        {
          displayName: "Channel to Watch",
          name: "channelId",
          type: "resourceLocator",
          required: true,
          default: { mode: "list", value: "" },
          placeholder: "Select a channel...",
          description: "The Slack channel to listen to events from. Applies to events: Bot/App mention, File Shared, New Message Posted on Channel, Reaction Added.",
          displayOptions: {
            show: {
              watchWorkspace: [false]
            }
          },
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
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[a-zA-Z0-9]{2,}",
                    errorMessage: "Not a valid Slack Channel ID"
                  }
                }
              ],
              placeholder: "C0122KQ70S7E"
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://app.slack.com/client/TS9594PZK/B0556F47Z3A",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "http(s)?://app.slack.com/client/.*/([a-zA-Z0-9]{2,})",
                    errorMessage: "Not a valid Slack Channel URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: "https://app.slack.com/client/.*/([a-zA-Z0-9]{2,})"
              }
            }
          ]
        },
        {
          displayName: "Download Files",
          name: "downloadFiles",
          type: "boolean",
          default: false,
          description: "Whether to download the files and add it to the output",
          displayOptions: {
            show: {
              trigger: ["any_event", "file_share"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Resolve IDs",
              name: "resolveIds",
              type: "boolean",
              default: false,
              description: "Whether to resolve the IDs to their respective names and return them"
            },
            {
              displayName: "Usernames or IDs to Ignore",
              name: "userIds",
              type: "multiOptions",
              typeOptions: {
                loadOptionsMethod: "getUsers"
              },
              default: [],
              description: 'A comma-separated string of encoded user IDs. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        async getChannels(filter) {
          const qs = { types: "public_channel,private_channel" };
          const channels = await import_GenericFunctions.slackApiRequestAllItems.call(
            this,
            "channels",
            "GET",
            "/conversations.list",
            {},
            qs
          );
          const results = channels.map((c) => ({
            name: c.name,
            value: c.id
          })).filter(
            (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.value?.toString() === filter
          ).sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
          return { results };
        }
      },
      loadOptions: {
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.slackApiRequestAllItems.call(
            this,
            "members",
            "GET",
            "/users.list"
          );
          for (const user of users) {
            returnData.push({
              name: user.name,
              value: user.id
            });
          }
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          return true;
        },
        async create() {
          return true;
        },
        async delete() {
          return true;
        }
      }
    };
  }
  async webhook() {
    const filters = this.getNodeParameter("trigger", []);
    const req = this.getRequestObject();
    const options = this.getNodeParameter("options", {});
    const binaryData = {};
    const watchWorkspace = this.getNodeParameter("watchWorkspace", false);
    let eventChannel = "";
    if (req.body.type === "url_verification") {
      const res = this.getResponseObject();
      res.status(200).json({ challenge: req.body.challenge }).end();
      return {
        noWebhookResponse: true
      };
    }
    const eventType = req.body.event.type;
    if (!filters.includes("file_share") && !filters.includes("any_event") && !filters.includes(eventType)) {
      return {};
    }
    if (eventType !== "team_join") {
      eventChannel = req.body.event.channel ?? req.body.event.item.channel;
      if (!watchWorkspace) {
        if (eventChannel !== this.getNodeParameter("channelId", {}, { extractValue: true })) {
          return {};
        }
      }
    }
    if (options.userIds) {
      const userIds = options.userIds;
      if (userIds.includes(req.body.event.user)) {
        return {};
      }
    }
    if (options.resolveIds) {
      if (req.body.event.user) {
        if (req.body.event.type === "reaction_added") {
          req.body.event.user_resolved = await import_SlackTriggerHelpers.getUserInfo.call(this, req.body.event.user);
          req.body.event.item_user_resolved = await import_SlackTriggerHelpers.getUserInfo.call(
            this,
            req.body.event.item_user
          );
        } else {
          req.body.event.user_resolved = await import_SlackTriggerHelpers.getUserInfo.call(this, req.body.event.user);
        }
      }
      if (eventChannel) {
        const channel = await import_SlackTriggerHelpers.getChannelInfo.call(this, eventChannel);
        const channelResolved = channel;
        req.body.event.channel_resolved = channelResolved;
      }
    }
    if (req.body.event.subtype === "file_share" && (filters.includes("file_share") || filters.includes("any_event"))) {
      if (this.getNodeParameter("downloadFiles", false)) {
        for (let i = 0; i < req.body.event.files.length; i++) {
          const file = await import_SlackTriggerHelpers.downloadFile.call(
            this,
            req.body.event.files[i].url_private_download
          );
          binaryData[`file_${i}`] = await this.helpers.prepareBinaryData(
            file,
            req.body.event.files[i].name,
            req.body.event.files[i].mimetype
          );
        }
      }
    }
    return {
      workflowData: [
        [
          {
            json: req.body.event,
            binary: Object.keys(binaryData).length ? binaryData : void 0
          }
        ]
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlackTrigger
});
//# sourceMappingURL=SlackTrigger.node.js.map