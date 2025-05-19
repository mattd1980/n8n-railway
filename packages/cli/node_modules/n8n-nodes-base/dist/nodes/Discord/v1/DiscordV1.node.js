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
var DiscordV1_node_exports = {};
__export(DiscordV1_node_exports, {
  DiscordV1: () => DiscordV1
});
module.exports = __toCommonJS(DiscordV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../utils/descriptions");
const versionDescription = {
  displayName: "Discord",
  name: "discord",
  icon: "file:discord.svg",
  group: ["output"],
  version: 1,
  description: "Sends data to Discord",
  defaults: {
    name: "Discord"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    import_descriptions.oldVersionNotice,
    {
      displayName: "Webhook URL",
      name: "webhookUri",
      type: "string",
      required: true,
      default: "",
      placeholder: "https://discord.com/api/webhooks/ID/TOKEN"
    },
    {
      displayName: "Content",
      name: "text",
      type: "string",
      typeOptions: {
        maxValue: 2e3
      },
      default: "",
      placeholder: "Hello World!"
    },
    {
      displayName: "Additional Fields",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Allowed Mentions",
          name: "allowedMentions",
          type: "json",
          typeOptions: { alwaysOpenEditWindow: true },
          default: ""
        },
        {
          displayName: "Attachments",
          name: "attachments",
          type: "json",
          typeOptions: { alwaysOpenEditWindow: true },
          default: ""
        },
        {
          displayName: "Avatar URL",
          name: "avatarUrl",
          type: "string",
          default: ""
        },
        {
          displayName: "Components",
          name: "components",
          type: "json",
          typeOptions: { alwaysOpenEditWindow: true },
          default: ""
        },
        {
          displayName: "Embeds",
          name: "embeds",
          type: "json",
          typeOptions: { alwaysOpenEditWindow: true },
          default: ""
        },
        {
          displayName: "Flags",
          name: "flags",
          type: "number",
          default: ""
        },
        {
          displayName: "JSON Payload",
          name: "payloadJson",
          type: "json",
          typeOptions: { alwaysOpenEditWindow: true },
          default: ""
        },
        {
          displayName: "Username",
          name: "username",
          type: "string",
          default: "",
          placeholder: "User"
        },
        {
          displayName: "TTS",
          name: "tts",
          type: "boolean",
          default: false,
          description: "Whether this message be sent as a Text To Speech message"
        }
      ]
    }
  ]
};
class DiscordV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const returnData = [];
    const webhookUri = this.getNodeParameter("webhookUri", 0, "");
    if (!webhookUri) throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Webhook uri is required.");
    const items = this.getInputData();
    const length = items.length;
    for (let i = 0; i < length; i++) {
      const body = {};
      const iterationWebhookUri = this.getNodeParameter("webhookUri", i);
      body.content = this.getNodeParameter("text", i);
      const options = this.getNodeParameter("options", i);
      if (!body.content && !options.embeds) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Either content or embeds must be set.", {
          itemIndex: i
        });
      }
      if (options.embeds) {
        try {
          body.embeds = JSON.parse(options.embeds);
          if (!Array.isArray(body.embeds)) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Embeds must be an array of embeds.", {
              itemIndex: i
            });
          }
        } catch (e) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Embeds must be valid JSON.", {
            itemIndex: i
          });
        }
      }
      if (options.username) {
        body.username = options.username;
      }
      if (options.components) {
        try {
          body.components = JSON.parse(options.components);
        } catch (e) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Components must be valid JSON.", {
            itemIndex: i
          });
        }
      }
      if (options.allowed_mentions) {
        body.allowed_mentions = (0, import_n8n_workflow.jsonParse)(options.allowed_mentions);
      }
      if (options.avatarUrl) {
        body.avatar_url = options.avatarUrl;
      }
      if (options.flags) {
        body.flags = options.flags;
      }
      if (options.tts) {
        body.tts = options.tts;
      }
      if (options.payloadJson) {
        body.payload_json = (0, import_n8n_workflow.jsonParse)(options.payloadJson);
      }
      if (options.attachments) {
        body.attachments = (0, import_n8n_workflow.jsonParse)(options.attachments);
      }
      if (!body.content) delete body.content;
      if (!body.username) delete body.username;
      if (!body.avatar_url) delete body.avatar_url;
      if (!body.embeds) delete body.embeds;
      if (!body.allowed_mentions) delete body.allowed_mentions;
      if (!body.flags) delete body.flags;
      if (!body.components) delete body.components;
      if (!body.payload_json) delete body.payload_json;
      if (!body.attachments) delete body.attachments;
      let requestOptions;
      if (!body.payload_json) {
        requestOptions = {
          resolveWithFullResponse: true,
          method: "POST",
          body,
          uri: iterationWebhookUri,
          headers: {
            "content-type": "application/json; charset=utf-8"
          },
          json: true
        };
      } else {
        requestOptions = {
          resolveWithFullResponse: true,
          method: "POST",
          body,
          uri: iterationWebhookUri,
          headers: {
            "content-type": "multipart/form-data; charset=utf-8"
          }
        };
      }
      let maxTries = 5;
      let response;
      do {
        try {
          response = await this.helpers.request(requestOptions);
          const resetAfter = response.headers["x-ratelimit-reset-after"] * 1e3;
          const remainingRatelimit = response.headers["x-ratelimit-remaining"];
          if (!+remainingRatelimit) {
            await (0, import_n8n_workflow.sleep)(resetAfter ?? 1e3);
          }
          break;
        } catch (error) {
          if (error.statusCode === 429) {
            const retryAfter = error.response?.headers["retry-after"] || 1e3;
            await (0, import_n8n_workflow.sleep)(+retryAfter);
            continue;
          }
          throw error;
        }
      } while (--maxTries);
      if (maxTries <= 0) {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), {
          error: "Could not send Webhook message. Max amount of rate-limit retries reached."
        });
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray({ success: true }),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordV1
});
//# sourceMappingURL=DiscordV1.node.js.map