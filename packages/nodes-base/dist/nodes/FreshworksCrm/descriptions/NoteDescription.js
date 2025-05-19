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
var NoteDescription_exports = {};
__export(NoteDescription_exports, {
  noteFields: () => noteFields,
  noteOperations: () => noteOperations
});
module.exports = __toCommonJS(NoteDescription_exports);
const noteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["note"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a note",
        action: "Create a note"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a note",
        action: "Delete a note"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a note",
        action: "Update a note"
      }
    ],
    default: "create"
  }
];
const noteFields = [
  // ----------------------------------------
  //               note: create
  // ----------------------------------------
  {
    displayName: "Content",
    name: "description",
    description: "Content of the note",
    type: "string",
    required: true,
    typeOptions: {
      rows: 5
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Target Type",
    name: "targetableType",
    description: "Type of the entity for which the note is created",
    type: "options",
    required: true,
    default: "Contact",
    options: [
      {
        name: "Contact",
        value: "Contact"
      },
      {
        name: "Deal",
        value: "Deal"
      },
      {
        name: "Sales Account",
        value: "SalesAccount"
      }
    ],
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Target ID",
    name: "targetable_id",
    description: 'ID of the entity for which note is created. The type of entity is selected in "Target Type".',
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //               note: delete
  // ----------------------------------------
  {
    displayName: "Note ID",
    name: "noteId",
    description: "ID of the note to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //               note: update
  // ----------------------------------------
  {
    displayName: "Note ID",
    name: "noteId",
    description: "ID of the note to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Content",
        name: "description",
        type: "string",
        typeOptions: {
          rows: 5
        },
        default: "",
        description: "Content of the note"
      },
      {
        displayName: "Target ID",
        name: "targetable_id",
        type: "string",
        default: "",
        description: "ID of the entity for which the note is updated"
      },
      {
        displayName: "Target Type",
        name: "targetable_type",
        type: "options",
        default: "Contact",
        description: "Type of the entity for which the note is updated",
        options: [
          {
            name: "Contact",
            value: "Contact"
          },
          {
            name: "Deal",
            value: "Deal"
          },
          {
            name: "Sales Account",
            value: "SalesAccount"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noteFields,
  noteOperations
});
//# sourceMappingURL=NoteDescription.js.map