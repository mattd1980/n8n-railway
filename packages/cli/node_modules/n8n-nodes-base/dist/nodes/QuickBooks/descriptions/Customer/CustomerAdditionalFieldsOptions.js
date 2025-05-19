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
var CustomerAdditionalFieldsOptions_exports = {};
__export(CustomerAdditionalFieldsOptions_exports, {
  customerAdditionalFieldsOptions: () => customerAdditionalFieldsOptions
});
module.exports = __toCommonJS(CustomerAdditionalFieldsOptions_exports);
const customerAdditionalFieldsOptions = [
  {
    displayName: "Active",
    name: "Active",
    description: "Whether the customer is currently enabled for use by QuickBooks",
    type: "boolean",
    default: true
  },
  {
    displayName: "Balance",
    name: "Balance",
    description: "Open balance amount or amount unpaid by the customer",
    type: "string",
    default: ""
  },
  {
    displayName: "Balance With Jobs",
    name: "BalanceWithJobs",
    description: "Cumulative open balance amount for the customer (or job) and all its sub-jobs",
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
    displayName: "Bill With Parent",
    name: "BillWithParent",
    description: "Whether to bill this customer together with its parent",
    type: "boolean",
    default: false
  },
  {
    displayName: "Company Name",
    name: "CompanyName",
    type: "string",
    default: ""
  },
  {
    displayName: "Family Name",
    name: "FamilyName",
    type: "string",
    default: ""
  },
  {
    displayName: "Fully Qualified Name",
    name: "FullyQualifiedName",
    type: "string",
    default: ""
  },
  {
    displayName: "Given Name",
    name: "GivenName",
    type: "string",
    default: ""
  },
  {
    displayName: "Preferred Delivery Method",
    name: "PreferredDeliveryMethod",
    type: "options",
    default: "Print",
    options: [
      {
        name: "Print",
        value: "Print"
      },
      {
        name: "Email",
        value: "Email"
      },
      {
        name: "None",
        value: "None"
      }
    ]
  },
  {
    displayName: "Primary Email Address",
    name: "PrimaryEmailAddr",
    type: "string",
    default: ""
  },
  {
    displayName: "Primary Phone",
    name: "PrimaryPhone",
    type: "string",
    default: ""
  },
  {
    displayName: "Print-On-Check Name",
    name: "PrintOnCheckName",
    description: "Name of the customer as printed on a check",
    type: "string",
    default: ""
  },
  {
    displayName: "Taxable",
    name: "Taxable",
    description: "Whether transactions for this customer are taxable",
    type: "boolean",
    default: false
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerAdditionalFieldsOptions
});
//# sourceMappingURL=CustomerAdditionalFieldsOptions.js.map