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
var ClientDescription_exports = {};
__export(ClientDescription_exports, {
  clientFields: () => clientFields,
  clientOperations: () => clientOperations
});
module.exports = __toCommonJS(ClientDescription_exports);
const clientOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["client"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a client",
        action: "Create a client"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a client",
        action: "Delete a client"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a client",
        action: "Get a client"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many clients",
        action: "Get many clients"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a client",
        action: "Update a client"
      }
    ],
    default: "create"
  }
];
const clientFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 client:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Client Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    description: "Name of client being created",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 client:delete                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 client:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["get"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 client:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["client"]
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
        resource: ["client"],
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
        resource: ["client"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "If provided, clients will be filtered by name"
      },
      {
        displayName: "Sort Order",
        name: "sort-order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "ASCENDING"
          },
          {
            name: "Descending",
            value: "DESCENDING"
          }
        ],
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 client:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["client"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Address",
        name: "address",
        type: "string",
        default: "",
        description: "Address of client being created/updated"
      },
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientFields,
  clientOperations
});
//# sourceMappingURL=ClientDescription.js.map