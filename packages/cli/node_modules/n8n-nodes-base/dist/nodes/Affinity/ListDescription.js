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
var ListDescription_exports = {};
__export(ListDescription_exports, {
  listFields: () => listFields,
  listOperations: () => listOperations
});
module.exports = __toCommonJS(ListDescription_exports);
const listOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["list"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a list",
        action: "Get a list"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many lists",
        action: "Get many lists"
      }
    ],
    default: "get"
  }
];
const listFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 list:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["list"],
        operation: ["get"]
      }
    },
    description: "The unique ID of the list object to be retrieved"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["list"],
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
        resource: ["list"],
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
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map