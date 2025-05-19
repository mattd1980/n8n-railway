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
        value: "get",
        action: "Get a user"
      }
    ],
    default: "get"
  }
];
const userFields = [
  {
    displayName: "Username",
    name: "username",
    type: "string",
    required: true,
    default: "",
    description: "Reddit ID of the user to retrieve",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Details",
    name: "details",
    type: "options",
    required: true,
    default: "about",
    description: "Details of the user to retrieve",
    options: [
      {
        name: "About",
        value: "about"
      },
      {
        name: "Comments",
        value: "comments"
      },
      {
        name: "Gilded",
        value: "gilded"
      },
      {
        name: "Overview",
        value: "overview"
      },
      {
        name: "Submitted",
        value: "submitted"
      }
    ],
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"],
        details: ["overview", "submitted", "comments", "gilded"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"],
        details: ["comments", "gilded", "overview", "submitted"],
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