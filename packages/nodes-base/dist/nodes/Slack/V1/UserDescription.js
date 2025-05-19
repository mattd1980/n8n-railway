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
var UserDescription_exports = {};
__export(UserDescription_exports, {
  userFields: () => userFields,
  userOperations: () => userOperations
});
module.exports = __toCommonJS(UserDescription_exports);
const userOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["user"]
      }
    },
    options: [
      {
        name: "Info",
        value: "info",
        description: "Get information about a user",
        action: "Get information about a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get a list of many users",
        action: "Get many users"
      },
      {
        name: "Get Presence",
        value: "getPresence",
        description: "Get online status of a user",
        action: "Get a user's presence status"
      }
    ],
    default: "info"
  }
];
const userFields = [
  /* -------------------------------------------------------------------------- */
  /*                                user:info                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "user",
    type: "string",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    default: "",
    displayOptions: {
      show: {
        operation: ["info"],
        resource: ["user"]
      }
    },
    required: true,
    description: "The ID of the user to get information about"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 user:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["user"],
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
        resource: ["user"],
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
  /*                                user:getPresence                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "user",
    type: "string",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    default: "",
    displayOptions: {
      show: {
        operation: ["getPresence"],
        resource: ["user"]
      }
    },
    required: true,
    description: "The ID of the user to get the online status of"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map