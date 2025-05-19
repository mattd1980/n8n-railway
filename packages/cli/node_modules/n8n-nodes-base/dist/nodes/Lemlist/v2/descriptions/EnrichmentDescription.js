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
var EnrichmentDescription_exports = {};
__export(EnrichmentDescription_exports, {
  enrichmentFields: () => enrichmentFields,
  enrichmentOperations: () => enrichmentOperations
});
module.exports = __toCommonJS(EnrichmentDescription_exports);
const enrichmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Fetches a previously completed enrichment"
      },
      {
        name: "Enrich Lead",
        value: "enrichLead",
        action: "Enrich a lead using an email or LinkedIn URL"
      },
      {
        name: "Enrich Person",
        value: "enrichPerson",
        action: "Enrich a person using an email or LinkedIn URL"
      }
    ],
    displayOptions: {
      show: {
        resource: ["enrich"]
      }
    }
  }
];
const enrichmentFields = [
  // ----------------------------------
  //        enrichment: get
  // ----------------------------------
  {
    displayName: "Enrichment ID",
    name: "enrichId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the enrichment to retrieve",
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //        enrichment: enrichLead
  // ----------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichLead"]
      }
    }
  },
  {
    displayName: "Find Email",
    name: "findEmail",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichLead", "enrichPerson"]
      }
    }
  },
  {
    displayName: "Verify Email",
    name: "verifyEmail",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichLead", "enrichPerson"]
      }
    }
  },
  {
    displayName: "LinkedIn Enrichment",
    name: "linkedinEnrichment",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichLead", "enrichPerson"]
      }
    }
  },
  {
    displayName: "Find Phone",
    name: "findPhone",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichLead", "enrichPerson"]
      }
    }
  },
  // ----------------------------------
  //				enrichment: enrichPerson
  // ----------------------------------
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["enrich"],
        operation: ["enrichPerson"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: ""
      },
      {
        displayName: "Last Name",
        name: "lastName",
        type: "string",
        default: ""
      },
      {
        displayName: "LinkedIn Url",
        name: "linkedinUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "Company Name",
        name: "companyName",
        type: "string",
        default: ""
      },
      {
        displayName: "Company Domain",
        name: "companyDomain",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enrichmentFields,
  enrichmentOperations
});
//# sourceMappingURL=EnrichmentDescription.js.map