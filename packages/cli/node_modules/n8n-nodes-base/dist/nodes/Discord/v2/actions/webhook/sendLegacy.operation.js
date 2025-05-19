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
var sendLegacy_operation_exports = {};
__export(sendLegacy_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(sendLegacy_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.description");
const properties = [
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
        displayName: "Avatar URL",
        name: "avatar_url",
        type: "string",
        default: "",
        description: "Override the default avatar of the webhook",
        placeholder: "e.g. https://example.com/image.png"
      },
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
        displayName: "Text-to-Speech (TTS)",
        name: "tts",
        type: "boolean",
        default: false,
        description: "Whether to have a bot reading the message directly in the channel"
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: "",
        description: "Override the default username of the webhook",
        placeholder: "e.g. My Username"
      },
      {
        displayName: "Wait",
        name: "wait",
        type: "boolean",
        default: false,
        description: "Whether wait for the message to be created before returning its response"
      }
    ]
  },
  import_common.embedsFixedCollection,
  import_common.filesFixedCollection
];
const displayOptions = {
  show: {
    operation: ["sendLegacy"]
  },
  hide: {
    authentication: ["botToken", "oAuth2"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute() {
  const returnData = [];
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    const content = this.getNodeParameter("content", i);
    const options = (0, import_utils.prepareOptions)(this.getNodeParameter("options", i, {}));
    const embeds = this.getNodeParameter("embeds", i, void 0)?.values;
    const files = this.getNodeParameter("files", i, void 0)?.values;
    let qs = void 0;
    if (options.wait) {
      qs = {
        wait: options.wait
      };
      delete options.wait;
    }
    const body = {
      content,
      ...options
    };
    if (embeds) {
      body.embeds = import_utils.prepareEmbeds.call(this, embeds);
    }
    try {
      let response = [];
      if (files?.length) {
        const multiPartBody = await import_utils.prepareMultiPartForm.call(this, items, files, body, i);
        response = await import_transport.discordApiMultiPartRequest.call(this, "POST", "", multiPartBody);
      } else {
        response = await import_transport.discordApiRequest.call(this, "POST", "", body, qs);
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(response),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
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
//# sourceMappingURL=sendLegacy.operation.js.map