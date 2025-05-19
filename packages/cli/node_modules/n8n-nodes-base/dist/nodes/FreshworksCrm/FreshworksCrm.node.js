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
var FreshworksCrm_node_exports = {};
__export(FreshworksCrm_node_exports, {
  FreshworksCrm: () => FreshworksCrm
});
module.exports = __toCommonJS(FreshworksCrm_node_exports);
var import_moment_timezone = require("moment-timezone");
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class FreshworksCrm {
  constructor() {
    this.description = {
      displayName: "Freshworks CRM",
      name: "freshworksCrm",
      icon: "file:freshworksCrm.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Freshworks CRM API",
      defaults: {
        name: "Freshworks CRM"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "freshworksCrmApi",
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
              name: "Account",
              value: "account"
            },
            {
              name: "Appointment",
              value: "appointment"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Deal",
              value: "deal"
            },
            {
              name: "Note",
              value: "note"
            },
            {
              name: "Sales Activity",
              value: "salesActivity"
            },
            {
              name: "Search",
              value: "search"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          default: "account"
        },
        ...import_descriptions.accountOperations,
        ...import_descriptions.accountFields,
        ...import_descriptions.appointmentOperations,
        ...import_descriptions.appointmentFields,
        ...import_descriptions.contactOperations,
        ...import_descriptions.contactFields,
        ...import_descriptions.dealOperations,
        ...import_descriptions.dealFields,
        ...import_descriptions.noteOperations,
        ...import_descriptions.noteFields,
        ...import_descriptions.salesActivityOperations,
        ...import_descriptions.salesActivityFields,
        ...import_descriptions.searchOperations,
        ...import_descriptions.searchFields,
        ...import_descriptions.taskOperations,
        ...import_descriptions.taskFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getAccounts() {
          const viewId = await import_GenericFunctions.getAllItemsViewId.call(this, { fromLoadOptions: true });
          const responseData = await import_GenericFunctions.handleListing.call(
            this,
            "GET",
            `/sales_accounts/view/${viewId}`
          );
          return responseData.map(({ name, id }) => ({ name, value: id }));
        },
        async getAccountViews() {
          const responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/sales_accounts/filters");
          return responseData.map(({ name, id }) => ({ name, value: id }));
        },
        async getBusinessTypes() {
          return await import_GenericFunctions.loadResource.call(this, "business_types");
        },
        async getCampaigns() {
          return await import_GenericFunctions.loadResource.call(this, "campaigns");
        },
        async getContactStatuses() {
          return await import_GenericFunctions.loadResource.call(this, "contact_statuses");
        },
        async getContactViews() {
          const responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/contacts/filters");
          return responseData.map(({ name, id }) => ({ name, value: id }));
        },
        async getCurrencies() {
          const response = await import_GenericFunctions.freshworksCrmApiRequest.call(
            this,
            "GET",
            "/selector/currencies"
          );
          const key = Object.keys(response)[0];
          return response[key].map(({ currency_code, id }) => ({ name: currency_code, value: id }));
        },
        async getDealPaymentStatuses() {
          return await import_GenericFunctions.loadResource.call(this, "deal_payment_statuses");
        },
        async getDealPipelines() {
          return await import_GenericFunctions.loadResource.call(this, "deal_pipelines");
        },
        async getDealProducts() {
          return await import_GenericFunctions.loadResource.call(this, "deal_products");
        },
        async getDealReasons() {
          return await import_GenericFunctions.loadResource.call(this, "deal_reasons");
        },
        async getDealStages() {
          return await import_GenericFunctions.loadResource.call(this, "deal_stages");
        },
        async getDealTypes() {
          return await import_GenericFunctions.loadResource.call(this, "deal_types");
        },
        async getDealViews() {
          const responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/deals/filters");
          return responseData.map(({ name, id }) => ({ name, value: id }));
        },
        async getIndustryTypes() {
          return await import_GenericFunctions.loadResource.call(this, "industry_types");
        },
        async getLifecycleStages() {
          return await import_GenericFunctions.loadResource.call(this, "lifecycle_stages");
        },
        async getOutcomes() {
          return await import_GenericFunctions.loadResource.call(this, "sales_activity_outcomes");
        },
        async getSalesActivityTypes() {
          return await import_GenericFunctions.loadResource.call(this, "sales_activity_types");
        },
        async getTerritories() {
          return await import_GenericFunctions.loadResource.call(this, "territories");
        },
        async getUsers() {
          const response = await import_GenericFunctions.freshworksCrmApiRequest.call(
            this,
            "GET",
            "/selector/owners"
          );
          const key = Object.keys(response)[0];
          return response[key].map(({ display_name, id }) => ({ name: display_name, value: id }));
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const defaultTimezone = this.getTimezone();
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "account") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(
              this,
              "POST",
              "/sales_accounts",
              body
            );
            responseData = responseData.sales_account;
          } else if (operation === "delete") {
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/sales_accounts/${accountId}`;
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/sales_accounts/${accountId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", endpoint);
            responseData = responseData.sales_account;
          } else if (operation === "getAll") {
            const view = this.getNodeParameter("view", i);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", `/sales_accounts/view/${view}`);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/sales_accounts/${accountId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.sales_account;
          }
        } else if (resource === "appointment") {
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const startDate = this.getNodeParameter("fromDate", i);
            const endDate = this.getNodeParameter("endDate", i);
            const attendees = this.getNodeParameter("attendees.attendee", i, []);
            const timezone = additionalFields.time_zone ?? defaultTimezone;
            let allDay = false;
            if (additionalFields.is_allday) {
              allDay = additionalFields.is_allday;
            }
            const start = (0, import_moment_timezone.tz)(startDate, timezone);
            const end = (0, import_moment_timezone.tz)(endDate, timezone);
            const body = {
              title: this.getNodeParameter("title", i),
              from_date: start.format(),
              end_date: allDay ? start.format() : end.format()
            };
            Object.assign(body, additionalFields);
            if (attendees.length) {
              body.appointment_attendees_attributes = (0, import_GenericFunctions.adjustAttendees)(attendees);
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/appointments", body);
            responseData = responseData.appointment;
          } else if (operation === "delete") {
            const appointmentId = this.getNodeParameter("appointmentId", i);
            const endpoint = `/appointments/${appointmentId}`;
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const appointmentId = this.getNodeParameter("appointmentId", i);
            const endpoint = `/appointments/${appointmentId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", endpoint);
            responseData = responseData.appointment;
          } else if (operation === "getAll") {
            const { filter, include } = this.getNodeParameter("filters", i);
            const qs = {};
            if (filter) {
              qs.filter = filter;
            }
            if (include) {
              qs.include = include;
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/appointments", {}, qs);
          } else if (operation === "update") {
            const updateFields = this.getNodeParameter("updateFields", i);
            const attendees = this.getNodeParameter("updateFields.attendees.attendee", i, []);
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const body = {};
            const { from_date, end_date, ...rest } = updateFields;
            const timezone = rest.time_zone ?? defaultTimezone;
            if (from_date) {
              body.from_date = (0, import_moment_timezone.tz)(from_date, timezone).format();
            }
            if (end_date) {
              body.end_date = (0, import_moment_timezone.tz)(end_date, timezone).format();
            }
            Object.assign(body, rest);
            if (attendees.length) {
              body.appointment_attendees_attributes = (0, import_GenericFunctions.adjustAttendees)(attendees);
              delete body.attendees;
            }
            const appointmentId = this.getNodeParameter("appointmentId", i);
            const endpoint = `/appointments/${appointmentId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.appointment;
          }
        } else if (resource === "contact") {
          if (operation === "create") {
            const body = {
              first_name: this.getNodeParameter("firstName", i),
              last_name: this.getNodeParameter("lastName", i),
              emails: this.getNodeParameter("emails", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccounts)(additionalFields));
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/contacts", body);
            responseData = responseData.contact;
          } else if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", endpoint);
            responseData = responseData.contact;
          } else if (operation === "getAll") {
            const view = this.getNodeParameter("view", i);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", `/contacts/view/${view}`);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccounts)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.contact;
          }
        } else if (resource === "deal") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i),
              amount: this.getNodeParameter("amount", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccounts)(additionalFields));
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/deals", body);
            responseData = responseData.deal;
          } else if (operation === "delete") {
            const dealId = this.getNodeParameter("dealId", i);
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", `/deals/${dealId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const dealId = this.getNodeParameter("dealId", i);
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", `/deals/${dealId}`);
            responseData = responseData.deal;
          } else if (operation === "getAll") {
            const view = this.getNodeParameter("view", i);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", `/deals/view/${view}`);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccounts)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const dealId = this.getNodeParameter("dealId", i);
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(
              this,
              "PUT",
              `/deals/${dealId}`,
              body
            );
            responseData = responseData.deal;
          }
        } else if (resource === "note") {
          if (operation === "create") {
            const body = {
              description: this.getNodeParameter("description", i),
              targetable_id: this.getNodeParameter("targetable_id", i),
              targetable_type: this.getNodeParameter("targetableType", i)
            };
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/notes", body);
            responseData = responseData.note;
          } else if (operation === "delete") {
            const noteId = this.getNodeParameter("noteId", i);
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", `/notes/${noteId}`);
            responseData = { success: true };
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const noteId = this.getNodeParameter("noteId", i);
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(
              this,
              "PUT",
              `/notes/${noteId}`,
              body
            );
            responseData = responseData.note;
          }
        } else if (resource === "salesActivity") {
          if (operation === "create") {
            const startDate = this.getNodeParameter("from_date", i);
            const endDate = this.getNodeParameter("end_date", i);
            const body = {
              sales_activity_type_id: this.getNodeParameter("sales_activity_type_id", i),
              title: this.getNodeParameter("title", i),
              owner_id: this.getNodeParameter("ownerId", i),
              start_date: (0, import_moment_timezone.tz)(startDate, defaultTimezone).format(),
              end_date: (0, import_moment_timezone.tz)(endDate, defaultTimezone).format(),
              targetable_type: this.getNodeParameter("targetableType", i),
              targetable_id: this.getNodeParameter("targetable_id", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/sales_activities", {
              sales_activity: body
            });
            responseData = responseData.sales_activity;
          } else if (operation === "delete") {
            const salesActivityId = this.getNodeParameter("salesActivityId", i);
            const endpoint = `/sales_activities/${salesActivityId}`;
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const salesActivityId = this.getNodeParameter("salesActivityId", i);
            const endpoint = `/sales_activities/${salesActivityId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", endpoint);
            responseData = responseData.sales_activity;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/sales_activities");
          } else if (operation === "update") {
            const updateFields = this.getNodeParameter("updateFields", i);
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const body = {};
            const { from_date, end_date, ...rest } = updateFields;
            if (from_date) {
              body.from_date = (0, import_moment_timezone.tz)(from_date, defaultTimezone).format();
            }
            if (end_date) {
              body.end_date = (0, import_moment_timezone.tz)(end_date, defaultTimezone).format();
            }
            if (Object.keys(rest).length) {
              Object.assign(body, rest);
            }
            const salesActivityId = this.getNodeParameter("salesActivityId", i);
            const endpoint = `/sales_activities/${salesActivityId}`;
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.sales_activity;
          }
        } else if (resource === "search") {
          if (operation === "query") {
            const query = this.getNodeParameter("query", i);
            let entities = this.getNodeParameter("entities", i);
            const returnAll = this.getNodeParameter("returnAll", 0, false);
            if (Array.isArray(entities)) {
              entities = entities.join(",");
            }
            const qs = {
              q: query,
              include: entities,
              per_page: 100
            };
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", "/search", {}, qs);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "lookup") {
            let searchField = this.getNodeParameter("searchField", i);
            let fieldValue = this.getNodeParameter("fieldValue", i, "");
            let entities = this.getNodeParameter("options.entities", i);
            if (Array.isArray(entities)) {
              entities = entities.join(",");
            }
            if (searchField === "customField") {
              searchField = this.getNodeParameter("customFieldName", i);
              fieldValue = this.getNodeParameter("customFieldValue", i);
            }
            const qs = {
              q: fieldValue,
              f: searchField,
              entities
            };
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", "/lookup", {}, qs);
          }
        } else if (resource === "task") {
          if (operation === "create") {
            const dueDate = this.getNodeParameter("dueDate", i);
            const body = {
              title: this.getNodeParameter("title", i),
              owner_id: this.getNodeParameter("ownerId", i),
              due_date: (0, import_moment_timezone.tz)(dueDate, defaultTimezone).format(),
              targetable_type: this.getNodeParameter("targetableType", i),
              targetable_id: this.getNodeParameter("targetable_id", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "POST", "/tasks", body);
            responseData = responseData.task;
          } else if (operation === "delete") {
            const taskId = this.getNodeParameter("taskId", i);
            await import_GenericFunctions.freshworksCrmApiRequest.call(this, "DELETE", `/tasks/${taskId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(this, "GET", `/tasks/${taskId}`);
            responseData = responseData.task;
          } else if (operation === "getAll") {
            const { filter, include } = this.getNodeParameter("filters", i);
            const qs = {
              filter: "open"
            };
            if (filter) {
              qs.filter = filter;
            }
            if (include) {
              qs.include = include;
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/tasks", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const { dueDate, ...rest } = updateFields;
            if (dueDate) {
              body.due_date = (0, import_moment_timezone.tz)(dueDate, defaultTimezone).format();
            }
            if (Object.keys(rest).length) {
              Object.assign(body, rest);
            }
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.freshworksCrmApiRequest.call(
              this,
              "PUT",
              `/tasks/${taskId}`,
              body
            );
            responseData = responseData.task;
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreshworksCrm
});
//# sourceMappingURL=FreshworksCrm.node.js.map