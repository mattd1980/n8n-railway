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
var UserActivityDescription_exports = {};
__export(UserActivityDescription_exports, {
  userActivityFields: () => userActivityFields,
  userActivityOperations: () => userActivityOperations
});
module.exports = __toCommonJS(UserActivityDescription_exports);
const userActivityOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["userActivity"]
      }
    },
    options: [
      {
        name: "Search",
        value: "search",
        description: "Return user activity data",
        action: "Search user activity data"
      }
    ],
    default: "search"
  }
];
const userActivityFields = [
  {
    displayName: "View Name or ID",
    name: "viewId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getViews"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["userActivity"],
        operation: ["search"]
      }
    },
    placeholder: "123456",
    description: 'The View ID of Google Analytics. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["userActivity"],
        operation: ["search"]
      }
    },
    placeholder: "123456",
    description: "ID of a user"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["userActivity"]
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
        operation: ["search"],
        resource: ["userActivity"],
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
    default: {},
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["userActivity"]
      }
    },
    options: [
      {
        displayName: "Activity Types",
        name: "activityTypes",
        type: "multiOptions",
        options: [
          {
            name: "Ecommerce",
            value: "ECOMMERCE"
          },
          {
            name: "Event",
            value: "EVENT"
          },
          {
            name: "Goal",
            value: "GOAL"
          },
          {
            name: "Pageview",
            value: "PAGEVIEW"
          },
          {
            name: "Screenview",
            value: "SCREENVIEW"
          }
        ],
        description: "Type of activites requested",
        default: []
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userActivityFields,
  userActivityOperations
});
//# sourceMappingURL=UserActivityDescription.js.map