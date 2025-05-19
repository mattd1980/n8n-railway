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
var GroupDescription_exports = {};
__export(GroupDescription_exports, {
  groupDescription: () => groupDescription
});
module.exports = __toCommonJS(GroupDescription_exports);
const groupDescription = [
  // ----------------------------------
  //           operations
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["group"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a group",
        action: "Create a group"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a group",
        action: "Delete a group"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a group",
        action: "Get a group"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many groups",
        action: "Get many groups"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a group",
        action: "Update a group"
      }
    ],
    default: "create"
  },
  // ----------------------------------
  //             fields
  // ----------------------------------
  {
    displayName: "Group Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["group"]
      }
    }
  },
  {
    displayName: "Group ID",
    name: "id",
    type: "string",
    description: 'Group to update. Specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Group ID",
    name: "id",
    type: "string",
    description: 'Group to delete. Specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["delete"]
      }
    }
  },
  {
    displayName: "Group ID",
    name: "id",
    type: "string",
    description: 'Group to retrieve. Specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["create"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Active",
        name: "active",
        type: "boolean",
        default: true
      },
      {
        displayName: "Custom Fields",
        name: "customFieldsUi",
        type: "fixedCollection",
        default: {},
        placeholder: "Add Custom Field",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            name: "customFieldPairs",
            displayName: "Custom Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "name",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "loadGroupCustomFields"
                },
                default: "",
                description: 'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              {
                displayName: "Field Value",
                name: "value",
                type: "string",
                default: "",
                description: "Value to set on the custom field"
              }
            ]
          }
        ]
      },
      {
        displayName: "Notes",
        name: "note",
        type: "string",
        default: ""
      }
    ]
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["group"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Active",
        name: "active",
        type: "boolean",
        default: true
      },
      {
        displayName: "Custom Fields",
        name: "customFieldsUi",
        type: "fixedCollection",
        default: {},
        placeholder: "Add Custom Field",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            name: "customFieldPairs",
            displayName: "Custom Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "name",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "loadGroupCustomFields"
                },
                default: "",
                description: 'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              {
                displayName: "Field Value",
                name: "value",
                type: "string",
                default: "",
                description: "Value to set on the custom field"
              }
            ]
          }
        ]
      },
      {
        displayName: "Group Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Notes",
        name: "note",
        type: "string",
        default: ""
      }
    ]
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["group"],
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
        resource: ["group"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupDescription
});
//# sourceMappingURL=GroupDescription.js.map