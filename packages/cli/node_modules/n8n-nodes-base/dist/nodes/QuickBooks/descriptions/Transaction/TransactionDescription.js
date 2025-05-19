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
var TransactionDescription_exports = {};
__export(TransactionDescription_exports, {
  transactionFields: () => transactionFields,
  transactionOperations: () => transactionOperations
});
module.exports = __toCommonJS(TransactionDescription_exports);
var import_constants = require("./constants");
var import_GenericFunctions = require("../../GenericFunctions");
const transactionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getReport",
    options: [
      {
        name: "Get Report",
        value: "getReport",
        action: "Get a report"
      }
    ],
    displayOptions: {
      show: {
        resource: ["transaction"]
      }
    }
  }
];
const transactionFields = [
  // ----------------------------------
  //       transaction: getReport
  // ----------------------------------
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["transaction"],
        operation: ["getReport"]
      }
    },
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["transaction"],
        operation: ["getReport"]
      }
    },
    options: [
      {
        displayName: "Accounts Payable Paid",
        name: "appaid",
        type: "options",
        default: "All",
        options: ["All", "Paid", "Unpaid"].map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Accounts Receivable Paid",
        name: "arpaid",
        type: "options",
        default: "All",
        options: ["All", "Paid", "Unpaid"].map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Cleared Status",
        name: "cleared",
        type: "options",
        default: "Reconciled",
        options: ["Cleared", "Uncleared", "Reconciled", "Deposited"].map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Columns",
        name: "columns",
        type: "multiOptions",
        default: [],
        description: "Columns to return",
        options: import_constants.TRANSACTION_REPORT_COLUMNS
      },
      {
        displayName: "Customer Names or IDs",
        name: "customer",
        type: "multiOptions",
        default: [],
        description: 'Customer to filter results by. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getCustomers"
        }
      },
      {
        displayName: "Date Range (Custom)",
        name: "dateRangeCustom",
        placeholder: "Add Date Range",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Date Range Properties",
            name: "dateRangeCustomProperties",
            values: [
              {
                displayName: "Start Date",
                name: "start_date",
                type: "dateTime",
                default: "",
                description: "Start date of the date range to filter results by"
              },
              {
                displayName: "End Date",
                name: "end_date",
                type: "dateTime",
                default: "",
                description: "End date of the date range to filter results by"
              }
            ]
          }
        ]
      },
      {
        displayName: "Date Range (Predefined)",
        name: "date_macro",
        type: "options",
        default: "This Month",
        description: "Predefined date range to filter results by",
        options: import_constants.PREDEFINED_DATE_RANGES.map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Date Range for Creation Date (Custom)",
        name: "dateRangeCreationCustom",
        placeholder: "Add Creation Date Range",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Creation Date Range Properties",
            name: "dateRangeCreationCustomProperties",
            values: [
              {
                displayName: "Start Creation Date",
                name: "start_createdate",
                type: "dateTime",
                default: "",
                description: "Start date of the account creation date range to filter results by"
              },
              {
                displayName: "End Creation Date",
                name: "end_createdate",
                type: "dateTime",
                default: "",
                description: "End date of the account creation date range to filter results by"
              }
            ]
          }
        ]
      },
      {
        displayName: "Date Range for Creation Date (Predefined)",
        name: "createdate_macro",
        type: "options",
        default: "This Month",
        options: import_constants.PREDEFINED_DATE_RANGES.map(import_GenericFunctions.toOptions),
        description: "Predefined report account creation date range"
      },
      {
        displayName: "Date Range for Due Date (Custom)",
        name: "dateRangeDueCustom",
        placeholder: "Add Due Date Range",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Due Date Range Properties",
            name: "dateRangeDueCustomProperties",
            values: [
              {
                displayName: "Start Due Date",
                name: "start_duedate",
                type: "dateTime",
                default: "",
                description: "Start date of the due date range to filter results by"
              },
              {
                displayName: "End Due Date",
                name: "end_duedate",
                type: "dateTime",
                default: "",
                description: "End date of the due date range to filter results by"
              }
            ]
          }
        ]
      },
      {
        displayName: "Date Range for Due Date (Predefined)",
        name: "duedate_macro",
        type: "options",
        default: "This Month",
        description: "Predefined due date range to filter results by",
        options: import_constants.PREDEFINED_DATE_RANGES.map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Date Range for Modification Date (Custom)",
        name: "dateRangeModificationCustom",
        placeholder: "Add Modification Date Range",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Modification Date Range Properties",
            name: "dateRangeModificationCustomProperties",
            values: [
              {
                displayName: "Start Modification Date",
                name: "start_moddate",
                type: "dateTime",
                default: "",
                description: "Start date of the account modification date range to filter results by"
              },
              {
                displayName: "End Modification Date",
                name: "end_moddate",
                type: "dateTime",
                default: "",
                description: "End date of the account modification date range to filter results by"
              }
            ]
          }
        ]
      },
      {
        displayName: "Date Range for Modification Date (Predefined)",
        name: "moddate_macro",
        type: "options",
        default: "This Month",
        description: "Predefined account modifiction date range to filter results by",
        options: import_constants.PREDEFINED_DATE_RANGES.map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Department Names or IDs",
        name: "department",
        type: "multiOptions",
        default: [],
        description: 'Department to filter results by. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getDepartments"
        }
      },
      {
        displayName: "Document Number",
        name: "docnum",
        type: "string",
        default: "",
        description: "Transaction document number to filter results by"
      },
      {
        displayName: "Group By",
        name: "group_by",
        default: "Account",
        type: "options",
        description: "Transaction field to group results by",
        options: import_constants.GROUP_BY_OPTIONS.map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Memo Names or IDs",
        name: "memo",
        type: "multiOptions",
        default: [],
        description: 'Memo to filter results by. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getMemos"
        }
      },
      {
        displayName: "Payment Method",
        name: "payment_Method",
        type: "options",
        default: "Cash",
        description: "Payment method to filter results by",
        options: import_constants.PAYMENT_METHODS.map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Printed Status",
        name: "printed",
        type: "options",
        default: "Printed",
        description: "Printed state to filter results by",
        options: [
          {
            name: "Printed",
            value: "Printed"
          },
          {
            name: "To Be Printed",
            value: "To_be_printed"
          }
        ]
      },
      {
        displayName: "Quick Zoom URL",
        name: "qzurl",
        type: "boolean",
        default: true,
        description: "Whether Quick Zoom URL information should be generated"
      },
      {
        displayName: "Sort By",
        name: "sort_by",
        type: "options",
        default: "account_name",
        description: "Column to sort results by",
        options: import_constants.TRANSACTION_REPORT_COLUMNS
      },
      {
        displayName: "Sort Order",
        name: "sort_order",
        type: "options",
        default: "Ascend",
        options: ["Ascend", "Descend"].map(import_GenericFunctions.toOptions)
      },
      {
        displayName: "Source Account Type",
        name: "source_account_type",
        default: "Bank",
        type: "options",
        description: "Account type to filter results by",
        options: import_constants.SOURCE_ACCOUNT_TYPES.map(import_GenericFunctions.toOptions).map(import_GenericFunctions.toDisplayName)
      },
      {
        displayName: "Term Names or IDs",
        name: "term",
        type: "multiOptions",
        default: [],
        description: 'Term to filter results by. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getTerms"
        }
      },
      {
        displayName: "Transaction Amount",
        name: "bothamount",
        type: "number",
        default: 0,
        typeOptions: {
          numberPrecision: 2
        },
        description: "Monetary amount to filter results by"
      },
      {
        displayName: "Transaction Type",
        name: "transaction_type",
        type: "options",
        default: "CreditCardCharge",
        description: "Transaction type to filter results by",
        options: import_constants.TRANSACTION_TYPES.map(import_GenericFunctions.toOptions).map(import_GenericFunctions.toDisplayName)
      },
      {
        displayName: "Vendor Names or IDs",
        name: "vendor",
        type: "multiOptions",
        default: [],
        description: 'Vendor to filter results by. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getVendors"
        }
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionFields,
  transactionOperations
});
//# sourceMappingURL=TransactionDescription.js.map