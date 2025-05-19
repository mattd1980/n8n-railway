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
var InvoiceAdditionalFieldsOptions_exports = {};
__export(InvoiceAdditionalFieldsOptions_exports, {
  invoiceAdditionalFieldsOptions: () => invoiceAdditionalFieldsOptions
});
module.exports = __toCommonJS(InvoiceAdditionalFieldsOptions_exports);
const invoiceAdditionalFieldsOptions = [
  {
    displayName: "Balance",
    name: "Balance",
    description: "The balance reflecting any payments made against the transaction",
    type: "number",
    default: 0
  },
  {
    displayName: "Billing Address",
    name: "BillAddr",
    placeholder: "Add Billing Address Fields",
    type: "fixedCollection",
    default: {},
    options: [
      {
        displayName: "Details",
        name: "details",
        values: [
          {
            displayName: "City",
            name: "City",
            type: "string",
            default: ""
          },
          {
            displayName: "Line 1",
            name: "Line1",
            type: "string",
            default: ""
          },
          {
            displayName: "Postal Code",
            name: "PostalCode",
            type: "string",
            default: ""
          },
          {
            displayName: "Latitude",
            name: "Lat",
            type: "string",
            default: ""
          },
          {
            displayName: "Longitude",
            name: "Long",
            type: "string",
            default: ""
          },
          {
            displayName: "Country Subdivision Code",
            name: "CountrySubDivisionCode",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Billing Email",
    name: "BillEmail",
    description: "E-mail address to which the invoice will be sent",
    type: "string",
    default: ""
  },
  {
    displayName: "Customer Memo",
    name: "CustomerMemo",
    description: "User-entered message to the customer. This message is visible to end user on their transactions.",
    type: "string",
    default: ""
  },
  {
    displayName: "Custom Fields",
    name: "CustomFields",
    placeholder: "Add Custom Fields",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "Field",
        values: [
          {
            displayName: "Field Definition Name or ID",
            name: "DefinitionId",
            type: "options",
            typeOptions: {
              loadOptionsMethod: "getCustomFields"
            },
            default: "",
            description: 'ID of the field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
          },
          {
            displayName: "Field Value",
            name: "StringValue",
            type: "string",
            default: "",
            description: "Value of the field to set"
          }
        ]
      }
    ]
  },
  {
    displayName: "Document Number",
    name: "DocNumber",
    description: "Reference number for the transaction",
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
    displayName: "Email Status",
    name: "EmailStatus",
    type: "options",
    default: "NotSet",
    options: [
      {
        name: "Not Set",
        value: "NotSet"
      },
      {
        name: "Need To Send",
        value: "NeedToSend"
      },
      {
        name: "Email Sent",
        value: "EmailSent"
      }
    ]
  },
  {
    displayName: "Print Status",
    name: "PrintStatus",
    type: "options",
    default: "NotSet",
    options: [
      {
        name: "Not Set",
        value: "NotSet"
      },
      {
        name: "Need To Print",
        value: "NeedToPrint"
      },
      {
        name: "PrintComplete",
        value: "PrintComplete"
      }
    ]
  },
  {
    displayName: "Shipping Address",
    name: "ShipAddr",
    type: "string",
    default: ""
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
  invoiceAdditionalFieldsOptions
});
//# sourceMappingURL=InvoiceAdditionalFieldsOptions.js.map