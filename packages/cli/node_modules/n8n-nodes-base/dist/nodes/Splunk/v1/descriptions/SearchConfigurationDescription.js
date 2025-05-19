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
var SearchConfigurationDescription_exports = {};
__export(SearchConfigurationDescription_exports, {
  searchConfigurationFields: () => searchConfigurationFields,
  searchConfigurationOperations: () => searchConfigurationOperations
});
module.exports = __toCommonJS(SearchConfigurationDescription_exports);
const searchConfigurationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["searchConfiguration"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a search configuration",
        action: "Delete a search configuration"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a search configuration",
        action: "Get a search configuration"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many search configurations",
        action: "Get many search configurations"
      }
    ],
    default: "delete"
  }
];
const searchConfigurationFields = [
  // ----------------------------------------
  //       searchConfiguration: delete
  // ----------------------------------------
  {
    displayName: "Search Configuration ID",
    name: "searchConfigurationId",
    description: "ID of the search configuration to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["searchConfiguration"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //         searchConfiguration: get
  // ----------------------------------------
  {
    displayName: "Search Configuration ID",
    name: "searchConfigurationId",
    description: "ID of the search configuration to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["searchConfiguration"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //       searchConfiguration: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["searchConfiguration"],
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
        resource: ["searchConfiguration"],
        operation: ["getAll"],
        returnAll: [false]
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
        resource: ["searchConfiguration"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Add Orphan Field",
        name: "add_orphan_field",
        description: "Whether to include a boolean value for each saved search to show whether the search is orphaned, meaning that it has no valid owner",
        type: "boolean",
        default: false
      },
      {
        displayName: "List Default Actions",
        name: "listDefaultActionArgs",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchConfigurationFields,
  searchConfigurationOperations
});
//# sourceMappingURL=SearchConfigurationDescription.js.map