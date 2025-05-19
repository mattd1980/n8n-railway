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
var CaseTagDescription_exports = {};
__export(CaseTagDescription_exports, {
  caseTagFields: () => caseTagFields,
  caseTagOperations: () => caseTagOperations
});
module.exports = __toCommonJS(CaseTagDescription_exports);
const caseTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["caseTag"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a tag to a case",
        action: "Add a tag to a case"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a tag from a case",
        action: "Remove a tag from a case"
      }
    ],
    default: "add"
  }
];
const caseTagFields = [
  // ----------------------------------------
  //             caseTag: add
  // ----------------------------------------
  {
    displayName: "Case ID",
    name: "caseId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["caseTag"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Tag Name or ID",
    name: "tag",
    type: "options",
    description: 'Tag to attach to the case. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    displayOptions: {
      show: {
        resource: ["caseTag"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //            caseTag: remove
  // ----------------------------------------
  {
    displayName: "Case ID",
    name: "caseId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["caseTag"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Tag Name or ID",
    name: "tag",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    displayOptions: {
      show: {
        resource: ["caseTag"],
        operation: ["remove"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  caseTagFields,
  caseTagOperations
});
//# sourceMappingURL=CaseTagDescription.js.map