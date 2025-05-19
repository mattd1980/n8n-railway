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
var PlanDescription_exports = {};
__export(PlanDescription_exports, {
  planFields: () => planFields,
  planOperations: () => planOperations
});
module.exports = __toCommonJS(PlanDescription_exports);
const planOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["plan"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a plan",
        action: "Get a plan"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many plans",
        action: "Get many plans"
      }
    ],
    default: "get"
  }
];
const planFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 plan:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Plan ID",
    name: "planId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["plan"],
        operation: ["get"]
      }
    },
    description: "Filter: The subscription plan ID"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["plan"]
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
        resource: ["plan"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  planFields,
  planOperations
});
//# sourceMappingURL=PlanDescription.js.map