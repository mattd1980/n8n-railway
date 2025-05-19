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
var ContactTagDescription_exports = {};
__export(ContactTagDescription_exports, {
  contactTagFields: () => contactTagFields,
  contactTagOperations: () => contactTagOperations
});
module.exports = __toCommonJS(ContactTagDescription_exports);
const contactTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactTag"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a tag to a contact",
        action: "Add a contact tag"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a tag from a contact",
        action: "Remove a contact tag"
      }
    ],
    default: "add"
  }
];
const contactTagFields = [
  // ----------------------------------
  //         contactTag:add
  // ----------------------------------
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["contactTag"]
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
        resource: ["contactTag"]
      }
    }
  },
  // ----------------------------------
  //         contactTag:delete
  // ----------------------------------
  {
    displayName: "Contact Tag ID",
    name: "contactTagId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["remove"],
        resource: ["contactTag"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the contact tag to delete"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactTagFields,
  contactTagOperations
});
//# sourceMappingURL=ContactTagDescription.js.map