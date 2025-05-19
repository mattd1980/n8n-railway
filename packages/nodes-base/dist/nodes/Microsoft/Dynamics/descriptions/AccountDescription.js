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
var import_GenericFunctions = require("../GenericFunctions");
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
        action: "Create an account"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an account"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an account"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many accounts"
      },
      {
        name: "Update",
        value: "update",
        action: "Update an account"
      }
    ],
    default: "create"
  }
];
const accountFields = [
  // ----------------------------------------
  //             account:create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Company or business name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
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
        resource: ["account"],
        operation: ["create"]
      }
    },
    options: [...(0, import_GenericFunctions.getAccountFields)()]
  },
  // ----------------------------------------
  //             account:get
  // ----------------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["delete", "get", "update"]
      }
    }
  },
  // ----------------------------------------
  //             account:getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["account"],
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
        resource: ["account"],
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
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["get", "getAll"]
      }
    },
    options: [
      {
        displayName: "Return Field Names or IDs",
        name: "returnFields",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getAccountFields"
        },
        default: []
      },
      {
        displayName: "Expand Field Names or IDs",
        name: "expandFields",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getExpandableAccountFields"
        },
        default: []
      }
    ]
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        description: 'Query to filter the results. Check <a href="https://docs.microsoft.com/en-us/powerapps/developer/data-platform/webapi/query-data-web-api#filter-results" target="_blank">filters</a>.'
      }
    ]
  },
  // ----------------------------------------
  //             account:update
  // ----------------------------------------
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["update"]
      }
    },
    options: [...(0, import_GenericFunctions.getAccountFields)()]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["create", "update"]
      }
    },
    options: [
      {
        displayName: "Return Field Names or IDs",
        name: "returnFields",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getAccountFields"
        },
        default: [],
        description: 'Fields the response will include. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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