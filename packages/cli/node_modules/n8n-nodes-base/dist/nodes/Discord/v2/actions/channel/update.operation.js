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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.description");
const properties = [
  import_common.channelRLC,
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    description: "The new name of the channel. Fill this field only if you want to change the channel's name.",
    placeholder: "e.g. new-channel-name"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Age-Restricted (NSFW)",
        name: "nsfw",
        type: "boolean",
        default: false,
        description: "Whether the content of the channel might be nsfw (not safe for work)"
      },
      {
        displayName: "Bitrate",
        name: "bitrate",
        type: "number",
        default: 8e3,
        typeOptions: {
          minValue: 8e3,
          maxValue: 96e3
        },
        description: "The bitrate (in bits) of the voice channel",
        hint: "Only applicable to voice channels"
      },
      import_common.categoryRLC,
      {
        displayName: "Position",
        name: "position",
        type: "number",
        default: 1
      },
      {
        displayName: "Rate Limit Per User",
        name: "rate_limit_per_user",
        type: "number",
        default: 0,
        description: "Amount of seconds a user has to wait before sending another message"
      },
      {
        displayName: "Topic",
        name: "topic",
        type: "string",
        default: "",
        typeOptions: {
          rows: 2
        },
        description: "The channel topic description (0-1024 characters)",
        placeholder: "e.g. This channel is about\u2026"
      },
      {
        displayName: "User Limit",
        name: "user_limit",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0,
          maxValue: 99
        },
        placeholder: "e.g. 20",
        hint: "Only applicable to voice channels",
        description: "The limit for the number of members that can be in the channel (0 refers to no limit)"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channel"],
    operation: ["update"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(_guildId, userGuilds) {
  const returnData = [];
  const items = this.getInputData();
  const getChannelId = await import_utils.setupChannelGetter.call(this, userGuilds);
  for (let i = 0; i < items.length; i++) {
    try {
      const channelId = await getChannelId(i);
      const name = this.getNodeParameter("name", i);
      const options = this.getNodeParameter("options", i);
      if (options.categoryId) {
        options.parent_id = options.categoryId.value;
        delete options.categoryId;
      }
      const body = {
        name,
        ...options
      };
      const response = await import_transport.discordApiRequest.call(this, "PATCH", `/channels/${channelId}`, body);
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
//# sourceMappingURL=update.operation.js.map