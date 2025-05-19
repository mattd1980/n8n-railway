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
        description: "Create a list",
        action: "Create a list"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a list",
        action: "Delete a list"
      },
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
      },
      {
        name: "Update",
        value: "update",
        description: "Update a list",
        action: "Update a list"
      }
    ],
    default: "create"
  }
];
const listFields = [
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
      maxValue: 1e3
    },
    default: 100,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["list"]
      }
    },
    default: "",
    description: "Name of the list"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:delete                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["list"]
      }
    },
    default: "",
    description: "ID of the list"
  },
  {
    displayName: "Delete Contacts",
    name: "deleteContacts",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["list"]
      }
    },
    description: "Whether to delete all contacts on the list"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["list"]
      }
    },
    default: "",
    description: "ID of the list"
  },
  {
    displayName: "Contact Sample",
    name: "contactSample",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["list"]
      }
    },
    description: "Whether to return the contact sample"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["list"]
      }
    },
    default: "",
    description: "ID of the list"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["list"]
      }
    },
    default: "",
    description: "Name of the list"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map