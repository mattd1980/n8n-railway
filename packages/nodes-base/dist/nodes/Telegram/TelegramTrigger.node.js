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
var TelegramTrigger_node_exports = {};
__export(TelegramTrigger_node_exports, {
  TelegramTrigger: () => TelegramTrigger
});
module.exports = __toCommonJS(TelegramTrigger_node_exports);
var import_crypto = __toESM(require("crypto"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_triggerUtils = require("./util/triggerUtils");
class TelegramTrigger {
  constructor() {
    this.description = {
      displayName: "Telegram Trigger",
      name: "telegramTrigger",
      icon: "file:telegram.svg",
      group: ["trigger"],
      version: [1, 1.1, 1.2],
      defaultVersion: 1.2,
      subtitle: '=Updates: {{$parameter["updates"].join(", ")}}',
      description: "Starts the workflow on a Telegram update",
      defaults: {
        name: "Telegram Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "telegramApi",
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
          displayName: "Due to Telegram API limitations, you can use just one Telegram trigger for each bot at a time",
          name: "telegramTriggerNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Trigger On",
          name: "updates",
          type: "multiOptions",
          options: [
            {
              name: "*",
              value: "*",
              description: "All updates"
            },
            {
              name: "Callback Query",
              value: "callback_query",
              description: "Trigger on new incoming callback query"
            },
            {
              name: "Channel Post",
              value: "channel_post",
              description: "Trigger on new incoming channel post of any kind \u2014 text, photo, sticker, etc"
            },
            {
              name: "Edited Channel Post",
              value: "edited_channel_post",
              description: "Trigger on new version of a channel post that is known to the bot and was edited"
            },
            {
              name: "Edited Message",
              value: "edited_message",
              description: "Trigger on new version of a channel post that is known to the bot and was edited"
            },
            {
              name: "Inline Query",
              value: "inline_query",
              description: "Trigger on new incoming inline query"
            },
            {
              name: "Message",
              value: "message",
              description: "Trigger on new incoming message of any kind \u2014 text, photo, sticker, etc"
            },
            {
              name: "Poll",
              value: "poll",
              action: "On Poll Change",
              description: "Trigger on new poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot."
            },
            {
              name: "Pre-Checkout Query",
              value: "pre_checkout_query",
              description: "Trigger on new incoming pre-checkout query. Contains full information about checkout."
            },
            {
              name: "Shipping Query",
              value: "shipping_query",
              description: "Trigger on new incoming shipping query. Only for invoices with flexible price."
            }
          ],
          required: true,
          default: []
        },
        {
          displayName: "Every uploaded attachment, even if sent in a group, will trigger a separate event. You can identify that an attachment belongs to a certain group by <code>media_group_id</code> .",
          name: "attachmentNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Download Images/Files",
              name: "download",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Telegram delivers the image in multiple sizes. By default, just the large image would be downloaded. If you want to change the size, set the field 'Image Size'."
            },
            {
              displayName: "Image Size",
              name: "imageSize",
              type: "options",
              displayOptions: {
                show: {
                  download: [true]
                }
              },
              options: [
                {
                  name: "Small",
                  value: "small"
                },
                {
                  name: "Medium",
                  value: "medium"
                },
                {
                  name: "Large",
                  value: "large"
                },
                {
                  name: "Extra Large",
                  value: "extraLarge"
                }
              ],
              default: "large",
              description: "The size of the image to be downloaded"
            },
            {
              displayName: "Restrict to Chat IDs",
              name: "chatIds",
              type: "string",
              default: "",
              description: "The chat IDs to restrict the trigger to. Multiple can be defined separated by comma.",
              displayOptions: {
                show: {
                  "@version": [{ _cnd: { gte: 1.1 } }]
                }
              }
            },
            {
              displayName: "Restrict to User IDs",
              name: "userIds",
              type: "string",
              default: "",
              description: "The user IDs to restrict the trigger to. Multiple can be defined separated by comma.",
              displayOptions: {
                show: {
                  "@version": [{ _cnd: { gte: 1.1 } }]
                }
              }
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const endpoint = "getWebhookInfo";
          const webhookReturnData = await import_GenericFunctions.apiRequest.call(this, "POST", endpoint, {});
          const webhookUrl = this.getNodeWebhookUrl("default");
          if (webhookReturnData.result.url === webhookUrl) {
            return true;
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          let allowedUpdates = this.getNodeParameter("updates");
          if ((allowedUpdates || []).includes("*")) {
            allowedUpdates = [];
          }
          const endpoint = "setWebhook";
          const secret_token = import_GenericFunctions.getSecretToken.call(this);
          const body = {
            url: webhookUrl,
            allowed_updates: allowedUpdates,
            secret_token
          };
          await import_GenericFunctions.apiRequest.call(this, "POST", endpoint, body);
          return true;
        },
        async delete() {
          const endpoint = "deleteWebhook";
          const body = {};
          try {
            await import_GenericFunctions.apiRequest.call(this, "POST", endpoint, body);
          } catch (error) {
            return false;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const credentials = await this.getCredentials("telegramApi");
    const bodyData = this.getBodyData();
    const headerData = this.getHeaderData();
    const nodeVersion = this.getNode().typeVersion;
    if (nodeVersion > 1) {
      const secret = import_GenericFunctions.getSecretToken.call(this);
      const secretBuffer = Buffer.from(secret);
      const headerSecretBuffer = Buffer.from(
        String(headerData["x-telegram-bot-api-secret-token"] ?? "")
      );
      if (secretBuffer.byteLength !== headerSecretBuffer.byteLength || !import_crypto.default.timingSafeEqual(secretBuffer, headerSecretBuffer)) {
        const res = this.getResponseObject();
        res.status(403).json({ message: "Provided secret is not valid" });
        return {
          noWebhookResponse: true
        };
      }
    }
    const additionalFields = this.getNodeParameter("additionalFields");
    if (additionalFields.download) {
      const downloadFilesResult = await (0, import_triggerUtils.downloadFile)(this, credentials, bodyData, additionalFields);
      if (Object.entries(downloadFilesResult).length !== 0) return downloadFilesResult;
    }
    if (nodeVersion >= 1.2) {
      if (additionalFields.chatIds) {
        const chatIds = additionalFields.chatIds;
        const splitIds = chatIds.split(",").map((chatId) => chatId.trim());
        if (!splitIds.includes(String(bodyData.message?.chat?.id))) {
          return {};
        }
      }
      if (additionalFields.userIds) {
        const userIds = additionalFields.userIds;
        const splitIds = userIds.split(",").map((userId) => userId.trim());
        if (!splitIds.includes(String(bodyData.message?.from?.id))) {
          return {};
        }
      }
    }
    return {
      workflowData: [this.helpers.returnJsonArray([bodyData])]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TelegramTrigger
});
//# sourceMappingURL=TelegramTrigger.node.js.map