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
        description: "Add contact to a list",
        action: "Add a contact to a list"
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
  /*                                contactList:add                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "By",
    name: "by",
    type: "options",
    options: [
      {
        name: "Contact ID",
        value: "id"
      },
      {
        name: "Email",
        value: "email"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"]
      }
    },
    default: "email"
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"],
        by: ["email"]
      }
    },
    default: ""
  },
  {
    displayName: "Contact to Add",
    name: "id",
    type: "number",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"],
        by: ["id"]
      }
    },
    default: ""
  },
  {
    displayName: "List to Add To",
    name: "listId",
    type: "number",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                contactList:remove                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact to Remove",
    name: "id",
    type: "number",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["remove"]
      }
    },
    default: ""
  },
  {
    displayName: "List to Remove From",
    name: "listId",
    type: "number",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["remove"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactListFields,
  contactListOperations
});
//# sourceMappingURL=ContactListDescription.js.map