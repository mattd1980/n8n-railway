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
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a user"
      }
    ],
    displayOptions: {
      show: {
        resource: ["user"]
      }
    }
  }
];
const userFields = [
  // ----------------------------------
  //          user: get
  // ----------------------------------
  {
    displayName: "Self",
    name: "self",
    type: "boolean",
    default: true,
    required: true,
    description: "Whether to return details on the logged-in user",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the user to retrieve",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"],
        self: [false]
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