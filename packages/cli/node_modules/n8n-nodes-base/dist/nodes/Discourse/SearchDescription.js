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
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["search"]
      }
    },
    options: [
      {
        name: "Query",
        value: "query",
        description: "Search for something",
        action: "Perform a query"
      }
    ],
    default: "query"
  }
];
const searchFields = [
  /* -------------------------------------------------------------------------- */
  /*                                search:query                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Term",
    name: "term",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"]
      }
    },
    default: "",
    description: "Term to search for"
  },
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["search"],
        operation: ["query"]
      }
    },
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchFields,
  searchOperations
});
//# sourceMappingURL=SearchDescription.js.map