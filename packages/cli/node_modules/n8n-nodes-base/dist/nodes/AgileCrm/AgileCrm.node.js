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
var AgileCrm_node_exports = {};
__export(AgileCrm_node_exports, {
  AgileCrm: () => AgileCrm
});
module.exports = __toCommonJS(AgileCrm_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./CompanyDescription");
var import_ContactDescription = require("./ContactDescription");
var import_DealDescription = require("./DealDescription");
var import_GenericFunctions = require("./GenericFunctions");
class AgileCrm {
  constructor() {
    this.description = {
      displayName: "Agile CRM",
      name: "agileCrm",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:agilecrm.png",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      group: ["transform"],
      version: 1,
      description: "Consume Agile CRM API",
      defaults: {
        name: "Agile CRM"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "agileCrmApi",
          required: true
        }
      ],
      properties: [
        // Node properties which the user gets displayed and
        // can change on the node.
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Company",
              value: "company"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Deal",
              value: "deal"
            }
          ],
          default: "contact"
        },
        // CONTACT
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        // COMPANY
        ...import_CompanyDescription.companyOperations,
        ...import_CompanyDescription.companyFields,
        // DEAL
        ...import_DealDescription.dealOperations,
        ...import_DealDescription.dealFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      if (resource === "contact" || resource === "company") {
        const idGetter = resource === "contact" ? "contactId" : "companyId";
        if (operation === "get") {
          const contactId = this.getNodeParameter(idGetter, i);
          const endpoint = `api/contacts/${contactId}`;
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "GET", endpoint, {});
        } else if (operation === "delete") {
          const contactId = this.getNodeParameter(idGetter, i);
          const endpoint = `api/contacts/${contactId}`;
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "DELETE", endpoint, {});
        } else if (operation === "getAll") {
          const simple = this.getNodeParameter("simple", 0);
          const returnAll = this.getNodeParameter("returnAll", 0);
          const filterType = this.getNodeParameter("filterType", i);
          const sort = this.getNodeParameter("options.sort.sort", i, {});
          const body = {};
          const filterJson = {};
          let contactType = "";
          if (resource === "contact") {
            contactType = "PERSON";
          } else {
            contactType = "COMPANY";
          }
          filterJson.contact_type = contactType;
          if (filterType === "manual") {
            const conditions = this.getNodeParameter(
              "filters.conditions",
              i,
              []
            );
            const matchType = this.getNodeParameter("matchType", i);
            let rules;
            if (conditions.length !== 0) {
              rules = (0, import_GenericFunctions.getFilterRules)(conditions, matchType);
              Object.assign(filterJson, rules);
            } else {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "At least one condition must be added.",
                { itemIndex: i }
              );
            }
          } else if (filterType === "json") {
            const filterJsonRules = this.getNodeParameter("filterJson", i);
            if ((0, import_GenericFunctions.validateJSON)(filterJsonRules) !== void 0) {
              Object.assign(filterJson, (0, import_n8n_workflow.jsonParse)(filterJsonRules));
            } else {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Filter (JSON) must be a valid json", {
                itemIndex: i
              });
            }
          }
          body.filterJson = JSON.stringify(filterJson);
          if (sort) {
            if (sort.direction === "ASC") {
              body.global_sort_key = sort.field;
            } else if (sort.direction === "DESC") {
              body.global_sort_key = `-${sort.field}`;
            }
          }
          if (returnAll) {
            body.page_size = 100;
            responseData = await import_GenericFunctions.agileCrmApiRequestAllItems.call(
              this,
              "POST",
              "api/filters/filter/dynamic-filter",
              body,
              void 0,
              void 0,
              true
            );
          } else {
            body.page_size = this.getNodeParameter("limit", 0);
            responseData = await import_GenericFunctions.agileCrmApiRequest.call(
              this,
              "POST",
              "api/filters/filter/dynamic-filter",
              body,
              void 0,
              void 0,
              true
            );
          }
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyResponse)(responseData);
          }
        } else if (operation === "create") {
          const jsonParameters = this.getNodeParameter("jsonParameters", i);
          const body = {};
          const properties = [];
          if (jsonParameters) {
            const additionalFieldsJson = this.getNodeParameter("additionalFieldsJson", i);
            if (additionalFieldsJson !== "") {
              if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                Object.assign(body, (0, import_n8n_workflow.jsonParse)(additionalFieldsJson));
              } else {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Additional fields must be a valid JSON",
                  { itemIndex: i }
                );
              }
            }
          } else {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (resource === "company") {
              body.type = "COMPANY";
            }
            if (additionalFields.starValue) {
              body.star_value = additionalFields.starValue;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            if (resource === "contact") {
              if (additionalFields.firstName) {
                properties.push({
                  type: "SYSTEM",
                  name: "first_name",
                  value: additionalFields.firstName
                });
              }
              if (additionalFields.lastName) {
                properties.push({
                  type: "SYSTEM",
                  name: "last_name",
                  value: additionalFields.lastName
                });
              }
              if (additionalFields.company) {
                properties.push({
                  type: "SYSTEM",
                  name: "company",
                  value: additionalFields.company
                });
              }
              if (additionalFields.title) {
                properties.push({
                  type: "SYSTEM",
                  name: "title",
                  value: additionalFields.title
                });
              }
              if (additionalFields.emailOptions) {
                additionalFields.emailOptions.emailProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "email",
                    value: property.email
                  });
                });
              }
              if (additionalFields.addressOptions) {
                additionalFields.addressOptions.addressProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "address",
                    value: property.address
                  });
                });
              }
              if (additionalFields.phoneOptions) {
                additionalFields.phoneOptions.phoneProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "phone",
                    value: property.number
                  });
                });
              }
            } else if (resource === "company") {
              if (additionalFields.email) {
                properties.push({
                  type: "SYSTEM",
                  name: "email",
                  value: additionalFields.email
                });
              }
              if (additionalFields.addressOptions) {
                additionalFields.addressOptions.addressProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "address",
                    value: property.address
                  });
                });
              }
              if (additionalFields.phone) {
                properties.push({
                  type: "SYSTEM",
                  name: "phone",
                  value: additionalFields.phone
                });
              }
              if (additionalFields.name) {
                properties.push({
                  type: "SYSTEM",
                  name: "name",
                  value: additionalFields.name
                });
              }
            }
            if (additionalFields.websiteOptions) {
              additionalFields.websiteOptions.websiteProperties.map((property) => {
                properties.push({
                  type: "SYSTEM",
                  subtype: property.subtype,
                  name: "website",
                  value: property.url
                });
              });
            }
            if (additionalFields.customProperties) {
              additionalFields.customProperties.customProperty.map((property) => {
                properties.push({
                  type: "CUSTOM",
                  subtype: property.subtype,
                  name: property.name,
                  value: property.value
                });
              });
            }
            body.properties = properties;
          }
          const endpoint = "api/contacts";
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "POST", endpoint, body);
        } else if (operation === "update") {
          const contactId = this.getNodeParameter(idGetter, i);
          const contactUpdatePayload = { id: contactId };
          const jsonParameters = this.getNodeParameter("jsonParameters", i);
          const body = {};
          const properties = [];
          if (jsonParameters) {
            const additionalFieldsJson = this.getNodeParameter("additionalFieldsJson", i);
            if (additionalFieldsJson !== "") {
              if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                Object.assign(body, (0, import_n8n_workflow.jsonParse)(additionalFieldsJson));
              } else {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Additional fields must be a valid JSON",
                  { itemIndex: i }
                );
              }
            }
          } else {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.starValue) {
              body.star_value = additionalFields.starValue;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            if (resource === "contact") {
              if (additionalFields.leadScore) {
                body.lead_score = additionalFields.leadScore;
              }
              if (additionalFields.firstName) {
                properties.push({
                  type: "SYSTEM",
                  name: "first_name",
                  value: additionalFields.firstName
                });
              }
              if (additionalFields.lastName) {
                properties.push({
                  type: "SYSTEM",
                  name: "last_name",
                  value: additionalFields.lastName
                });
              }
              if (additionalFields.company) {
                properties.push({
                  type: "SYSTEM",
                  name: "company",
                  value: additionalFields.company
                });
              }
              if (additionalFields.title) {
                properties.push({
                  type: "SYSTEM",
                  name: "title",
                  value: additionalFields.title
                });
              }
              if (additionalFields.emailOptions) {
                additionalFields.emailOptions.emailProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "email",
                    value: property.email
                  });
                });
              }
              if (additionalFields.addressOptions) {
                additionalFields.addressOptions.addressProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "address",
                    value: property.address
                  });
                });
              }
              if (additionalFields.phoneOptions) {
                additionalFields.phoneOptions.phoneProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "phone",
                    value: property.number
                  });
                });
              }
            } else if (resource === "company") {
              if (additionalFields.email) {
                properties.push({
                  type: "SYSTEM",
                  name: "email",
                  value: additionalFields.email
                });
              }
              if (additionalFields.addressOptions) {
                additionalFields.addressOptions.addressProperties.map((property) => {
                  properties.push({
                    type: "SYSTEM",
                    subtype: property.subtype,
                    name: "address",
                    value: property.address
                  });
                });
              }
              if (additionalFields.phone) {
                properties.push({
                  type: "SYSTEM",
                  name: "phone",
                  value: additionalFields.phone
                });
              }
            }
            if (additionalFields.websiteOptions) {
              additionalFields.websiteOptions.websiteProperties.map((property) => {
                properties.push({
                  type: "SYSTEM",
                  subtype: property.subtype,
                  name: "website",
                  value: property.url
                });
              });
            }
            if (additionalFields.name) {
              properties.push({
                type: "SYSTEM",
                name: "name",
                value: additionalFields.name
              });
            }
            if (additionalFields.customProperties) {
              additionalFields.customProperties.customProperty.map((property) => {
                properties.push({
                  type: "CUSTOM",
                  subtype: property.subtype,
                  name: property.name,
                  value: property.value
                });
              });
            }
            body.properties = properties;
          }
          Object.assign(contactUpdatePayload, body);
          responseData = await import_GenericFunctions.agileCrmApiRequestUpdate.call(this, "PUT", "", contactUpdatePayload);
        }
      } else if (resource === "deal") {
        if (operation === "get") {
          const dealId = this.getNodeParameter("dealId", i);
          const endpoint = `api/opportunity/${dealId}`;
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "GET", endpoint, {});
        } else if (operation === "delete") {
          const contactId = this.getNodeParameter("dealId", i);
          const endpoint = `api/opportunity/${contactId}`;
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "DELETE", endpoint, {});
        } else if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0);
          const endpoint = "api/opportunity";
          if (returnAll) {
            const limit = 100;
            responseData = await import_GenericFunctions.agileCrmApiRequestAllItems.call(this, "GET", endpoint, void 0, {
              page_size: limit
            });
          } else {
            const limit = this.getNodeParameter("limit", 0);
            responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "GET", endpoint, void 0, {
              page_size: limit
            });
          }
        } else if (operation === "create") {
          const jsonParameters = this.getNodeParameter("jsonParameters", i);
          const body = {};
          if (jsonParameters) {
            const additionalFieldsJson = this.getNodeParameter("additionalFieldsJson", i);
            if (additionalFieldsJson !== "") {
              if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                Object.assign(body, (0, import_n8n_workflow.jsonParse)(additionalFieldsJson));
              } else {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Additional fields must be a valid JSON",
                  { itemIndex: i }
                );
              }
            }
          } else {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body.close_date = new Date(this.getNodeParameter("closeDate", i)).getTime();
            body.expected_value = this.getNodeParameter("expectedValue", i);
            body.milestone = this.getNodeParameter("milestone", i);
            body.probability = this.getNodeParameter("probability", i);
            body.name = this.getNodeParameter("name", i);
            if (additionalFields.contactIds) {
              body.contactIds = additionalFields.contactIds;
            }
            if (additionalFields.customData) {
              body.customData = additionalFields.customData.customProperty;
            }
          }
          const endpoint = "api/opportunity";
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "POST", endpoint, body);
        } else if (operation === "update") {
          const jsonParameters = this.getNodeParameter("jsonParameters", i);
          const body = {};
          if (jsonParameters) {
            const additionalFieldsJson = this.getNodeParameter("additionalFieldsJson", i);
            if (additionalFieldsJson !== "") {
              if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                Object.assign(body, (0, import_n8n_workflow.jsonParse)(additionalFieldsJson));
              } else {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Additional fields must be valid JSON",
                  { itemIndex: i }
                );
              }
            }
          } else {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body.id = this.getNodeParameter("dealId", i);
            if (additionalFields.expectedValue) {
              body.expected_value = additionalFields.expectedValue;
            }
            if (additionalFields.name) {
              body.name = additionalFields.name;
            }
            if (additionalFields.probability) {
              body.probability = additionalFields.probability;
            }
            if (additionalFields.contactIds) {
              body.contactIds = additionalFields.contactIds;
            }
            if (additionalFields.customData) {
              body.customData = additionalFields.customData.customProperty;
            }
          }
          const endpoint = "api/opportunity/partial-update";
          responseData = await import_GenericFunctions.agileCrmApiRequest.call(this, "PUT", endpoint, body);
        }
      }
      if (Array.isArray(responseData)) {
        returnData.push.apply(returnData, responseData);
      } else {
        returnData.push(responseData);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgileCrm
});
//# sourceMappingURL=AgileCrm.node.js.map