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
        name: "Delete",
        value: "delete",
        description: "Delete a user from the current organization",
        action: "Delete a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many users in the current organization",
        action: "Get many users"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a user in the current organization",
        action: "Update a user"
      }
    ],
    default: "getAll"
  }
];
const userFields = [
  // ----------------------------------------
  //              user: update
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "ID of the user to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Role",
        name: "role",
        type: "options",
        default: "Admin",
        description: "New role for the user",
        options: [
          {
            name: "Admin",
            value: "Admin"
          },
          {
            name: "Editor",
            value: "Editor"
          },
          {
            name: "Viewer",
            value: "Viewer"
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //                user: delete
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "ID of the user to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //              user: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["user"],
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
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map