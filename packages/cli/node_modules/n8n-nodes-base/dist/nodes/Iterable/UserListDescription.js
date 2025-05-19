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
var UserListDescription_exports = {};
__export(UserListDescription_exports, {
  userListFields: () => userListFields,
  userListOperations: () => userListOperations
});
module.exports = __toCommonJS(UserListDescription_exports);
const userListOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["userList"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add user to list",
        action: "Add a user to a list"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a user from a list",
        action: "Remove a user from a list"
      }
    ],
    default: "add"
  }
];
const userListFields = [
  /* -------------------------------------------------------------------------- */
  /*                                userList:add                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["add"]
      }
    },
    default: "",
    description: 'Identifier to be used. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Identifier",
    name: "identifier",
    type: "options",
    required: true,
    options: [
      {
        name: "Email",
        value: "email"
      },
      {
        name: "User ID",
        value: "userId"
      }
    ],
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["add"]
      }
    },
    default: "",
    description: "Identifier to be used"
  },
  {
    displayName: "Value",
    name: "value",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["add"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                userList:remove                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["remove"]
      }
    },
    default: "",
    description: 'Identifier to be used. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Identifier",
    name: "identifier",
    type: "options",
    required: true,
    options: [
      {
        name: "Email",
        value: "email"
      },
      {
        name: "User ID",
        value: "userId"
      }
    ],
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["remove"]
      }
    },
    default: "",
    description: "Identifier to be used"
  },
  {
    displayName: "Value",
    name: "value",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["remove"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["userList"],
        operation: ["remove"]
      }
    },
    options: [
      {
        displayName: "Campaign ID",
        name: "campaignId",
        type: "number",
        default: 0,
        description: "Attribute unsubscribe to a campaign"
      },
      {
        displayName: "Channel Unsubscribe",
        name: "channelUnsubscribe",
        type: "boolean",
        default: false,
        description: "Whether to unsubscribe email from list's associated channel - essentially a global unsubscribe"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userListFields,
  userListOperations
});
//# sourceMappingURL=UserListDescription.js.map