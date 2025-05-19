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
        action: "Add a tag to a contact"
      },
      {
        name: "Remove",
        value: "remove",
        action: "Remove a tag from a contact"
      }
    ],
    default: "add"
  }
];
const contactTagFields = [
  // ----------------------------------------
  //               tag: add
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to add a tag to",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactTag"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Tag Names or IDs",
    name: "tagsToAdd",
    description: 'Tags to add to the contact. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "multiOptions",
    typeOptions: {
      loadOptionsMethod: "getTagsToAdd"
    },
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ["contactTag"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //              tag: remove
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to remove the tag from",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactTag"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Tag Names or IDs",
    name: "tagsToRemove",
    description: 'Tags to remove from the contact. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "multiOptions",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTagsToRemove"
    },
    default: [],
    displayOptions: {
      show: {
        resource: ["contactTag"],
        operation: ["remove"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactTagFields,
  contactTagOperations
});
//# sourceMappingURL=ContactTagDescription.js.map