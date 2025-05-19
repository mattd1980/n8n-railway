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
var CompanyDesciption_exports = {};
__export(CompanyDesciption_exports, {
  companyFields: () => companyFields,
  companyOperations: () => companyOperations
});
module.exports = __toCommonJS(CompanyDesciption_exports);
const companyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["company"]
      }
    },
    options: [
      {
        name: "Enrich",
        value: "enrich",
        action: "Enrich a company"
      }
    ],
    default: "enrich"
  }
];
const companyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 company:enrich                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Company",
    name: "company",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["enrich"]
      }
    },
    description: "The name of the company (e.g \u2013 amazon)"
  },
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["enrich"]
      }
    },
    description: "The domain name (e.g \u2013 amazon.com)"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyFields,
  companyOperations
});
//# sourceMappingURL=CompanyDesciption.js.map