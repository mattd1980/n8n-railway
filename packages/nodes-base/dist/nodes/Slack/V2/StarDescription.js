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
var StarDescription_exports = {};
__export(StarDescription_exports, {
  starFields: () => starFields,
  starOperations: () => starOperations
});
module.exports = __toCommonJS(StarDescription_exports);
const starOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["star"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a star to an item",
        action: "Add a star"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a star from an item",
        action: "Delete a star"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many stars of autenticated user",
        action: "Get many stars"
      }
    ],
    default: "add"
  }
];
const starFields = [
  /* -------------------------------------------------------------------------- */
  /*                                star:add                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Item to Add Star",
    name: "target",
    type: "options",
    required: true,
    description: "Choose whether to add a star to a message or a file",
    default: "",
    placeholder: "Select...",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["star"]
      }
    },
    options: [
      {
        name: "Message",
        value: "message"
      },
      {
        name: "File",
        value: "file"
      }
    ]
  },
  {
    displayName: "Channel",
    name: "channelId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    placeholder: "Select a channel...",
    description: "The Slack channel to add a star to",
    displayOptions: {
      show: {
        resource: ["star"],
        operation: ["add"],
        target: ["message", "file"]
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
    displayName: "File ID",
    name: "fileId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["star"],
        operation: ["add"],
        target: ["file"]
      }
    },
    description: "File to add star to"
  },
  {
    displayName: "Message Timestamp",
    name: "timestamp",
    type: "number",
    default: void 0,
    displayOptions: {
      show: {
        resource: ["star"],
        operation: ["add"],
        target: ["message"]
      }
    },
    description: "Timestamp of the message to add",
    placeholder: "1663233118.856619"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["star"]
      }
    },
    default: {},
    description: "Options to set",
    placeholder: "Add option",
    options: [
      {
        displayName: "File Comment",
        name: "fileComment",
        type: "string",
        default: "",
        description: "File comment to add star to"
      }
    ]
  },
  /* ----------------------------------------------------------------------- */
  /*                                 star:delete                             */
  /* ----------------------------------------------------------------------- */
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["star"]
      }
    },
    default: {},
    description: "Options to set",
    placeholder: "Add option",
    options: [
      {
        displayName: "Channel Name or ID",
        name: "channelId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getChannels"
        },
        default: "",
        description: 'Channel to add star to, or channel where the message to add star to was posted (used with timestamp). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "File ID",
        name: "fileId",
        type: "string",
        default: "",
        description: "File to add star to"
      },
      {
        displayName: "File Comment",
        name: "fileComment",
        type: "string",
        default: "",
        description: "File comment to add star to"
      },
      {
        displayName: "Message Timestamp",
        name: "timestamp",
        type: "number",
        default: 0,
        description: "Timestamp of the message to delete",
        placeholder: "1663233118.856619"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 star:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["star"],
        operation: ["getAll"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["star"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  starFields,
  starOperations
});
//# sourceMappingURL=StarDescription.js.map