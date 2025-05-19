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
var EmployeeAdditionalFieldsOptions_exports = {};
__export(EmployeeAdditionalFieldsOptions_exports, {
  employeeAdditionalFieldsOptions: () => employeeAdditionalFieldsOptions
});
module.exports = __toCommonJS(EmployeeAdditionalFieldsOptions_exports);
const employeeAdditionalFieldsOptions = [
  {
    displayName: "Active",
    name: "Active",
    description: "Whether the employee is currently enabled for use by QuickBooks",
    type: "boolean",
    default: false
  },
  {
    displayName: "Billable Time",
    name: "BillableTime",
    type: "boolean",
    default: false
  },
  {
    displayName: "Display Name",
    name: "DisplayName",
    type: "string",
    default: ""
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
    displayName: "Primary Phone",
    name: "PrimaryPhone",
    type: "string",
    default: ""
  },
  {
    displayName: "Print-On-Check Name",
    name: "PrintOnCheckName",
    description: "Name of the employee as printed on a check",
    type: "string",
    default: ""
  },
  {
    displayName: "Social Security Number",
    name: "SSN",
    type: "string",
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  employeeAdditionalFieldsOptions
});
//# sourceMappingURL=EmployeeAdditionalFieldsOptions.js.map