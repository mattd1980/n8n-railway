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
var ListEntryDescription_exports = {};
__export(ListEntryDescription_exports, {
  listEntryFields: () => listEntryFields,
  listEntryOperations: () => listEntryOperations
});
module.exports = __toCommonJS(ListEntryDescription_exports);
const listEntryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["listEntry"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a list entry",
        action: "Create a list entry"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a list entry",
        action: "Delete a list entry"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a list entry",
        action: "Get a list entry"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many list entries",
        action: "Get many list entries"
      }
    ],
    default: "create"
  }
];
const listEntryFields = [
  /* -------------------------------------------------------------------------- */
  /*                                listEntry:create                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["create"]
      }
    },
    description: 'The unique ID of the list whose list entries are to be retrieved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Entity ID",
    name: "entityId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["create"]
      }
    },
    description: "The unique ID of the entity (person, organization, or opportunity) to add to this list"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Creator ID",
        name: "creator_id",
        type: "string",
        default: "",
        description: "The ID of a Person resource who should be recorded as adding the entry to the list. Must be a person who can access Affinity. If not provided the creator defaults to the owner of the API key."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 listEntry:get                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["get"]
      }
    },
    description: 'The unique ID of the list that contains the specified list_entry_id. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "List Entry ID",
    name: "listEntryId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["get"]
      }
    },
    description: "The unique ID of the list entry object to be retrieved"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 listEntry:getAll                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["getAll"]
      }
    },
    default: "",
    description: 'The unique ID of the list whose list entries are to be retrieved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["getAll"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 listEntry:delete                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLists"
    },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["delete"]
      }
    },
    description: 'The unique ID of the list that contains the specified list_entry_id. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "List Entry ID",
    name: "listEntryId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["listEntry"],
        operation: ["delete"]
      }
    },
    description: "The unique ID of the list entry object to be deleted"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listEntryFields,
  listEntryOperations
});
//# sourceMappingURL=ListEntryDescription.js.map