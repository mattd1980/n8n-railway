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
var ChannelMessageDescription_exports = {};
__export(ChannelMessageDescription_exports, {
  channelMessageFields: () => channelMessageFields,
  channelMessageOperations: () => channelMessageOperations
});
module.exports = __toCommonJS(ChannelMessageDescription_exports);
const channelMessageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["channelMessage"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a message",
        action: "Create a message in a channel"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many messages",
        action: "Get many messages in a channel"
      }
    ],
    default: "create"
  }
];
const channelMessageFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 channelMessage:create                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channelMessage"]
      }
    },
    default: ""
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels",
      loadOptionsDependsOn: ["teamId"]
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channelMessage"]
      }
    },
    default: ""
  },
  {
    displayName: "Message Type",
    name: "messageType",
    required: true,
    type: "options",
    options: [
      {
        name: "Text",
        value: "text"
      },
      {
        name: "HTML",
        value: "html"
      }
    ],
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channelMessage"]
      }
    },
    default: "text",
    description: "The type of the content"
  },
  {
    displayName: "Message",
    name: "message",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channelMessage"]
      }
    },
    default: "",
    description: "The content of the item"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["channelMessage"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Include Link to Workflow",
        name: "includeLinkToWorkflow",
        type: "boolean",
        default: true,
        description: "Whether to append a link to this workflow at the end of the message. This is helpful if you have many workflows sending messages."
      },
      {
        displayName: "Make Reply",
        name: "makeReply",
        type: "string",
        default: "",
        description: "An optional ID of the message you want to reply to"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 channelMessage:getAll                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["channelMessage"]
      }
    },
    default: ""
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels",
      loadOptionsDependsOn: ["teamId"]
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["channelMessage"]
      }
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["channelMessage"]
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
        operation: ["getAll"],
        resource: ["channelMessage"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelMessageFields,
  channelMessageOperations
});
//# sourceMappingURL=ChannelMessageDescription.js.map