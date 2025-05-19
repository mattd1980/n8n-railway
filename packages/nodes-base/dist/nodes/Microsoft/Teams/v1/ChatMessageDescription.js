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
var ChatMessageDescription_exports = {};
__export(ChatMessageDescription_exports, {
  chatMessageFields: () => chatMessageFields,
  chatMessageOperations: () => chatMessageOperations
});
module.exports = __toCommonJS(ChatMessageDescription_exports);
const chatMessageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["chatMessage"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a message",
        action: "Create a chat message"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a message",
        action: "Get a chat message"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many messages",
        action: "Get many chat messages"
      }
    ],
    default: "create"
  }
];
const chatMessageFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 chatMessage:create                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Chat Name or ID",
    name: "chatId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChats"
    },
    displayOptions: {
      show: {
        operation: ["create", "get"],
        resource: ["chatMessage"]
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
        resource: ["chatMessage"]
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
        resource: ["chatMessage"]
      }
    },
    default: "",
    description: "The content of the item"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["chatMessage"]
      }
    },
    default: {},
    description: "Other options to set",
    placeholder: "Add option",
    options: [
      {
        displayName: "Include Link to Workflow",
        name: "includeLinkToWorkflow",
        type: "boolean",
        default: true,
        description: "Whether to append a link to this workflow at the end of the message. This is helpful if you have many workflows sending messages."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 chatMessage:get                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Message ID",
    name: "messageId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["chatMessage"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 chatMessage:getAll                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Chat Name or ID",
    name: "chatId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChats"
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["chatMessage"]
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
        resource: ["chatMessage"]
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
        resource: ["chatMessage"],
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
  chatMessageFields,
  chatMessageOperations
});
//# sourceMappingURL=ChatMessageDescription.js.map