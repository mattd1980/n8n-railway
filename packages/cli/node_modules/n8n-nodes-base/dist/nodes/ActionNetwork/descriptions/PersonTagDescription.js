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
var PersonTagDescription_exports = {};
__export(PersonTagDescription_exports, {
  personTagFields: () => personTagFields,
  personTagOperations: () => personTagOperations
});
module.exports = __toCommonJS(PersonTagDescription_exports);
const personTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["personTag"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        action: "Add a person tag"
      },
      {
        name: "Remove",
        value: "remove",
        action: "Remove a person tag"
      }
    ],
    default: "add"
  }
];
const personTagFields = [
  // ----------------------------------------
  //             personTag: add
  // ----------------------------------------
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    description: 'ID of the tag to add. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ["personTag"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Person ID",
    name: "personId",
    description: "ID of the person to add the tag to",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["personTag"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //             personTag: remove
  // ----------------------------------------
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    description: 'ID of the tag whose tagging to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    default: [],
    required: true,
    displayOptions: {
      show: {
        resource: ["personTag"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Tagging Name or ID",
    name: "taggingId",
    description: 'ID of the tagging to remove. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tagId"],
      loadOptionsMethod: "getTaggings"
    },
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ["personTag"],
        operation: ["remove"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personTagFields,
  personTagOperations
});
//# sourceMappingURL=PersonTagDescription.js.map