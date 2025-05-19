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
var UserGroupDescription_exports = {};
__export(UserGroupDescription_exports, {
  userGroupFields: () => userGroupFields,
  userGroupOperations: () => userGroupOperations
});
module.exports = __toCommonJS(UserGroupDescription_exports);
const userGroupOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["userGroup"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Create a user to group",
        action: "Add a user to a group"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove user from group",
        action: "Remove a user from a group"
      }
    ],
    default: "add"
  }
];
const userGroupFields = [
  /* -------------------------------------------------------------------------- */
  /*                                userGroup:add                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Usernames",
    name: "usernames",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userGroup"],
        operation: ["add"]
      }
    },
    default: "",
    description: "Usernames to add to group. Multiples can be defined separated by comma."
  },
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userGroup"],
        operation: ["add"]
      }
    },
    default: "",
    description: "ID of the group"
  },
  /* -------------------------------------------------------------------------- */
  /*                                userGroup:remove                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Usernames",
    name: "usernames",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userGroup"],
        operation: ["remove"]
      }
    },
    default: "",
    description: "Usernames to remove from group. Multiples can be defined separated by comma."
  },
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["userGroup"],
        operation: ["remove"]
      }
    },
    default: "",
    description: "ID of the group to remove"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userGroupFields,
  userGroupOperations
});
//# sourceMappingURL=UserGroupDescription.js.map