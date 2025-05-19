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
var AccountDescription_exports = {};
__export(AccountDescription_exports, {
  accountFields: () => accountFields,
  accountOperations: () => accountOperations
});
module.exports = __toCommonJS(AccountDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const accountOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["account"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an account",
        action: "Create an account"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an account",
        action: "Delete an account"
      },
      {
        name: "Get",
        value: "get",
        description: "Get data of an account",
        action: "Get an account"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many accounts",
        action: "Get many accounts"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an account",
        action: "Update an account"
      }
    ],
    default: "create"
  }
];
const accountFields = [
  // ----------------------------------
  //         contact:create
  // ----------------------------------
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["account"]
      }
    },
    description: "Account's name"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["account"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Account URL",
        name: "accountUrl",
        type: "string",
        default: "",
        description: "Account's website"
      },
      {
        displayName: "Fields",
        name: "fields",
        placeholder: "Add Custom Fields",
        description: "Adds a custom fields to set also values which have not been predefined",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "property",
            displayName: "Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "customFieldId",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "getAccountCustomFields"
                },
                default: "",
                description: 'ID of the field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              {
                displayName: "Field Value",
                name: "fieldValue",
                type: "string",
                default: "",
                description: "Value of the field to set"
              }
            ]
          }
        ]
      }
    ]
  },
  // ----------------------------------
  //         contact:update
  // ----------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["account"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the account to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    description: "The fields to update",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["account"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Account's name"
      },
      {
        displayName: "Account URL",
        name: "accountUrl",
        type: "string",
        default: "",
        description: "Account's website"
      },
      {
        displayName: "Fields",
        name: "fields",
        placeholder: "Add Fields",
        description: "Adds a custom fields to set also values which have not been predefined",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "property",
            displayName: "Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "customFieldId",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "getAccountCustomFields"
                },
                default: "",
                description: 'ID of the field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              {
                displayName: "Field Value",
                name: "fieldValue",
                type: "string",
                default: "",
                description: "Value of the field to set"
              }
            ]
          }
        ]
      }
    ]
  },
  // ----------------------------------
  //         account:delete
  // ----------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["account"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the account to delete"
  },
  // ----------------------------------
  //         account:get
  // ----------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["account"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the account to get"
  },
  // ----------------------------------
  //         account:getAll
  // ----------------------------------
  ...(0, import_GenericFunctions.activeCampaignDefaultGetAllProperties)("account", "getAll"),
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["account"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Search",
        name: "search",
        type: "string",
        default: "",
        description: "Search by name"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountFields,
  accountOperations
});
//# sourceMappingURL=AccountDescription.js.map