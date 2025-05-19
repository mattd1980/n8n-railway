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
var Harvest_node_exports = {};
__export(Harvest_node_exports, {
  Harvest: () => Harvest
});
module.exports = __toCommonJS(Harvest_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ClientDescription = require("./ClientDescription");
var import_CompanyDescription = require("./CompanyDescription");
var import_ContactDescription = require("./ContactDescription");
var import_EstimateDescription = require("./EstimateDescription");
var import_ExpenseDescription = require("./ExpenseDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_InvoiceDescription = require("./InvoiceDescription");
var import_ProjectDescription = require("./ProjectDescription");
var import_TaskDescription = require("./TaskDescription");
var import_TimeEntryDescription = require("./TimeEntryDescription");
var import_UserDescription = require("./UserDescription");
class Harvest {
  constructor() {
    this.description = {
      displayName: "Harvest",
      name: "harvest",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:harvest.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Access data on Harvest",
      defaults: {
        name: "Harvest"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "harvestApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "harvestOAuth2Api",
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
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Client",
              value: "client"
            },
            {
              name: "Company",
              value: "company"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Estimate",
              value: "estimate"
            },
            {
              name: "Expense",
              value: "expense"
            },
            {
              name: "Invoice",
              value: "invoice"
            },
            {
              name: "Project",
              value: "project"
            },
            {
              name: "Task",
              value: "task"
            },
            {
              name: "Time Entry",
              value: "timeEntry"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "task"
        },
        // operations
        ...import_ClientDescription.clientOperations,
        ...import_CompanyDescription.companyOperations,
        ...import_ContactDescription.contactOperations,
        ...import_EstimateDescription.estimateOperations,
        ...import_ExpenseDescription.expenseOperations,
        ...import_InvoiceDescription.invoiceOperations,
        ...import_ProjectDescription.projectOperations,
        ...import_TaskDescription.taskOperations,
        ...import_TimeEntryDescription.timeEntryOperations,
        ...import_UserDescription.userOperations,
        {
          displayName: "Account Name or ID",
          name: "accountId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          required: true,
          typeOptions: {
            loadOptionsMethod: "getAccounts"
          },
          default: ""
        },
        // fields
        ...import_ClientDescription.clientFields,
        ...import_ContactDescription.contactFields,
        ...import_EstimateDescription.estimateFields,
        ...import_ExpenseDescription.expenseFields,
        ...import_InvoiceDescription.invoiceFields,
        ...import_ProjectDescription.projectFields,
        ...import_TaskDescription.taskFields,
        ...import_TimeEntryDescription.timeEntryFields,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available accounts to display them to user so that they can
        // select them easily
        async getAccounts() {
          const returnData = [];
          const { accounts } = await import_GenericFunctions.harvestApiRequest.call(
            this,
            "GET",
            {},
            "",
            {},
            {},
            "https://id.getharvest.com/api/v2/accounts"
          );
          for (const account of accounts) {
            const accountName = account.name;
            const accountId = account.id;
            returnData.push({
              name: accountName,
              value: accountId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let endpoint = "";
    let requestMethod;
    let body;
    let qs;
    for (let i = 0; i < items.length; i++) {
      try {
        body = {};
        qs = {};
        if (resource === "timeEntry") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "time_entries", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "createByStartEnd") {
            requestMethod = "POST";
            endpoint = "time_entries";
            body.project_id = this.getNodeParameter("projectId", i);
            body.task_id = this.getNodeParameter("taskId", i);
            body.spent_date = this.getNodeParameter("spentDate", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "createByDuration") {
            requestMethod = "POST";
            endpoint = "time_entries";
            body.project_id = this.getNodeParameter("projectId", i);
            body.task_id = this.getNodeParameter("taskId", i);
            body.spent_date = this.getNodeParameter("spentDate", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "deleteExternal") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}/external_reference`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "restartTime") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}/restart`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "stopTime") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}/stop`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `time_entries/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "client") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `clients/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "clients", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "clients";
            body.name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `clients/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `clients/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "project") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `projects/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "projects", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "projects";
            body.client_id = this.getNodeParameter("clientId", i);
            body.name = this.getNodeParameter("name", i);
            body.is_billable = this.getNodeParameter("isBillable", i);
            body.bill_by = this.getNodeParameter("billBy", i);
            body.budget_by = this.getNodeParameter("budgetBy", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `projects/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `projects/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "user") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `users/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "users", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "me") {
            requestMethod = "GET";
            endpoint = "users/me";
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "users";
            body.first_name = this.getNodeParameter("firstName", i);
            body.last_name = this.getNodeParameter("lastName", i);
            body.email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `users/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `users/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "contact") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `contacts/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "contacts", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "contacts";
            body.client_id = this.getNodeParameter("clientId", i);
            body.first_name = this.getNodeParameter("firstName", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `contacts/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `contacts/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "company") {
          if (operation === "get") {
            requestMethod = "GET";
            endpoint = "company";
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "task") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `tasks/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "tasks", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "tasks";
            body.name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `tasks/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `tasks/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "invoice") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `invoices/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "invoices", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "invoices";
            body.client_id = this.getNodeParameter("clientId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `invoices/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `invoices/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "expense") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `expenses/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "expenses", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "expenses";
            body.project_id = this.getNodeParameter("projectId", i);
            body.expense_category_id = this.getNodeParameter("expenseCategoryId", i);
            body.spent_date = this.getNodeParameter("spentDate", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `expenses/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `expenses/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "estimate") {
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `estimates/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "getAll") {
            const responseData = await import_GenericFunctions.getAllResource.call(this, "estimates", i);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "estimates";
            body.client_id = this.getNodeParameter("clientId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "update") {
            requestMethod = "PATCH";
            const id = this.getNodeParameter("id", i);
            endpoint = `estimates/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
            const responseData = await import_GenericFunctions.harvestApiRequest.call(
              this,
              requestMethod,
              qs,
              endpoint,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `estimates/${id}`;
            const responseData = await import_GenericFunctions.harvestApiRequest.call(this, requestMethod, qs, endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The resource "${resource}" is not known!`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
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
  Harvest
});
//# sourceMappingURL=Harvest.node.js.map