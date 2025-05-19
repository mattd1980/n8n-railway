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
var FolderMessageDecription_exports = {};
__export(FolderMessageDecription_exports, {
  folderMessageFields: () => folderMessageFields,
  folderMessageOperations: () => folderMessageOperations
});
module.exports = __toCommonJS(FolderMessageDecription_exports);
const folderMessageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["folderMessage"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many messages in a folder",
        action: "Get many folder messages"
      }
    ],
    default: "create"
  }
];
const folderMessageFields = [
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folderMessage"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["folderMessage"],
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
        resource: ["folderMessage"],
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
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["folderMessage"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields the response will contain. Multiple can be added separated by ,."
      },
      {
        displayName: "Filter",
        name: "filter",
        type: "string",
        default: "",
        description: 'Microsoft Graph API OData $filter query. Information about the syntax can be found <a href="https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter">here</a>.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  folderMessageFields,
  folderMessageOperations
});
//# sourceMappingURL=FolderMessageDecription.js.map