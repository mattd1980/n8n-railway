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
var BillDescription_exports = {};
__export(BillDescription_exports, {
  billFields: () => billFields,
  billOperations: () => billOperations
});
module.exports = __toCommonJS(BillDescription_exports);
var import_BillAdditionalFieldsOptions = require("./BillAdditionalFieldsOptions");
const billOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a bill"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a bill"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a bill"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many bills"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a bill"
      }
    ],
    displayOptions: {
      show: {
        resource: ["bill"]
      }
    }
  }
];
const billFields = [
  // ----------------------------------
  //         bill: create
  // ----------------------------------
  {
    displayName: "For Vendor Name or ID",
    name: "VendorRef",
    type: "options",
    required: true,
    description: 'The ID of the vendor who the bill is for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: [],
    typeOptions: {
      loadOptionsMethod: "getVendors"
    },
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Line",
    name: "Line",
    type: "collection",
    placeholder: "Add Line Item Property",
    description: "Individual line item of a transaction",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Account ID",
        name: "accountId",
        type: "string",
        default: ""
      },
      {
        displayName: "Amount",
        name: "Amount",
        description: "Monetary amount of the line item",
        type: "number",
        default: 0
      },
      {
        displayName: "Description",
        name: "Description",
        description: "Textual description of the line item",
        type: "string",
        default: ""
      },
      {
        displayName: "Detail Type",
        name: "DetailType",
        type: "options",
        default: "ItemBasedExpenseLineDetail",
        options: [
          {
            name: "Account-Based Expense Line Detail",
            value: "AccountBasedExpenseLineDetail"
          },
          {
            name: "Item-Based Expense Line Detail",
            value: "ItemBasedExpenseLineDetail"
          }
        ]
      },
      {
        displayName: "Item Name or ID",
        name: "itemId",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getItems"
        }
      },
      {
        displayName: "Position",
        name: "LineNum",
        description: "Position of the line item relative to others",
        type: "number",
        default: 1
      }
    ]
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["create"]
      }
    },
    options: import_BillAdditionalFieldsOptions.billAdditionalFieldsOptions
  },
  // ----------------------------------
  //         bill: delete
  // ----------------------------------
  {
    displayName: "Bill ID",
    name: "billId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the bill to delete",
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------
  //         bill: get
  // ----------------------------------
  {
    displayName: "Bill ID",
    name: "billId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the bill to retrieve",
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         bill: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        placeholder: "WHERE Metadata.LastUpdatedTime > '2021-01-01'",
        description: 'The condition for selecting bills. See the <a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries">guide</a> for supported syntax.'
      }
    ],
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["getAll"]
      }
    }
  },
  // ----------------------------------
  //         bill: update
  // ----------------------------------
  {
    displayName: "Bill ID",
    name: "billId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the bill to update",
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    required: true,
    displayOptions: {
      show: {
        resource: ["bill"],
        operation: ["update"]
      }
    },
    // filter out fields that cannot be updated
    options: import_BillAdditionalFieldsOptions.billAdditionalFieldsOptions.filter(
      (property) => property.name !== "TotalAmt" && property.name !== "Balance"
    )
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  billFields,
  billOperations
});
//# sourceMappingURL=BillDescription.js.map