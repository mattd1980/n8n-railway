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
var ConversationDescription_exports = {};
__export(ConversationDescription_exports, {
  conversationFields: () => conversationFields,
  conversationOperations: () => conversationOperations
});
module.exports = __toCommonJS(ConversationDescription_exports);
const conversationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["conversation"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a conversation",
        action: "Create a conversation"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a conversation",
        action: "Delete a conversation"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a conversation",
        action: "Get a conversation"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a conversation",
        action: "Update a conversation"
      }
    ],
    default: "create"
  }
];
const conversationFields = [
  // ----------------------------------------
  //           conversation: create
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to associate the conversation with",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Contact Field Type Name or ID",
    name: "contactFieldTypeId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getContactFieldTypes"
    },
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Happened At",
    name: "happenedAt",
    description: "Date when the conversation happened",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //           conversation: delete
  // ----------------------------------------
  {
    displayName: "Conversation ID",
    name: "conversationId",
    description: "ID of the conversation to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //            conversation: get
  // ----------------------------------------
  {
    displayName: "Conversation ID",
    name: "conversationId",
    description: "ID of the conversation to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //           conversation: update
  // ----------------------------------------
  {
    displayName: "Conversation ID",
    name: "conversationId",
    description: "ID of the conversation to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Contact Field Type Name or ID",
    name: "contactFieldTypeId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getContactFieldTypes"
    },
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Happened At",
    name: "happenedAt",
    description: "Date when the conversation happened",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["conversation"],
        operation: ["update"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  conversationFields,
  conversationOperations
});
//# sourceMappingURL=ConversationDescription.js.map