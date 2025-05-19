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
var MessageDescription_exports = {};
__export(MessageDescription_exports, {
  messageFields: () => messageFields,
  messageOperations: () => messageOperations
});
module.exports = __toCommonJS(MessageDescription_exports);
const messageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["message"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a message",
        action: "Delete a message"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a message",
        action: "Get a message"
      },
      {
        name: "Send Private",
        value: "sendPrivate",
        description: "Send a private message",
        action: "Send a private message"
      },
      {
        name: "Send to Stream",
        value: "sendStream",
        description: "Send a message to stream",
        action: "Send a message to a stream"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a message",
        action: "Update a message"
      },
      {
        name: "Upload a File",
        value: "updateFile",
        action: "Upload a file"
      }
    ],
    default: "sendPrivate"
  }
];
const messageFields = [
  /* -------------------------------------------------------------------------- */
  /*                                message:sendPrivate                         */
  /* -------------------------------------------------------------------------- */
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
    displayName: "To",
    name: "to",
    type: "multiOptions",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendPrivate"]
      }
    },
    description: 'The destination stream, or a comma-separated list containing the usernames (emails) of the recipients. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Content",
    name: "content",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendPrivate"]
      }
    },
    description: "The content of the message"
  },
  /* -------------------------------------------------------------------------- */
  /*                                message:sendStream                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Stream Name or ID",
    name: "stream",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getStreams"
    },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendStream"]
      }
    },
    description: 'The destination stream, or a comma-separated list containing the usernames (emails) of the recipients. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Topic Name or ID",
    name: "topic",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["stream"],
      loadOptionsMethod: "getTopics"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendStream"]
      }
    },
    default: "",
    description: 'The topic of the message. Only required if type is stream, ignored otherwise. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Content",
    name: "content",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendStream"]
      }
    },
    description: "The content of the message"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 message:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["update"]
      }
    },
    description: "Unique identifier for the message"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Content",
        name: "content",
        type: "string",
        default: "",
        description: "The content of the message"
      },
      {
        displayName: "Propagate Mode",
        name: "propagateMode",
        type: "options",
        options: [
          {
            name: "Change One",
            value: "changeOne"
          },
          {
            name: "Change Later",
            value: "changeLater"
          },
          {
            name: "Change All",
            value: "changeAll"
          }
        ],
        default: "changeOne",
        description: "Which message(s) should be edited: just the one indicated in message_id, messages in the same topic that had been sent after this one, or all of them"
      },
      {
        displayName: "Topic",
        name: "topic",
        type: "string",
        default: "",
        description: "The topic of the message. Only required for stream messages."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 message:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for the message"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 message:delete                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["delete"]
      }
    },
    description: "Unique identifier for the message"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 message:updateFile                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Put Output File in Field",
    name: "dataBinaryProperty",
    type: "string",
    required: true,
    default: "data",
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["updateFile"]
      }
    },
    hint: "The name of the output binary field to put the file in"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  messageFields,
  messageOperations
});
//# sourceMappingURL=MessageDescription.js.map