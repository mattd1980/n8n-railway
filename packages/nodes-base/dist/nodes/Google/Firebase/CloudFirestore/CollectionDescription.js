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
var CollectionDescription_exports = {};
__export(CollectionDescription_exports, {
  collectionFields: () => collectionFields,
  collectionOperations: () => collectionOperations
});
module.exports = __toCommonJS(CollectionDescription_exports);
const collectionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["collection"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many root collections",
        action: "Get many collections"
      }
    ],
    default: "getAll"
  }
];
const collectionFields = [
  /* -------------------------------------------------------------------------- */
  /*                               collection:getAll                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Project Name or ID",
    name: "projectId",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "getProjects"
    },
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"]
      }
    },
    description: 'As displayed in firebase console URL. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true
  },
  {
    displayName: "Database",
    name: "database",
    type: "string",
    default: "(default)",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"]
      }
    },
    description: "Usually the provided default value will work",
    required: true
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"]
      }
    },
    description: "Whether to return all results or only up to a given limit",
    required: true
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionFields,
  collectionOperations
});
//# sourceMappingURL=CollectionDescription.js.map