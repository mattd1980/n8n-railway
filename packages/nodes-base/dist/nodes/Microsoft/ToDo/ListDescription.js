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
        name: "Create",
        value: "create",
        action: "Create a list"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a list"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a list"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many lists"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a list"
      }
    ],
    default: "get"
  }
];
const listFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 list:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List Name",
    name: "displayName",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["list"]
      }
    },
    required: true,
    default: "",
    description: "List display name"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:get/delete/update                     */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["delete", "get", "update"],
        resource: ["list"]
      }
    },
    required: true,
    default: "",
    description: "The identifier of the list, unique in the user's mailbox"
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
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "New List Name",
    name: "displayName",
    type: "string",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["list"]
      }
    },
    required: true,
    default: "",
    description: "List display name"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map