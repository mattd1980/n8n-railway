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
        description: "Remove contact from a list",
        action: "Remove a contact from a list"
      }
    ],
    default: "add"
  }
];
const contactListFields = [
  // ----------------------------------
  //         contactList:add
  // ----------------------------------
  {
    displayName: "List ID",
    name: "listId",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["contactList"]
      }
    }
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["contactList"]
      }
    }
  },
  // ----------------------------------
  //         contactList:remove
  // ----------------------------------
  {
    displayName: "List ID",
    name: "listId",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["remove"],
        resource: ["contactList"]
      }
    }
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["remove"],
        resource: ["contactList"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactListFields,
  contactListOperations
});
//# sourceMappingURL=ContactListDescription.js.map