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
var BillAdditionalFieldsOptions_exports = {};
__export(BillAdditionalFieldsOptions_exports, {
  billAdditionalFieldsOptions: () => billAdditionalFieldsOptions
});
module.exports = __toCommonJS(BillAdditionalFieldsOptions_exports);
const billAdditionalFieldsOptions = [
  {
    displayName: "Accounts Payable Account",
    name: "APAccountRef",
    placeholder: "Add APA Fields",
    description: "Accounts Payable account to which the bill will be credited",
    type: "fixedCollection",
    default: {},
    options: [
      {
        displayName: "Details",
        name: "details",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: ""
          },
          {
            displayName: "ID",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Balance",
    name: "Balance",
    description: "The balance reflecting any payments made against the transaction",
    type: "string",
    default: ""
  },
  {
    displayName: "Due Date",
    name: "DueDate",
    description: "Date when the payment of the transaction is due",
    type: "dateTime",
    default: ""
  },
  {
    displayName: "Sales Term",
    name: "SalesTermRef",
    description: "Sales term associated with the transaction",
    placeholder: "Add Sales Term Fields",
    type: "fixedCollection",
    default: {},
    options: [
      {
        displayName: "Details",
        name: "details",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: ""
          },
          {
            displayName: "ID",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Total Amount",
    name: "TotalAmt",
    description: "Total amount of the transaction",
    type: "number",
    default: 0
  },
  {
    displayName: "Transaction Date",
    name: "TxnDate",
    description: "Date when the transaction occurred",
    type: "dateTime",
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  billAdditionalFieldsOptions
});
//# sourceMappingURL=BillAdditionalFieldsOptions.js.map