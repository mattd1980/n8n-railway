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
        name: "Get Many",
        value: "getAll",
        description: "Get many users",
        action: "Get many users"
      }
    ],
    default: "getAll"
  }
];
const userFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 user:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["user"]
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
        resource: ["user"],
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
        resource: ["user"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "If provided, you'll get a filtered list of users that contain the provided string in their email address"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "If provided, you'll get a filtered list of users that contain the provided string in their name"
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Active",
            value: "ACTIVE"
          },
          {
            name: "Inactive",
            value: "INACTIVE"
          },
          {
            name: "Pending",
            value: "PENDING"
          },
          {
            name: "Declined",
            value: "DECLINED"
          }
        ],
        default: "",
        description: "If provided, you'll get a filtered list of users with the corresponding status"
      },
      {
        displayName: "Sort Column",
        name: "sort-column",
        type: "options",
        options: [
          {
            name: "Email",
            value: "EMAIL"
          },
          {
            name: "Name",
            value: "NAME"
          },
          {
            name: "Hourly Rate",
            value: "HOURLYRATE"
          }
        ],
        default: ""
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
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map