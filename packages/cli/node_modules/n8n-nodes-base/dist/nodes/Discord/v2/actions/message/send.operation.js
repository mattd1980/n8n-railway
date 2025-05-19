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
var send_operation_exports = {};
__export(send_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(send_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.description");
const properties = [
  ...import_common.sendToProperties,
  {
    displayName: "Message",
    name: "content",
    type: "string",
    default: "",
    description: "The content of the message (up to 2000 characters)",
    placeholder: "e.g. My message",
    typeOptions: {
      rows: 2
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Flags",
        name: "flags",
        type: "multiOptions",
        default: [],
        description: 'Message flags. <a href="https://discord.com/developers/docs/resources/channel#message-object-message-flags" target="_blank">More info</a>.\u201D.',
        options: [
          {
            name: "Suppress Embeds",
            value: "SUPPRESS_EMBEDS"
          },
          {
            name: "Suppress Notifications",
            value: "SUPPRESS_NOTIFICATIONS"
          }
        ]
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
        displayName: "Message to Reply to",
        name: "message_reference",
        type: "string",
        default: "",
        description: "Fill this to make your message a reply. Add the message ID.",
        placeholder: "e.g. 1059467601836773386"
      },
      {
        displayName: "Text-to-Speech (TTS)",
        name: "tts",
        type: "boolean",
        default: false,
        description: "Whether to have a bot reading the message directly in the channel"
      }
    ]
  },
  import_common.embedsFixedCollection,
  import_common.filesFixedCollection
];
const displayOptions = {
  show: {
    resource: ["message"],
    operation: ["send"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(guildId, userGuilds) {
  const returnData = [];
  const items = this.getInputData();
  const isOAuth2 = this.getNodeParameter("authentication", 0) === "oAuth2";
  for (let i = 0; i < items.length; i++) {
    const content = this.getNodeParameter("content", i);
    const options = (0, import_utils.prepareOptions)(this.getNodeParameter("options", i, {}), guildId);
    const embeds = this.getNodeParameter("embeds", i, void 0)?.values;
    const files = this.getNodeParameter("files", i, void 0)?.values;
    const body = {
      content,
      ...options
    };
    if (embeds) {
      body.embeds = import_utils.prepareEmbeds.call(this, embeds);
    }
    try {
      returnData.push(
        ...await import_utils.sendDiscordMessage.call(this, {
          guildId,
          userGuilds,
          isOAuth2,
          body,
          items,
          files,
          itemIndex: i
        })
      );
    } catch (error) {
      const err = import_utils.parseDiscordError.call(this, error, i);
      if (this.continueOnFail()) {
        returnData.push(...import_utils.prepareErrorData.call(this, err, i));
        continue;
      }
      throw err;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=send.operation.js.map