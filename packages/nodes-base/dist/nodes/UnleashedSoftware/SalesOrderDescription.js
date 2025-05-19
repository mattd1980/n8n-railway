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
var SalesOrderDescription_exports = {};
__export(SalesOrderDescription_exports, {
  salesOrderFields: () => salesOrderFields,
  salesOrderOperations: () => salesOrderOperations
});
module.exports = __toCommonJS(SalesOrderDescription_exports);
const salesOrderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["salesOrder"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many sales orders",
        action: "Get many sales orders"
      }
    ],
    default: "getAll"
  }
];
const salesOrderFields = [
  /* ------------------------------------------------------------------------- */
  /*                                salesOrder:getAll                          */
  /* ------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["salesOrder"]
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
        resource: ["salesOrder"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["salesOrder"]
      }
    },
    options: [
      {
        displayName: "Customer ID",
        name: "customerId",
        type: "string",
        default: "",
        placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        description: "Only returns orders for a specified Customer GUID. The CustomerId can be specified as a list of comma-separated GUIDs."
      },
      {
        displayName: "Customer Code",
        name: "customerCode",
        type: "string",
        default: "",
        description: "Returns orders that start with the specific customer code"
      },
      {
        displayName: "End Date",
        name: "endDate",
        type: "dateTime",
        default: "",
        description: "Returns orders with order date before the specified date. UTC."
      },
      {
        displayName: "Modified Since",
        name: "modifiedSince",
        type: "dateTime",
        default: "",
        description: "Returns orders created or edited after a specified date, must be UTC format"
      },
      {
        displayName: "Order Number",
        name: "orderNumber",
        type: "string",
        default: "",
        description: "Returns a single order with the specified order number. If set, it overrides all other filters."
      },
      {
        displayName: "Order Status",
        name: "orderStatus",
        type: "multiOptions",
        options: [
          {
            name: "Backordered",
            value: "Backordered"
          },
          {
            name: "Completed",
            value: "Completed"
          },
          {
            name: "Deleted",
            value: "Deleted"
          },
          {
            name: "Parked",
            value: "Parked"
          },
          {
            name: "Placed",
            value: "Placed"
          }
        ],
        default: [],
        description: 'Returns orders with the specified status. If no orderStatus filter is specified, then we exclude "Deleted" by default.'
      },
      {
        displayName: "Start Date",
        name: "startDate",
        type: "dateTime",
        default: "",
        description: "Returns orders with order date after the specified date. UTC."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  salesOrderFields,
  salesOrderOperations
});
//# sourceMappingURL=SalesOrderDescription.js.map