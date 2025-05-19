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
var PersonDescription_exports = {};
__export(PersonDescription_exports, {
  personFields: () => personFields,
  personOperations: () => personOperations
});
module.exports = __toCommonJS(PersonDescription_exports);
const personOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["person"]
      }
    },
    options: [
      {
        name: "Enrich",
        value: "enrich",
        description: "Look up a person and company data based on an email or domain",
        action: "Enrich a person"
      }
    ],
    default: "enrich"
  }
];
const personFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 person:enrich                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    description: "The email address to look up"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    options: [
      {
        displayName: "Company",
        name: "company",
        type: "string",
        default: "",
        description: "The name of the person\u2019s employer"
      },
      {
        displayName: "Company Domain",
        name: "companyDomain",
        type: "string",
        default: "",
        description: "The domain for the person\u2019s employer"
      },
      {
        displayName: "Facebook",
        name: "facebook",
        type: "string",
        default: "",
        description: "The Facebook URL for the person"
      },
      {
        displayName: "Family Name",
        name: "familyName",
        type: "string",
        default: "",
        description: "Last name of person. If you have this, passing this is strongly recommended to improve match rates."
      },
      {
        displayName: "Given Name",
        name: "givenName",
        type: "string",
        default: "",
        description: "First name of person"
      },
      {
        displayName: "IP Address",
        name: "ipAddress",
        type: "string",
        default: "",
        description: "IP address of the person. If you have this, passing this is strongly recommended to improve match rates."
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        description: "The city or country where the person resides"
      },
      {
        displayName: "LinkedIn",
        name: "linkedIn",
        type: "string",
        default: "",
        description: "The LinkedIn URL for the person"
      },
      {
        displayName: "Twitter",
        name: "twitter",
        type: "string",
        default: "",
        description: "The Twitter handle for the person"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personFields,
  personOperations
});
//# sourceMappingURL=PersonDescription.js.map