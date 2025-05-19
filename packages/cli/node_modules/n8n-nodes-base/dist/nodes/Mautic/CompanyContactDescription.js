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
var CompanyContactDescription_exports = {};
__export(CompanyContactDescription_exports, {
  companyContactFields: () => companyContactFields,
  companyContactOperations: () => companyContactOperations
});
module.exports = __toCommonJS(CompanyContactDescription_exports);
const companyContactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["companyContact"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add contact to a company",
        action: "Add a company contact"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a contact from a company",
        action: "Remove a company contact"
      }
    ],
    default: "create"
  }
];
const companyContactFields = [
  /* -------------------------------------------------------------------------- */
  /*                                companyContact:add                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["companyContact"],
        operation: ["add", "remove"]
      }
    },
    default: "",
    description: "The ID of the contact"
  },
  {
    displayName: "Company ID",
    name: "companyId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["companyContact"],
        operation: ["add", "remove"]
      }
    },
    default: "",
    description: "The ID of the company"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyContactFields,
  companyContactOperations
});
//# sourceMappingURL=CompanyContactDescription.js.map