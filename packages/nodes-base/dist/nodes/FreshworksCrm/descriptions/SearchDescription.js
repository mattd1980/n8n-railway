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
var SearchDescription_exports = {};
__export(SearchDescription_exports, {
  searchFields: () => searchFields,
  searchOperations: () => searchOperations
});
module.exports = __toCommonJS(SearchDescription_exports);
const searchOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["search"]
      }
    },
    options: [
      {
        name: "Query",
        value: "query",
        description: "Search for records by entering search queries of your choice",
        action: "Query a search"
      },
      {
        name: "Lookup",
        value: "lookup",
        description: "Search for the name or email address of records",
        action: "Lookup a search"
      }
    ],
    default: "query"
  }
];
const searchFields = [
  // ----------------------------------------
  //          Search: query
  // ----------------------------------------
  {
    displayName: "Search Term",
    name: "query",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"]
      }
    },
    description: "Enter a term that will be used for searching entities"
  },
  {
    displayName: "Search on Entities",
    name: "entities",
    type: "multiOptions",
    options: [
      {
        name: "Contact",
        value: "contact"
      },
      {
        name: "Deal",
        value: "deal"
      },
      {
        name: "Sales Account",
        value: "sales_account"
      },
      {
        name: "User",
        value: "user"
      }
    ],
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"]
      }
    },
    description: "Enter a term that will be used for searching entities"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 25,
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"],
        returnAll: [false]
      }
    },
    description: "Max number of results to return"
  },
  // ----------------------------------------
  //          Search: lookup
  // ----------------------------------------
  {
    displayName: "Search Field",
    name: "searchField",
    type: "options",
    options: [
      {
        name: "Email",
        value: "email"
      },
      {
        name: "Name",
        value: "name"
      },
      {
        name: "Custom Field",
        value: "customField",
        description: 'Only allowed custom fields of type "Text field", "Number", "Dropdown" or "Radio button"'
      }
    ],
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["lookup"]
      }
    },
    description: "Field against which the entities have to be searched"
  },
  {
    displayName: "Custom Field Name",
    name: "customFieldName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["lookup"],
        searchField: ["customField"]
      }
    }
  },
  {
    displayName: "Custom Field Value",
    name: "customFieldValue",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["lookup"],
        searchField: ["customField"]
      }
    }
  },
  {
    displayName: "Field Value",
    name: "fieldValue",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["lookup"],
        searchField: ["email", "name"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["lookup"]
      }
    },
    options: [
      {
        displayName: "Entities",
        name: "entities",
        type: "multiOptions",
        default: [],
        options: [
          {
            name: "Contact",
            value: "contact"
          },
          {
            name: "Deal",
            value: "deal"
          },
          {
            name: "Sales Account",
            value: "sales_account"
          }
        ],
        description: "Use 'entities' to query against related entities. You can include multiple entities at once, provided the field is available in both entities or else you'd receive an error response."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchFields,
  searchOperations
});
//# sourceMappingURL=SearchDescription.js.map