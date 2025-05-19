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
        name: "Get",
        value: "get",
        description: "Retrieve a note",
        action: "Get a note"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many notes",
        action: "Get many notes"
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
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to associate the note with",
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
  {
    displayName: "Body",
    name: "body",
    description: "Body of the note - max 100,000 characters",
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
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Is Favorited",
        name: "isFavorited",
        description: "Whether the note has been favorited",
        type: "boolean",
        default: false
      }
    ]
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
  //                note: get
  // ----------------------------------------
  {
    displayName: "Note ID",
    name: "noteId",
    description: "ID of the note to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               note: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["getAll"],
        returnAll: [false]
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
        displayName: "Body",
        name: "body",
        description: "Body of the note - max 100,000 characters",
        type: "string",
        default: ""
      },
      {
        displayName: "Contact ID",
        name: "contact_id",
        description: "ID of the contact to associate the note with",
        type: "string",
        default: ""
      },
      {
        displayName: "Is Favorited",
        name: "is_favorited",
        description: "Whether the note has been favorited",
        type: "boolean",
        default: false
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