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
var JournalEntryDescription_exports = {};
__export(JournalEntryDescription_exports, {
  journalEntryFields: () => journalEntryFields,
  journalEntryOperations: () => journalEntryOperations
});
module.exports = __toCommonJS(JournalEntryDescription_exports);
const journalEntryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["journalEntry"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a journal entry",
        action: "Create a journal entry"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a journal entry",
        action: "Delete a journal entry"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a journal entry",
        action: "Get a journal entry"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many journal entries",
        action: "Get many journal entries"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a journal entry",
        action: "Update a journal entry"
      }
    ],
    default: "create"
  }
];
const journalEntryFields = [
  // ----------------------------------------
  //           journalEntry: create
  // ----------------------------------------
  {
    displayName: "Title",
    name: "title",
    description: "Title of the journal entry - max 250 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Content",
    name: "post",
    description: "Content of the journal entry - max 100,000 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //           journalEntry: delete
  // ----------------------------------------
  {
    displayName: "Journal Entry ID",
    name: "journalId",
    description: "ID of the journal entry to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //            journalEntry: get
  // ----------------------------------------
  {
    displayName: "Journal Entry ID",
    name: "journalId",
    description: "ID of the journal entry to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //           journalEntry: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
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
        resource: ["journalEntry"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //           journalEntry: update
  // ----------------------------------------
  {
    displayName: "Journal Entry ID",
    name: "journalId",
    description: "ID of the journal entry to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["journalEntry"],
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
        resource: ["journalEntry"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Content",
        name: "post",
        description: "Content of the journal entry - max 100,000 characters",
        type: "string",
        default: ""
      },
      {
        displayName: "Title",
        name: "title",
        description: "Title of the journal entry - max 250 characters",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  journalEntryFields,
  journalEntryOperations
});
//# sourceMappingURL=JournalEntryDescription.js.map