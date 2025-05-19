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
var Freshservice_node_exports = {};
__export(Freshservice_node_exports, {
  Freshservice: () => Freshservice
});
module.exports = __toCommonJS(Freshservice_node_exports);
var import_moment_timezone = require("moment-timezone");
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Freshservice {
  constructor() {
    this.description = {
      displayName: "Freshservice",
      name: "freshservice",
      icon: "file:freshservice.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Freshservice API",
      defaults: {
        name: "Freshservice"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "freshserviceApi",
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
              name: "Agent",
              value: "agent"
            },
            {
              name: "Agent Group",
              value: "agentGroup"
            },
            {
              name: "Agent Role",
              value: "agentRole"
            },
            {
              name: "Announcement",
              value: "announcement"
            },
            // {
            // 	name: 'Asset',
            // 	value: 'asset',
            // },
            {
              name: "Asset Type",
              value: "assetType"
            },
            {
              name: "Change",
              value: "change"
            },
            {
              name: "Department",
              value: "department"
            },
            {
              name: "Location",
              value: "location"
            },
            {
              name: "Problem",
              value: "problem"
            },
            {
              name: "Product",
              value: "product"
            },
            {
              name: "Release",
              value: "release"
            },
            {
              name: "Requester",
              value: "requester"
            },
            {
              name: "Requester Group",
              value: "requesterGroup"
            },
            {
              name: "Software",
              value: "software"
            },
            {
              name: "Ticket",
              value: "ticket"
            }
          ],
          default: "agent"
        },
        ...import_descriptions.agentOperations,
        ...import_descriptions.agentFields,
        ...import_descriptions.agentGroupOperations,
        ...import_descriptions.agentGroupFields,
        ...import_descriptions.agentRoleOperations,
        ...import_descriptions.agentRoleFields,
        ...import_descriptions.announcementOperations,
        ...import_descriptions.announcementFields,
        // ...assetOperations,
        // ...assetFields,
        ...import_descriptions.assetTypeOperations,
        ...import_descriptions.assetTypeFields,
        ...import_descriptions.changeOperations,
        ...import_descriptions.changeFields,
        ...import_descriptions.departmentOperations,
        ...import_descriptions.departmentFields,
        ...import_descriptions.locationOperations,
        ...import_descriptions.locationFields,
        ...import_descriptions.problemOperations,
        ...import_descriptions.problemFields,
        ...import_descriptions.productOperations,
        ...import_descriptions.productFields,
        ...import_descriptions.releaseOperations,
        ...import_descriptions.releaseFields,
        ...import_descriptions.requesterOperations,
        ...import_descriptions.requesterFields,
        ...import_descriptions.requesterGroupOperations,
        ...import_descriptions.requesterGroupFields,
        ...import_descriptions.softwareOperations,
        ...import_descriptions.softwareFields,
        ...import_descriptions.ticketOperations,
        ...import_descriptions.ticketFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getAgents() {
          const { agents } = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", "/agents");
          return (0, import_GenericFunctions.toUserOptions)(agents.filter((agent) => agent.active));
        },
        async getAgentGroups() {
          const { groups } = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", "/groups");
          return (0, import_GenericFunctions.toOptions)(groups);
        },
        async getAgentRoles() {
          const { roles } = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", "/roles");
          return (0, import_GenericFunctions.toOptions)(roles);
        },
        async getAssetTypes() {
          const { asset_types } = await import_GenericFunctions.freshserviceApiRequest.call(
            this,
            "GET",
            "/asset_types"
          );
          return (0, import_GenericFunctions.toOptions)(asset_types);
        },
        async getAssetTypeFields() {
          const assetType = this.getCurrentNodeParameter("assetTypeId");
          const { asset_type_fields } = await import_GenericFunctions.freshserviceApiRequest.call(
            this,
            "GET",
            `/asset_types/${assetType}/fields`
          );
          let fields = [];
          fields = fields.concat(...asset_type_fields.map((data) => data.fields)).map((data) => ({ name: data.label, id: data.name }));
          return (0, import_GenericFunctions.toOptions)(fields);
        },
        async getDepartments() {
          const { departments } = await import_GenericFunctions.freshserviceApiRequest.call(
            this,
            "GET",
            "/departments"
          );
          return (0, import_GenericFunctions.toOptions)(departments);
        },
        async getLocations() {
          const { locations } = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", "/locations");
          return (0, import_GenericFunctions.toOptions)(locations);
        },
        async getRequesters() {
          const { requesters } = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", "/requesters");
          return (0, import_GenericFunctions.toUserOptions)(requesters);
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
        if (resource === "agent") {
          if (operation === "create") {
            const body = {
              email: this.getNodeParameter("email", i),
              first_name: this.getNodeParameter("firstName", i)
            };
            const roles = this.getNodeParameter("roles", i);
            import_GenericFunctions.validateAssignmentScopeGroup.call(this, roles);
            import_GenericFunctions.sanitizeAssignmentScopeGroup.call(this, roles);
            Object.assign(body, (0, import_GenericFunctions.adjustAgentRoles)(roles));
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/agents", body);
          } else if (operation === "delete") {
            const agentId = this.getNodeParameter("agentId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", `/agents/${agentId}`);
          } else if (operation === "get") {
            const agentId = this.getNodeParameter("agentId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", `/agents/${agentId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/agents", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const agentId = this.getNodeParameter("agentId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "PUT",
              `/agents/${agentId}`,
              body
            );
          }
        } else if (resource === "agentGroup") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/groups", body);
          } else if (operation === "delete") {
            const agentGroupId = this.getNodeParameter("agentGroupId", i);
            const endpoint = `/groups/${agentGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const agentGroupId = this.getNodeParameter("agentGroupId", i);
            const endpoint = `/groups/${agentGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/groups");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const agentGroupId = this.getNodeParameter("agentGroupId", i);
            const endpoint = `/groups/${agentGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "agentRole") {
          if (operation === "get") {
            const agentRoleId = this.getNodeParameter("agentRoleId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", `/roles/${agentRoleId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/roles");
          }
        } else if (resource === "announcement") {
          if (operation === "create") {
            const visibleFrom = this.getNodeParameter("visibleFrom", i);
            const body = {
              title: this.getNodeParameter("title", i),
              body_html: this.getNodeParameter("bodyHtml", i),
              visibility: this.getNodeParameter("visibility", i),
              visible_from: (0, import_moment_timezone.tz)(visibleFrom, defaultTimezone)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              const { visible_till, additional_emails, ...rest } = additionalFields;
              Object.assign(body, {
                ...additional_emails && { additional_emails: (0, import_GenericFunctions.toArray)(additional_emails) },
                ...visible_till && { visible_till: (0, import_moment_timezone.tz)(visible_till, defaultTimezone) },
                ...rest
              });
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/announcements", body);
          } else if (operation === "delete") {
            const announcementId = this.getNodeParameter("announcementId", i);
            const endpoint = `/announcements/${announcementId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const announcementId = this.getNodeParameter("announcementId", i);
            const endpoint = `/announcements/${announcementId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/announcements");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            const { visible_till, additional_emails, ...rest } = updateFields;
            Object.assign(body, {
              ...additional_emails && { additional_emails: (0, import_GenericFunctions.toArray)(additional_emails) },
              ...visible_till && { visible_till: (0, import_moment_timezone.tz)(visible_till, defaultTimezone) },
              ...rest
            });
            const announcementId = this.getNodeParameter("announcementId", i);
            const endpoint = `/announcements/${announcementId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "asset") {
          if (operation === "create") {
            const body = {
              asset_type_id: this.getNodeParameter("assetTypeId", i),
              name: this.getNodeParameter("name", i)
            };
            const assetFields = this.getNodeParameter(
              "assetFieldsUi.assetFieldValue",
              i,
              []
            );
            Object.assign(body, {
              type_fields: assetFields.reduce(
                (obj, value) => Object.assign(obj, { [`${value.name}`]: value.value }),
                {}
              )
            });
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/assets", body);
          } else if (operation === "delete") {
            const assetDisplayId = this.getNodeParameter("assetDisplayId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "DELETE",
              `/assets/${assetDisplayId}`
            );
          } else if (operation === "get") {
            const assetDisplayId = this.getNodeParameter("assetDisplayId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "GET",
              `/assets/${assetDisplayId}`
            );
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/assets", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const assetDisplayId = this.getNodeParameter("assetDisplayId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "PUT",
              `/assets/${assetDisplayId}`,
              body
            );
          }
        } else if (resource === "assetType") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/asset_types", body);
          } else if (operation === "delete") {
            const assetTypeId = this.getNodeParameter("assetTypeId", i);
            const endpoint = `/asset_types/${assetTypeId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const assetTypeId = this.getNodeParameter("assetTypeId", i);
            const endpoint = `/asset_types/${assetTypeId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/asset_types");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const assetTypeId = this.getNodeParameter("assetTypeId", i);
            const endpoint = `/asset_types/${assetTypeId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "change") {
          if (operation === "create") {
            const body = {
              requester_id: this.getNodeParameter("requesterId", i),
              subject: this.getNodeParameter("subject", i),
              planned_start_date: this.getNodeParameter("plannedStartDate", i),
              planned_end_date: this.getNodeParameter("plannedEndDate", i),
              status: 1,
              priority: 1,
              impact: 1,
              risk: 1,
              change_type: 1
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/changes", body);
          } else if (operation === "delete") {
            const changeId = this.getNodeParameter("changeId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "DELETE",
              `/changes/${changeId}`
            );
          } else if (operation === "get") {
            const changeId = this.getNodeParameter("changeId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", `/changes/${changeId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/changes", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const changeId = this.getNodeParameter("changeId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "PUT",
              `/changes/${changeId}`,
              body
            );
          }
        } else if (resource === "department") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              const { domains, ...rest } = additionalFields;
              Object.assign(body, {
                ...domains && { domains: (0, import_GenericFunctions.toArray)(domains) },
                ...rest
              });
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/departments", body);
          } else if (operation === "delete") {
            const departmentId = this.getNodeParameter("departmentId", i);
            const endpoint = `/departments/${departmentId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const departmentId = this.getNodeParameter("departmentId", i);
            const endpoint = `/departments/${departmentId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/departments", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            const { domains, ...rest } = updateFields;
            Object.assign(body, {
              ...domains && { domains: (0, import_GenericFunctions.toArray)(domains) },
              ...rest
            });
            const departmentId = this.getNodeParameter("departmentId", i);
            const endpoint = `/departments/${departmentId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "location") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAddress)(additionalFields));
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/locations", body);
          } else if (operation === "delete") {
            const locationId = this.getNodeParameter("locationId", i);
            const endpoint = `/locations/${locationId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const locationId = this.getNodeParameter("locationId", i);
            const endpoint = `/locations/${locationId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/locations");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, (0, import_GenericFunctions.adjustAddress)(updateFields));
            const locationId = this.getNodeParameter("locationId", i);
            const endpoint = `/locations/${locationId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "problem") {
          if (operation === "create") {
            const body = {
              subject: this.getNodeParameter("subject", i),
              requester_id: this.getNodeParameter("requesterId", i),
              due_by: this.getNodeParameter("dueBy", i),
              status: 1,
              priority: 1,
              impact: 1
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/problems", body);
          } else if (operation === "delete") {
            const problemId = this.getNodeParameter("problemId", i);
            const endpoint = `/problems/${problemId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const problemId = this.getNodeParameter("problemId", i);
            const endpoint = `/problems/${problemId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/problems");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const problemId = this.getNodeParameter("problemId", i);
            const endpoint = `/problems/${problemId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "product") {
          if (operation === "create") {
            const body = {
              asset_type_id: this.getNodeParameter("assetTypeId", i),
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/products", body);
          } else if (operation === "delete") {
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/products");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "release") {
          if (operation === "create") {
            const body = {
              subject: this.getNodeParameter("subject", i),
              release_type: this.getNodeParameter("releaseType", i),
              status: this.getNodeParameter("status", i),
              priority: this.getNodeParameter("priority", i),
              planned_start_date: this.getNodeParameter("plannedStartDate", i),
              planned_end_date: this.getNodeParameter("plannedEndDate", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/releases", body);
          } else if (operation === "delete") {
            const releaseId = this.getNodeParameter("releaseId", i);
            const endpoint = `/releases/${releaseId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const releaseId = this.getNodeParameter("releaseId", i);
            const endpoint = `/releases/${releaseId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/releases");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
            const releaseId = this.getNodeParameter("releaseId", i);
            const endpoint = `/releases/${releaseId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "requester") {
          if (operation === "create") {
            const body = {
              first_name: this.getNodeParameter("firstName", i),
              primary_email: this.getNodeParameter("primaryEmail", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              const { secondary_emails, ...rest } = additionalFields;
              Object.assign(body, {
                ...secondary_emails && { secondary_emails: (0, import_GenericFunctions.toArray)(secondary_emails) },
                ...rest
              });
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/requesters", body);
          } else if (operation === "delete") {
            const requesterId = this.getNodeParameter("requesterId", i);
            const endpoint = `/requesters/${requesterId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const requesterId = this.getNodeParameter("requesterId", i);
            const endpoint = `/requesters/${requesterId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/requesters", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            const { secondary_emails, ...rest } = updateFields;
            Object.assign(body, {
              ...secondary_emails && { secondary_emails: (0, import_GenericFunctions.toArray)(secondary_emails) },
              ...rest
            });
            const requesterId = this.getNodeParameter("requesterId", i);
            const endpoint = `/requesters/${requesterId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "requesterGroup") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "POST",
              "/requester_groups",
              body
            );
          } else if (operation === "delete") {
            const requesterGroupId = this.getNodeParameter("requesterGroupId", i);
            const endpoint = `/requester_groups/${requesterGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const requesterGroupId = this.getNodeParameter("requesterGroupId", i);
            const endpoint = `/requester_groups/${requesterGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/requester_groups");
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const requesterGroupId = this.getNodeParameter("requesterGroupId", i);
            const endpoint = `/requester_groups/${requesterGroupId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "software") {
          if (operation === "create") {
            const body = {
              application: {
                application_type: this.getNodeParameter("applicationType", i),
                name: this.getNodeParameter("name", i)
              }
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body.application, additionalFields);
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/applications", body);
          } else if (operation === "delete") {
            const softwareId = this.getNodeParameter("softwareId", i);
            const endpoint = `/applications/${softwareId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const softwareId = this.getNodeParameter("softwareId", i);
            const endpoint = `/applications/${softwareId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/applications");
          } else if (operation === "update") {
            const body = { application: {} };
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body.application, updateFields);
            const softwareId = this.getNodeParameter("softwareId", i);
            const endpoint = `/applications/${softwareId}`;
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "ticket") {
          if (operation === "create") {
            const body = {
              email: this.getNodeParameter("email", i),
              subject: this.getNodeParameter("subject", i),
              description: this.getNodeParameter("description", i),
              priority: this.getNodeParameter("priority", i),
              status: this.getNodeParameter("status", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              const { cc_emails, ...rest } = additionalFields;
              Object.assign(body, {
                ...cc_emails && { cc_emails: (0, import_GenericFunctions.toArray)(cc_emails) },
                ...rest
              });
            }
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "POST", "/tickets", body);
          } else if (operation === "delete") {
            const ticketId = this.getNodeParameter("ticketId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "DELETE",
              `/tickets/${ticketId}`
            );
          } else if (operation === "get") {
            const ticketId = this.getNodeParameter("ticketId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(this, "GET", `/tickets/${ticketId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            let endpoint = "";
            if (Object.keys(filters).length) {
              Object.assign(qs, (0, import_GenericFunctions.formatFilters)(filters));
              endpoint = "/tickets/filter";
            } else {
              endpoint = "/tickets";
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", endpoint, {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.validateUpdateFields.call(this, updateFields, resource);
            Object.assign(body, updateFields);
            const ticketId = this.getNodeParameter("ticketId", i);
            responseData = await import_GenericFunctions.freshserviceApiRequest.call(
              this,
              "PUT",
              `/tickets/${ticketId}`,
              body
            );
          }
        }
        if (operation === "delete" && !responseData) {
          responseData = { success: true };
        } else if (operation !== "getAll") {
          const special = {
            agentGroup: "group",
            agentRole: "role",
            assetType: "asset_type",
            requesterGroup: "requester_group",
            software: "application"
          };
          responseData = responseData[special[resource]] ?? responseData[resource];
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
  Freshservice
});
//# sourceMappingURL=Freshservice.node.js.map