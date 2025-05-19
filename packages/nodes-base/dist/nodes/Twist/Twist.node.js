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
var Twist_node_exports = {};
__export(Twist_node_exports, {
  Twist: () => Twist
});
module.exports = __toCommonJS(Twist_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_ChannelDescription = require("./ChannelDescription");
var import_CommentDescription = require("./CommentDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MessageConversationDescription = require("./MessageConversationDescription");
var import_ThreadDescription = require("./ThreadDescription");
class Twist {
  constructor() {
    this.description = {
      displayName: "Twist",
      name: "twist",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:twist.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Twist API",
      defaults: {
        name: "Twist"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "twistOAuth2Api",
          required: true
        }
      ],
      properties: [
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
              name: "Comment",
              value: "comment"
            },
            {
              name: "Message Conversation",
              value: "messageConversation"
            },
            {
              name: "Thread",
              value: "thread"
            }
          ],
          default: "messageConversation"
        },
        ...import_ChannelDescription.channelOperations,
        ...import_ChannelDescription.channelFields,
        ...import_CommentDescription.commentOperations,
        ...import_CommentDescription.commentFields,
        ...import_MessageConversationDescription.messageConversationOperations,
        ...import_MessageConversationDescription.messageConversationFields,
        ...import_ThreadDescription.threadOperations,
        ...import_ThreadDescription.threadFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available workspaces to display them to user so that they can
        // select them easily
        async getWorkspaces() {
          const returnData = [];
          const workspaces = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/workspaces/get");
          for (const workspace of workspaces) {
            returnData.push({
              name: workspace.name,
              value: workspace.id
            });
          }
          return returnData;
        },
        // Get all the available conversations to display them to user so that they can
        // select them easily
        async getConversations() {
          const returnData = [];
          const qs = {
            workspace_id: this.getCurrentNodeParameter("workspaceId")
          };
          const conversations = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/conversations/get", {}, qs);
          for (const conversation of conversations) {
            returnData.push({
              name: conversation.title || conversation.id,
              value: conversation.id
            });
          }
          return returnData;
        },
        // Get all the available users to display them to user so that they can
        // select them easily
        async getUsers() {
          const returnData = [];
          const qs = {
            id: this.getCurrentNodeParameter("workspaceId")
          };
          const users = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/workspaces/get_users", {}, qs);
          for (const user of users) {
            returnData.push({
              name: user.name,
              value: user.id
            });
          }
          return returnData;
        },
        // Get all the available groups to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const qs = {
            workspace_id: this.getCurrentNodeParameter("workspaceId")
          };
          const groups = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/groups/get", {}, qs);
          for (const group of groups) {
            returnData.push({
              name: group.name,
              value: group.id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "channel") {
          if (operation === "create") {
            const workspaceId = this.getNodeParameter("workspaceId", i);
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              workspace_id: workspaceId,
              name
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/channels/add", body);
          }
          if (operation === "delete") {
            qs.id = this.getNodeParameter("channelId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/channels/remove", {}, qs);
          }
          if (operation === "get") {
            qs.id = this.getNodeParameter("channelId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/channels/getone", {}, qs);
          }
          if (operation === "getAll") {
            const workspaceId = this.getNodeParameter("workspaceId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            qs.workspace_id = workspaceId;
            Object.assign(qs, filters);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/channels/get", {}, qs);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "update") {
            const channelId = this.getNodeParameter("channelId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: channelId
            };
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/channels/update", body);
          }
          if (operation === "archive") {
            qs.id = this.getNodeParameter("channelId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/channels/archive", {}, qs);
          }
          if (operation === "unarchive") {
            qs.id = this.getNodeParameter("channelId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/channels/unarchive", {}, qs);
          }
        }
        if (resource === "comment") {
          if (operation === "create") {
            const threadId = this.getNodeParameter("threadId", i);
            const content = this.getNodeParameter("content", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              thread_id: threadId,
              content
            };
            Object.assign(body, additionalFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/comments/add", body);
          }
          if (operation === "delete") {
            qs.id = this.getNodeParameter("commentId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/comments/remove", {}, qs);
          }
          if (operation === "get") {
            qs.id = this.getNodeParameter("commentId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/comments/getone", {}, qs);
            responseData = responseData?.comment;
          }
          if (operation === "getAll") {
            const threadId = this.getNodeParameter("threadId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            qs.thread_id = threadId;
            Object.assign(qs, filters);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (qs.older_than_ts) {
              qs.older_than_ts = (0, import_moment_timezone.default)(qs.older_than_ts).unix();
            }
            if (qs.newer_than_ts) {
              qs.newer_than_ts = (0, import_moment_timezone.default)(qs.newer_than_ts).unix();
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/comments/get", {}, qs);
            if (qs.as_ids) {
              responseData = responseData.map((id) => ({ ID: id }));
            }
          }
          if (operation === "update") {
            const commentId = this.getNodeParameter("commentId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: commentId
            };
            Object.assign(body, updateFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/comments/update", body);
          }
        }
        if (resource === "messageConversation") {
          if (operation === "create") {
            const workspaceId = this.getNodeParameter("workspaceId", i);
            const conversationId = this.getNodeParameter("conversationId", i);
            const content = this.getNodeParameter("content", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              conversation_id: conversationId,
              workspace_id: workspaceId,
              content
            };
            Object.assign(body, additionalFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(
              this,
              "POST",
              "/conversation_messages/add",
              body
            );
          }
          if (operation === "get") {
            qs.id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(
              this,
              "GET",
              "/conversation_messages/getone",
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.conversation_id = conversationId;
            Object.assign(qs, additionalFields);
            responseData = await import_GenericFunctions.twistApiRequest.call(
              this,
              "GET",
              "/conversation_messages/get",
              {},
              qs
            );
          }
          if (operation === "delete") {
            qs.id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(
              this,
              "POST",
              "/conversation_messages/remove",
              {},
              qs
            );
          }
          if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id
            };
            Object.assign(body, updateFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(
              this,
              "POST",
              "/conversation_messages/update",
              body
            );
          }
        }
        if (resource === "thread") {
          if (operation === "create") {
            const channelId = this.getNodeParameter("channelId", i);
            const title = this.getNodeParameter("title", i);
            const content = this.getNodeParameter("content", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              channel_id: channelId,
              content,
              title
            };
            Object.assign(body, additionalFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/threads/add", body);
          }
          if (operation === "delete") {
            qs.id = this.getNodeParameter("threadId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/threads/remove", {}, qs);
          }
          if (operation === "get") {
            qs.id = this.getNodeParameter("threadId", i);
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/threads/getone", {}, qs);
          }
          if (operation === "getAll") {
            const channelId = this.getNodeParameter("channelId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            qs.channel_id = channelId;
            Object.assign(qs, filters);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (qs.older_than_ts) {
              qs.older_than_ts = (0, import_moment_timezone.default)(qs.older_than_ts).unix();
            }
            if (qs.newer_than_ts) {
              qs.newer_than_ts = (0, import_moment_timezone.default)(qs.newer_than_ts).unix();
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "GET", "/threads/get", {}, qs);
            if (qs.as_ids) {
              responseData = responseData.map((id) => ({ ID: id }));
            }
          }
          if (operation === "update") {
            const threadId = this.getNodeParameter("threadId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: threadId
            };
            Object.assign(body, updateFields);
            if (body.actionsUi) {
              const actions = body.actionsUi.actionValues;
              if (actions) {
                body.actions = actions;
                delete body.actionsUi;
              }
            }
            if (body.binaryProperties) {
              const binaryProperties = body.binaryProperties.split(",");
              const attachments = [];
              for (const binaryProperty of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                attachments.push(
                  await import_GenericFunctions.twistApiRequest.call(
                    this,
                    "POST",
                    "/attachments/upload",
                    {},
                    {},
                    {
                      formData: {
                        file_name: {
                          value: dataBuffer,
                          options: {
                            filename: binaryData.fileName
                          }
                        },
                        attachment_id: (0, import_uuid.v4)()
                      }
                    }
                  )
                );
              }
              body.attachments = attachments;
            }
            if (body.direct_mentions) {
              const directMentions = [];
              for (const directMention of body.direct_mentions) {
                directMentions.push(`[name](twist-mention://${directMention})`);
              }
              body.content = `${directMentions.join(" ")} ${body.content}`;
            }
            responseData = await import_GenericFunctions.twistApiRequest.call(this, "POST", "/threads/update", body);
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Twist
});
//# sourceMappingURL=Twist.node.js.map