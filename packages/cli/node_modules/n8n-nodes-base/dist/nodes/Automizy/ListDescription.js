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
  /*                                 list:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["list"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:delete                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["list"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["list"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contact:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["list"]
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
        operation: ["getAll"],
        resource: ["list"],
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
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["list"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Direction",
        name: "direction",
        type: "options",
        options: [
          {
            name: "ASC",
            value: "asc"
          },
          {
            name: "DESC",
            value: "desc"
          }
        ],
        default: "desc",
        description: "Defines the direction in which search results are ordered. Default value is DESC. Note: It has to be using with the Sort By parameter"
      },
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "A comma-separated list of attributes to include in the response"
      },
      {
        displayName: "Sort By",
        name: "sortBy",
        type: "string",
        default: "Defines the field in which search results are sort by. Note: It has to be using with the Direcction parameter"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 list:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List ID",
    name: "listId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["list"]
      }
    },
    default: ""
  },
  {
    displayName: "Name",
    name: "name",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["list"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map