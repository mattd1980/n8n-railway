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
    default: 100,
    required: true,
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    description: "Max number of results to return"
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFieldsJson",
    type: "json",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"],
        jsonParameters: [true]
      }
    },
    description: "Attributes in JSON form"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"],
        jsonParameters: [false]
      }
    },
    default: {},
    options: [
      {
        displayName: "Plan ID",
        name: "planId",
        type: "string",
        default: "",
        description: "Filter: The subscription plan ID"
      },
      {
        displayName: "Subscription ID",
        name: "subscriptionId",
        type: "string",
        default: "",
        description: "A specific user subscription ID"
      },
      {
        displayName: "State",
        name: "state",
        type: "options",
        default: "active",
        description: "Filter: The user subscription status. Returns all active, past_due, trialing and paused subscription plans if not specified.",
        options: [
          {
            name: "Active",
            value: "active"
          },
          {
            name: "Past Due",
            value: "past_due"
          },
          {
            name: "Paused",
            value: "paused"
          },
          {
            name: "Trialing",
            value: "trialing"
          }
        ]
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