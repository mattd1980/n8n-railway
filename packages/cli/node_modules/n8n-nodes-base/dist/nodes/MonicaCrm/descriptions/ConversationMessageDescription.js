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
var ConversationMessageDescription_exports = {};
__export(ConversationMessageDescription_exports, {
  conversationMessageFields: () => conversationMessageFields,
  conversationMessageOperations: () => conversationMessageOperations
});
module.exports = __toCommonJS(ConversationMessageDescription_exports);
const conversationMessageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["conversationMessage"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a message to a conversation",
        action: "Add a message to a conversation"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a message in a conversation",
        action: "Update a message in a conversation"
      }
    ],
    default: "add"
  }
];
const conversationMessageFields = [
  // ----------------------------------------
  //         conversationMessage: add
  // ----------------------------------------
  {
    displayName: "Conversation ID",
    name: "conversationId",
    description: "ID of the contact whose conversation",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Content",
    name: "content",
    description: "Content of the message",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Written At",
    name: "writtenAt",
    description: "Date when the message was written",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Written By",
    name: "writtenByMe",
    description: "Author of the message",
    type: "options",
    required: true,
    default: true,
    options: [
      {
        name: "User",
        value: true
      },
      {
        name: "Contact",
        value: false
      }
    ],
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //       conversationMessage: update
  // ----------------------------------------
  {
    displayName: "Message ID",
    name: "messageId",
    description: "ID of the message to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Conversation ID",
    name: "conversationId",
    description: "ID of the conversation whose message to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["conversationMessage"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Contact ID",
        name: "contact_id",
        description: "ID of the contact to associate the conversationMessage with",
        type: "string",
        default: ""
      },
      {
        displayName: "Content",
        name: "content",
        description: "Content of the message",
        type: "string",
        default: ""
      },
      {
        displayName: "Written At",
        name: "written_at",
        description: "Date when the message was written",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Written By",
        name: "written_by_me",
        description: "Author of the message",
        type: "options",
        default: true,
        options: [
          {
            name: "User",
            value: true
          },
          {
            name: "Contact",
            value: false
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  conversationMessageFields,
  conversationMessageOperations
});
//# sourceMappingURL=ConversationMessageDescription.js.map