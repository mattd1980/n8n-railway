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
var RowDescription_exports = {};
__export(RowDescription_exports, {
  rowFields: () => rowFields,
  rowOperations: () => rowOperations
});
module.exports = __toCommonJS(RowDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const rowOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["row"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new row",
        action: "Create a row"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a row",
        action: "Delete a row"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a row",
        action: "Get a row"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many rows",
        action: "Get many rows"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a row",
        action: "Update a row"
      }
    ],
    default: "create"
  }
];
const rowFields = [
  /* -------------------------------------------------------------------------- */
  /*                                row:create                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Table Name or ID",
    name: "tableId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["useCustomSchema", "schema"],
      loadOptionsMethod: "getTables"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["create", "delete", "get", "getAll", "update"]
      }
    },
    default: ""
  },
  ...(0, import_GenericFunctions.getFilters)(["row"], ["update"], {
    includeNoneOption: false,
    filterTypeDisplayName: "Select Type",
    filterFixedCollectionDisplayName: "Select Conditions",
    mustMatchOptions: [
      {
        name: "Any Select Condition",
        value: "anyFilter"
      },
      {
        name: "All Select Conditions",
        value: "allFilters"
      }
    ]
  }),
  {
    displayName: "Data to Send",
    name: "dataToSend",
    type: "options",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMapInputData",
        description: "Use when node input properties match destination column names"
      },
      {
        name: "Define Below for Each Column",
        value: "defineBelow",
        description: "Set the value for each destination column"
      }
    ],
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["create", "update"]
      }
    },
    default: "defineBelow"
  },
  {
    displayName: "Inputs to Ignore",
    name: "inputsToIgnore",
    type: "string",
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["create", "update"],
        dataToSend: ["autoMapInputData"]
      }
    },
    default: "",
    description: "List of input properties to avoid sending, separated by commas. Leave empty to send all properties.",
    placeholder: "Enter properties..."
  },
  {
    displayName: "Fields to Send",
    name: "fieldsUi",
    placeholder: "Add Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValueButtonText: "Add Field to Send",
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["create", "update"],
        dataToSend: ["defineBelow"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "fieldValues",
        values: [
          {
            displayName: "Field Name or ID",
            name: "fieldId",
            type: "options",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: {
              loadOptionsDependsOn: ["tableId"],
              loadOptionsMethod: "getTableColumns"
            },
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                row:delete                                  */
  /* -------------------------------------------------------------------------- */
  ...(0, import_GenericFunctions.getFilters)(["row"], ["delete"], {
    includeNoneOption: false,
    filterTypeDisplayName: "Select Type",
    filterFixedCollectionDisplayName: "Select Conditions",
    mustMatchOptions: [
      {
        name: "Any Select Condition",
        value: "anyFilter"
      },
      {
        name: "All Select Conditions",
        value: "allFilters"
      }
    ]
  }),
  /* -------------------------------------------------------------------------- */
  /*                                row:get                                     */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Select Conditions",
    name: "filters",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["get"]
      }
    },
    default: {},
    placeholder: "Add Condition",
    options: [
      {
        displayName: "Conditions",
        name: "conditions",
        values: [
          {
            displayName: "Name or ID",
            name: "keyName",
            type: "options",
            typeOptions: {
              loadOptionsDependsOn: ["tableId"],
              loadOptionsMethod: "getTableColumns"
            },
            default: "",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
          },
          {
            displayName: "Value",
            name: "keyValue",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                  row:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["row"],
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
        resource: ["row"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1
    },
    default: 50,
    description: "Max number of results to return"
  },
  ...(0, import_GenericFunctions.getFilters)(["row"], ["getAll"], {})
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rowFields,
  rowOperations
});
//# sourceMappingURL=RowDescription.js.map