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
var Clearbit_node_exports = {};
__export(Clearbit_node_exports, {
  Clearbit: () => Clearbit
});
module.exports = __toCommonJS(Clearbit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./CompanyDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_PersonDescription = require("./PersonDescription");
class Clearbit {
  constructor() {
    this.description = {
      displayName: "Clearbit",
      name: "clearbit",
      icon: "file:clearbit.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      description: "Consume Clearbit API",
      defaults: {
        name: "Clearbit"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "clearbitApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Company",
              value: "company",
              description: "The Company API allows you to look up a company by their domain"
            },
            {
              name: "Person",
              value: "person",
              description: "The Person API lets you retrieve social information associated with an email address, such as a person\u2019s name, location and Twitter handle"
            }
          ],
          default: "company"
        },
        ...import_CompanyDescription.companyOperations,
        ...import_CompanyDescription.companyFields,
        ...import_PersonDescription.personOperations,
        ...import_PersonDescription.personFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "person") {
          if (operation === "enrich") {
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.email = email;
            if (additionalFields.givenName) {
              qs.given_name = additionalFields.givenName;
            }
            if (additionalFields.familyName) {
              qs.family_name = additionalFields.familyName;
            }
            if (additionalFields.ipAddress) {
              qs.ip_address = additionalFields.ipAddress;
            }
            if (additionalFields.location) {
              qs.location = additionalFields.location;
            }
            if (additionalFields.company) {
              qs.company = additionalFields.company;
            }
            if (additionalFields.companyDomain) {
              qs.company_domain = additionalFields.companyDomain;
            }
            if (additionalFields.linkedIn) {
              qs.linkedin = additionalFields.linkedIn;
            }
            if (additionalFields.twitter) {
              qs.twitter = additionalFields.twitter;
            }
            if (additionalFields.facebook) {
              qs.facebook = additionalFields.facebook;
            }
            responseData = await import_GenericFunctions.clearbitApiRequest.call(
              this,
              "GET",
              `${resource}-stream`,
              "/v2/people/find",
              {},
              qs
            );
          }
        }
        if (resource === "company") {
          if (operation === "enrich") {
            const domain = this.getNodeParameter("domain", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.domain = domain;
            if (additionalFields.companyName) {
              qs.company_name = additionalFields.companyName;
            }
            if (additionalFields.linkedin) {
              qs.linkedin = additionalFields.linkedin;
            }
            if (additionalFields.twitter) {
              qs.twitter = additionalFields.twitter;
            }
            if (additionalFields.facebook) {
              qs.facebook = additionalFields.facebook;
            }
            responseData = await import_GenericFunctions.clearbitApiRequest.call(
              this,
              "GET",
              `${resource}-stream`,
              "/v2/companies/find",
              {},
              qs
            );
          }
          if (operation === "autocomplete") {
            const name = this.getNodeParameter("name", i);
            qs.query = name;
            responseData = await import_GenericFunctions.clearbitApiRequest.call(
              this,
              "GET",
              "autocomplete",
              "/v1/companies/suggest",
              {},
              qs
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {} });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Clearbit
});
//# sourceMappingURL=Clearbit.node.js.map