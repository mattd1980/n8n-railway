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
var ContactListDescription_exports = {};
__export(ContactListDescription_exports, {
  contactListFields: () => contactListFields,
  contactListOperations: () => contactListOperations
});
module.exports = __toCommonJS(ContactListDescription_exports);
const contactListOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactList"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add contact to list",
        action: "Add a contact to a list"
      },
      {
        name: "Exist",
        value: "exist",
        description: "Check if contact is on list",
        action: "Check if a contact list exists"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many contacts from a list",
        action: "Get many contact lists"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a contact from a list",
        action: "Remove a contact from a list"
      }
    ],
    default: "add"
  }
];
const contactListFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 contactList:add                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    type: "options",
    displayOptions: {
      show: {
        operation: ["add", "remove", "exist", "getAll"],
        resource: ["contactList"]
      }
    },
    default: "",
    description: 'ID of the list to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["add", "remove", "exist"],
        resource: ["contactList"]
      }
    },
    default: "",
    description: "Can be ID or email"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contactList:getAll                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["contactList"]
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
        resource: ["contactList"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactListFields,
  contactListOperations
});
//# sourceMappingURL=ContactListDescription.js.map