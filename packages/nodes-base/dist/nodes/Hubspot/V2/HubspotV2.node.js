"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var HubspotV2_node_exports = {};
__export(HubspotV2_node_exports, {
  HubspotV2: () => HubspotV2
});
module.exports = __toCommonJS(HubspotV2_node_exports);
var import_change_case = require("change-case");
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./CompanyDescription");
var import_ContactDescription = require("./ContactDescription");
var import_ContactListDescription = require("./ContactListDescription");
var import_DealDescription = require("./DealDescription");
var import_EngagementDescription = require("./EngagementDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_TicketDescription = require("./TicketDescription");
var import_utilities = require("../../../utils/utilities");
class HubspotV2 {
  constructor(baseDescription) {
    this.methods = {
      credentialTest: {
        async hubspotApiTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(this, credential.data);
          } catch (error) {
            const err = error;
            if (err.statusCode === 401) {
              return {
                status: "Error",
                message: "Invalid credentials"
              };
            }
          }
          return {
            status: "OK",
            message: "Authentication successful"
          };
        }
      },
      loadOptions: {
        /* -------------------------------------------------------------------------- */
        /*                                 CONTACT                                    */
        /* -------------------------------------------------------------------------- */
        // Get all the contact lead statuses to display them to user so that they can
        // select them easily
        async getContactLeadStatuses() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_lead_status") {
              for (const option of property.options) {
                const statusName = option.label;
                const statusId = option.value;
                returnData.push({
                  name: statusName,
                  value: statusId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact legal basics to display them to user so that they can
        // select them easily
        async getContactLealBasics() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_legal_basis") {
              for (const option of property.options) {
                const statusName = option.label;
                const statusId = option.value;
                returnData.push({
                  name: statusName,
                  value: statusId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact lifecycle stages to display them to user so that they can
        // select them easily
        async getContactLifeCycleStages() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "lifecyclestage") {
              for (const option of property.options) {
                const stageName = option.label;
                const stageId = option.value;
                returnData.push({
                  name: stageName,
                  value: stageId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact lifecycle stages to display them to user so that they can
        // select them easily
        async getContactOriginalSources() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_analytics_source") {
              for (const option of property.options) {
                const sourceName = option.label;
                const sourceId = option.value;
                returnData.push({
                  name: sourceName,
                  value: sourceId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact preffered languages to display them to user so that they can
        // select them easily
        async getContactPrefferedLanguages() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_language") {
              for (const option of property.options) {
                const languageName = option.label;
                const languageId = option.value;
                returnData.push({
                  name: languageName,
                  value: languageId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact preffered languages to display them to user so that they can
        // select them easily
        async getContactStatuses() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_content_membership_status") {
              for (const option of property.options) {
                const languageName = option.label;
                const languageId = option.value;
                returnData.push({
                  name: languageName,
                  value: languageId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the contact properties to display them to user so that they can
        // select them easily
        async getContactProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          let properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          properties = properties.sort((a, b) => {
            if (a.label < b.label) return -1;
            if (a.label > b.label) return 1;
            return 0;
          });
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the contact properties to display them to user so that they can
        // select them easily
        async getContactPropertiesWithType() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            const propertyType = property.type;
            returnData.push({
              name: propertyName,
              // Hacky way to get the property type need to be parsed to be use in the api
              value: `${propertyId}|${propertyType}`
            });
          }
          return returnData;
        },
        // Get all the contact properties to display them to user so that they can
        // select them easily
        async getContactCustomProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.hubspotDefined === null) {
              const propertyName = property.label;
              const propertyId = property.name;
              returnData.push({
                name: propertyName,
                value: propertyId
              });
            }
          }
          return returnData;
        },
        // Get all the contact number of employees options to display them to user so that they can
        // select them easily
        async getContactNumberOfEmployees() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "numemployees") {
              for (const option of property.options) {
                const optionName = option.label;
                const optionId = option.value;
                returnData.push({
                  name: optionName,
                  value: optionId
                });
              }
            }
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 COMPANY                                    */
        /* -------------------------------------------------------------------------- */
        // Get all the company industries to display them to user so that they can
        // select them easily
        async getCompanyIndustries() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "industry") {
              for (const option of property.options) {
                const industryName = option.label;
                const industryId = option.value;
                returnData.push({
                  name: industryName,
                  value: industryId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company lead statuses to display them to user so that they can
        // select them easily
        async getCompanyleadStatuses() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_lead_status") {
              for (const option of property.options) {
                const statusName = option.label;
                const statusId = option.value;
                returnData.push({
                  name: statusName,
                  value: statusId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company lifecycle stages to display them to user so that they can
        // select them easily
        async getCompanylifecycleStages() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "lifecyclestage") {
              for (const option of property.options) {
                const stageName = option.label;
                const stageId = option.value;
                returnData.push({
                  name: stageName,
                  value: stageId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company types stages to display them to user so that they can
        // select them easily
        async getCompanyTypes() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "type") {
              for (const option of property.options) {
                const typeName = option.label;
                const typeId = option.value;
                returnData.push({
                  name: typeName,
                  value: typeId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company types stages to display them to user so that they can
        // select them easily
        async getCompanyTargetAccounts() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_target_account") {
              for (const option of property.options) {
                const targetName = option.label;
                const targetId = option.value;
                returnData.push({
                  name: targetName,
                  value: targetId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company source types stages to display them to user so that they can
        // select them easily
        async getCompanySourceTypes() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_analytics_source") {
              for (const option of property.options) {
                const typeName = option.label;
                const typeId = option.value;
                returnData.push({
                  name: typeName,
                  value: typeId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company web technologies stages to display them to user so that they can
        // select them easily
        async getCompanyWebTechnologies() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "web_technologies") {
              for (const option of property.options) {
                const technologyName = option.label;
                const technologyId = option.value;
                returnData.push({
                  name: technologyName,
                  value: technologyId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the company properties to display them to user so that they can
        // select them easily
        async getCompanyProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the company custom properties to display them to user so that they can
        // select them easily
        async getCompanyCustomProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.hubspotDefined === null) {
              const propertyName = property.label;
              const propertyId = property.name;
              returnData.push({
                name: propertyName,
                value: propertyId
              });
            }
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 DEAL                                       */
        /* -------------------------------------------------------------------------- */
        // Get all the groups to display them to user so that they can
        // select them easily
        async getDealStages() {
          const returnData = [];
          const endpoint = "/crm-pipelines/v1/pipelines/deals";
          let stages = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          stages = stages.results[0].stages;
          for (const stage of stages) {
            const stageName = stage.label;
            const stageId = stage.stageId;
            returnData.push({
              name: stageName,
              value: stageId
            });
          }
          return returnData;
        },
        // Get all the deal types to display them to user so that they can
        // select them easily
        async getDealTypes() {
          const returnData = [];
          const endpoint = "/properties/v1/deals/properties/named/dealtype";
          const dealTypes = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint);
          for (const dealType of dealTypes.options) {
            const dealTypeName = dealType.label;
            const dealTypeId = dealType.value;
            returnData.push({
              name: dealTypeName,
              value: dealTypeId
            });
          }
          return returnData;
        },
        // Get all the deal properties to display them to user so that they can
        // select them easily
        async getDealCustomProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/deals/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.hubspotDefined === null) {
              const propertyName = property.label;
              const propertyId = property.name;
              returnData.push({
                name: propertyName,
                value: propertyId
              });
            }
          }
          return returnData;
        },
        // Get all the deal properties to display them to user so that they can
        // select them easily
        async getDealProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/deals/properties";
          let properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          properties = properties.sort((a, b) => {
            if (a.label < b.label) return -1;
            if (a.label > b.label) return 1;
            return 0;
          });
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the deal properties to display them to user so that they can
        // select them easily
        async getDealPropertiesWithType() {
          const returnData = [];
          const endpoint = "/properties/v2/deals/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            const propertyType = property.type;
            returnData.push({
              name: propertyName,
              // Hacky way to get the property type need to be parsed to be use in the api
              // this is no longer working, properties does not returned in the response
              value: `${propertyId}|${propertyType}`
            });
          }
          return returnData;
        },
        // Get all the deal pipelines to display them to user so that they can
        // select them easily
        async getDealPipelines() {
          const returnData = [];
          const endpoint = "/crm/v3/pipelines/deals";
          const data = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const pipeline of data.results) {
            returnData.push({
              name: pipeline.label,
              value: pipeline.id
            });
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 FORM                                       */
        /* -------------------------------------------------------------------------- */
        // Get all the forms to display them to user so that they can
        // select them easily
        async getForms() {
          const returnData = [];
          const endpoint = "/forms/v2/forms";
          const forms = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, { formTypes: "ALL" });
          for (const form of forms) {
            const formName = form.name;
            const formId = form.guid;
            returnData.push({
              name: formName,
              value: formId
            });
          }
          return returnData;
        },
        // Get all the subscription types to display them to user so that they can
        // select them easily
        async getSubscriptionTypes() {
          const returnData = [];
          const endpoint = "/email/public/v1/subscriptions";
          const subscriptions = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "subscriptionDefinitions",
            "GET",
            endpoint,
            {}
          );
          for (const subscription of subscriptions) {
            const subscriptionName = subscription.name;
            const subscriptionId = subscription.id;
            returnData.push({
              name: subscriptionName,
              value: subscriptionId
            });
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 TICKET                                     */
        /* -------------------------------------------------------------------------- */
        // Get all the ticket categories to display them to user so that they can
        // select them easily
        async getTicketCategories() {
          const returnData = [];
          const endpoint = "/properties/v2/tickets/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_ticket_category") {
              for (const option of property.options) {
                const categoryName = option.label;
                const categoryId = option.value;
                returnData.push({
                  name: categoryName,
                  value: categoryId
                });
              }
            }
          }
          return returnData.sort((a, b) => a.name < b.name ? 0 : 1);
        },
        // Get all the ticket pipelines to display them to user so that they can
        // select them easily
        async getTicketPipelines() {
          const returnData = [];
          const endpoint = "/crm-pipelines/v1/pipelines/tickets";
          const { results } = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const pipeline of results) {
            const pipelineName = pipeline.label;
            const pipelineId = pipeline.pipelineId;
            returnData.push({
              name: pipelineName,
              value: pipelineId
            });
          }
          return returnData;
        },
        // Get all the ticket resolutions to display them to user so that they can
        // select them easily
        async getTicketPriorities() {
          const returnData = [];
          const endpoint = "/properties/v2/tickets/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_ticket_priority") {
              for (const option of property.options) {
                const priorityName = option.label;
                const priorityId = option.value;
                returnData.push({
                  name: priorityName,
                  value: priorityId
                });
              }
            }
          }
          return returnData;
        },
        // Get all the ticket properties to display them to user so that they can
        // select them easily
        async getTicketProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/tickets/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the ticket resolutions to display them to user so that they can
        // select them easily
        async getTicketResolutions() {
          const returnData = [];
          const endpoint = "/properties/v2/tickets/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "hs_resolution") {
              for (const option of property.options) {
                const resolutionName = option.label;
                const resolutionId = option.value;
                returnData.push({
                  name: resolutionName,
                  value: resolutionId
                });
              }
            }
          }
          return returnData.sort((a, b) => a.name < b.name ? 0 : 1);
        },
        // Get all the ticket sources to display them to user so that they can
        // select them easily
        async getTicketSources() {
          const returnData = [];
          const endpoint = "/properties/v2/tickets/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            if (property.name === "source_type") {
              for (const option of property.options) {
                const sourceName = option.label;
                const sourceId = option.value;
                returnData.push({
                  name: sourceName,
                  value: sourceId
                });
              }
            }
          }
          return returnData.sort((a, b) => a.name < b.name ? 0 : 1);
        },
        // Get all the ticket stages to display them to user so that they can
        // select them easily
        async getTicketStages() {
          let currentPipelineId = this.getCurrentNodeParameter("pipelineId");
          if (currentPipelineId === void 0) {
            currentPipelineId = this.getNodeParameter("updateFields.pipelineId", "");
          }
          const returnData = [];
          const endpoint = "/crm-pipelines/v1/pipelines/tickets";
          const { results } = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const pipeline of results) {
            if (currentPipelineId === pipeline.pipelineId) {
              for (const stage of pipeline.stages) {
                const stageName = stage.label;
                const stageId = stage.stageId;
                returnData.push({
                  name: stageName,
                  value: stageId
                });
              }
            }
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 COMMON                                     */
        /* -------------------------------------------------------------------------- */
        // Get all the owners to display them to user so that they can
        // select them easily
        async getOwners() {
          const returnData = [];
          const endpoint = "/crm/v3/owners";
          const { results } = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint);
          for (const owner of results) {
            const ownerName = owner.email;
            const ownerId = isNaN(parseInt(owner.id)) ? owner.id : parseInt(owner.id);
            returnData.push({
              name: ownerName,
              value: ownerId
            });
          }
          return returnData;
        },
        // Get all the companies to display them to user so that they can
        // select them easily
        async getCompanies() {
          const returnData = [];
          const qs = {
            properties: ["name"]
          };
          const endpoint = "/companies/v2/companies/paged";
          const companies = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "companies",
            "GET",
            endpoint,
            {},
            qs
          );
          for (const company of companies) {
            const companyName = company.properties.name ? company.properties.name.value : company.companyId;
            const companyId = company.companyId;
            returnData.push({
              name: companyName,
              value: companyId
            });
          }
          return returnData.sort((a, b) => a.name < b.name ? 0 : 1);
        },
        // Get all the companies to display them to user so that they can
        // select them easily
        async getContacts() {
          const returnData = [];
          const endpoint = "/contacts/v1/lists/all/contacts/all";
          const contacts = await import_GenericFunctions.hubspotApiRequestAllItems.call(this, "contacts", "GET", endpoint);
          for (const contact of contacts) {
            const firstName = contact.properties?.firstname?.value || "";
            const lastName = contact.properties?.lastname?.value || "";
            const contactName = `${firstName} ${lastName}`;
            const contactId = contact.vid;
            returnData.push({
              name: contactName,
              value: contactId,
              description: `Contact VID: ${contactId}`
            });
          }
          return returnData.sort((a, b) => a.name < b.name ? 0 : 1);
        }
      },
      listSearch: {
        async searchCompanies() {
          const qs = {
            properties: ["name"]
          };
          const endpoint = "/companies/v2/companies/paged";
          const searchResults = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "companies",
            "GET",
            endpoint,
            {},
            qs
          );
          return {
            // tslint:disable-next-line: no-any
            results: searchResults.map((b) => ({
              name: b.properties?.name?.value || b.companyId,
              value: b.companyId
            }))
          };
        },
        async searchContacts(filter) {
          const endpoint = "/contacts/v1/lists/all/contacts/all";
          const qs = {
            property: ["email"]
          };
          const contacts = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "contacts",
            "GET",
            endpoint,
            {},
            qs
          );
          const results = contacts.map((c) => ({
            name: c.properties.email.value || c.vid,
            value: c.vid
          })).filter(
            (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.value?.toString() === filter
          ).sort((a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
          });
          return { results };
        },
        async searchDeals(filter) {
          const endpoint = "/deals/v1/deal/paged";
          const qs = {
            properties: ["dealname"]
          };
          const deals = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "deals",
            "GET",
            endpoint,
            {},
            qs
          );
          const results = deals.map((c) => ({
            name: c.properties?.dealname?.value || c.dealId,
            value: c.dealId
          })).filter(
            (c) => !filter || c.name.toString().toLowerCase().includes(filter.toString().toLowerCase()) || c.value?.toString() === filter
          ).sort((a, b) => {
            return a.name.toString().toLowerCase() < b.name.toString().toLowerCase() ? -1 : 1;
          });
          return {
            results
          };
        },
        async searchEngagements() {
          const endpoint = "/engagements/v1/engagements/paged";
          const qs = {
            properties: ["name"]
          };
          const engagements = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
          return {
            // tslint:disable-next-line: no-any
            results: engagements.results.map((b) => ({
              name: b.properties?.name?.value || b.engagement?.type ? `${b.engagement?.type}: ${b.engagement.id}` : b.engagement.id,
              value: b.engagement.id
            }))
          };
        },
        async searchTickets() {
          const endpoint = "/crm-objects/v1/objects/tickets/paged";
          const qs = {
            properties: ["ticket_name"]
          };
          const tickets = await import_GenericFunctions.hubspotApiRequestAllItems.call(
            this,
            "objects",
            "GET",
            endpoint,
            {},
            qs
          );
          return {
            // tslint:disable-next-line: no-any
            results: tickets.map((b) => ({
              name: b.objectId,
              value: b.objectId
            }))
          };
        },
        async searchOwners() {
          const endpoint = "/crm/v3/owners";
          const { results } = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          return {
            // tslint:disable-next-line: no-any
            results: results.map((b) => ({
              name: b.email,
              value: isNaN(parseInt(b.id)) ? b.id : parseInt(b.id)
            }))
          };
        }
      }
    };
    this.description = {
      ...baseDescription,
      group: ["output"],
      version: [2, 2.1],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "HubSpot"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "hubspotApi",
          required: true,
          testedBy: "hubspotApiTest",
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "hubspotAppToken",
          required: true,
          testedBy: "hubspotApiTest",
          displayOptions: {
            show: {
              authentication: ["appToken"]
            }
          }
        },
        {
          name: "hubspotOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Key",
              value: "apiKey"
            },
            {
              name: "APP Token",
              value: "appToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiKey"
        },
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
              name: "Contact List",
              value: "contactList"
            },
            {
              name: "Deal",
              value: "deal"
            },
            {
              name: "Engagement",
              value: "engagement"
            },
            // {
            // 	name: 'Form',
            // 	value: 'form',
            // },
            {
              name: "Ticket",
              value: "ticket"
            }
          ],
          default: "contact"
        },
        // CONTACT
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        // CONTACT LIST
        ...import_ContactListDescription.contactListOperations,
        ...import_ContactListDescription.contactListFields,
        // COMPANY
        ...import_CompanyDescription.companyOperations,
        ...import_CompanyDescription.companyFields,
        // DEAL
        ...import_DealDescription.dealOperations,
        ...import_DealDescription.dealFields,
        // ENGAGEMENT
        ...import_EngagementDescription.engagementOperations,
        ...import_EngagementDescription.engagementFields,
        //! FORM Deprecated
        //...formOperations,
        //...formFields,
        // TICKET
        ...import_TicketDescription.ticketOperations,
        ...import_TicketDescription.ticketFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "contactList") {
      try {
        if (operation === "add") {
          const listId = this.getNodeParameter("listId", 0);
          const by = this.getNodeParameter("by", 0);
          const body = { emails: [], vids: [] };
          for (let i = 0; i < length; i++) {
            if (by === "id") {
              const id = this.getNodeParameter("id", i);
              body.vids.push(parseInt(id, 10));
            } else {
              const email = this.getNodeParameter("email", i);
              body.emails.push(email);
            }
          }
          responseData = await import_GenericFunctions.hubspotApiRequest.call(
            this,
            "POST",
            `/contacts/v1/lists/${listId}/add`,
            body
          );
        }
        if (operation === "remove") {
          const listId = this.getNodeParameter("listId", 0);
          const body = { vids: [] };
          for (let i = 0; i < length; i++) {
            const id = this.getNodeParameter("id", i);
            body.vids.push(parseInt(id, 10));
          }
          responseData = await import_GenericFunctions.hubspotApiRequest.call(
            this,
            "POST",
            `/contacts/v1/lists/${listId}/remove`,
            body
          );
        }
        const itemData = (0, import_utilities.generatePairedItemData)(items.length);
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
        } else {
          throw error;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        try {
          if (resource === "contact") {
            if (operation === "upsert") {
              const email = this.getNodeParameter("email", i);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const options = this.getNodeParameter("options", i);
              const body = [];
              if (additionalFields.annualRevenue) {
                body.push({
                  property: "annualrevenue",
                  value: additionalFields.annualRevenue.toString()
                });
              }
              if (additionalFields.city) {
                body.push({
                  property: "city",
                  value: additionalFields.city
                });
              }
              if (additionalFields.clickedFacebookAd) {
                body.push({
                  property: "hs_facebook_ad_clicked",
                  value: additionalFields.clickedFacebookAd
                });
              }
              if (additionalFields.closeDate) {
                body.push({
                  property: "closedate",
                  value: new Date(additionalFields.closeDate).getTime()
                });
              }
              if (additionalFields.companyName) {
                body.push({
                  property: "company",
                  value: additionalFields.companyName
                });
              }
              if (additionalFields.companySize) {
                body.push({
                  property: "company_size",
                  value: additionalFields.companySize
                });
              }
              if (additionalFields.description) {
                body.push({
                  property: "description",
                  value: additionalFields.description
                });
              }
              if (additionalFields.contactOwner) {
                body.push({
                  property: "hubspot_owner_id",
                  value: additionalFields.contactOwner
                });
              }
              if (additionalFields.country) {
                body.push({
                  property: "country",
                  value: additionalFields.country
                });
              }
              if (additionalFields.dateOfBirth) {
                body.push({
                  property: "date_of_birth",
                  value: additionalFields.dateOfBirth
                });
              }
              if (additionalFields.degree) {
                body.push({
                  property: "degree",
                  value: additionalFields.degree
                });
              }
              if (additionalFields.facebookClickId) {
                body.push({
                  property: "hs_facebook_click_id",
                  value: additionalFields.facebookClickId
                });
              }
              if (additionalFields.faxNumber) {
                body.push({
                  property: "fax",
                  value: additionalFields.faxNumber
                });
              }
              if (additionalFields.fieldOfStudy) {
                body.push({
                  property: "field_of_study",
                  value: additionalFields.fieldOfStudy
                });
              }
              if (additionalFields.firstName) {
                body.push({
                  property: "firstname",
                  value: additionalFields.firstName
                });
              }
              if (additionalFields.gender) {
                body.push({
                  property: "gender",
                  value: additionalFields.gender
                });
              }
              if (additionalFields.googleAdClickId) {
                body.push({
                  property: "hs_google_click_id",
                  value: additionalFields.googleAdClickId
                });
              }
              if (additionalFields.graduationDate) {
                body.push({
                  property: "graduation_date",
                  value: additionalFields.graduationDate
                });
              }
              if (additionalFields.industry) {
                body.push({
                  property: "industry",
                  value: additionalFields.industry
                });
              }
              if (additionalFields.jobFunction) {
                body.push({
                  property: "job_function",
                  value: additionalFields.jobFunction
                });
              }
              if (additionalFields.jobTitle) {
                body.push({
                  property: "jobtitle",
                  value: additionalFields.jobTitle
                });
              }
              if (additionalFields.lastName) {
                body.push({
                  property: "lastname",
                  value: additionalFields.lastName
                });
              }
              if (additionalFields.leadStatus) {
                body.push({
                  property: "hs_lead_status",
                  value: additionalFields.leadStatus
                });
              }
              if (additionalFields.processingContactData) {
                body.push({
                  property: "hs_legal_basis",
                  value: additionalFields.processingContactData
                });
              }
              if (additionalFields.lifeCycleStage) {
                body.push({
                  property: "lifecyclestage",
                  value: additionalFields.lifeCycleStage
                });
              }
              if (additionalFields.maritalStatus) {
                body.push({
                  property: "marital_status",
                  value: additionalFields.maritalStatus
                });
              }
              if (additionalFields.membershipNote) {
                body.push({
                  property: "hs_content_membership_notes",
                  value: additionalFields.membershipNote
                });
              }
              if (additionalFields.message) {
                body.push({
                  property: "message",
                  value: additionalFields.message
                });
              }
              if (additionalFields.mobilePhoneNumber) {
                body.push({
                  property: "mobilephone",
                  value: additionalFields.mobilePhoneNumber
                });
              }
              if (additionalFields.numberOfEmployees) {
                body.push({
                  property: "numemployees",
                  value: additionalFields.numberOfEmployees
                });
              }
              if (additionalFields.originalSource) {
                body.push({
                  property: "hs_analytics_source",
                  value: additionalFields.originalSource
                });
              }
              if (additionalFields.phoneNumber) {
                body.push({
                  property: "phone",
                  value: additionalFields.phoneNumber
                });
              }
              if (additionalFields.postalCode) {
                body.push({
                  property: "zip",
                  value: additionalFields.postalCode
                });
              }
              if (additionalFields.prefferedLanguage) {
                body.push({
                  property: "hs_language",
                  value: additionalFields.prefferedLanguage
                });
              }
              if (additionalFields.relationshipStatus) {
                body.push({
                  property: "relationship_status",
                  value: additionalFields.relationshipStatus
                });
              }
              if (additionalFields.salutation) {
                body.push({
                  property: "salutation",
                  value: additionalFields.salutation
                });
              }
              if (additionalFields.school) {
                body.push({
                  property: "school",
                  value: additionalFields.school
                });
              }
              if (additionalFields.seniority) {
                body.push({
                  property: "seniority",
                  value: additionalFields.seniority
                });
              }
              if (additionalFields.startDate) {
                body.push({
                  property: "start_date",
                  value: additionalFields.startDate
                });
              }
              if (additionalFields.stateRegion) {
                body.push({
                  property: "state",
                  value: additionalFields.stateRegion
                });
              }
              if (additionalFields.status) {
                body.push({
                  property: "hs_content_membership_status",
                  value: additionalFields.status
                });
              }
              if (additionalFields.streetAddress) {
                body.push({
                  property: "address",
                  value: additionalFields.streetAddress
                });
              }
              if (additionalFields.twitterUsername) {
                body.push({
                  property: "twitterhandle",
                  value: additionalFields.twitterUsername
                });
              }
              if (additionalFields.websiteUrl) {
                body.push({
                  property: "website",
                  value: additionalFields.websiteUrl
                });
              }
              if (additionalFields.workEmail) {
                body.push({
                  property: "work_email",
                  value: additionalFields.workEmail
                });
              }
              if (additionalFields.customPropertiesUi) {
                const customProperties = additionalFields.customPropertiesUi.customPropertiesValues;
                if (customProperties) {
                  for (const customProperty of customProperties) {
                    body.push({
                      property: customProperty.property,
                      value: customProperty.value
                    });
                  }
                }
              }
              const endpoint = `/contacts/v1/contact/createOrUpdate/email/${email}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, {
                properties: body
              });
              if (additionalFields.associatedCompanyId) {
                const companyAssociations = [];
                companyAssociations.push({
                  fromObjectId: responseData.vid,
                  toObjectId: additionalFields.associatedCompanyId,
                  category: "HUBSPOT_DEFINED",
                  definitionId: 1
                });
                await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "PUT",
                  "/crm-associations/v1/associations/create-batch",
                  companyAssociations
                );
              }
              if (!options.resolveData) {
                const isNew = responseData.isNew;
                if (additionalFields.properties) {
                  qs.property = additionalFields.properties;
                }
                responseData = await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "GET",
                  `/contacts/v1/contact/vid/${responseData.vid}/profile`,
                  {},
                  qs
                );
                responseData.isNew = isNew;
              }
            }
            if (operation === "get") {
              const contactId = this.getNodeParameter("contactId", i, void 0, {
                extractValue: true
              });
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.formSubmissionMode) {
                qs.formSubmissionMode = additionalFields.formSubmissionMode;
              }
              if (additionalFields.listMemberships) {
                qs.showListMemberships = additionalFields.listMemberships;
              }
              if (additionalFields.propertiesCollection) {
                const propertiesValues = additionalFields.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = `/contacts/v1/contact/vid/${contactId}/profile`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
            }
            if (operation === "getAll") {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (additionalFields.formSubmissionMode) {
                qs.formSubmissionMode = additionalFields.formSubmissionMode;
              }
              if (additionalFields.listMemberships) {
                qs.showListMemberships = additionalFields.listMemberships;
              }
              if (additionalFields.propertiesCollection) {
                const propertiesValues = additionalFields.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.property = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = "/contacts/v1/lists/all/contacts/all";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "contacts",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.count = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.contacts;
              }
            }
            if (operation === "getRecentlyCreatedUpdated") {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.formSubmissionMode) {
                qs.formSubmissionMode = additionalFields.formSubmissionMode;
              }
              if (additionalFields.listMemberships) {
                qs.showListMemberships = additionalFields.listMemberships;
              }
              if (additionalFields.propertiesCollection) {
                const propertiesValues = additionalFields.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = "/contacts/v1/lists/recently_updated/contacts/recent";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "contacts",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.count = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.contacts;
              }
            }
            if (operation === "delete") {
              const contactId = this.getNodeParameter("contactId", i, void 0, {
                extractValue: true
              });
              const endpoint = `/contacts/v1/contact/vid/${contactId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", endpoint);
              responseData = responseData === void 0 ? { vid: contactId, deleted: true } : responseData;
            }
            if (operation === "search") {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              const filtersGroupsUi = this.getNodeParameter("filterGroupsUi", i);
              const sortBy = additionalFields.sortBy || "createdate";
              const direction = additionalFields.direction || "DESCENDING";
              const body = {
                sorts: [
                  {
                    propertyName: sortBy,
                    direction
                  }
                ]
              };
              if (filtersGroupsUi?.filterGroupsValues) {
                const filterGroupValues = filtersGroupsUi.filterGroupsValues;
                body.filterGroups = [];
                for (const filterGroupValue of filterGroupValues) {
                  if (filterGroupValue.filtersUi) {
                    const filterValues = filterGroupValue.filtersUi.filterValues;
                    for (const filter of filterValues) {
                      delete filter.type;
                      filter.propertyName = filter.propertyName?.toString().split("|")[0];
                    }
                    body.filterGroups.push({ filters: filterValues });
                  }
                }
                if (body.filterGroups.length > 3) {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "You can only have 3 filter groups",
                    { itemIndex: i }
                  );
                }
              }
              Object.assign(body, additionalFields);
              const endpoint = "/crm/v3/objects/contacts/search";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "POST",
                  endpoint,
                  body,
                  qs
                );
              } else {
                body.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body, qs);
                responseData = responseData.results;
              }
            }
          }
          if (resource === "company") {
            if (operation === "create") {
              const name = this.getNodeParameter("name", i);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const body = [];
              body.push({
                name: "name",
                value: name
              });
              if (additionalFields.aboutUs) {
                body.push({
                  name: "about_us",
                  value: additionalFields.aboutUs
                });
              }
              if (additionalFields.annualRevenue) {
                body.push({
                  name: "annualrevenue",
                  value: additionalFields.annualRevenue.toString()
                });
              }
              if (additionalFields.city) {
                body.push({
                  name: "city",
                  value: additionalFields.city
                });
              }
              if (additionalFields.closeDate) {
                body.push({
                  name: "closedate",
                  value: new Date(additionalFields.closeDate).getTime()
                });
              }
              if (additionalFields.companyDomainName) {
                body.push({
                  name: "domain",
                  value: additionalFields.companyDomainName
                });
              }
              if (additionalFields.companyOwner) {
                body.push({
                  name: "hubspot_owner_id",
                  value: additionalFields.companyOwner
                });
              }
              if (additionalFields.countryRegion) {
                body.push({
                  name: "country",
                  value: additionalFields.countryRegion
                });
              }
              if (additionalFields.description) {
                body.push({
                  name: "description",
                  value: additionalFields.description
                });
              }
              if (additionalFields.facebookFans) {
                body.push({
                  name: "facebookfans",
                  value: additionalFields.facebookFans
                });
              }
              if (additionalFields.googlePlusPage) {
                body.push({
                  name: "googleplus_page",
                  value: additionalFields.googlePlusPage
                });
              }
              if (additionalFields.industry) {
                body.push({
                  name: "industry",
                  value: additionalFields.industry
                });
              }
              if (additionalFields.isPublic) {
                body.push({
                  name: "is_public",
                  value: additionalFields.isPublic
                });
              }
              if (additionalFields.leadStatus) {
                body.push({
                  name: "hs_lead_status",
                  value: additionalFields.leadStatus
                });
              }
              if (additionalFields.lifecycleStatus) {
                body.push({
                  name: "lifecyclestage",
                  value: additionalFields.lifecycleStatus
                });
              }
              if (additionalFields.linkedinBio) {
                body.push({
                  name: "linkedinbio",
                  value: additionalFields.linkedinBio
                });
              }
              if (additionalFields.linkedInCompanyPage) {
                body.push({
                  name: "linkedin_company_page",
                  value: additionalFields.linkedInCompanyPage
                });
              }
              if (additionalFields.numberOfEmployees) {
                body.push({
                  name: "numberofemployees",
                  value: additionalFields.numberOfEmployees
                });
              }
              if (additionalFields.originalSourceType) {
                body.push({
                  name: "hs_analytics_source",
                  value: additionalFields.originalSourceType
                });
              }
              if (additionalFields.phoneNumber) {
                body.push({
                  name: "phone",
                  value: additionalFields.phoneNumber
                });
              }
              if (additionalFields.postalCode) {
                body.push({
                  name: "zip",
                  value: additionalFields.postalCode
                });
              }
              if (additionalFields.stateRegion) {
                body.push({
                  name: "state",
                  value: additionalFields.stateRegion
                });
              }
              if (additionalFields.streetAddress) {
                body.push({
                  name: "address",
                  value: additionalFields.streetAddress
                });
              }
              if (additionalFields.streetAddress2) {
                body.push({
                  name: "address2",
                  value: additionalFields.streetAddress2
                });
              }
              if (additionalFields.targetAccount) {
                body.push({
                  name: "hs_target_account",
                  value: additionalFields.targetAccount
                });
              }
              if (additionalFields.timezone) {
                body.push({
                  name: "timezone",
                  value: additionalFields.timezone
                });
              }
              if (additionalFields.totalMoneyRaised) {
                body.push({
                  name: "total_money_raised",
                  value: additionalFields.totalMoneyRaised
                });
              }
              if (additionalFields.twitterBio) {
                body.push({
                  name: "twitterbio",
                  value: additionalFields.twitterBio
                });
              }
              if (additionalFields.twitterFollowers) {
                body.push({
                  name: "twitterfollowers",
                  value: additionalFields.twitterFollowers
                });
              }
              if (additionalFields.twitterHandle) {
                body.push({
                  name: "twitterhandle",
                  value: additionalFields.twitterHandle
                });
              }
              if (additionalFields.type) {
                body.push({
                  name: "type",
                  value: additionalFields.type
                });
              }
              if (additionalFields.websiteUrl) {
                body.push({
                  name: "website",
                  value: additionalFields.websiteUrl
                });
              }
              if (additionalFields.webTechnologies) {
                body.push({
                  name: "web_technologies",
                  value: additionalFields.webTechnologies
                });
              }
              if (additionalFields.yearFounded) {
                body.push({
                  name: "founded_year",
                  value: additionalFields.yearFounded
                });
              }
              if (additionalFields.customPropertiesUi) {
                const customProperties = additionalFields.customPropertiesUi.customPropertiesValues;
                if (customProperties) {
                  for (const customProperty of customProperties) {
                    body.push({
                      name: customProperty.property,
                      value: customProperty.value
                    });
                  }
                }
              }
              const endpoint = "/companies/v2/companies";
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, {
                properties: body
              });
            }
            if (operation === "update") {
              const companyId = this.getNodeParameter("companyId", i, void 0, {
                extractValue: true
              });
              const updateFields = this.getNodeParameter("updateFields", i);
              const body = [];
              if (updateFields.name) {
                body.push({
                  name: "name",
                  value: updateFields.name
                });
              }
              if (updateFields.aboutUs) {
                body.push({
                  name: "about_us",
                  value: updateFields.aboutUs
                });
              }
              if (updateFields.annualRevenue) {
                body.push({
                  name: "annualrevenue",
                  value: updateFields.annualRevenue.toString()
                });
              }
              if (updateFields.city) {
                body.push({
                  name: "city",
                  value: updateFields.city
                });
              }
              if (updateFields.closeDate) {
                body.push({
                  name: "closedate",
                  value: new Date(updateFields.closeDate).getTime()
                });
              }
              if (updateFields.companyDomainName) {
                body.push({
                  name: "domain",
                  value: updateFields.companyDomainName
                });
              }
              if (updateFields.companyOwner) {
                body.push({
                  name: "hubspot_owner_id",
                  value: updateFields.companyOwner
                });
              }
              if (updateFields.countryRegion) {
                body.push({
                  name: "country",
                  value: updateFields.countryRegion
                });
              }
              if (updateFields.description) {
                body.push({
                  name: "description",
                  value: updateFields.description
                });
              }
              if (updateFields.facebookFans) {
                body.push({
                  name: "facebookfans",
                  value: updateFields.facebookFans
                });
              }
              if (updateFields.googlePlusPage) {
                body.push({
                  name: "googleplus_page",
                  value: updateFields.googlePlusPage
                });
              }
              if (updateFields.industry) {
                body.push({
                  name: "industry",
                  value: updateFields.industry
                });
              }
              if (updateFields.isPublic) {
                body.push({
                  name: "is_public",
                  value: updateFields.isPublic
                });
              }
              if (updateFields.leadStatus) {
                body.push({
                  name: "hs_lead_status",
                  value: updateFields.leadStatus
                });
              }
              if (updateFields.lifecycleStatus) {
                body.push({
                  name: "lifecyclestage",
                  value: updateFields.lifecycleStatus
                });
              }
              if (updateFields.linkedinBio) {
                body.push({
                  name: "linkedinbio",
                  value: updateFields.linkedinBio
                });
              }
              if (updateFields.linkedInCompanyPage) {
                body.push({
                  name: "linkedin_company_page",
                  value: updateFields.linkedInCompanyPage
                });
              }
              if (updateFields.numberOfEmployees) {
                body.push({
                  name: "numberofemployees",
                  value: updateFields.numberOfEmployees
                });
              }
              if (updateFields.originalSourceType) {
                body.push({
                  name: "hs_analytics_source",
                  value: updateFields.originalSourceType
                });
              }
              if (updateFields.phoneNumber) {
                body.push({
                  name: "phone",
                  value: updateFields.phoneNumber
                });
              }
              if (updateFields.postalCode) {
                body.push({
                  name: "zip",
                  value: updateFields.postalCode
                });
              }
              if (updateFields.stateRegion) {
                body.push({
                  name: "state",
                  value: updateFields.stateRegion
                });
              }
              if (updateFields.streetAddress) {
                body.push({
                  name: "address",
                  value: updateFields.streetAddress
                });
              }
              if (updateFields.streetAddress2) {
                body.push({
                  name: "address2",
                  value: updateFields.streetAddress2
                });
              }
              if (updateFields.targetAccount) {
                body.push({
                  name: "hs_target_account",
                  value: updateFields.targetAccount
                });
              }
              if (updateFields.timezone) {
                body.push({
                  name: "timezone",
                  value: updateFields.timezone
                });
              }
              if (updateFields.totalMoneyRaised) {
                body.push({
                  name: "total_money_raised",
                  value: updateFields.totalMoneyRaised
                });
              }
              if (updateFields.twitterBio) {
                body.push({
                  name: "twitterbio",
                  value: updateFields.twitterBio
                });
              }
              if (updateFields.twitterFollowers) {
                body.push({
                  name: "twitterfollowers",
                  value: updateFields.twitterFollowers
                });
              }
              if (updateFields.twitterHandle) {
                body.push({
                  name: "twitterhandle",
                  value: updateFields.twitterHandle
                });
              }
              if (updateFields.type) {
                body.push({
                  name: "type",
                  value: updateFields.type
                });
              }
              if (updateFields.websiteUrl) {
                body.push({
                  name: "website",
                  value: updateFields.websiteUrl
                });
              }
              if (updateFields.webTechnologies) {
                body.push({
                  name: "web_technologies",
                  value: updateFields.webTechnologies
                });
              }
              if (updateFields.yearFounded) {
                body.push({
                  name: "founded_year",
                  value: updateFields.yearFounded
                });
              }
              if (updateFields.customPropertiesUi) {
                const customProperties = updateFields.customPropertiesUi.customPropertiesValues;
                if (customProperties) {
                  for (const customProperty of customProperties) {
                    body.push({
                      name: customProperty.property,
                      value: customProperty.value
                    });
                  }
                }
              }
              const endpoint = `/companies/v2/companies/${companyId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "PUT", endpoint, {
                properties: body
              });
            }
            if (operation === "get") {
              const companyId = this.getNodeParameter("companyId", i, void 0, {
                extractValue: true
              });
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.includeMergeAudits) {
                qs.includeMergeAudits = additionalFields.includeMergeAudits;
              }
              const endpoint = `/companies/v2/companies/${companyId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
            }
            if (operation === "getAll") {
              const additionalFields = this.getNodeParameter("options", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (additionalFields.formSubmissionMode) {
                qs.formSubmissionMode = additionalFields.formSubmissionMode;
              }
              if (additionalFields.listMerberships) {
                qs.showListMemberships = additionalFields.listMerberships;
              }
              if (additionalFields.propertiesCollection) {
                const propertiesValues = additionalFields.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = "/companies/v2/companies/paged";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "companies",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.companies;
              }
            }
            if (operation === "getRecentlyCreatedUpdated") {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.since) {
                qs.since = new Date(additionalFields.since).getTime();
              }
              if (additionalFields.propertiesCollection) {
                const propertiesValues = additionalFields.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = "/companies/v2/companies/recent/modified";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.count = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.results;
              }
            }
            if (operation === "searchByDomain") {
              let domain = this.getNodeParameter("domain", i);
              const options = this.getNodeParameter("options", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (domain.includes("https://")) {
                domain = domain.replace("https://", "");
              } else if (domain.includes("http://")) {
                domain = domain.replace("http://", "");
              }
              const body = {
                requestOptions: {}
              };
              if (options.properties) {
                body.requestOptions = { properties: options.properties };
              }
              const endpoint = `/companies/v2/domains/${domain}/companies`;
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "POST",
                  endpoint,
                  body
                );
              } else {
                body.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body);
                responseData = responseData.results;
              }
            }
            if (operation === "delete") {
              const companyId = this.getNodeParameter("companyId", i, void 0, {
                extractValue: true
              });
              const endpoint = `/crm/v3/objects/companies/${companyId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", endpoint);
              responseData = responseData === void 0 ? { vid: companyId, deleted: true } : responseData;
            }
          }
          if (resource === "deal") {
            if (operation === "create") {
              const body = {};
              body.properties = [];
              const association = {};
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const stage = this.getNodeParameter("stage", i);
              if (stage) {
                body.properties.push({
                  name: "dealstage",
                  value: stage
                });
              }
              if (additionalFields.associatedCompany) {
                association.associatedCompanyIds = additionalFields.associatedCompany;
              }
              if (additionalFields.associatedVids) {
                association.associatedVids = additionalFields.associatedVids;
              }
              if (additionalFields.dealName) {
                body.properties.push({
                  name: "dealname",
                  value: additionalFields.dealName
                });
              }
              if (additionalFields.dealOwner) {
                const dealOwner = additionalFields.dealOwner;
                body.properties.push({
                  name: "hubspot_owner_id",
                  value: dealOwner.value
                });
              }
              if (additionalFields.closeDate) {
                body.properties.push({
                  name: "closedate",
                  value: new Date(additionalFields.closeDate).getTime()
                });
              }
              if (additionalFields.amount) {
                body.properties.push({
                  name: "amount",
                  value: additionalFields.amount
                });
              }
              if (additionalFields.dealType) {
                body.properties.push({
                  name: "dealtype",
                  value: additionalFields.dealType
                });
              }
              if (additionalFields.pipeline) {
                body.properties.push({
                  name: "pipeline",
                  value: additionalFields.pipeline
                });
              }
              if (additionalFields.description) {
                body.properties.push({
                  name: "description",
                  value: additionalFields.description
                });
              }
              if (additionalFields.customPropertiesUi) {
                const customProperties = additionalFields.customPropertiesUi.customPropertiesValues;
                if (customProperties) {
                  for (const customProperty of customProperties) {
                    body.properties.push({
                      name: customProperty.property,
                      value: customProperty.value
                    });
                  }
                }
              }
              body.associations = association;
              const endpoint = "/deals/v1/deal";
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body);
            }
            if (operation === "update") {
              const body = {};
              body.properties = [];
              const updateFields = this.getNodeParameter("updateFields", i);
              const dealId = this.getNodeParameter(
                "dealId",
                i,
                {},
                { extractValue: true }
              );
              if (updateFields.stage) {
                body.properties.push({
                  name: "dealstage",
                  value: updateFields.stage
                });
              }
              if (updateFields.dealName) {
                body.properties.push({
                  name: "dealname",
                  value: updateFields.dealName
                });
              }
              if (updateFields.dealOwner) {
                const dealOwner = updateFields.dealOwner;
                body.properties.push({
                  name: "hubspot_owner_id",
                  value: dealOwner.value
                });
              }
              if (updateFields.closeDate) {
                body.properties.push({
                  name: "closedate",
                  value: new Date(updateFields.closeDate).getTime()
                });
              }
              if (updateFields.amount) {
                body.properties.push({
                  name: "amount",
                  value: updateFields.amount
                });
              }
              if (updateFields.dealType) {
                body.properties.push({
                  name: "dealtype",
                  value: updateFields.dealType
                });
              }
              if (updateFields.pipeline) {
                body.properties.push({
                  name: "pipeline",
                  value: updateFields.pipeline
                });
              }
              if (updateFields.description) {
                body.properties.push({
                  name: "description",
                  value: updateFields.description
                });
              }
              if (updateFields.customPropertiesUi) {
                const customProperties = updateFields.customPropertiesUi.customPropertiesValues;
                if (customProperties) {
                  for (const customProperty of customProperties) {
                    body.properties.push({
                      name: customProperty.property,
                      value: customProperty.value
                    });
                  }
                }
              }
              const endpoint = `/deals/v1/deal/${dealId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "PUT", endpoint, body);
            }
            if (operation === "get") {
              const dealId = this.getNodeParameter(
                "dealId",
                i,
                {},
                { extractValue: true }
              );
              const filters = this.getNodeParameter("filters", i);
              if (filters.includePropertyVersions) {
                qs.includePropertyVersions = filters.includePropertyVersions;
              }
              if (filters.propertiesCollection) {
                const propertiesValues = filters.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              const endpoint = `/deals/v1/deal/${dealId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint);
            }
            if (operation === "getAll") {
              const filters = this.getNodeParameter("filters", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (filters.includeAssociations) {
                qs.includeAssociations = filters.includeAssociations;
              }
              if (filters.propertiesCollection) {
                const propertiesValues = filters.propertiesCollection.propertiesValues;
                const properties = propertiesValues.properties;
                qs.properties = !Array.isArray(propertiesValues.properties) ? properties.split(",") : properties;
                qs.propertyMode = (0, import_change_case.snakeCase)(propertiesValues.propertyMode);
              }
              if (filters.properties) {
                const properties = filters.properties;
                qs.properties = !Array.isArray(properties) ? properties.split(",") : properties;
              }
              if (filters.propertiesWithHistory) {
                const properties = filters.propertiesWithHistory;
                qs.propertiesWithHistory = !Array.isArray(properties) ? properties.split(",") : properties;
              }
              const endpoint = "/deals/v1/deal/paged";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "deals",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.deals;
              }
            }
            if (operation === "getRecentlyCreatedUpdated") {
              const endpoint = "/deals/v1/deal/recent/created";
              const filters = this.getNodeParameter("filters", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (filters.since) {
                qs.since = new Date(filters.since).getTime();
              }
              if (filters.includePropertyVersions) {
                qs.includePropertyVersions = filters.includePropertyVersions;
              }
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.count = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.results;
              }
            }
            if (operation === "delete") {
              const dealId = this.getNodeParameter(
                "dealId",
                i,
                {},
                { extractValue: true }
              );
              const endpoint = `/deals/v1/deal/${dealId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", endpoint);
              responseData = responseData === void 0 ? { vid: dealId, deleted: true } : responseData;
            }
            if (operation === "search") {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              const filtersGroupsUi = this.getNodeParameter("filterGroupsUi", i);
              const sortBy = additionalFields.sortBy || "createdate";
              const direction = additionalFields.direction || "DESCENDING";
              const body = {
                sorts: [
                  {
                    propertyName: sortBy,
                    direction
                  }
                ]
              };
              if (filtersGroupsUi?.filterGroupsValues) {
                const filterGroupValues = filtersGroupsUi.filterGroupsValues;
                body.filterGroups = [];
                for (const filterGroupValue of filterGroupValues) {
                  if (filterGroupValue.filtersUi) {
                    const filterValues = filterGroupValue.filtersUi.filterValues;
                    for (const filter of filterValues) {
                      delete filter.type;
                      filter.propertyName = filter.propertyName?.toString().split("|")[0];
                    }
                    body.filterGroups.push({ filters: filterValues });
                  }
                }
                if (body.filterGroups.length > 3) {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "You can only have 3 filter groups",
                    { itemIndex: i }
                  );
                }
              }
              Object.assign(body, additionalFields);
              const endpoint = "/crm/v3/objects/deals/search";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "POST",
                  endpoint,
                  body,
                  qs
                );
              } else {
                body.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body, qs);
                responseData = responseData.results;
              }
            }
          }
          if (resource === "engagement") {
            if (operation === "create") {
              const type = this.getNodeParameter("type", i);
              const metadata = this.getNodeParameter("metadata", i);
              const associations = this.getNodeParameter(
                "additionalFields.associations",
                i,
                {}
              );
              if (!Object.keys(metadata).length) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "At least one metadata field needs to set",
                  { itemIndex: i }
                );
              }
              const body = {
                engagement: {
                  type: type.toUpperCase()
                },
                metadata: {},
                associations: {}
              };
              if (type === "email") {
                body.metadata = (0, import_GenericFunctions.getEmailMetadata)(metadata);
              }
              if (type === "task") {
                body.metadata = (0, import_GenericFunctions.getTaskMetadata)(metadata);
              }
              if (type === "meeting") {
                body.metadata = (0, import_GenericFunctions.getMeetingMetadata)(metadata);
              }
              if (type === "call") {
                body.metadata = (0, import_GenericFunctions.getCallMetadata)(metadata);
              }
              body.associations = (0, import_GenericFunctions.getAssociations)(associations);
              const endpoint = "/engagements/v1/engagements";
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body);
            }
            if (operation === "delete") {
              const engagementId = this.getNodeParameter("engagementId", i, void 0, {
                extractValue: true
              });
              const endpoint = `/engagements/v1/engagements/${engagementId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", endpoint, {}, qs);
              responseData = responseData === void 0 ? { vid: engagementId, deleted: true } : responseData;
            }
            if (operation === "get") {
              const engagementId = this.getNodeParameter("engagementId", i, void 0, {
                extractValue: true
              });
              const endpoint = `/engagements/v1/engagements/${engagementId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
            }
            if (operation === "getAll") {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const endpoint = "/engagements/v1/engagements/paged";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "results",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
                responseData = responseData.results;
              }
            }
          }
          if (resource === "form") {
            if (operation === "getFields") {
              const formId = this.getNodeParameter("formId", i);
              responseData = await import_GenericFunctions.hubspotApiRequest.call(
                this,
                "GET",
                `/forms/v2/fields/${formId}`
              );
            }
            if (operation === "submit") {
              const formId = this.getNodeParameter("formId", i);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const context = this.getNodeParameter("contextUi", i).contextValue;
              const legalConsent = this.getNodeParameter("lengalConsentUi", i).lengalConsentValues;
              const legitimateInteres = this.getNodeParameter("lengalConsentUi", i).legitimateInterestValues;
              const { portalId } = await import_GenericFunctions.hubspotApiRequest.call(
                this,
                "GET",
                `/forms/v2/forms/${formId}`
              );
              const body = {
                formId,
                portalId,
                legalConsentOptions: {},
                fields: []
              };
              if (additionalFields.submittedAt) {
                body.submittedAt = new Date(additionalFields.submittedAt).getTime();
              }
              if (additionalFields.skipValidation) {
                body.skipValidation = additionalFields.skipValidation;
              }
              const consent = {};
              if (legalConsent) {
                if (legalConsent.consentToProcess) {
                  consent.consentToProcess = legalConsent.consentToProcess;
                }
                if (legalConsent.text) {
                  consent.text = legalConsent.text;
                }
                if (legalConsent.communicationsUi) {
                  consent.communications = legalConsent.communicationsUi.communicationValues;
                }
              }
              body.legalConsentOptions.consent = consent;
              const fields = items[i].json;
              for (const key of Object.keys(fields)) {
                body.fields?.push({ name: key, value: fields[key] });
              }
              if (body.legalConsentOptions.legitimateInterest) {
                Object.assign(body, {
                  legalConsentOptions: { legitimateInterest: legitimateInteres }
                });
              }
              if (context) {
                (0, import_GenericFunctions.clean)(context);
                Object.assign(body, { context });
              }
              const uri = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", "", body, {}, uri);
            }
          }
          if (resource === "ticket") {
            if (operation === "create") {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const pipelineId = this.getNodeParameter("pipelineId", i);
              const stageId = this.getNodeParameter("stageId", i);
              const ticketName = this.getNodeParameter("ticketName", i);
              const body = [
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "hs_pipeline",
                  value: pipelineId
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "hs_pipeline_stage",
                  value: stageId
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "subject",
                  value: ticketName
                }
              ];
              if (additionalFields.category) {
                body.push({
                  name: "hs_ticket_category",
                  value: additionalFields.category
                });
              }
              if (additionalFields.closeDate) {
                body.push({
                  name: "closed_date",
                  value: new Date(additionalFields.closeDate).getTime()
                });
              }
              if (additionalFields.createDate) {
                body.push({
                  name: "createdate",
                  value: new Date(additionalFields.createDate).getTime()
                });
              }
              if (additionalFields.description) {
                body.push({
                  name: "content",
                  value: additionalFields.description
                });
              }
              if (additionalFields.priority) {
                body.push({
                  name: "hs_ticket_priority",
                  value: additionalFields.priority
                });
              }
              if (additionalFields.resolution) {
                body.push({
                  name: "hs_resolution",
                  value: additionalFields.resolution
                });
              }
              if (additionalFields.source) {
                body.push({
                  name: "source_type",
                  value: additionalFields.source
                });
              }
              if (additionalFields.ticketOwnerId) {
                body.push({
                  name: "hubspot_owner_id",
                  value: additionalFields.ticketOwnerId
                });
              }
              const endpoint = "/crm-objects/v1/objects/tickets";
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body);
              if (additionalFields.associatedCompanyIds) {
                const companyAssociations = [];
                for (const companyId of additionalFields.associatedCompanyIds) {
                  companyAssociations.push({
                    fromObjectId: responseData.objectId,
                    toObjectId: companyId,
                    category: "HUBSPOT_DEFINED",
                    definitionId: 26
                  });
                }
                await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "PUT",
                  "/crm-associations/v1/associations/create-batch",
                  companyAssociations
                );
              }
              if (additionalFields.associatedContactIds) {
                const contactAssociations = [];
                for (const contactId of additionalFields.associatedContactIds) {
                  contactAssociations.push({
                    fromObjectId: responseData.objectId,
                    toObjectId: contactId,
                    category: "HUBSPOT_DEFINED",
                    definitionId: 16
                  });
                }
                await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "PUT",
                  "/crm-associations/v1/associations/create-batch",
                  contactAssociations
                );
              }
            }
            if (operation === "get") {
              const ticketId = this.getNodeParameter("ticketId", i, void 0, {
                extractValue: true
              });
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.properties) {
                qs.properties = additionalFields.properties;
              }
              if (additionalFields.propertiesWithHistory) {
                qs.propertiesWithHistory = additionalFields.propertiesWithHistory.split(
                  ","
                );
              }
              if (additionalFields.includeDeleted) {
                qs.includeDeleted = additionalFields.includeDeleted;
              }
              const endpoint = `/crm-objects/v1/objects/tickets/${ticketId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {}, qs);
            }
            if (operation === "getAll") {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (additionalFields.properties) {
                qs.properties = additionalFields.properties;
              }
              if (additionalFields.propertiesWithHistory) {
                qs.propertiesWithHistory = additionalFields.propertiesWithHistory.split(
                  ","
                );
              }
              const endpoint = "/crm-objects/v1/objects/tickets/paged";
              if (returnAll) {
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "objects",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.hubspotApiRequestAllItems.call(
                  this,
                  "objects",
                  "GET",
                  endpoint,
                  {},
                  qs
                );
                responseData = responseData.splice(0, qs.limit);
              }
            }
            if (operation === "delete") {
              const ticketId = this.getNodeParameter("ticketId", i, void 0, {
                extractValue: true
              });
              const endpoint = `/crm-objects/v1/objects/tickets/${ticketId}`;
              await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", endpoint);
              responseData = responseData === void 0 ? { vid: ticketId, deleted: true } : responseData;
            }
            if (operation === "update") {
              const updateFields = this.getNodeParameter("updateFields", i);
              const ticketId = this.getNodeParameter("ticketId", i, void 0, {
                extractValue: true
              });
              const body = [];
              if (updateFields.pipelineId) {
                body.push({
                  name: "hs_pipeline",
                  value: updateFields.pipelineId
                });
              }
              if (updateFields.stageId) {
                body.push({
                  name: "hs_pipeline_stage",
                  value: updateFields.stageId
                });
              }
              if (updateFields.ticketName) {
                body.push({
                  name: "subject",
                  value: updateFields.ticketName
                });
              }
              if (updateFields.category) {
                body.push({
                  name: "hs_ticket_category",
                  value: updateFields.category
                });
              }
              if (updateFields.closeDate) {
                body.push({
                  name: "closed_date",
                  value: new Date(updateFields.createDate).getTime()
                });
              }
              if (updateFields.createDate) {
                body.push({
                  name: "createdate",
                  value: new Date(updateFields.createDate).getTime()
                });
              }
              if (updateFields.description) {
                body.push({
                  name: "content",
                  value: updateFields.description
                });
              }
              if (updateFields.priority) {
                body.push({
                  name: "hs_ticket_priority",
                  value: updateFields.priority
                });
              }
              if (updateFields.resolution) {
                body.push({
                  name: "hs_resolution",
                  value: updateFields.resolution
                });
              }
              if (updateFields.source) {
                body.push({
                  name: "source_type",
                  value: updateFields.source
                });
              }
              if (updateFields.ticketOwnerId) {
                body.push({
                  name: "hubspot_owner_id",
                  value: updateFields.ticketOwnerId
                });
              }
              const endpoint = `/crm-objects/v1/objects/tickets/${ticketId}`;
              responseData = await import_GenericFunctions.hubspotApiRequest.call(this, "PUT", endpoint, body);
              if (updateFields.associatedCompanyIds) {
                const companyAssociations = [];
                for (const companyId of updateFields.associatedCompanyIds) {
                  companyAssociations.push({
                    fromObjectId: responseData.objectId,
                    toObjectId: companyId,
                    category: "HUBSPOT_DEFINED",
                    definitionId: 26
                  });
                }
                await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "PUT",
                  "/crm-associations/v1/associations/create-batch",
                  companyAssociations
                );
              }
              if (updateFields.associatedContactIds) {
                const contactAssociations = [];
                for (const contactId of updateFields.associatedContactIds) {
                  contactAssociations.push({
                    fromObjectId: responseData.objectId,
                    toObjectId: contactId,
                    category: "HUBSPOT_DEFINED",
                    definitionId: 16
                  });
                }
                await import_GenericFunctions.hubspotApiRequest.call(
                  this,
                  "PUT",
                  "/crm-associations/v1/associations/create-batch",
                  contactAssociations
                );
              }
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } catch (errorObject) {
          const error = errorObject.cause.cause ? errorObject.cause : errorObject;
          if (error.cause.error?.validationResults && error.cause.error.validationResults[0].error === "INVALID_EMAIL") {
            const message = error.cause.error.validationResults[0].message;
            (0, import_set.default)(error, "message", message);
          }
          if (error.cause.error?.message !== "The resource you are requesting could not be found") {
            if (error.httpCode === "404" && error.description === "resource not found") {
              const message = `${error.node.parameters.resource} #${error.node.parameters[`${error.node.parameters.resource}Id`].value} could not be found. Check your ${error.node.parameters.resource} ID is correct`;
              (0, import_set.default)(error, "message", message);
            }
          }
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: error.message },
              pairedItem: { item: i }
            });
            continue;
          }
          if (error instanceof import_n8n_workflow.NodeApiError) {
            (0, import_set.default)(error, "context.itemIndex", i);
          }
          throw error;
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HubspotV2
});
//# sourceMappingURL=HubspotV2.node.js.map