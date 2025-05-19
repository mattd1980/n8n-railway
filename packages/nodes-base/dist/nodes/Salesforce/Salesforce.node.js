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
var Salesforce_node_exports = {};
__export(Salesforce_node_exports, {
  Salesforce: () => Salesforce
});
module.exports = __toCommonJS(Salesforce_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AccountDescription = require("./AccountDescription");
var import_AttachmentDescription = require("./AttachmentDescription");
var import_CaseDescription = require("./CaseDescription");
var import_ContactDescription = require("./ContactDescription");
var import_CustomObjectDescription = require("./CustomObjectDescription");
var import_DocumentDescription = require("./DocumentDescription");
var import_FlowDescription = require("./FlowDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_LeadDescription = require("./LeadDescription");
var import_OpportunityDescription = require("./OpportunityDescription");
var import_SearchDescription = require("./SearchDescription");
var import_TaskDescription = require("./TaskDescription");
var import_UserDescription = require("./UserDescription");
class Salesforce {
  constructor() {
    this.description = {
      displayName: "Salesforce",
      name: "salesforce",
      icon: "file:salesforce.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Salesforce API",
      defaults: {
        name: "Salesforce"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "salesforceOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        },
        {
          name: "salesforceJwtApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["jwt"]
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
              name: "OAuth2",
              value: "oAuth2"
            },
            {
              name: "OAuth2 JWT",
              value: "jwt"
            }
          ],
          default: "oAuth2",
          description: "OAuth Authorization Flow"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Account",
              value: "account",
              description: "Represents an individual account, which is an organization or person involved with your business (such as customers, competitors, and partners)"
            },
            {
              name: "Attachment",
              value: "attachment",
              description: "Represents a file that a has uploaded and attached to a parent object"
            },
            {
              name: "Case",
              value: "case",
              description: "Represents a case, which is a customer issue or problem"
            },
            {
              name: "Contact",
              value: "contact",
              description: "Represents a contact, which is an individual associated with an account"
            },
            {
              name: "Custom Object",
              value: "customObject",
              description: "Represents a custom object"
            },
            {
              name: "Document",
              value: "document",
              description: "Represents a document"
            },
            {
              name: "Flow",
              value: "flow",
              description: "Represents an autolaunched flow"
            },
            {
              name: "Lead",
              value: "lead",
              description: "Represents a prospect or potential"
            },
            {
              name: "Opportunity",
              value: "opportunity",
              description: "Represents an opportunity, which is a sale or pending deal"
            },
            {
              name: "Search",
              value: "search",
              description: "Search records"
            },
            {
              name: "Task",
              value: "task",
              description: "Represents a business activity such as making a phone call or other to-do items. In the user interface, and records are collectively referred to as activities."
            },
            {
              name: "User",
              value: "user",
              description: "Represents a person, which is one user in system"
            }
          ],
          default: "lead"
        },
        ...import_LeadDescription.leadOperations,
        ...import_LeadDescription.leadFields,
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        ...import_CustomObjectDescription.customObjectOperations,
        ...import_CustomObjectDescription.customObjectFields,
        ...import_DocumentDescription.documentOperations,
        ...import_DocumentDescription.documentFields,
        ...import_OpportunityDescription.opportunityOperations,
        ...import_OpportunityDescription.opportunityFields,
        ...import_AccountDescription.accountOperations,
        ...import_AccountDescription.accountFields,
        ...import_SearchDescription.searchOperations,
        ...import_SearchDescription.searchFields,
        ...import_CaseDescription.caseOperations,
        ...import_CaseDescription.caseFields,
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields,
        ...import_AttachmentDescription.attachmentOperations,
        ...import_AttachmentDescription.attachmentFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        ...import_FlowDescription.flowOperations,
        ...import_FlowDescription.flowFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the lead statuses to display them to user so that they can
        // select them easily
        async getLeadStatuses() {
          const returnData = [];
          const qs = {
            q: "SELECT id, MasterLabel FROM LeadStatus"
          };
          const statuses = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qs
          );
          for (const status of statuses) {
            const statusName = status.MasterLabel;
            returnData.push({
              name: statusName,
              value: statusName
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the users to display them to user so that they can
        // select them easily
        async getUsers() {
          const returnData = [];
          const qs = {
            q: "SELECT id, Name FROM User"
          };
          const users = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qs
          );
          for (const user of users) {
            const userName = user.Name;
            const userId = user.Id;
            returnData.push({
              name: userName,
              value: userId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the users and case queues to display them to user so that they can
        // select them easily
        async getCaseOwners() {
          const returnData = [];
          const qsQueues = {
            q: "SELECT Queue.Id, Queue.Name FROM QueuesObject where Queue.Type='Queue' and SobjectType = 'Case'"
          };
          const queues = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qsQueues
          );
          for (const queue of queues) {
            const queueName = queue.Queue.Name;
            const queueId = queue.Queue.Id;
            returnData.push({
              name: `Queue: ${queueName}`,
              value: queueId
            });
          }
          const qsUsers = {
            q: "SELECT id, Name FROM User"
          };
          const users = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qsUsers
          );
          const userPrefix = returnData.length > 0 ? "User: " : "";
          for (const user of users) {
            const userName = user.Name;
            const userId = user.Id;
            returnData.push({
              name: userPrefix + userName,
              value: userId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the users and lead queues to display them to user so that they can
        // select them easily
        async getLeadOwners() {
          const returnData = [];
          const qsQueues = {
            q: "SELECT Queue.Id, Queue.Name FROM QueuesObject where Queue.Type='Queue' and SobjectType = 'Lead'"
          };
          const queues = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qsQueues
          );
          for (const queue of queues) {
            const queueName = queue.Queue.Name;
            const queueId = queue.Queue.Id;
            returnData.push({
              name: `Queue: ${queueName}`,
              value: queueId
            });
          }
          const qsUsers = {
            q: "SELECT id, Name FROM User"
          };
          const users = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qsUsers
          );
          const userPrefix = returnData.length > 0 ? "User: " : "";
          for (const user of users) {
            const userName = user.Name;
            const userId = user.Id;
            returnData.push({
              name: userPrefix + userName,
              value: userId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the lead sources to display them to user so that they can
        // select them easily
        async getLeadSources() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/lead/describe");
          for (const field of fields) {
            if (field.name === "LeadSource") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the lead custom fields to display them to user so that they can
        // select them easily
        async getCustomFields() {
          const returnData = [];
          const resource = this.getNodeParameter("resource", 0);
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            `/sobjects/${resource}/describe`
          );
          for (const field of fields) {
            if (field.custom === true) {
              const fieldName = field.label;
              const fieldId = field.name;
              returnData.push({
                name: fieldName,
                value: fieldId
              });
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the record types to display them to user so that they can
        // select them easily
        async getRecordTypes() {
          const returnData = [];
          let resource = this.getNodeParameter("resource", 0);
          if (resource === "customObject") {
            resource = this.getNodeParameter("customObject", 0);
          }
          const qs = {
            q: `SELECT Id, Name, SobjectType, IsActive FROM RecordType WHERE SobjectType = '${resource}'`
          };
          const types = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qs
          );
          for (const type of types) {
            if (type.IsActive === true) {
              returnData.push({
                name: type.Name,
                value: type.Id
              });
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the external id fields to display them to user so that they can
        // select them easily
        async getExternalIdFields() {
          const returnData = [];
          let resource = this.getCurrentNodeParameter("resource");
          resource = resource === "customObject" ? this.getCurrentNodeParameter("customObject") : resource;
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            `/sobjects/${resource}/describe`
          );
          for (const field of fields) {
            if (field.externalId === true || field.idLookup === true) {
              const fieldName = field.label;
              const fieldId = field.name;
              returnData.push({
                name: fieldName,
                value: fieldId
              });
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the accounts to display them to user so that they can
        // select them easily
        async getAccounts() {
          const returnData = [];
          const qs = {
            q: "SELECT id, Name FROM Account"
          };
          const accounts = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qs
          );
          for (const account of accounts) {
            const accountName = account.Name;
            const accountId = account.Id;
            returnData.push({
              name: accountName,
              value: accountId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the campaigns to display them to user so that they can
        // select them easily
        async getCampaigns() {
          const returnData = [];
          const qs = {
            q: "SELECT id, Name FROM Campaign"
          };
          const campaigns = await import_GenericFunctions.salesforceApiRequestAllItems.call(
            this,
            "records",
            "GET",
            "/query",
            {},
            qs
          );
          for (const campaign of campaigns) {
            const campaignName = campaign.Name;
            const campaignId = campaign.Id;
            returnData.push({
              name: campaignName,
              value: campaignId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the stages to display them to user so that they can
        // select them easily
        async getStages() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/opportunity/describe"
          );
          for (const field of fields) {
            if (field.name === "StageName") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the stages to display them to user so that they can
        // select them easily
        async getAccountTypes() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/account/describe"
          );
          for (const field of fields) {
            if (field.name === "Type") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the account sources to display them to user so that they can
        // select them easily
        async getAccountSources() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/account/describe"
          );
          for (const field of fields) {
            if (field.name === "AccountSource") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case types to display them to user so that they can
        // select them easily
        async getCaseTypes() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            if (field.name === "Type") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case statuses to display them to user so that they can
        // select them easily
        async getCaseStatuses() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            if (field.name === "Status") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case reasons to display them to user so that they can
        // select them easily
        async getCaseReasons() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            if (field.name === "Reason") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case origins to display them to user so that they can
        // select them easily
        async getCaseOrigins() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            if (field.name === "Origin") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case priorities to display them to user so that they can
        // select them easily
        async getCasePriorities() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            if (field.name === "Priority") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task statuses to display them to user so that they can
        // select them easily
        async getTaskStatuses() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "Status") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task types to display them to user so that they can
        // select them easily
        async getTaskTypes() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "TaskSubtype") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task subjects to display them to user so that they can
        // select them easily
        async getTaskSubjects() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "Subject") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task call types to display them to user so that they can
        // select them easily
        async getTaskCallTypes() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "CallType") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task call priorities to display them to user so that they can
        // select them easily
        async getTaskPriorities() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "Priority") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task recurrence types to display them to user so that they can
        // select them easily
        async getTaskRecurrenceTypes() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "RecurrenceType") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the task recurrence instances to display them to user so that they can
        // select them easily
        async getTaskRecurrenceInstances() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            if (field.name === "RecurrenceInstance") {
              for (const pickValue of field.picklistValues) {
                const pickValueName = pickValue.label;
                const pickValueId = pickValue.value;
                returnData.push({
                  name: pickValueName,
                  value: pickValueId
                });
              }
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the custom objects recurrence instances to display them to user so that they can
        // select them easily
        async getCustomObjects() {
          const returnData = [];
          const { sobjects: objects } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects");
          for (const object of objects) {
            if (object.custom === true) {
              const objectName = object.label;
              const objectId = object.name;
              returnData.push({
                name: objectName,
                value: objectId
              });
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the custom objects fields recurrence instances to display them to user so that they can
        // select them easily
        async getCustomObjectFields() {
          const returnData = [];
          const customObject = this.getCurrentNodeParameter("customObject");
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            `/sobjects/${customObject}/describe`
          );
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the account fields recurrence instances to display them to user so that they can
        // select them easily
        async getAccountFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/account/describe"
          );
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the attachment fields recurrence instances to display them to user so that they can
        // select them easily
        async getAtachmentFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/attachment/describe"
          );
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the case fields recurrence instances to display them to user so that they can
        // select them easily
        async getCaseFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case/describe");
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the lead fields recurrence instances to display them to user so that they can
        // select them easily
        async getLeadFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/lead/describe");
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the opportunity fields recurrence instances to display them to user so that they can
        // select them easily
        async getOpportunityFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/opportunity/describe"
          );
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the opportunity fields recurrence instances to display them to user so that they can
        // select them easily
        async getTaskFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task/describe");
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the users fields recurrence instances to display them to user so that they can
        // select them easily
        async getUserFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/user/describe");
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        },
        // Get all the contact fields recurrence instances to display them to user so that they can
        // select them easily
        async getContactFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.salesforceApiRequest.call(
            this,
            "GET",
            "/sobjects/contact/describe"
          );
          for (const field of fields) {
            const fieldName = field.label;
            const fieldId = field.name;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        }
        // // Get all folders to display them to user so that they can
        // // select them easily
        // async getFolders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        // 	const returnData: INodePropertyOptions[] = [];
        // 	const fields = await salesforceApiRequestAllItems.call(this, 'records', 'GET', '/sobjects/folder/describe');
        // 	this.logger.debug(JSON.stringify(fields, undefined, 2))
        // 	const qs = {
        // 		//ContentFolderItem ContentWorkspace ContentFolder
        // 		q: `SELECT Id, Title FROM ContentVersion`,
        // 		//q: `SELECT Id FROM Folder where Type = 'Document'`,
        // 	};
        // 	const folders = await salesforceApiRequestAllItems.call(this, 'records', 'GET', '/query', {}, qs);
        // 	for (const folder of folders) {
        // 		returnData.push({
        // 			name: folder.Name,
        // 			value: folder.Id,
        // 		});
        // 	}
        // 	return returnData;
        // },
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    this.logger.debug(
      `Running "Salesforce" node named "${this.getNode.name}" resource "${resource}" operation "${operation}"`
    );
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "lead") {
          if (operation === "create" || operation === "upsert") {
            const company = this.getNodeParameter("company", i);
            const lastname = this.getNodeParameter("lastname", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              Company: company,
              LastName: lastname
            };
            if (additionalFields.hasOptedOutOfEmail !== void 0) {
              body.HasOptedOutOfEmail = additionalFields.hasOptedOutOfEmail;
            }
            if (additionalFields.hasOptedOutOfFax !== void 0) {
              body.HasOptedOutOfFax = additionalFields.hasOptedOutOfFax;
            }
            if (additionalFields.email !== void 0) {
              body.Email = additionalFields.email;
            }
            if (additionalFields.city !== void 0) {
              body.City = additionalFields.city;
            }
            if (additionalFields.phone !== void 0) {
              body.Phone = additionalFields.phone;
            }
            if (additionalFields.state !== void 0) {
              body.State = additionalFields.state;
            }
            if (additionalFields.title !== void 0) {
              body.Title = additionalFields.title;
            }
            if (additionalFields.jigsaw !== void 0) {
              body.Jigsaw = additionalFields.jigsaw;
            }
            if (additionalFields.rating !== void 0) {
              body.Rating = additionalFields.rating;
            }
            if (additionalFields.status !== void 0) {
              body.Status = additionalFields.status;
            }
            if (additionalFields.street !== void 0) {
              body.Street = additionalFields.street;
            }
            if (additionalFields.country !== void 0) {
              body.Country = additionalFields.country;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.website !== void 0) {
              body.Website = additionalFields.website;
            }
            if (additionalFields.industry !== void 0) {
              body.Industry = additionalFields.industry;
            }
            if (additionalFields.fax !== void 0) {
              body.Fax = additionalFields.fax;
            }
            if (additionalFields.firstname !== void 0) {
              body.FirstName = additionalFields.firstname;
            }
            if (additionalFields.leadSource !== void 0) {
              body.LeadSource = additionalFields.leadSource;
            }
            if (additionalFields.postalCode !== void 0) {
              body.PostalCode = additionalFields.postalCode;
            }
            if (additionalFields.salutation !== void 0) {
              body.Salutation = additionalFields.salutation;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.annualRevenue !== void 0) {
              body.AnnualRevenue = additionalFields.annualRevenue;
            }
            if (additionalFields.isUnreadByOwner !== void 0) {
              body.IsUnreadByOwner = additionalFields.isUnreadByOwner;
            }
            if (additionalFields.numberOfEmployees !== void 0) {
              body.NumberOfEmployees = additionalFields.numberOfEmployees;
            }
            if (additionalFields.mobilePhone !== void 0) {
              body.MobilePhone = additionalFields.mobilePhone;
            }
            if (additionalFields.recordTypeId !== void 0) {
              body.RecordTypeId = additionalFields.recordTypeId;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            let endpoint = "/sobjects/lead";
            let method = "POST";
            if (operation === "upsert") {
              method = "PATCH";
              const externalId = this.getNodeParameter("externalId", 0);
              const externalIdValue = this.getNodeParameter("externalIdValue", i);
              endpoint = `/sobjects/lead/${externalId}/${externalIdValue}`;
              if (body[externalId] !== void 0) {
                delete body[externalId];
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, method, endpoint, body);
          }
          if (operation === "update") {
            const leadId = this.getNodeParameter("leadId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (!Object.keys(updateFields).length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "You must add at least one update field",
                { itemIndex: i }
              );
            }
            if (updateFields.hasOptedOutOfEmail !== void 0) {
              body.HasOptedOutOfEmail = updateFields.hasOptedOutOfEmail;
            }
            if (updateFields.hasOptedOutOfFax !== void 0) {
              body.hasOptedOutOfFax = updateFields.hasOptedOutOfFax;
            }
            if (updateFields.lastname !== void 0) {
              body.LastName = updateFields.lastname;
            }
            if (updateFields.company !== void 0) {
              body.Company = updateFields.company;
            }
            if (updateFields.email !== void 0) {
              body.Email = updateFields.email;
            }
            if (updateFields.city !== void 0) {
              body.City = updateFields.city;
            }
            if (updateFields.phone !== void 0) {
              body.Phone = updateFields.phone;
            }
            if (updateFields.state !== void 0) {
              body.State = updateFields.state;
            }
            if (updateFields.title !== void 0) {
              body.Title = updateFields.title;
            }
            if (updateFields.jigsaw !== void 0) {
              body.Jigsaw = updateFields.jigsaw;
            }
            if (updateFields.rating !== void 0) {
              body.Rating = updateFields.rating;
            }
            if (updateFields.status !== void 0) {
              body.Status = updateFields.status;
            }
            if (updateFields.street !== void 0) {
              body.Street = updateFields.street;
            }
            if (updateFields.country !== void 0) {
              body.Country = updateFields.country;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.website !== void 0) {
              body.Website = updateFields.website;
            }
            if (updateFields.industry !== void 0) {
              body.Industry = updateFields.industry;
            }
            if (updateFields.firstname !== void 0) {
              body.FirstName = updateFields.firstname;
            }
            if (updateFields.fax !== void 0) {
              body.Fax = updateFields.fax;
            }
            if (updateFields.leadSource !== void 0) {
              body.LeadSource = updateFields.leadSource;
            }
            if (updateFields.postalCode !== void 0) {
              body.PostalCode = updateFields.postalCode;
            }
            if (updateFields.salutation !== void 0) {
              body.Salutation = updateFields.salutation;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.annualRevenue !== void 0) {
              body.AnnualRevenue = updateFields.annualRevenue;
            }
            if (updateFields.isUnreadByOwner !== void 0) {
              body.IsUnreadByOwner = updateFields.isUnreadByOwner;
            }
            if (updateFields.numberOfEmployees !== void 0) {
              body.NumberOfEmployees = updateFields.numberOfEmployees;
            }
            if (updateFields.mobilePhone !== void 0) {
              body.MobilePhone = updateFields.mobilePhone;
            }
            if (updateFields.recordTypeId !== void 0) {
              body.RecordTypeId = updateFields.recordTypeId;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/lead/${leadId}`,
              body
            );
          }
          if (operation === "get") {
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", `/sobjects/lead/${leadId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Lead", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Lead", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const leadId = this.getNodeParameter("leadId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/lead/${leadId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/lead");
          }
          if (operation === "addToCampaign") {
            const leadId = this.getNodeParameter("leadId", i);
            const campaignId = this.getNodeParameter("campaignId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              LeadId: leadId,
              CampaignId: campaignId
            };
            if (options.status) {
              body.Status = options.status;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              "/sobjects/CampaignMember",
              body
            );
          }
          if (operation === "addNote") {
            const leadId = this.getNodeParameter("leadId", i);
            const title = this.getNodeParameter("title", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              Title: title,
              ParentId: leadId
            };
            if (options.body) {
              body.Body = options.body;
            }
            if (options.owner) {
              body.OwnerId = options.owner;
            }
            if (options.isPrivate) {
              body.IsPrivate = options.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/note", body);
          }
        }
        if (resource === "contact") {
          if (operation === "create" || operation === "upsert") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const lastname = this.getNodeParameter("lastname", i);
            const body = {
              LastName: lastname
            };
            if (additionalFields.fax !== void 0) {
              body.Fax = additionalFields.fax;
            }
            if (additionalFields.email !== void 0) {
              body.Email = additionalFields.email;
            }
            if (additionalFields.phone !== void 0) {
              body.Phone = additionalFields.phone;
            }
            if (additionalFields.title !== void 0) {
              body.Title = additionalFields.title;
            }
            if (additionalFields.jigsaw !== void 0) {
              body.Jigsaw = additionalFields.jigsaw;
            }
            if (additionalFields.recordTypeId !== void 0) {
              body.RecordTypeId = additionalFields.recordTypeId;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.acconuntId !== void 0) {
              body.AccountId = additionalFields.acconuntId;
            }
            if (additionalFields.birthdate !== void 0) {
              body.Birthdate = additionalFields.birthdate;
            }
            if (additionalFields.firstName !== void 0) {
              body.FirstName = additionalFields.firstName;
            }
            if (additionalFields.homePhone !== void 0) {
              body.HomePhone = additionalFields.homePhone;
            }
            if (additionalFields.otherCity !== void 0) {
              body.OtherCity = additionalFields.otherCity;
            }
            if (additionalFields.department !== void 0) {
              body.Department = additionalFields.department;
            }
            if (additionalFields.leadSource !== void 0) {
              body.LeadSource = additionalFields.leadSource;
            }
            if (additionalFields.otherPhone !== void 0) {
              body.OtherPhone = additionalFields.otherPhone;
            }
            if (additionalFields.otherState !== void 0) {
              body.OtherState = additionalFields.otherState;
            }
            if (additionalFields.salutation !== void 0) {
              body.Salutation = additionalFields.salutation;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.mailingCity !== void 0) {
              body.MailingCity = additionalFields.mailingCity;
            }
            if (additionalFields.mobilePhone !== void 0) {
              body.MobilePhone = additionalFields.mobilePhone;
            }
            if (additionalFields.otherStreet !== void 0) {
              body.OtherStreet = additionalFields.otherStreet;
            }
            if (additionalFields.mailingState !== void 0) {
              body.MailingState = additionalFields.mailingState;
            }
            if (additionalFields.otherCountry !== void 0) {
              body.OtherCountry = additionalFields.otherCountry;
            }
            if (additionalFields.assistantName !== void 0) {
              body.AssistantName = additionalFields.assistantName;
            }
            if (additionalFields.mailingStreet !== void 0) {
              body.MailingStreet = additionalFields.mailingStreet;
            }
            if (additionalFields.assistantPhone !== void 0) {
              body.AssistantPhone = additionalFields.assistantPhone;
            }
            if (additionalFields.mailingCountry !== void 0) {
              body.MailingCountry = additionalFields.mailingCountry;
            }
            if (additionalFields.otherPostalCode !== void 0) {
              body.OtherPostalCode = additionalFields.otherPostalCode;
            }
            if (additionalFields.emailBouncedDate !== void 0) {
              body.EmailBouncedDate = additionalFields.emailBouncedDate;
            }
            if (additionalFields.mailingPostalCode !== void 0) {
              body.MailingPostalCode = additionalFields.mailingPostalCode;
            }
            if (additionalFields.emailBouncedReason !== void 0) {
              body.EmailBouncedReason = additionalFields.emailBouncedReason;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            let endpoint = "/sobjects/contact";
            let method = "POST";
            if (operation === "upsert") {
              method = "PATCH";
              const externalId = this.getNodeParameter("externalId", 0);
              const externalIdValue = this.getNodeParameter("externalIdValue", i);
              endpoint = `/sobjects/contact/${externalId}/${externalIdValue}`;
              if (body[externalId] !== void 0) {
                delete body[externalId];
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, method, endpoint, body);
          }
          if (operation === "update") {
            const contactId = this.getNodeParameter("contactId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (!Object.keys(updateFields).length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "You must add at least one update field",
                { itemIndex: i }
              );
            }
            if (updateFields.lastName !== void 0) {
              body.LastName = updateFields.lastName;
            }
            if (updateFields.fax !== void 0) {
              body.Fax = updateFields.fax;
            }
            if (updateFields.email !== void 0) {
              body.Email = updateFields.email;
            }
            if (updateFields.recordTypeId !== void 0) {
              body.RecordTypeId = updateFields.recordTypeId;
            }
            if (updateFields.phone !== void 0) {
              body.Phone = updateFields.phone;
            }
            if (updateFields.title !== void 0) {
              body.Title = updateFields.title;
            }
            if (updateFields.jigsaw !== void 0) {
              body.Jigsaw = updateFields.jigsaw;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.acconuntId !== void 0) {
              body.AccountId = updateFields.acconuntId;
            }
            if (updateFields.birthdate !== void 0) {
              body.Birthdate = updateFields.birthdate;
            }
            if (updateFields.firstName !== void 0) {
              body.FirstName = updateFields.firstName;
            }
            if (updateFields.homePhone !== void 0) {
              body.HomePhone = updateFields.homePhone;
            }
            if (updateFields.otherCity !== void 0) {
              body.OtherCity = updateFields.otherCity;
            }
            if (updateFields.department !== void 0) {
              body.Department = updateFields.department;
            }
            if (updateFields.leadSource !== void 0) {
              body.LeadSource = updateFields.leadSource;
            }
            if (updateFields.otherPhone !== void 0) {
              body.OtherPhone = updateFields.otherPhone;
            }
            if (updateFields.otherState !== void 0) {
              body.OtherState = updateFields.otherState;
            }
            if (updateFields.salutation !== void 0) {
              body.Salutation = updateFields.salutation;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.mailingCity !== void 0) {
              body.MailingCity = updateFields.mailingCity;
            }
            if (updateFields.mobilePhone !== void 0) {
              body.MobilePhone = updateFields.mobilePhone;
            }
            if (updateFields.otherStreet !== void 0) {
              body.OtherStreet = updateFields.otherStreet;
            }
            if (updateFields.mailingState !== void 0) {
              body.MailingState = updateFields.mailingState;
            }
            if (updateFields.otherCountry !== void 0) {
              body.OtherCountry = updateFields.otherCountry;
            }
            if (updateFields.assistantName !== void 0) {
              body.AssistantName = updateFields.assistantName;
            }
            if (updateFields.mailingStreet !== void 0) {
              body.MailingStreet = updateFields.mailingStreet;
            }
            if (updateFields.assistantPhone !== void 0) {
              body.AssistantPhone = updateFields.assistantPhone;
            }
            if (updateFields.mailingCountry !== void 0) {
              body.MailingCountry = updateFields.mailingCountry;
            }
            if (updateFields.otherPostalCode !== void 0) {
              body.OtherPostalCode = updateFields.otherPostalCode;
            }
            if (updateFields.emailBouncedDate !== void 0) {
              body.EmailBouncedDate = updateFields.emailBouncedDate;
            }
            if (updateFields.mailingPostalCode !== void 0) {
              body.MailingPostalCode = updateFields.mailingPostalCode;
            }
            if (updateFields.emailBouncedReason !== void 0) {
              body.EmailBouncedReason = updateFields.emailBouncedReason;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/contact/${contactId}`,
              body
            );
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "GET",
              `/sobjects/contact/${contactId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Contact", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Contact", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/contact/${contactId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/contact");
          }
          if (operation === "addToCampaign") {
            const contactId = this.getNodeParameter("contactId", i);
            const campaignId = this.getNodeParameter("campaignId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              ContactId: contactId,
              CampaignId: campaignId
            };
            if (options.status) {
              body.Status = options.status;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              "/sobjects/CampaignMember",
              body
            );
          }
          if (operation === "addNote") {
            const contactId = this.getNodeParameter("contactId", i);
            const title = this.getNodeParameter("title", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              Title: title,
              ParentId: contactId
            };
            if (options.body !== void 0) {
              body.Body = options.body;
            }
            if (options.owner !== void 0) {
              body.OwnerId = options.owner;
            }
            if (options.isPrivate !== void 0) {
              body.IsPrivate = options.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/note", body);
          }
        }
        if (resource === "customObject") {
          if (operation === "create" || operation === "upsert") {
            const customObject = this.getNodeParameter("customObject", i);
            const customFieldsUi = this.getNodeParameter("customFieldsUi", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {};
            if (customFieldsUi) {
              const customFields = customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            if (additionalFields.recordTypeId) {
              body.RecordTypeId = additionalFields.recordTypeId;
            }
            let endpoint = `/sobjects/${customObject}`;
            let method = "POST";
            if (operation === "upsert") {
              method = "PATCH";
              const externalId = this.getNodeParameter("externalId", 0);
              const externalIdValue = this.getNodeParameter("externalIdValue", i);
              endpoint = `/sobjects/${customObject}/${externalId}/${externalIdValue}`;
              if (body[externalId] !== void 0) {
                delete body[externalId];
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, method, endpoint, body);
          }
          if (operation === "update") {
            const recordId = this.getNodeParameter("recordId", i);
            const customObject = this.getNodeParameter("customObject", i);
            const customFieldsUi = this.getNodeParameter("customFieldsUi", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.recordTypeId) {
              body.RecordTypeId = updateFields.recordTypeId;
            }
            if (customFieldsUi) {
              const customFields = customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/${customObject}/${recordId}`,
              body
            );
          }
          if (operation === "get") {
            const customObject = this.getNodeParameter("customObject", i);
            const recordId = this.getNodeParameter("recordId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "GET",
              `/sobjects/${customObject}/${recordId}`
            );
          }
          if (operation === "getAll") {
            const customObject = this.getNodeParameter("customObject", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, customObject, returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, customObject, returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const customObject = this.getNodeParameter("customObject", i);
            const recordId = this.getNodeParameter("recordId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/${customObject}/${recordId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
        }
        if (resource === "document") {
          if (operation === "upload") {
            const title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const body = {
              entity_content: {
                Title: title,
                ContentLocation: "S"
              }
            };
            if (additionalFields.ownerId) {
              body.entity_content.ownerId = additionalFields.ownerId;
            }
            if (additionalFields.linkToObjectId) {
              body.entity_content.FirstPublishLocationId = additionalFields.linkToObjectId;
            }
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            body.entity_content.PathOnClient = `${title}.${additionalFields.fileExtension || binaryData.fileExtension}`;
            const data = {
              entity_content: {
                value: JSON.stringify(body.entity_content),
                options: {
                  contentType: "application/json"
                }
              },
              VersionData: {
                value: dataBuffer,
                options: {
                  filename: body.entity_content.PathOnClient
                }
              }
            };
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              "/sobjects/ContentVersion",
              {},
              {},
              void 0,
              { formData: data }
            );
          }
        }
        if (resource === "opportunity") {
          if (operation === "create" || operation === "upsert") {
            const name = this.getNodeParameter("name", i);
            const closeDate = this.getNodeParameter("closeDate", i);
            const stageName = this.getNodeParameter("stageName", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              Name: name,
              CloseDate: closeDate,
              StageName: stageName
            };
            if (additionalFields.type !== void 0) {
              body.Type = additionalFields.type;
            }
            if (additionalFields.amount !== void 0) {
              body.Amount = additionalFields.amount;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.nextStep !== void 0) {
              body.NextStep = additionalFields.nextStep;
            }
            if (additionalFields.accountId !== void 0) {
              body.AccountId = additionalFields.accountId;
            }
            if (additionalFields.campaignId !== void 0) {
              body.CampaignId = additionalFields.campaignId;
            }
            if (additionalFields.leadSource !== void 0) {
              body.LeadSource = additionalFields.leadSource;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.probability !== void 0) {
              body.Probability = additionalFields.probability;
            }
            if (additionalFields.pricebook2Id !== void 0) {
              body.Pricebook2Id = additionalFields.pricebook2Id;
            }
            if (additionalFields.forecastCategoryName !== void 0) {
              body.ForecastCategoryName = additionalFields.forecastCategoryName;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            let endpoint = "/sobjects/opportunity";
            let method = "POST";
            if (operation === "upsert") {
              method = "PATCH";
              const externalId = this.getNodeParameter("externalId", 0);
              const externalIdValue = this.getNodeParameter("externalIdValue", i);
              endpoint = `/sobjects/opportunity/${externalId}/${externalIdValue}`;
              if (body[externalId] !== void 0) {
                delete body[externalId];
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, method, endpoint, body);
          }
          if (operation === "update") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.name !== void 0) {
              body.Name = updateFields.name;
            }
            if (updateFields.closeDate !== void 0) {
              body.CloseDate = updateFields.closeDate;
            }
            if (updateFields.stageName !== void 0) {
              body.StageName = updateFields.stageName;
            }
            if (updateFields.type !== void 0) {
              body.Type = updateFields.type;
            }
            if (updateFields.amount !== void 0) {
              body.Amount = updateFields.amount;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.nextStep !== void 0) {
              body.NextStep = updateFields.nextStep;
            }
            if (updateFields.accountId !== void 0) {
              body.AccountId = updateFields.accountId;
            }
            if (updateFields.campaignId !== void 0) {
              body.CampaignId = updateFields.campaignId;
            }
            if (updateFields.leadSource !== void 0) {
              body.LeadSource = updateFields.leadSource;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.probability !== void 0) {
              body.Probability = updateFields.probability;
            }
            if (updateFields.pricebook2Id !== void 0) {
              body.Pricebook2Id = updateFields.pricebook2Id;
            }
            if (updateFields.forecastCategoryName !== void 0) {
              body.ForecastCategoryName = updateFields.forecastCategoryName;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/opportunity/${opportunityId}`,
              body
            );
          }
          if (operation === "get") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "GET",
              `/sobjects/opportunity/${opportunityId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Opportunity", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Opportunity", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/opportunity/${opportunityId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/opportunity");
          }
          if (operation === "addNote") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            const title = this.getNodeParameter("title", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              Title: title,
              ParentId: opportunityId
            };
            if (options.body !== void 0) {
              body.Body = options.body;
            }
            if (options.owner !== void 0) {
              body.OwnerId = options.owner;
            }
            if (options.isPrivate !== void 0) {
              body.IsPrivate = options.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/note", body);
          }
        }
        if (resource === "account") {
          if (operation === "create" || operation === "upsert") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const name = this.getNodeParameter("name", i);
            const body = {
              Name: name
            };
            if (additionalFields.fax !== void 0) {
              body.Fax = additionalFields.fax;
            }
            if (additionalFields.type !== void 0) {
              body.Type = additionalFields.type;
            }
            if (additionalFields.jigsaw !== void 0) {
              body.Jigsaw = additionalFields.jigsaw;
            }
            if (additionalFields.phone !== void 0) {
              body.Phone = additionalFields.phone;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.sicDesc !== void 0) {
              body.SicDesc = additionalFields.sicDesc;
            }
            if (additionalFields.website !== void 0) {
              body.Website = additionalFields.website;
            }
            if (additionalFields.industry !== void 0) {
              body.Industry = additionalFields.industry;
            }
            if (additionalFields.parentId !== void 0) {
              body.ParentId = additionalFields.parentId;
            }
            if (additionalFields.billingCity !== void 0) {
              body.BillingCity = additionalFields.billingCity;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.billingState !== void 0) {
              body.BillingState = additionalFields.billingState;
            }
            if (additionalFields.shippingCity !== void 0) {
              body.ShippingCity = additionalFields.shippingCity;
            }
            if (additionalFields.accountNumber !== void 0) {
              body.AccountNumber = additionalFields.accountNumber;
            }
            if (additionalFields.accountSource !== void 0) {
              body.AccountSource = additionalFields.accountSource;
            }
            if (additionalFields.annualRevenue !== void 0) {
              body.AnnualRevenue = additionalFields.annualRevenue;
            }
            if (additionalFields.billingStreet !== void 0) {
              body.BillingStreet = additionalFields.billingStreet;
            }
            if (additionalFields.shippingState !== void 0) {
              body.ShippingState = additionalFields.shippingState;
            }
            if (additionalFields.billingCountry !== void 0) {
              body.BillingCountry = additionalFields.billingCountry;
            }
            if (additionalFields.shippingStreet !== void 0) {
              body.ShippingStreet = additionalFields.shippingStreet;
            }
            if (additionalFields.shippingCountry !== void 0) {
              body.ShippingCountry = additionalFields.shippingCountry;
            }
            if (additionalFields.billingPostalCode !== void 0) {
              body.BillingPostalCode = additionalFields.billingPostalCode;
            }
            if (additionalFields.numberOfEmployees !== void 0) {
              body.NumberOfEmployees = additionalFields.numberOfEmployees;
            }
            if (additionalFields.shippingPostalCode !== void 0) {
              body.ShippingPostalCode = additionalFields.shippingPostalCode;
            }
            if (additionalFields.shippingPostalCode !== void 0) {
              body.ShippingPostalCode = additionalFields.shippingPostalCode;
            }
            if (additionalFields.recordTypeId !== void 0) {
              body.RecordTypeId = additionalFields.recordTypeId;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            let endpoint = "/sobjects/account";
            let method = "POST";
            if (operation === "upsert") {
              method = "PATCH";
              const externalId = this.getNodeParameter("externalId", 0);
              const externalIdValue = this.getNodeParameter("externalIdValue", i);
              endpoint = `/sobjects/account/${externalId}/${externalIdValue}`;
              if (body[externalId] !== void 0) {
                delete body[externalId];
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, method, endpoint, body);
          }
          if (operation === "update") {
            const accountId = this.getNodeParameter("accountId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.name !== void 0) {
              body.Name = updateFields.name;
            }
            if (updateFields.fax !== void 0) {
              body.Fax = updateFields.fax;
            }
            if (updateFields.type !== void 0) {
              body.Type = updateFields.type;
            }
            if (updateFields.jigsaw !== void 0) {
              body.Jigsaw = updateFields.jigsaw;
            }
            if (updateFields.phone !== void 0) {
              body.Phone = updateFields.phone;
            }
            if (updateFields.ownerId !== void 0) {
              body.OwnerId = updateFields.ownerId;
            }
            if (updateFields.sicDesc !== void 0) {
              body.SicDesc = updateFields.sicDesc;
            }
            if (updateFields.recordTypeId !== void 0) {
              body.RecordTypeId = updateFields.recordTypeId;
            }
            if (updateFields.website !== void 0) {
              body.Website = updateFields.website;
            }
            if (updateFields.industry !== void 0) {
              body.Industry = updateFields.industry;
            }
            if (updateFields.parentId !== void 0) {
              body.ParentId = updateFields.parentId;
            }
            if (updateFields.billingCity !== void 0) {
              body.BillingCity = updateFields.billingCity;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.billingState !== void 0) {
              body.BillingState = updateFields.billingState;
            }
            if (updateFields.shippingCity !== void 0) {
              body.ShippingCity = updateFields.shippingCity;
            }
            if (updateFields.accountNumber !== void 0) {
              body.AccountNumber = updateFields.accountNumber;
            }
            if (updateFields.accountSource !== void 0) {
              body.AccountSource = updateFields.accountSource;
            }
            if (updateFields.annualRevenue !== void 0) {
              body.AnnualRevenue = updateFields.annualRevenue;
            }
            if (updateFields.billingStreet !== void 0) {
              body.BillingStreet = updateFields.billingStreet;
            }
            if (updateFields.shippingState !== void 0) {
              body.ShippingState = updateFields.shippingState;
            }
            if (updateFields.billingCountry !== void 0) {
              body.BillingCountry = updateFields.billingCountry;
            }
            if (updateFields.shippingStreet !== void 0) {
              body.ShippingStreet = updateFields.shippingStreet;
            }
            if (updateFields.shippingCountry !== void 0) {
              body.ShippingCountry = updateFields.shippingCountry;
            }
            if (updateFields.billingPostalCode !== void 0) {
              body.BillingPostalCode = updateFields.billingPostalCode;
            }
            if (updateFields.numberOfEmployees !== void 0) {
              body.NumberOfEmployees = updateFields.numberOfEmployees;
            }
            if (updateFields.shippingPostalCode !== void 0) {
              body.ShippingPostalCode = updateFields.shippingPostalCode;
            }
            if (updateFields.shippingPostalCode !== void 0) {
              body.ShippingPostalCode = updateFields.shippingPostalCode;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/account/${accountId}`,
              body
            );
          }
          if (operation === "get") {
            const accountId = this.getNodeParameter("accountId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "GET",
              `/sobjects/account/${accountId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Account", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Account", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const accountId = this.getNodeParameter("accountId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/account/${accountId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/account");
          }
          if (operation === "addNote") {
            const accountId = this.getNodeParameter("accountId", i);
            const title = this.getNodeParameter("title", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              Title: title,
              ParentId: accountId
            };
            if (options.body !== void 0) {
              body.Body = options.body;
            }
            if (options.owner !== void 0) {
              body.OwnerId = options.owner;
            }
            if (options.isPrivate !== void 0) {
              body.IsPrivate = options.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/note", body);
          }
        }
        if (resource === "case") {
          if (operation === "create") {
            const type = this.getNodeParameter("type", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              Type: type
            };
            if (additionalFields.origin !== void 0) {
              body.Origin = additionalFields.origin;
            }
            if (additionalFields.reason !== void 0) {
              body.Reason = additionalFields.reason;
            }
            if (additionalFields.status !== void 0) {
              body.Status = additionalFields.status;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.subject !== void 0) {
              body.Subject = additionalFields.subject;
            }
            if (additionalFields.parentId !== void 0) {
              body.ParentId = additionalFields.parentId;
            }
            if (additionalFields.priority !== void 0) {
              body.Priority = additionalFields.priority;
            }
            if (additionalFields.accountId !== void 0) {
              body.AccountId = additionalFields.accountId;
            }
            if (additionalFields.contactId !== void 0) {
              body.ContactId = additionalFields.contactId;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.isEscalated !== void 0) {
              body.IsEscalated = additionalFields.isEscalated;
            }
            if (additionalFields.suppliedName !== void 0) {
              body.SuppliedName = additionalFields.suppliedName;
            }
            if (additionalFields.suppliedEmail !== void 0) {
              body.SuppliedEmail = additionalFields.suppliedEmail;
            }
            if (additionalFields.suppliedPhone !== void 0) {
              body.SuppliedPhone = additionalFields.suppliedPhone;
            }
            if (additionalFields.suppliedCompany !== void 0) {
              body.SuppliedCompany = additionalFields.suppliedCompany;
            }
            if (additionalFields.recordTypeId !== void 0) {
              body.RecordTypeId = additionalFields.recordTypeId;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/case", body);
          }
          if (operation === "update") {
            const caseId = this.getNodeParameter("caseId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.type !== void 0) {
              body.Type = updateFields.type;
            }
            if (updateFields.origin !== void 0) {
              body.Origin = updateFields.origin;
            }
            if (updateFields.reason !== void 0) {
              body.Reason = updateFields.reason;
            }
            if (updateFields.status !== void 0) {
              body.Status = updateFields.status;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.subject !== void 0) {
              body.Subject = updateFields.subject;
            }
            if (updateFields.parentId !== void 0) {
              body.ParentId = updateFields.parentId;
            }
            if (updateFields.priority !== void 0) {
              body.Priority = updateFields.priority;
            }
            if (updateFields.accountId !== void 0) {
              body.AccountId = updateFields.accountId;
            }
            if (updateFields.recordTypeId !== void 0) {
              body.RecordTypeId = updateFields.recordTypeId;
            }
            if (updateFields.contactId !== void 0) {
              body.ContactId = updateFields.contactId;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.isEscalated !== void 0) {
              body.IsEscalated = updateFields.isEscalated;
            }
            if (updateFields.suppliedName !== void 0) {
              body.SuppliedName = updateFields.suppliedName;
            }
            if (updateFields.suppliedEmail !== void 0) {
              body.SuppliedEmail = updateFields.suppliedEmail;
            }
            if (updateFields.suppliedPhone !== void 0) {
              body.SuppliedPhone = updateFields.suppliedPhone;
            }
            if (updateFields.suppliedCompany !== void 0) {
              body.SuppliedCompany = updateFields.suppliedCompany;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/case/${caseId}`,
              body
            );
          }
          if (operation === "get") {
            const caseId = this.getNodeParameter("caseId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", `/sobjects/case/${caseId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Case", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Case", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const caseId = this.getNodeParameter("caseId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/case/${caseId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/case");
          }
          if (operation === "addComment") {
            const caseId = this.getNodeParameter("caseId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              ParentId: caseId
            };
            if (options.commentBody !== void 0) {
              body.CommentBody = options.commentBody;
            }
            if (options.isPublished !== void 0) {
              body.IsPublished = options.isPublished;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              "/sobjects/casecomment",
              body
            );
          }
        }
        if (resource === "task") {
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const status = this.getNodeParameter("status", i);
            const body = {
              Status: status
            };
            if (additionalFields.type !== void 0) {
              body.TaskSubtype = additionalFields.type;
            }
            if (additionalFields.whoId !== void 0) {
              body.WhoId = additionalFields.whoId;
            }
            if (additionalFields.whatId !== void 0) {
              body.WhatId = additionalFields.whatId;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.subject !== void 0) {
              body.Subject = additionalFields.subject;
            }
            if (additionalFields.callType !== void 0) {
              body.CallType = additionalFields.callType;
            }
            if (additionalFields.priority !== void 0) {
              body.Priority = additionalFields.priority;
            }
            if (additionalFields.callObject !== void 0) {
              body.CallObject = additionalFields.callObject;
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.activityDate !== void 0) {
              body.ActivityDate = additionalFields.activityDate;
            }
            if (additionalFields.isReminderSet !== void 0) {
              body.IsReminderSet = additionalFields.isReminderSet;
            }
            if (additionalFields.recurrenceType !== void 0) {
              body.RecurrenceType = additionalFields.recurrenceType;
            }
            if (additionalFields.callDisposition !== void 0) {
              body.CallDisposition = additionalFields.callDisposition;
            }
            if (additionalFields.reminderDateTime !== void 0) {
              body.ReminderDateTime = additionalFields.reminderDateTime;
            }
            if (additionalFields.recurrenceInstance !== void 0) {
              body.RecurrenceInstance = additionalFields.recurrenceInstance;
            }
            if (additionalFields.recurrenceInterval !== void 0) {
              body.RecurrenceInterval = additionalFields.recurrenceInterval;
            }
            if (additionalFields.recurrenceDayOfMonth !== void 0) {
              body.RecurrenceDayOfMonth = additionalFields.recurrenceDayOfMonth;
            }
            if (additionalFields.callDurationInSeconds !== void 0) {
              body.CallDurationInSeconds = additionalFields.callDurationInSeconds;
            }
            if (additionalFields.recurrenceEndDateOnly !== void 0) {
              body.RecurrenceEndDateOnly = additionalFields.recurrenceEndDateOnly;
            }
            if (additionalFields.recurrenceMonthOfYear !== void 0) {
              body.RecurrenceMonthOfYear = additionalFields.recurrenceMonthOfYear;
            }
            if (additionalFields.recurrenceDayOfWeekMask !== void 0) {
              body.RecurrenceDayOfWeekMask = additionalFields.recurrenceDayOfWeekMask;
            }
            if (additionalFields.recurrenceStartDateOnly !== void 0) {
              body.RecurrenceStartDateOnly = additionalFields.recurrenceStartDateOnly;
            }
            if (additionalFields.recurrenceTimeZoneSidKey !== void 0) {
              body.RecurrenceTimeZoneSidKey = additionalFields.recurrenceTimeZoneSidKey;
            }
            if (additionalFields.recurrenceRegeneratedType !== void 0) {
              body.RecurrenceRegeneratedType = additionalFields.recurrenceRegeneratedType;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "POST", "/sobjects/task", body);
          }
          if (operation === "update") {
            const taskId = this.getNodeParameter("taskId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.type !== void 0) {
              body.TaskSubtype = updateFields.type;
            }
            if (updateFields.whoId !== void 0) {
              body.WhoId = updateFields.whoId;
            }
            if (updateFields.status !== void 0) {
              body.Status = updateFields.status;
            }
            if (updateFields.whatId !== void 0) {
              body.WhatId = updateFields.whatId;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.subject !== void 0) {
              body.Subject = updateFields.subject;
            }
            if (updateFields.callType !== void 0) {
              body.CallType = updateFields.callType;
            }
            if (updateFields.priority !== void 0) {
              body.Priority = updateFields.priority;
            }
            if (updateFields.callObject !== void 0) {
              body.CallObject = updateFields.callObject;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.activityDate !== void 0) {
              body.ActivityDate = updateFields.activityDate;
            }
            if (updateFields.isReminderSet !== void 0) {
              body.IsReminderSet = updateFields.isReminderSet;
            }
            if (updateFields.recurrenceType !== void 0) {
              body.RecurrenceType = updateFields.recurrenceType;
            }
            if (updateFields.callDisposition !== void 0) {
              body.CallDisposition = updateFields.callDisposition;
            }
            if (updateFields.reminderDateTime !== void 0) {
              body.ReminderDateTime = updateFields.reminderDateTime;
            }
            if (updateFields.recurrenceInstance !== void 0) {
              body.RecurrenceInstance = updateFields.recurrenceInstance;
            }
            if (updateFields.recurrenceInterval !== void 0) {
              body.RecurrenceInterval = updateFields.recurrenceInterval;
            }
            if (updateFields.recurrenceDayOfMonth !== void 0) {
              body.RecurrenceDayOfMonth = updateFields.recurrenceDayOfMonth;
            }
            if (updateFields.callDurationInSeconds !== void 0) {
              body.CallDurationInSeconds = updateFields.callDurationInSeconds;
            }
            if (updateFields.recurrenceEndDateOnly !== void 0) {
              body.RecurrenceEndDateOnly = updateFields.recurrenceEndDateOnly;
            }
            if (updateFields.recurrenceMonthOfYear !== void 0) {
              body.RecurrenceMonthOfYear = updateFields.recurrenceMonthOfYear;
            }
            if (updateFields.recurrenceDayOfWeekMask !== void 0) {
              body.RecurrenceDayOfWeekMask = updateFields.recurrenceDayOfWeekMask;
            }
            if (updateFields.recurrenceStartDateOnly !== void 0) {
              body.RecurrenceStartDateOnly = updateFields.recurrenceStartDateOnly;
            }
            if (updateFields.recurrenceTimeZoneSidKey !== void 0) {
              body.RecurrenceTimeZoneSidKey = updateFields.recurrenceTimeZoneSidKey;
            }
            if (updateFields.recurrenceRegeneratedType !== void 0) {
              body.RecurrenceRegeneratedType = updateFields.recurrenceRegeneratedType;
            }
            if (updateFields.customFieldsUi) {
              const customFields = updateFields.customFieldsUi.customFieldsValues;
              if (customFields) {
                for (const customField of customFields) {
                  body[customField.fieldId] = customField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/task/${taskId}`,
              body
            );
          }
          if (operation === "get") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", `/sobjects/task/${taskId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Task", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Task", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const taskId = this.getNodeParameter("taskId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/task/${taskId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/task");
          }
        }
        if (resource === "attachment") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const parentId = this.getNodeParameter("parentId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const body = {
              Name: name,
              ParentId: parentId
            };
            if (items[i].binary?.[binaryPropertyName]) {
              body.Body = items[i].binary[binaryPropertyName].data;
              body.ContentType = items[i].binary[binaryPropertyName].mimeType;
            } else {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `The property ${binaryPropertyName} does not exist`,
                { itemIndex: i }
              );
            }
            if (additionalFields.description !== void 0) {
              body.Description = additionalFields.description;
            }
            if (additionalFields.owner !== void 0) {
              body.OwnerId = additionalFields.owner;
            }
            if (additionalFields.isPrivate !== void 0) {
              body.IsPrivate = additionalFields.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              "/sobjects/attachment",
              body
            );
          }
          if (operation === "update") {
            const attachmentId = this.getNodeParameter("attachmentId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.binaryPropertyName !== void 0) {
              const binaryPropertyName = updateFields.binaryPropertyName;
              if (items[i].binary?.[binaryPropertyName]) {
                body.Body = items[i].binary[binaryPropertyName].data;
                body.ContentType = items[i].binary[binaryPropertyName].mimeType;
              } else {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  `The property ${binaryPropertyName} does not exist`,
                  { itemIndex: i }
                );
              }
            }
            if (updateFields.name !== void 0) {
              body.Name = updateFields.name;
            }
            if (updateFields.description !== void 0) {
              body.Description = updateFields.description;
            }
            if (updateFields.owner !== void 0) {
              body.OwnerId = updateFields.owner;
            }
            if (updateFields.isPrivate !== void 0) {
              body.IsPrivate = updateFields.isPrivate;
            }
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "PATCH",
              `/sobjects/attachment/${attachmentId}`,
              body
            );
          }
          if (operation === "get") {
            const attachmentId = this.getNodeParameter("attachmentId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "GET",
              `/sobjects/attachment/${attachmentId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Attachment", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "Attachment", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "delete") {
            const attachmentId = this.getNodeParameter("attachmentId", i);
            try {
              responseData = await import_GenericFunctions.salesforceApiRequest.call(
                this,
                "DELETE",
                `/sobjects/attachment/${attachmentId}`
              );
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "getSummary") {
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects/attachment");
          }
        }
        if (resource === "user") {
          if (operation === "get") {
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", `/sobjects/user/${userId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            try {
              if (returnAll) {
                qs.q = (0, import_GenericFunctions.getQuery)(options, "User", returnAll);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.q = (0, import_GenericFunctions.getQuery)(options, "User", returnAll, limit);
                responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
                  this,
                  "records",
                  "GET",
                  "/query",
                  {},
                  qs
                );
              }
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
        }
        if (resource === "flow") {
          if (operation === "invoke") {
            const apiName = this.getNodeParameter("apiName", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            let variables = {};
            if (jsonParameters) {
              variables = this.getNodeParameter("variablesJson", i);
            } else {
              const setInputVariable = this.getNodeParameter("variablesUi", i, {});
              if (setInputVariable.variablesValues !== void 0) {
                for (const inputVariableData of setInputVariable.variablesValues) {
                  variables[inputVariableData.name] = inputVariableData.value;
                }
              }
            }
            const body = {
              inputs: [variables]
            };
            responseData = await import_GenericFunctions.salesforceApiRequest.call(
              this,
              "POST",
              `/actions/custom/flow/${apiName}`,
              body
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/actions/custom/flow");
            responseData = responseData.actions;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "search") {
          if (operation === "query") {
            qs.q = this.getNodeParameter("query", i);
            responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
              this,
              "records",
              "GET",
              "/query",
              {},
              qs
            );
          }
        }
        if (!Array.isArray(responseData) && responseData === void 0) {
          responseData = {
            errors: [],
            success: true
          };
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
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
  Salesforce
});
//# sourceMappingURL=Salesforce.node.js.map