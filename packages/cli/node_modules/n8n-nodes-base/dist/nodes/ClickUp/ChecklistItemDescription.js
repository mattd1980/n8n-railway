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
var ChecklistItemDescription_exports = {};
__export(ChecklistItemDescription_exports, {
  checklistItemFields: () => checklistItemFields,
  checklistItemOperations: () => checklistItemOperations
});
module.exports = __toCommonJS(ChecklistItemDescription_exports);
const checklistItemOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["checklistItem"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a checklist item",
        action: "Create a checklist item"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a checklist item",
        action: "Delete a checklist item"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a checklist item",
        action: "Update a checklist item"
      }
    ],
    default: "create"
  }
];
const checklistItemFields = [
  /* -------------------------------------------------------------------------- */
  /*                                checklistItem:create                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checklist ID",
    name: "checklist",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee",
        type: "string",
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                checklistItem:delete                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checklist ID",
    name: "checklist",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["delete"]
      }
    },
    required: true
  },
  {
    displayName: "Checklist Item ID",
    name: "checklistItem",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                checklistItem:update                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checklist ID",
    name: "checklist",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["update"]
      }
    },
    required: true
  },
  {
    displayName: "Checklist Item ID",
    name: "checklistItem",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["update"]
      }
    },
    required: true
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["checklistItem"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee",
        type: "string",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Parent Checklist Item ID",
        name: "parent",
        type: "string",
        default: "",
        description: "Checklist item that you want to nest the target checklist item underneath"
      },
      {
        displayName: "Resolved",
        name: "resolved",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checklistItemFields,
  checklistItemOperations
});
//# sourceMappingURL=ChecklistItemDescription.js.map