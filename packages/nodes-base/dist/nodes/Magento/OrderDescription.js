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
var OrderDescription_exports = {};
__export(OrderDescription_exports, {
  orderFields: () => orderFields,
  orderOperations: () => orderOperations
});
module.exports = __toCommonJS(OrderDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const orderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["order"]
      }
    },
    options: [
      {
        name: "Cancel",
        value: "cancel",
        description: "Cancel an order",
        action: "Cancel an order"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an order",
        action: "Get an order"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many orders",
        action: "Get many orders"
      },
      {
        name: "Ship",
        value: "ship",
        description: "Ship an order",
        action: "Ship an order"
      }
    ],
    default: "cancel"
  }
];
const orderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   order:cancel			                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Order ID",
    name: "orderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["order"],
        operation: ["cancel", "get", "ship"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   order:getAll			                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["order"],
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
        resource: ["order"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  ...(0, import_GenericFunctions.getSearchFilters)("order", "getOrderAttributes", "getOrderAttributes")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orderFields,
  orderOperations
});
//# sourceMappingURL=OrderDescription.js.map