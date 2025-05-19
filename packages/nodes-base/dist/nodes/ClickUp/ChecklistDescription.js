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
var ChecklistDescription_exports = {};
__export(ChecklistDescription_exports, {
  checklistFields: () => checklistFields,
  checklistOperations: () => checklistOperations
});
module.exports = __toCommonJS(ChecklistDescription_exports);
const checklistOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["checklist"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a checklist",
        action: "Create a checklist"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a checklist",
        action: "Delete a checklist"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a checklist",
        action: "Update a checklist"
      }
    ],
    default: "create"
  }
];
const checklistFields = [
  /* -------------------------------------------------------------------------- */
  /*                                checklist:create                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "task",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklist"],
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
        resource: ["checklist"],
        operation: ["create"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                checklist:delete                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checklist ID",
    name: "checklist",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklist"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                checklist:update                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checklist ID",
    name: "checklist",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["checklist"],
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
        resource: ["checklist"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Position",
        name: "position",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checklistFields,
  checklistOperations
});
//# sourceMappingURL=ChecklistDescription.js.map