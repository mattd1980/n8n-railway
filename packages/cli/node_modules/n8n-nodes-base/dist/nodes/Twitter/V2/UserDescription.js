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
        name: "Get",
        value: "searchUser",
        description: "Retrieve a user by username",
        action: "Get User"
      }
    ],
    default: "searchUser"
  }
];
const userFields = [
  /* -------------------------------------------------------------------------- */
  /*                                user:searchUser                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User",
    name: "user",
    type: "resourceLocator",
    default: { mode: "username", value: "" },
    required: true,
    description: "The user you want to search",
    displayOptions: {
      show: {
        operation: ["searchUser"],
        resource: ["user"]
      },
      hide: {
        me: [true]
      }
    },
    modes: [
      {
        displayName: "By Username",
        name: "username",
        type: "string",
        validation: [],
        placeholder: "e.g. n8n",
        url: ""
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [],
        placeholder: "e.g. 1068479892537384960",
        url: ""
      }
    ]
  },
  {
    displayName: "Me",
    name: "me",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["searchUser"],
        resource: ["user"]
      }
    },
    default: false,
    description: "Whether you want to search the authenticated user"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map