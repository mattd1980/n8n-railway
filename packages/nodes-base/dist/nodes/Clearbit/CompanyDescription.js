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
var CompanyDescription_exports = {};
__export(CompanyDescription_exports, {
  companyFields: () => companyFields,
  companyOperations: () => companyOperations
});
module.exports = __toCommonJS(CompanyDescription_exports);
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
        name: "Autocomplete",
        value: "autocomplete",
        description: "Auto-complete company names and retrieve logo and domain",
        action: "Autocomplete a company"
      },
      {
        name: "Enrich",
        value: "enrich",
        description: "Look up person and company data based on an email or domain",
        action: "Enrich a company"
      }
    ],
    default: "enrich"
  }
];
const companyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 company:enrich                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["enrich"]
      }
    },
    description: "The domain to look up"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["enrich"]
      }
    },
    options: [
      {
        displayName: "Company Name",
        name: "companyName",
        type: "string",
        default: "",
        description: "The name of the company"
      },
      {
        displayName: "Facebook",
        name: "facebook",
        type: "string",
        default: "",
        description: "The Facebook URL for the company"
      },
      {
        displayName: "Linkedin",
        name: "linkedin",
        type: "string",
        default: "",
        description: "The LinkedIn URL for the company"
      },
      {
        displayName: "Twitter",
        name: "twitter",
        type: "string",
        default: "",
        description: "The Twitter handle for the company"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 company:autocomplete                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["autocomplete"]
      }
    },
    description: "Name is the partial name of the company"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyFields,
  companyOperations
});
//# sourceMappingURL=CompanyDescription.js.map