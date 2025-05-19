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
var PortfolioDescription_exports = {};
__export(PortfolioDescription_exports, {
  portfolioFields: () => portfolioFields,
  portfolioOperations: () => portfolioOperations
});
module.exports = __toCommonJS(PortfolioDescription_exports);
const portfolioOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    required: true,
    displayOptions: {
      show: {
        resource: ["portfolio"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a portfolio",
        action: "Create a portfolio"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a portfolio",
        action: "Delete a portfolio"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many portfolios",
        action: "Get many portfolios"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a portfolio",
        action: "Update a portfolio"
      }
    ],
    default: "create"
  }
];
const portfolioFields = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["portfolio"],
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
        resource: ["portfolio"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Portfolio ID",
    name: "portfolioId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["portfolio"],
        operation: ["update", "delete"]
      }
    }
  },
  {
    displayName: "Portfolio Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["portfolio"],
        operation: ["create", "update"]
      }
    },
    description: "Name of the portfolio"
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["portfolio"],
        operation: ["create", "update"]
      }
    }
  },
  {
    displayName: "Privacy",
    name: "privacy",
    type: "options",
    displayOptions: {
      show: {
        resource: ["portfolio"],
        operation: ["create", "update"]
      }
    },
    options: [
      {
        name: "Private",
        value: "private",
        description: "Only visible to you"
      },
      {
        name: "Shared",
        value: "shared",
        description: "Visible to everyone in your company"
      },
      {
        name: "Team",
        value: "team",
        description: "Visible to the people on your team"
      }
    ],
    default: "shared"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  portfolioFields,
  portfolioOperations
});
//# sourceMappingURL=PortfolioDescription.js.map