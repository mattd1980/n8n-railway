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
var Zendesk_node_exports = {};
__export(Zendesk_node_exports, {
  Zendesk: () => Zendesk
});
module.exports = __toCommonJS(Zendesk_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_OrganizationDescription = require("./OrganizationDescription");
var import_TicketDescription = require("./TicketDescription");
var import_TicketFieldDescription = require("./TicketFieldDescription");
var import_UserDescription = require("./UserDescription");
class Zendesk {
  constructor() {
    this.description = {
      displayName: "Zendesk",
      name: "zendesk",
      icon: "file:zendesk.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Zendesk API",
      defaults: {
        name: "Zendesk"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "zendeskApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiToken"]
            }
          }
        },
        {
          name: "zendeskOAuth2Api",
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
              name: "API Token",
              value: "apiToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Ticket",
              value: "ticket",
              description: "Tickets are the means through which your end users (customers) communicate with agents in Zendesk Support"
            },
            {
              name: "Ticket Field",
              value: "ticketField",
              description: "Manage system and custom ticket fields"
            },
            {
              name: "User",
              value: "user",
              description: "Manage users"
            },
            {
              name: "Organization",
              value: "organization",
              description: "Manage organizations"
            }
          ],
          default: "ticket"
        },
        // TICKET
        ...import_TicketDescription.ticketOperations,
        ...import_TicketDescription.ticketFields,
        // TICKET FIELD
        ...import_TicketFieldDescription.ticketFieldOperations,
        ...import_TicketFieldDescription.ticketFieldFields,
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        // ORGANIZATION
        ...import_OrganizationDescription.organizationOperations,
        ...import_OrganizationDescription.organizationFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the custom fields to display them to user so that they can
        // select them easily
        async getCustomFields() {
          const returnData = [];
          const customFields = [
            "text",
            "textarea",
            "date",
            "integer",
            "decimal",
            "regexp",
            "multiselect",
            "tagger"
          ];
          const fields = await import_GenericFunctions.zendeskApiRequestAllItems.call(
            this,
            "ticket_fields",
            "GET",
            "/ticket_fields"
          );
          for (const field of fields) {
            if (customFields.includes(field.type)) {
              const fieldName = field.title;
              const fieldId = field.id;
              returnData.push({
                name: fieldName,
                value: fieldId
              });
            }
          }
          return returnData;
        },
        // Get all the groups to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const groups = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "groups", "GET", "/groups");
          for (const group of groups) {
            const groupName = group.name;
            const groupId = group.id;
            returnData.push({
              name: groupName,
              value: groupId
            });
          }
          return returnData;
        },
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "tags", "GET", "/tags");
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.name;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        },
        // Get all the locales to display them to user so that they can
        // select them easily
        async getLocales() {
          const returnData = [];
          const locales = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "locales", "GET", "/locales");
          for (const locale of locales) {
            const localeName = `${locale.locale} - ${locale.name}`;
            const localeId = locale.locale;
            returnData.push({
              name: localeName,
              value: localeId
            });
          }
          return returnData;
        },
        // Get all the user fields to display them to user so that they can
        // select them easily
        async getUserFields() {
          const returnData = [];
          const fields = await import_GenericFunctions.zendeskApiRequestAllItems.call(
            this,
            "user_fields",
            "GET",
            "/user_fields"
          );
          for (const field of fields) {
            const fieldName = field.title;
            const fieldId = field.key;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          return returnData;
        },
        // Get all the organization fields to display them to the user for easy selection
        async getOrganizationFields() {
          const returnData = [];
          const fields = await import_GenericFunctions.zendeskApiRequestAllItems.call(
            this,
            "organization_fields",
            "GET",
            "/organization_fields"
          );
          for (const field of fields) {
            const fieldName = field.title;
            const fieldId = field.key;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          return returnData;
        },
        async getOrganizations() {
          const returnData = [];
          const fields = await import_GenericFunctions.zendeskApiRequestAllItems.call(
            this,
            "organizations",
            "GET",
            "/organizations",
            {},
            {}
          );
          for (const field of fields) {
            returnData.push({
              name: field.name,
              value: field.id
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
    const length = items.length;
    const qs = {};
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        const resource = this.getNodeParameter("resource", 0);
        const operation = this.getNodeParameter("operation", 0);
        if (resource === "ticket") {
          if (operation === "create") {
            const description = this.getNodeParameter("description", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const comment = {
              body: description
            };
            const body = {
              comment
            };
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
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
              if (additionalFields.type) {
                body.type = additionalFields.type;
              }
              if (additionalFields.externalId) {
                body.external_id = additionalFields.externalId;
              }
              if (additionalFields.subject) {
                body.subject = additionalFields.subject;
              }
              if (additionalFields.status) {
                body.status = additionalFields.status;
              }
              if (additionalFields.recipient) {
                body.recipient = additionalFields.recipient;
              }
              if (additionalFields.group) {
                body.group_id = additionalFields.group;
              }
              if (additionalFields.tags) {
                body.tags = additionalFields.tags;
              }
              if (additionalFields.customFieldsUi) {
                body.custom_fields = additionalFields.customFieldsUi.customFieldsValues;
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "POST", "/tickets", { ticket: body });
            responseData = responseData.ticket;
          }
          if (operation === "update") {
            const ticketId = this.getNodeParameter("id", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const body = {};
            if (jsonParameters) {
              const updateFieldsJson = this.getNodeParameter("updateFieldsJson", i);
              if (updateFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(updateFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(updateFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const updateFields = this.getNodeParameter("updateFields", i);
              if (updateFields.type) {
                body.type = updateFields.type;
              }
              if (updateFields.externalId) {
                body.external_id = updateFields.externalId;
              }
              if (updateFields.subject) {
                body.subject = updateFields.subject;
              }
              if (updateFields.status) {
                body.status = updateFields.status;
              }
              if (updateFields.recipient) {
                body.recipient = updateFields.recipient;
              }
              if (updateFields.group) {
                body.group_id = updateFields.group;
              }
              if (updateFields.tags) {
                body.tags = updateFields.tags;
              }
              if (updateFields.customFieldsUi) {
                body.custom_fields = updateFields.customFieldsUi.customFieldsValues;
              }
              if (updateFields.assigneeEmail) {
                body.assignee_email = updateFields.assigneeEmail;
              }
              if (updateFields.internalNote) {
                const comment = {
                  html_body: updateFields.internalNote,
                  public: false
                };
                body.comment = comment;
              }
              if (updateFields.publicReply) {
                const comment = {
                  body: updateFields.publicReply,
                  public: true
                };
                body.comment = comment;
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "PUT", `/tickets/${ticketId}`, {
              ticket: body
            });
            responseData = responseData.ticket;
          }
          if (operation === "get") {
            const ticketType = this.getNodeParameter("ticketType", i);
            const ticketId = this.getNodeParameter("id", i);
            const endpoint = ticketType === "regular" ? `/tickets/${ticketId}` : `/suspended_tickets/${ticketId}`;
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", endpoint, {});
            responseData = responseData.ticket || responseData.suspended_ticket;
          }
          if (operation === "getAll") {
            const ticketType = this.getNodeParameter("ticketType", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            qs.query = "type:ticket";
            if (options.query) {
              qs.query += ` ${options.query}`;
            }
            if (options.status) {
              qs.query += ` status:${options.status}`;
            }
            if (options.group) {
              qs.query += ` group:${options.group}`;
            }
            if (options.sortBy) {
              qs.sort_by = options.sortBy;
            }
            if (options.sortOrder) {
              qs.sort_order = options.sortOrder;
            }
            const endpoint = ticketType === "regular" ? "/search" : "/suspended_tickets";
            const property = ticketType === "regular" ? "results" : "suspended_tickets";
            if (returnAll) {
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                property,
                "GET",
                endpoint,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.results || responseData.suspended_tickets;
            }
          }
          if (operation === "delete") {
            const ticketType = this.getNodeParameter("ticketType", i);
            const ticketId = this.getNodeParameter("id", i);
            const endpoint = ticketType === "regular" ? `/tickets/${ticketId}` : `/suspended_tickets/${ticketId}`;
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "DELETE", endpoint, {});
            responseData = { success: true };
          }
          if (operation === "recover") {
            const ticketId = this.getNodeParameter("id", i);
            try {
              responseData = await import_GenericFunctions.zendeskApiRequest.call(
                this,
                "PUT",
                `/suspended_tickets/${ticketId}/recover`,
                {}
              );
              responseData = responseData.ticket;
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
        }
        if (resource === "ticketField") {
          if (operation === "get") {
            const ticketFieldId = this.getNodeParameter("ticketFieldId", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "GET",
              `/ticket_fields/${ticketFieldId}`,
              {}
            );
            responseData = responseData.ticket_field;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                "ticket_fields",
                "GET",
                "/ticket_fields",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.limit = limit;
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                "ticket_fields",
                "GET",
                "/ticket_fields",
                {},
                qs
              );
              responseData = responseData.slice(0, limit);
            }
          }
        }
        if (resource === "user") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name
            };
            Object.assign(body, additionalFields);
            if (body.userFieldsUi) {
              const userFieldsUI = body.userFieldsUi.userFieldValues;
              if (userFieldsUI) {
                body.user_fields = {};
                for (const userField of userFieldsUI) {
                  body.user_fields[userField.field] = userField.value;
                }
                delete body.userFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "POST", "/users", { user: body });
            responseData = responseData.user;
          }
          if (operation === "update") {
            const userId = this.getNodeParameter("id", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            Object.assign(body, updateFields);
            if (body.userFieldsUi) {
              const userFieldsUI = body.userFieldsUi.userFieldValues;
              if (userFieldsUI) {
                body.user_fields = {};
                for (const userField of userFieldsUI) {
                  body.user_fields[userField.field] = userField.value;
                }
                delete body.userFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "PUT", `/users/${userId}`, {
              user: body
            });
            responseData = responseData.user;
          }
          if (operation === "get") {
            const userId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", `/users/${userId}`, {});
            responseData = responseData.user;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("filters", i);
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                "users",
                "GET",
                "/users",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", "/users", {}, qs);
              responseData = responseData.users;
            }
          }
          if (operation === "getOrganizations") {
            const userId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "GET",
              `/users/${userId}/organizations`,
              {}
            );
            responseData = responseData.organizations;
          }
          if (operation === "search") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("filters", i);
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                "users",
                "GET",
                "/users/search",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", "/users/search", {}, qs);
              responseData = responseData.users;
            }
          }
          if (operation === "delete") {
            const userId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "DELETE", `/users/${userId}`, {});
            responseData = responseData.user;
          }
          if (operation === "getRelatedData") {
            const userId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "GET",
              `/users/${userId}/related`,
              {}
            );
            responseData = responseData.user_related;
          }
        }
        if (resource === "organization") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const body = {
              name
            };
            const { organizationFieldsUi, ...rest } = this.getNodeParameter(
              "additionalFields",
              i
            );
            Object.assign(body, rest);
            if (organizationFieldsUi?.organizationFieldValues.length) {
              const organizationFieldsUI = organizationFieldsUi.organizationFieldValues;
              if (organizationFieldsUI.length) {
                body.organization_fields = {};
                for (const organizationField of organizationFieldsUI) {
                  body.organization_fields[organizationField.field] = organizationField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "POST", "/organizations", {
              organization: body
            });
            responseData = responseData.organization;
          }
          if (operation === "delete") {
            const organizationId = this.getNodeParameter("id", i);
            await import_GenericFunctions.zendeskApiRequest.call(this, "DELETE", `/organizations/${organizationId}`, {});
            responseData = { success: true };
          }
          if (operation === "count") {
            responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", "/organizations/count", {});
            responseData = responseData.count;
          }
          if (operation === "get") {
            const organizationId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "GET",
              `/organizations/${organizationId}`,
              {}
            );
            responseData = responseData.organization;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.zendeskApiRequestAllItems.call(
                this,
                "organizations",
                "GET",
                "/organizations",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", "/organizations", {}, qs);
              responseData = responseData.organizations;
            }
          }
          if (operation === "getRelatedData") {
            const organizationId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "GET",
              `/organizations/${organizationId}/related`,
              {}
            );
            responseData = responseData.organization_related;
          }
          if (operation === "update") {
            const organizationId = this.getNodeParameter("id", i);
            const body = {};
            const { organizationFieldsUi, ...rest } = this.getNodeParameter(
              "updateFields",
              i
            );
            Object.assign(body, rest);
            if (organizationFieldsUi?.organizationFieldValues.length) {
              const organizationFieldsUI = organizationFieldsUi.organizationFieldValues;
              if (organizationFieldsUI.length) {
                body.organization_fields = {};
                for (const organizationField of organizationFieldsUI) {
                  body.organization_fields[organizationField.field] = organizationField.value;
                }
              }
            }
            responseData = await import_GenericFunctions.zendeskApiRequest.call(
              this,
              "PUT",
              `/organizations/${organizationId}`,
              { organization: body }
            );
            responseData = responseData.organization;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
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
  Zendesk
});
//# sourceMappingURL=Zendesk.node.js.map