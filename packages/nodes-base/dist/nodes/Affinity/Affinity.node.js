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
var Affinity_node_exports = {};
__export(Affinity_node_exports, {
  Affinity: () => Affinity
});
module.exports = __toCommonJS(Affinity_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
var import_ListEntryDescription = require("./ListEntryDescription");
var import_OrganizationDescription = require("./OrganizationDescription");
var import_PersonDescription = require("./PersonDescription");
class Affinity {
  constructor() {
    this.description = {
      displayName: "Affinity",
      name: "affinity",
      icon: { light: "file:affinity.svg", dark: "file:affinity.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Affinity API",
      defaults: {
        name: "Affinity"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "affinityApi",
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
              name: "List",
              value: "list"
            },
            {
              name: "List Entry",
              value: "listEntry"
            },
            {
              name: "Organization",
              value: "organization"
            },
            {
              name: "Person",
              value: "person"
            }
          ],
          default: "organization"
        },
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields,
        ...import_ListEntryDescription.listEntryOperations,
        ...import_ListEntryDescription.listEntryFields,
        ...import_OrganizationDescription.organizationOperations,
        ...import_OrganizationDescription.organizationFields,
        ...import_PersonDescription.personOperations,
        ...import_PersonDescription.personFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available organizations to display them to user so that they can
        // select them easily
        async getOrganizations() {
          const returnData = [];
          const organizations = await import_GenericFunctions.affinityApiRequestAllItems.call(
            this,
            "organizations",
            "GET",
            "/organizations",
            {}
          );
          for (const organization of organizations) {
            const organizationName = organization.name;
            const organizationId = organization.id;
            returnData.push({
              name: organizationName,
              value: organizationId
            });
          }
          return returnData;
        },
        // Get all the available persons to display them to user so that they can
        // select them easily
        async getPersons() {
          const returnData = [];
          const persons = await import_GenericFunctions.affinityApiRequestAllItems.call(
            this,
            "persons",
            "GET",
            "/persons",
            {}
          );
          for (const person of persons) {
            let personName = `${person.first_name} ${person.last_name}`;
            if (person.primary_email !== null) {
              personName += ` (${person.primary_email})`;
            }
            const personId = person.id;
            returnData.push({
              name: personName,
              value: personId
            });
          }
          return returnData;
        },
        // Get all the available lists to display them to user so that they can
        // select them easily
        async getLists() {
          const returnData = [];
          const lists = await import_GenericFunctions.affinityApiRequest.call(this, "GET", "/lists");
          for (const list of lists) {
            returnData.push({
              name: list.name,
              value: list.id
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
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "list") {
          if (operation === "get") {
            const listId = this.getNodeParameter("listId", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", `/lists/${listId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", "/lists", {}, qs);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "listEntry") {
          if (operation === "create") {
            const listId = this.getNodeParameter("listId", i);
            const entityId = this.getNodeParameter("entityId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              entity_id: parseInt(entityId, 10)
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "POST",
              `/lists/${listId}/list-entries`,
              body
            );
          }
          if (operation === "get") {
            const listId = this.getNodeParameter("listId", i);
            const listEntryId = this.getNodeParameter("listEntryId", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "GET",
              `/lists/${listId}/list-entries/${listEntryId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const listId = this.getNodeParameter("listId", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.affinityApiRequestAllItems.call(
                this,
                "list_entries",
                "GET",
                `/lists/${listId}/list-entries`,
                {},
                qs
              );
            } else {
              qs.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.affinityApiRequest.call(
                this,
                "GET",
                `/lists/${listId}/list-entries`,
                {},
                qs
              );
              responseData = responseData.list_entries;
            }
          }
          if (operation === "delete") {
            const listId = this.getNodeParameter("listId", i);
            const listEntryId = this.getNodeParameter("listEntryId", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "DELETE",
              `/lists/${listId}/list-entries/${listEntryId}`,
              {},
              qs
            );
          }
        }
        if (resource === "person") {
          if (operation === "create") {
            const firstName = this.getNodeParameter("firstName", i);
            const lastName = this.getNodeParameter("lastName", i);
            const emails = this.getNodeParameter("emails", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              first_name: firstName,
              last_name: lastName,
              emails
            };
            if (additionalFields.organizations) {
              body.organization_ids = additionalFields.organizations;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(this, "POST", "/persons", body);
          }
          if (operation === "update") {
            const personId = this.getNodeParameter("personId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const emails = this.getNodeParameter("emails", i);
            const body = {
              emails
            };
            if (updateFields.firstName) {
              body.first_name = updateFields.firstName;
            }
            if (updateFields.lastName) {
              body.last_name = updateFields.lastName;
            }
            if (updateFields.organizations) {
              body.organization_ids = updateFields.organizations;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(this, "PUT", `/persons/${personId}`, body);
          }
          if (operation === "get") {
            const personId = this.getNodeParameter("personId", i);
            const options = this.getNodeParameter("options", i);
            if (options.withInteractionDates) {
              qs.with_interaction_dates = options.withInteractionDates;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "GET",
              `/persons/${personId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.term) {
              qs.term = options.term;
            }
            if (options.withInteractionDates) {
              qs.with_interaction_dates = options.withInteractionDates;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.affinityApiRequestAllItems.call(
                this,
                "persons",
                "GET",
                "/persons",
                {},
                qs
              );
            } else {
              qs.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", "/persons", {}, qs);
              responseData = responseData.persons;
            }
          }
          if (operation === "delete") {
            const personId = this.getNodeParameter("personId", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "DELETE",
              `/persons/${personId}`,
              {},
              qs
            );
          }
        }
        if (resource === "organization") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const domain = this.getNodeParameter("domain", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              domain
            };
            if (additionalFields.persons) {
              body.person_ids = additionalFields.persons;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(this, "POST", "/organizations", body);
          }
          if (operation === "update") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.name) {
              body.name = updateFields.name;
            }
            if (updateFields.domain) {
              body.domain = updateFields.domain;
            }
            if (updateFields.persons) {
              body.person_ids = updateFields.persons;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "PUT",
              `/organizations/${organizationId}`,
              body
            );
          }
          if (operation === "get") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const options = this.getNodeParameter("options", i);
            if (options.withInteractionDates) {
              qs.with_interaction_dates = options.withInteractionDates;
            }
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "GET",
              `/organizations/${organizationId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.term) {
              qs.term = options.term;
            }
            if (options.withInteractionDates) {
              qs.with_interaction_dates = options.withInteractionDates;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.affinityApiRequestAllItems.call(
                this,
                "organizations",
                "GET",
                "/organizations",
                {},
                qs
              );
            } else {
              qs.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", "/organizations", {}, qs);
              responseData = responseData.organizations;
            }
          }
          if (operation === "delete") {
            const organizationId = this.getNodeParameter("organizationId", i);
            responseData = await import_GenericFunctions.affinityApiRequest.call(
              this,
              "DELETE",
              `/organizations/${organizationId}`,
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
  Affinity
});
//# sourceMappingURL=Affinity.node.js.map