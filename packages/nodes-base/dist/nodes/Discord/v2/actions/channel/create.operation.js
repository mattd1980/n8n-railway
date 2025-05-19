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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.description");
const properties = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    description: "The name of the channel",
    placeholder: "e.g. new-channel"
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    default: "0",
    required: true,
    description: "The type of channel to create",
    options: [
      {
        name: "Guild Text",
        value: "0"
      },
      {
        name: "Guild Voice",
        value: "2"
      },
      {
        name: "Guild Category",
        value: "4"
      }
    ]
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
        description: "Whether the content of the channel might be nsfw (not safe for work)",
        displayOptions: {
          hide: {
            "/type": ["4"]
          }
        }
      },
      {
        displayName: "Bitrate",
        name: "bitrate",
        type: "number",
        default: 8e3,
        placeholder: "e.g. 8000",
        typeOptions: {
          minValue: 8e3,
          maxValue: 96e3
        },
        description: "The bitrate (in bits) of the voice channel",
        displayOptions: {
          show: {
            "/type": ["2"]
          }
        }
      },
      {
        ...import_common.categoryRLC,
        displayOptions: {
          hide: {
            "/type": ["4"]
          }
        }
      },
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
        description: "Amount of seconds a user has to wait before sending another message",
        displayOptions: {
          hide: {
            "/type": ["4"]
          }
        }
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
        placeholder: "e.g. This channel is about\u2026",
        displayOptions: {
          hide: {
            "/type": ["4"]
          }
        }
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
        description: "The limit for the number of members that can be in the channel (0 refers to no limit)",
        displayOptions: {
          show: {
            "/type": ["2"]
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channel"],
    operation: ["create"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(guildId) {
  const returnData = [];
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    try {
      const name = this.getNodeParameter("name", i);
      const type = this.getNodeParameter("type", i);
      const options = this.getNodeParameter("options", i);
      if (options.categoryId) {
        options.parent_id = options.categoryId.value;
        delete options.categoryId;
      }
      const body = {
        name,
        type,
        ...options
      };
      const response = await import_transport.discordApiRequest.call(
        this,
        "POST",
        `/guilds/${guildId}/channels`,
        body
      );
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
//# sourceMappingURL=create.operation.js.map