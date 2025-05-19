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
var constants_exports = {};
__export(constants_exports, {
  GROUP_BY_OPTIONS: () => GROUP_BY_OPTIONS,
  PAYMENT_METHODS: () => PAYMENT_METHODS,
  PREDEFINED_DATE_RANGES: () => PREDEFINED_DATE_RANGES,
  SOURCE_ACCOUNT_TYPES: () => SOURCE_ACCOUNT_TYPES,
  TRANSACTION_REPORT_COLUMNS: () => TRANSACTION_REPORT_COLUMNS,
  TRANSACTION_TYPES: () => TRANSACTION_TYPES
});
module.exports = __toCommonJS(constants_exports);
const PREDEFINED_DATE_RANGES = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Week-to-Date",
  "Last Week-to-Date",
  "Next Week",
  "Next 4 Weeks",
  "This Month",
  "Last Month",
  "This Month-to-Date",
  "Last Month-to-Date",
  "Next Month",
  "This Fiscal Quarter",
  "Last Fiscal Quarter",
  "This Fiscal Quarter-to-Date",
  "Last Fiscal Quarter-to-Date",
  "Next Fiscal Quarter",
  "This Fiscal Year",
  "Last Fiscal Year",
  "This Fiscal Year-to-Date",
  "Last Fiscal Year-to-Date",
  "Next Fiscal Year"
];
const TRANSACTION_REPORT_COLUMNS = [
  {
    name: "Account Name",
    value: "account_name"
  },
  {
    name: "Created By",
    value: "create_by"
  },
  {
    name: "Create Date",
    value: "create_date"
  },
  {
    name: "Customer Message",
    value: "cust_msg"
  },
  {
    name: "Department Name",
    value: "dept_name"
  },
  {
    name: "Due Date",
    value: "due_date"
  },
  {
    name: "Document Number",
    value: "doc_num"
  },
  {
    name: "Invoice Date",
    value: "inv_date"
  },
  {
    name: "Is Account Payable Paid",
    value: "is_ap_paid"
  },
  {
    name: "Is Cleared",
    value: "is_cleared"
  },
  {
    name: "Last Modified By",
    value: "last_mod_by"
  },
  {
    name: "Memo",
    value: "memo"
  },
  {
    name: "Name",
    value: "name"
  },
  {
    name: "Other Account",
    value: "other_account"
  },
  {
    name: "Payment Method",
    value: "pmt_mthod"
  },
  {
    name: "Posting",
    value: "is_no_post"
  },
  {
    name: "Printed Status",
    value: "printed"
  },
  {
    name: "Sales Customer 1",
    value: "sales_cust1"
  },
  {
    name: "Sales Customer 2",
    value: "sales_cust2"
  },
  {
    name: "Sales Customer 3",
    value: "sales_cust3"
  },
  {
    name: "Term Name",
    value: "term_name"
  },
  {
    name: "Tracking Number",
    value: "tracking_num"
  },
  {
    name: "Transaction Date",
    value: "tx_date"
  },
  {
    name: "Transaction Type",
    value: "txn_type"
  }
];
const PAYMENT_METHODS = [
  "American Express",
  "Cash",
  "Check",
  "Dinners Club",
  "Discover",
  "Master Card",
  "Visa"
];
const TRANSACTION_TYPES = [
  "Bill",
  "BillPaymentCheck",
  "BillPaymentCreditCard",
  "BillableCharge",
  "CashPurchase",
  "Charge",
  "Check",
  "Credit",
  "CreditCardCharge",
  "CreditCardCredit",
  "CreditMemo",
  "CreditRefund",
  "Deposit",
  "Estimate",
  "GlobalTaxAdjustment",
  "GlobalTaxPayment",
  "InventoryQuantityAdjustment",
  "Invoice",
  "JournalEntry",
  "PurchaseOrder",
  "ReceivePayment",
  "SalesReceipt",
  "Service Tax Defer",
  "Service Tax Gross Adjustment",
  "Service Tax Partial Utilisation",
  "Service Tax Refund",
  "Service Tax Reversal",
  "Statement",
  "TimeActivity",
  "Transfer",
  "VendorCredit"
];
const SOURCE_ACCOUNT_TYPES = [
  "AccountsPayable",
  "AccountsReceivable",
  "Bank",
  "CostOfGoodsSold",
  "CreditCard",
  "Equity",
  "Expense",
  "FixedAsset",
  "Income",
  "LongTermLiability",
  "NonPosting",
  "OtherAsset",
  "OtherCurrentAsset",
  "OtherCurrentLiability",
  "OtherExpense",
  "OtherIncome"
];
const GROUP_BY_OPTIONS = [
  "Account",
  "Customer",
  "Day",
  "Employee",
  "Location",
  "Month",
  "Name",
  "None",
  "Payment Method",
  "Quarter",
  "Transaction Type",
  "Vendor",
  "Week",
  "Year"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GROUP_BY_OPTIONS,
  PAYMENT_METHODS,
  PREDEFINED_DATE_RANGES,
  SOURCE_ACCOUNT_TYPES,
  TRANSACTION_REPORT_COLUMNS,
  TRANSACTION_TYPES
});
//# sourceMappingURL=constants.js.map