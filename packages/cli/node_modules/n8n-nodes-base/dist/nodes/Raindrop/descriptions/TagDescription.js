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
var TagDescription_exports = {};
__export(TagDescription_exports, {
  tagFields: () => tagFields,
  tagOperations: () => tagOperations
});
module.exports = __toCommonJS(TagDescription_exports);
const tagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many tags"
      }
    ],
    displayOptions: {
      show: {
        resource: ["tag"]
      }
    }
  }
];
const tagFields = [
  // ----------------------------------
  //       tag: delete
  // ----------------------------------
  {
    displayName: "Tags",
    name: "tags",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["delete"]
      }
    },
    description: "One or more tags to delete. Enter comma-separated values to delete multiple tags."
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["delete"]
      }
    },
    options: [
      {
        displayName: "Collection Name or ID",
        name: "collectionId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getCollections"
        },
        default: "",
        description: `It's possible to restrict remove action to just one collection. It's optional. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
      }
    ]
  },
  // ----------------------------------
  //       tag: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["tag"],
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
        resource: ["tag"],
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
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Collection Name or ID",
        name: "collectionId",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getCollections"
        },
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tagFields,
  tagOperations
});
//# sourceMappingURL=TagDescription.js.map