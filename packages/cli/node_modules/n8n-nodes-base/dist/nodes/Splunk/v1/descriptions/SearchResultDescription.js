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
var SearchResultDescription_exports = {};
__export(SearchResultDescription_exports, {
  searchResultFields: () => searchResultFields,
  searchResultOperations: () => searchResultOperations
});
module.exports = __toCommonJS(SearchResultDescription_exports);
const searchResultOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["searchResult"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many search results for a search job",
        action: "Get many search results"
      }
    ],
    default: "getAll"
  }
];
const searchResultFields = [
  // ----------------------------------------
  //           searchResult: getAll
  // ----------------------------------------
  {
    displayName: "Search ID",
    name: "searchJobId",
    description: "ID of the search whose results to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["searchResult"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["searchResult"],
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
        resource: ["searchResult"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["searchResult"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Key-Value Match",
        name: "keyValueMatch",
        description: 'Key-value pair to match against. Example: if "Key" is set to <code>user</code> and "Field" is set to <code>john</code>, only the results where <code>user</code> is <code>john</code> will be returned.',
        type: "fixedCollection",
        default: {},
        placeholder: "Add Key-Value Pair",
        options: [
          {
            displayName: "Key-Value Pair",
            name: "keyValuePair",
            values: [
              {
                displayName: "Key",
                name: "key",
                description: "Key to match against",
                type: "string",
                default: ""
              },
              {
                displayName: "Value",
                name: "value",
                description: "Value to match against",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["searchResult"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Add Summary to Metadata",
        name: "add_summary_to_metadata",
        description: "Whether to include field summary statistics in the response",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchResultFields,
  searchResultOperations
});
//# sourceMappingURL=SearchResultDescription.js.map