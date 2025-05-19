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
var Emelia_node_exports = {};
__export(Emelia_node_exports, {
  Emelia: () => Emelia
});
module.exports = __toCommonJS(Emelia_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_n8n_workflow = require("n8n-workflow");
var import_CampaignDescription = require("./CampaignDescription");
var import_ContactListDescription = require("./ContactListDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Emelia {
  constructor() {
    this.description = {
      displayName: "Emelia",
      name: "emelia",
      icon: "file:emelia.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Emelia API",
      defaults: {
        name: "Emelia"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "emeliaApi",
          required: true,
          testedBy: "emeliaApiTest"
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
              name: "Campaign",
              value: "campaign"
            },
            {
              name: "Contact List",
              value: "contactList"
            }
          ],
          default: "campaign",
          required: true
        },
        ...import_CampaignDescription.campaignOperations,
        ...import_CampaignDescription.campaignFields,
        ...import_ContactListDescription.contactListOperations,
        ...import_ContactListDescription.contactListFields
      ]
    };
    this.methods = {
      credentialTest: {
        emeliaApiTest: import_GenericFunctions.emeliaApiTest
      },
      loadOptions: {
        async getCampaigns() {
          return await import_GenericFunctions.loadResource.call(this, "campaign");
        },
        async getContactLists() {
          return await import_GenericFunctions.loadResource.call(this, "contactList");
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "campaign") {
          if (operation === "addContact") {
            const contact = {
              email: this.getNodeParameter("contactEmail", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(contact, additionalFields);
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi?.customFieldsValues || [];
              const data = customFields.reduce(
                (obj, value) => Object.assign(obj, { [`${value.fieldName}`]: value.value }),
                {}
              );
              Object.assign(contact, data);
              delete contact.customFieldsUi;
            }
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									mutation AddContactToCampaignHook($id: ID!, $contact: JSON!) {
										addContactToCampaignHook(id: $id, contact: $contact)
								}`,
              operationName: "AddContactToCampaignHook",
              variables: {
                id: this.getNodeParameter("campaignId", i),
                contact
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({
                contactId: responseData.data.addContactToCampaignHook
              }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              operationName: "createCampaign",
              query: `
									mutation createCampaign($name: String!) {
										createCampaign(name: $name) {
											_id
											name
											status
											createdAt
											provider
											startAt
											estimatedEnd
										}
									}`,
              variables: {
                name: this.getNodeParameter("campaignName", i)
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData.data.createCampaign),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "get") {
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									query campaign($id: ID!){
										campaign(id: $id){
											_id
											name
											status
											createdAt
											schedule{
												dailyContact
												dailyLimit
												minInterval
												maxInterval
												trackLinks
												trackOpens
												timeZone
												days
												start
												end
												eventToStopMails
											}
											provider
											startAt
											recipients{
												total_count
											}
											estimatedEnd
										}
									}`,
              operationName: "campaign",
              variables: {
                id: this.getNodeParameter("campaignId", i)
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData.data.campaign),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									query all_campaigns {
										all_campaigns {
											_id
											name
											status
											createdAt
											stats {
												mailsSent
												uniqueOpensPercent
												opens
												linkClickedPercent
												repliedPercent
												bouncedPercent
												unsubscribePercent
												progressPercent
											}
										}
									}`,
              operationName: "all_campaigns"
            });
            let campaigns = responseData.data.all_campaigns;
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              campaigns = campaigns.slice(0, limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(campaigns),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "pause") {
            await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									mutation pauseCampaign($id: ID!) {
										pauseCampaign(id: $id)
									}`,
              operationName: "pauseCampaign",
              variables: {
                id: this.getNodeParameter("campaignId", i)
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "start") {
            await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									mutation startCampaign($id: ID!) {
										startCampaign(id: $id)
									}`,
              operationName: "startCampaign",
              variables: {
                id: this.getNodeParameter("campaignId", i)
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "duplicate") {
            const options = this.getNodeParameter("options", i);
            const variables = {
              fromId: this.getNodeParameter("campaignId", i),
              name: this.getNodeParameter("campaignName", i),
              copySettings: true,
              copyMails: true,
              copyContacts: false,
              copyProvider: true,
              ...options
            };
            const {
              data: { duplicateCampaign }
            } = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									mutation duplicateCampaign(
										$fromId: ID!
										$name: String!
										$copySettings: Boolean!
										$copyMails: Boolean!
										$copyContacts: Boolean!
										$copyProvider: Boolean!
									) {
										duplicateCampaign(
											fromId: $fromId
											name: $name
											copySettings: $copySettings
											copyMails: $copyMails
											copyContacts: $copyContacts
											copyProvider: $copyProvider
										)
									}`,
              operationName: "duplicateCampaign",
              variables
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ _id: duplicateCampaign }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        } else if (resource === "contactList") {
          if (operation === "add") {
            const contact = {
              email: this.getNodeParameter("contactEmail", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(contact, additionalFields);
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi?.customFieldsValues || [];
              const data = customFields.reduce(
                (obj, value) => Object.assign(obj, { [`${value.fieldName}`]: value.value }),
                {}
              );
              Object.assign(contact, data);
              delete contact.customFieldsUi;
            }
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									mutation AddContactsToListHook($id: ID!, $contact: JSON!) {
										addContactsToListHook(id: $id, contact: $contact)
									}`,
              operationName: "AddContactsToListHook",
              variables: {
                id: this.getNodeParameter("contactListId", i),
                contact
              }
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ contactId: responseData.data.addContactsToListHook }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
              query: `
									query contact_lists{
										contact_lists{
											_id
											name
											contactCount
											fields
											usedInCampaign
										}
									}`,
              operationName: "contact_lists"
            });
            let contactLists = responseData.data.contact_lists;
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              contactLists = contactLists.slice(0, limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(contactLists),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  Emelia
});
//# sourceMappingURL=Emelia.node.js.map