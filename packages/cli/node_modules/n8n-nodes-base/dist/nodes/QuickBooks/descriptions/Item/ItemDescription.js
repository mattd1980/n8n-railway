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
var ItemDescription_exports = {};
__export(ItemDescription_exports, {
  itemFields: () => itemFields,
  itemOperations: () => itemOperations
});
module.exports = __toCommonJS(ItemDescription_exports);
const itemOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get an item"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many items"
      }
    ],
    displayOptions: {
      show: {
        resource: ["item"]
      }
    }
  }
];
const itemFields = [
  // ----------------------------------
  //         item: get
  // ----------------------------------
  {
    displayName: "Item ID",
    name: "itemId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the item to retrieve",
    displayOptions: {
      show: {
        resource: ["item"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         item: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["item"],
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
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["item"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        placeholder: "WHERE Metadata.LastUpdatedTime > '2021-01-01'",
        description: 'The condition for selecting items. See the <a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries">guide</a> for supported syntax.'
      }
    ],
    displayOptions: {
      show: {
        resource: ["item"],
        operation: ["getAll"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  itemFields,
  itemOperations
});
//# sourceMappingURL=ItemDescription.js.map