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
var GroupDescription_exports = {};
__export(GroupDescription_exports, {
  groupFields: () => groupFields,
  groupOperations: () => groupOperations
});
module.exports = __toCommonJS(GroupDescription_exports);
const groupOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a group",
        action: "Create a group"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a group",
        action: "Get a group"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many groups",
        action: "Get many groups"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a group",
        action: "Update a group"
      }
    ],
    default: "create"
  }
];
const groupFields = [
  /* -------------------------------------------------------------------------- */
  /*                                group:create & get                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["get", "create"]
      }
    },
    default: "",
    description: "Name of the group"
  },
  /* -------------------------------------------------------------------------- */
  /*                                group:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["group"],
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
        resource: ["group"],
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
  /*                                group:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["update"]
      }
    },
    default: "",
    description: "ID of the group to update"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["update"]
      }
    },
    default: "",
    description: "New name of the group"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupFields,
  groupOperations
});
//# sourceMappingURL=GroupDescription.js.map