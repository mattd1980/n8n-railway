"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SlackV2_node_exports = {};
__export(SlackV2_node_exports, {
  SlackV2: () => SlackV2
});
module.exports = __toCommonJS(SlackV2_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_ChannelDescription = require("./ChannelDescription");
var import_FileDescription = require("./FileDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MessageDescription = require("./MessageDescription");
var import_ReactionDescription = require("./ReactionDescription");
var import_StarDescription = require("./StarDescription");
var import_UserDescription = require("./UserDescription");
var import_UserGroupDescription = require("./UserGroupDescription");
var import_configureWaitTillDate = require("../../../utils/sendAndWait/configureWaitTillDate.util");
var import_descriptions = require("../../../utils/sendAndWait/descriptions");
var import_utils = require("../../../utils/sendAndWait/utils");
class SlackV2 {
  constructor(baseDescription) {
    this.methods = {
      listSearch: {
        async getChannels(filter) {
          const qs = { types: "public_channel,private_channel", limit: 1e3 };
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
        },
        async getUsers(filter) {
          const users = await import_GenericFunctions.slackApiRequestAllItems.call(
            this,
            "members",
            "GET",
            "/users.list"
          );
          const results = users.map((c) => ({
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
        // Get all the users to display them to user so that they can
        // select them easily
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.slackApiRequestAllItems.call(this, "members", "GET", "/users.list");
          for (const user of users) {
            const userName = user.name;
            const userId = user.id;
            returnData.push({
              name: userName,
              value: userId
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
        },
        // Get all the users to display them to user so that they can
        // select them easily
        async getChannels() {
          const returnData = [];
          const qs = { types: "public_channel,private_channel", limit: 1e3 };
          const channels = await import_GenericFunctions.slackApiRequestAllItems.call(
            this,
            "channels",
            "GET",
            "/conversations.list",
            {},
            qs
          );
          for (const channel of channels) {
            const channelName = channel.name;
            const channelId = channel.id;
            returnData.push({
              name: channelName,
              value: channelId
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
        },
        // Get all the users to display them to user so that they can
        // select them easily
        async getChannelsName() {
          const returnData = [];
          const qs = { types: "public_channel,private_channel", limit: 1e3 };
          const channels = await import_GenericFunctions.slackApiRequestAllItems.call(
            this,
            "channels",
            "GET",
            "/conversations.list",
            {},
            qs
          );
          for (const channel of channels) {
            const channelName = channel.name;
            returnData.push({
              name: channelName,
              value: channelName
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
        },
        // Get all the team fields to display them to user so that they can
        // select them easily
        async getTeamFields() {
          const returnData = [];
          const {
            profile: { fields }
          } = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/team.profile.get");
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.id;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          return returnData;
        }
      }
    };
    this.webhook = import_utils.sendAndWaitWebhook;
    this.description = {
      ...baseDescription,
      version: [2, 2.1, 2.2, 2.3],
      defaults: {
        name: "Slack"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "slackApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "slackOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      webhooks: import_descriptions.sendAndWaitWebhooksDescription,
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
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Channel",
              value: "channel"
            },
            {
              name: "File",
              value: "file"
            },
            {
              name: "Message",
              value: "message"
            },
            {
              name: "Reaction",
              value: "reaction"
            },
            {
              name: "Star",
              value: "star"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "User Group",
              value: "userGroup"
            }
          ],
          default: "message"
        },
        ...import_ChannelDescription.channelOperations,
        ...import_ChannelDescription.channelFields,
        ...import_MessageDescription.messageOperations,
        ...import_MessageDescription.messageFields,
        ...(0, import_utils.getSendAndWaitProperties)([
          { ...import_MessageDescription.sendToSelector, default: "user" },
          {
            ...import_MessageDescription.channelRLC,
            displayOptions: {
              show: {
                select: ["channel"]
              }
            }
          },
          {
            ...import_MessageDescription.userRLC,
            displayOptions: {
              show: {
                select: ["user"]
              }
            }
          }
        ]).filter((p) => p.name !== "subject"),
        ...import_StarDescription.starOperations,
        ...import_StarDescription.starFields,
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields,
        ...import_ReactionDescription.reactionOperations,
        ...import_ReactionDescription.reactionFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        ...import_UserGroupDescription.userGroupOperations,
        ...import_UserGroupDescription.userGroupFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let qs;
    let responseData;
    const authentication = this.getNodeParameter("authentication", 0);
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const nodeVersion = this.getNode().typeVersion;
    const instanceId = this.getInstanceId();
    if (resource === "message" && operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
      await import_GenericFunctions.slackApiRequest.call(
        this,
        "POST",
        "/chat.postMessage",
        (0, import_GenericFunctions.createSendAndWaitMessageBody)(this)
      );
      const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
      await this.putExecutionToWait(waitTill);
      return [this.getInputData()];
    }
    for (let i = 0; i < length; i++) {
      try {
        responseData = {
          error: "Resource " + resource + " / operation " + operation + " not found!"
        };
        qs = {};
        if (resource === "channel") {
          if (operation === "archive") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {
              channel
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.archive",
              body,
              qs
            );
          }
          if (operation === "close") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {
              channel
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.close",
              body,
              qs
            );
          }
          if (operation === "create") {
            let channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            channel = channel[0] === "#" ? channel.slice(1) : channel;
            const channelVisibility = this.getNodeParameter("channelVisibility", i);
            const body = {
              name: channel,
              is_private: channelVisibility === "private" ? true : false
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.create",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "kick") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const userId = this.getNodeParameter("userId", i);
            const body = {
              channel,
              user: userId
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.kick",
              body,
              qs
            );
          }
          if (operation === "join") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {
              channel
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.join",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "get") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            qs.channel = channel;
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/conversations.info", {}, qs);
            responseData = responseData.channel;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            if (filters.types) {
              qs.types = filters.types.join(",");
            }
            if (filters.excludeArchived) {
              qs.exclude_archived = filters.excludeArchived;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "channels",
                "GET",
                "/conversations.list",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/conversations.list", {}, qs);
              responseData = responseData.channels;
            }
          }
          if (operation === "history") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            qs.channel = channel;
            if (filters.inclusive) {
              qs.inclusive = filters.inclusive;
            }
            if (filters.latest) {
              qs.latest = new Date(filters.latest).getTime() / 1e3;
            }
            if (filters.oldest) {
              qs.oldest = new Date(filters.oldest).getTime() / 1e3;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "messages",
                "GET",
                "/conversations.history",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(
                this,
                "GET",
                "/conversations.history",
                {},
                qs
              );
              responseData = responseData.messages;
            }
          }
          if (operation === "invite") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const userIds = this.getNodeParameter("userIds", i).join(",");
            const body = {
              channel,
              users: userIds
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.invite",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "leave") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {
              channel
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.leave",
              body,
              qs
            );
          }
          if (operation === "member") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const resolveData = this.getNodeParameter("resolveData", 0);
            qs.channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "members",
                "GET",
                "/conversations.members",
                {},
                qs
              );
              responseData = responseData.map((member) => ({ member }));
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(
                this,
                "GET",
                "/conversations.members",
                {},
                qs
              );
              responseData = responseData.members.map((member) => ({ member }));
            }
            if (resolveData) {
              const data = [];
              for (const { member } of responseData) {
                const { user } = await import_GenericFunctions.slackApiRequest.call(
                  this,
                  "GET",
                  "/users.info",
                  {},
                  { user: member }
                );
                data.push(user);
              }
              responseData = data;
            }
          }
          if (operation === "open") {
            const options = this.getNodeParameter("options", i);
            const body = {};
            if (options.channelId) {
              body.channel = options.channelId;
            }
            if (options.returnIm) {
              body.return_im = options.returnIm;
            }
            if (options.users) {
              body.users = options.users.join(",");
            }
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.open",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "rename") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const name = this.getNodeParameter("name", i);
            const body = {
              channel,
              name
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.rename",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "replies") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const ts = this.getNodeParameter("ts", i)?.toString();
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            qs.channel = channel;
            qs.ts = ts;
            if (filters.inclusive) {
              qs.inclusive = filters.inclusive;
            }
            if (filters.latest) {
              qs.latest = new Date(filters.latest).getTime() / 1e3;
            }
            if (filters.oldest) {
              qs.oldest = new Date(filters.oldest).getTime() / 1e3;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "messages",
                "GET",
                "/conversations.replies",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(
                this,
                "GET",
                "/conversations.replies",
                {},
                qs
              );
              responseData = responseData.messages;
            }
          }
          if (operation === "setPurpose") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const purpose = this.getNodeParameter("purpose", i);
            const body = {
              channel,
              purpose
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.setPurpose",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "setTopic") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const topic = this.getNodeParameter("topic", i);
            const body = {
              channel,
              topic
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.setTopic",
              body,
              qs
            );
            responseData = responseData.channel;
          }
          if (operation === "unarchive") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {
              channel
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/conversations.unarchive",
              body,
              qs
            );
          }
        }
        if (resource === "message") {
          if (operation === "post") {
            const select = this.getNodeParameter("select", i);
            const target = (0, import_GenericFunctions.getTarget)(this, i, select);
            const { sendAsUser } = this.getNodeParameter("otherOptions", i);
            const content = import_GenericFunctions.getMessageContent.call(this, i, nodeVersion, instanceId);
            const body = {
              channel: target,
              ...content
            };
            if (authentication === "accessToken" && sendAsUser !== "" && sendAsUser !== void 0) {
              body.username = sendAsUser;
            }
            const otherOptions = this.getNodeParameter("otherOptions", i);
            let action = "postMessage";
            if (otherOptions.ephemeral) {
              const ephemeral = otherOptions.ephemeral;
              if (select === "channel") {
                const ephemeralValues = ephemeral.ephemeralValues;
                const userRlc = ephemeralValues.user;
                body.user = userRlc.value?.toString().slice(0, 1) !== "@" && userRlc.mode === "username" ? `@${userRlc.value}` : userRlc.value;
                action = "postEphemeral";
              } else if (select === "user") {
                body.user = target;
                action = "postEphemeral";
              }
            }
            const replyValues = otherOptions.thread_ts?.replyValues;
            Object.assign(body, replyValues);
            delete otherOptions.thread_ts;
            delete otherOptions.ephemeral;
            if (otherOptions.botProfile) {
              const botProfile = otherOptions.botProfile;
              const botProfileValues = botProfile.imageValues;
              Object.assign(
                body,
                botProfileValues.profilePhotoType === "image" ? { icon_url: botProfileValues.icon_url } : { icon_emoji: botProfileValues.icon_emoji }
              );
            }
            delete otherOptions.botProfile;
            Object.assign(body, otherOptions);
            if (select === "user" && action === "postEphemeral" && this.getNodeParameter("user", i)?.mode === "username") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                'You cannot send ephemeral messages using User type "By username". Please use "From List" or "By ID".'
              );
            } else {
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", `/chat.${action}`, body, qs);
            }
          }
          if (operation === "update") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const ts = this.getNodeParameter("ts", i)?.toString();
            const content = import_GenericFunctions.getMessageContent.call(this, i, nodeVersion, instanceId);
            const body = {
              channel,
              ts,
              ...content
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/chat.update", body, qs);
          }
          if (operation === "delete") {
            const select = this.getNodeParameter("select", i);
            let target = select === "channel" ? this.getNodeParameter("channelId", i, void 0, {
              extractValue: true
            }) : this.getNodeParameter("user", i, void 0, {
              extractValue: true
            });
            if (select === "user" && this.getNodeParameter("user", i).mode === "username") {
              target = target.slice(0, 1) === "@" ? target : `@${target}`;
            }
            const timestamp = this.getNodeParameter("timestamp", i)?.toString();
            const body = {
              channel: target,
              ts: timestamp
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/chat.delete", body, qs);
          }
          if (operation === "getPermalink") {
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const timestamp = this.getNodeParameter("timestamp", i)?.toString();
            qs = {
              channel,
              message_ts: timestamp
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/chat.getPermalink", {}, qs);
          }
          if (operation === "search") {
            let query = this.getNodeParameter("query", i);
            const sort = this.getNodeParameter("sort", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.searchChannel) {
              const channel = options.searchChannel;
              for (const channelItem of channel) {
                query += ` in:${channelItem}`;
              }
            }
            qs = {
              query,
              sort: sort === "relevance" ? "score" : "timestamp",
              sort_dir: sort === "asc" ? "asc" : "desc"
            };
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "messages",
                "GET",
                "/search.messages",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/search.messages", {}, qs);
              responseData = responseData.messages.matches;
            }
          }
        }
        if (resource === "reaction") {
          const channel = this.getNodeParameter(
            "channelId",
            i,
            {},
            { extractValue: true }
          );
          const timestamp = this.getNodeParameter("timestamp", i)?.toString();
          if (operation === "add") {
            const name = this.getNodeParameter("name", i);
            const body = {
              channel,
              name,
              timestamp
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/reactions.add", body, qs);
          }
          if (operation === "remove") {
            const name = this.getNodeParameter("name", i);
            const body = {
              channel,
              name,
              timestamp
            };
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/reactions.remove", body, qs);
          }
          if (operation === "get") {
            qs.channel = channel;
            qs.timestamp = timestamp;
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/reactions.get", {}, qs);
          }
        }
        if (resource === "star") {
          if (operation === "add") {
            const options = this.getNodeParameter("options", i);
            const target = this.getNodeParameter("target", i);
            const channel = this.getNodeParameter(
              "channelId",
              i,
              {},
              { extractValue: true }
            );
            const body = {};
            body.channel = channel;
            if (target === "message") {
              const timestamp = this.getNodeParameter("timestamp", i)?.toString();
              body.timestamp = timestamp;
            }
            if (target === "file") {
              const file = this.getNodeParameter("fileId", i);
              body.file = file;
            }
            if (options.fileComment) {
              body.file_comment = options.fileComment;
            }
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/stars.add", body, qs);
          }
          if (operation === "delete") {
            const options = this.getNodeParameter("options", i);
            const body = {};
            if (options.channelId) {
              body.channel = options.channelId;
            }
            if (options.fileId) {
              body.file = options.fileId;
            }
            if (options.fileComment) {
              body.file_comment = options.fileComment;
            }
            if (options.timestamp) {
              body.timestamp = options.timestamp;
            }
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/stars.remove", body, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/stars.list",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/stars.list", {}, qs);
              responseData = responseData.items;
            }
          }
        }
        if (resource === "file") {
          if (operation === "upload") {
            const options = this.getNodeParameter("options", i);
            const body = {};
            const fileBody = {};
            if (options.channelIds) {
              body.channels = options.channelIds.join(",");
            }
            if (options.channelId) {
              body.channel_id = options.channelId;
            }
            if (options.initialComment) {
              body.initial_comment = options.initialComment;
            }
            if (options.threadTs) {
              body.thread_ts = options.threadTs;
            }
            if (options.title) {
              if (nodeVersion <= 2.1) {
                body.title = options.title;
              }
            }
            if (this.getNodeParameter("binaryData", i, false) || nodeVersion > 2.1) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              let fileSize;
              let uploadData;
              if (binaryData.id) {
                uploadData = await this.helpers.getBinaryStream(binaryData.id);
                const metadata = await this.helpers.getBinaryMetadata(binaryData.id);
                fileSize = metadata.fileSize;
              } else {
                uploadData = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
                fileSize = uploadData.length;
              }
              if (nodeVersion <= 2.1) {
                body.file = {
                  value: uploadData,
                  options: {
                    filename: binaryData.fileName,
                    contentType: binaryData.mimeType
                  }
                };
                responseData = await import_GenericFunctions.slackApiRequest.call(
                  this,
                  "POST",
                  "/files.upload",
                  {},
                  qs,
                  { "Content-Type": "multipart/form-data" },
                  { formData: body }
                );
                responseData = responseData.file;
              } else {
                fileBody.file = {
                  value: uploadData,
                  options: {
                    filename: binaryData.fileName,
                    contentType: binaryData.mimeType
                  }
                };
                const uploadUrl = await import_GenericFunctions.slackApiRequest.call(
                  this,
                  "GET",
                  "/files.getUploadURLExternal",
                  {},
                  {
                    filename: options.fileName ? options.fileName : binaryData.fileName,
                    length: fileSize
                  }
                );
                await import_GenericFunctions.slackApiRequest.call(
                  this,
                  "POST",
                  uploadUrl.upload_url,
                  {},
                  qs,
                  { "Content-Type": "multipart/form-data" },
                  { formData: fileBody }
                );
                body.files = [
                  {
                    id: uploadUrl.file_id,
                    title: options.title ? options.title : binaryData.fileName
                  }
                ];
                responseData = await import_GenericFunctions.slackApiRequest.call(
                  this,
                  "POST",
                  "/files.completeUploadExternal",
                  body
                );
                responseData = responseData.files;
              }
            } else {
              const fileContent = this.getNodeParameter("fileContent", i);
              body.content = fileContent;
              responseData = await import_GenericFunctions.slackApiRequest.call(
                this,
                "POST",
                "/files.upload",
                body,
                qs,
                { "Content-Type": "application/x-www-form-urlencoded" },
                { form: body }
              );
              responseData = responseData.file;
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            if (filters.channelId) {
              qs.channel = filters.channelId;
            }
            if (filters.showFilesHidden) {
              qs.show_files_hidden_by_limit = filters.showFilesHidden;
            }
            if (filters.tsFrom) {
              qs.ts_from = filters.tsFrom;
            }
            if (filters.tsTo) {
              qs.ts_to = filters.tsTo;
            }
            if (filters.types) {
              qs.types = filters.types.join(",");
            }
            if (filters.userId) {
              qs.user = filters.userId;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "files",
                "GET",
                "/files.list",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/files.list", {}, qs);
              responseData = responseData.files;
            }
          }
          if (operation === "get") {
            const fileId = this.getNodeParameter("fileId", i);
            qs.file = fileId;
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/files.info", {}, qs);
            responseData = responseData.file;
          }
        }
        if (resource === "user") {
          if (operation === "info") {
            qs.user = this.getNodeParameter("user", i, void 0, { extractValue: true });
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/users.info", {}, qs);
            responseData = responseData.user;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.slackApiRequestAllItems.call(
                this,
                "members",
                "GET",
                "/users.list",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/users.list", {}, qs);
              responseData = responseData.members;
            }
          }
          if (operation === "getPresence") {
            qs.user = this.getNodeParameter("user", i, void 0, { extractValue: true });
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/users.getPresence", {}, qs);
          }
          if (operation === "getProfile") {
            qs.user = this.getNodeParameter("user", i, void 0, { extractValue: true });
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/users.profile.get", {}, qs);
            responseData = responseData.profile;
          }
          if (operation === "updateProfile") {
            const options = this.getNodeParameter("options", i);
            const timezone = this.getTimezone();
            const body = {};
            let status;
            if (options.status) {
              status = (options.status?.set_status)[0];
              if (status.status_expiration === void 0) {
                status.status_expiration = 0;
              } else {
                status.status_expiration = import_moment_timezone.default.tz(status.status_expiration, timezone).unix();
              }
              Object.assign(body, status);
              delete options.status;
            }
            if (options.customFieldUi) {
              const customFields = options.customFieldUi.customFieldValues;
              const fields = {};
              for (const customField of customFields) {
                fields[customField.id] = {
                  value: customField.value,
                  alt: customField.alt
                };
              }
              options.fields = fields;
            }
            Object.assign(body, options);
            let requestBody = { profile: body };
            let userId;
            if (options.user) {
              userId = options.user;
              delete body.user;
              requestBody = { profile: body, user: userId };
            }
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/users.profile.set",
              requestBody,
              qs
            );
            responseData = responseData.profile;
          }
        }
        if (resource === "userGroup") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              name
            };
            Object.assign(body, options);
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/usergroups.create", body, qs);
            responseData = responseData.usergroup;
          }
          if (operation === "enable") {
            const userGroupId = this.getNodeParameter("userGroupId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              usergroup: userGroupId
            };
            Object.assign(body, options);
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/usergroups.enable", body, qs);
            responseData = responseData.usergroup;
          }
          if (operation === "disable") {
            const userGroupId = this.getNodeParameter("userGroupId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              usergroup: userGroupId
            };
            Object.assign(body, options);
            responseData = await import_GenericFunctions.slackApiRequest.call(
              this,
              "POST",
              "/usergroups.disable",
              body,
              qs
            );
            responseData = responseData.usergroup;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "GET", "/usergroups.list", {}, qs);
            responseData = responseData.usergroups;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "update") {
            const userGroupId = this.getNodeParameter("userGroupId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              usergroup: userGroupId
            };
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.slackApiRequest.call(this, "POST", "/usergroups.update", body, qs);
            responseData = responseData.usergroup;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlackV2
});
//# sourceMappingURL=SlackV2.node.js.map