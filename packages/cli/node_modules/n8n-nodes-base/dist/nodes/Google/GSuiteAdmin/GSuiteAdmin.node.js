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
var GSuiteAdmin_node_exports = {};
__export(GSuiteAdmin_node_exports, {
  GSuiteAdmin: () => GSuiteAdmin
});
module.exports = __toCommonJS(GSuiteAdmin_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DeviceDescription = require("./DeviceDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_GroupDescripion = require("./GroupDescripion");
var import_SearchFunctions = require("./SearchFunctions");
var import_UserDescription = require("./UserDescription");
class GSuiteAdmin {
  constructor() {
    this.description = {
      displayName: "Google Workspace Admin",
      name: "gSuiteAdmin",
      icon: "file:gSuiteAdmin.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Workspace Admin API",
      defaults: {
        name: "Google Workspace Admin"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gSuiteAdminOAuth2Api",
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
              name: "ChromeOS Device",
              value: "device"
            },
            {
              name: "Group",
              value: "group"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "user"
        },
        ...import_DeviceDescription.deviceOperations,
        ...import_DeviceDescription.deviceFields,
        ...import_GroupDescripion.groupOperations,
        ...import_GroupDescripion.groupFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getDomains() {
          const returnData = [];
          const domains = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "domains",
            "GET",
            "/directory/v1/customer/my_customer/domains"
          );
          for (const domain of domains) {
            const domainName = domain.domainName;
            const domainId = domain.domainName;
            returnData.push({
              name: domainName,
              value: domainId
            });
          }
          return returnData;
        },
        async getSchemas() {
          const schemas = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "schemas",
            "GET",
            "/directory/v1/customer/my_customer/schemas"
          );
          return schemas.map((schema) => ({
            name: schema.displayName || schema.schemaName,
            value: schema.schemaName
          }));
        },
        async getOrgUnits() {
          const returnData = [];
          const orgUnits = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            "/directory/v1/customer/my_customer/orgunits",
            {},
            { orgUnitPath: "/", type: "all" }
          );
          for (const unit of orgUnits.organizationUnits) {
            returnData.push({
              name: unit.name,
              value: unit.orgUnitPath
            });
          }
          return returnData;
        }
      },
      listSearch: {
        searchDevices: import_SearchFunctions.searchDevices,
        searchGroups: import_SearchFunctions.searchGroups,
        searchUsers: import_SearchFunctions.searchUsers
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      const qs = {};
      try {
        if (resource === "device") {
          if (operation === "get") {
            const deviceId = this.getNodeParameter("deviceId", i, void 0, {
              extractValue: true
            });
            const output = this.getNodeParameter("projection", 1);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/directory/v1/customer/my_customer/devices/chromeos/${deviceId}?projection=${output}`,
              {}
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const output = this.getNodeParameter("projection", 1);
            const includeChildren = this.getNodeParameter("includeChildOrgunits", i);
            const filter = this.getNodeParameter("filter", i, {});
            const sort = this.getNodeParameter("sort", i, {});
            qs.projection = output;
            qs.includeChildOrgunits = includeChildren;
            if (qs.customer === void 0) {
              qs.customer = "my_customer";
            }
            if (filter.orgUnitPath) {
              qs.orgUnitPath = filter.orgUnitPath;
            }
            if (filter.query) {
              qs.query = filter.query.trim();
            }
            if (sort.sortRules) {
              const { orderBy, sortOrder } = sort.sortRules;
              if (orderBy) {
                qs.orderBy = orderBy;
              }
              if (sortOrder) {
                qs.sortOrder = sortOrder;
              }
            }
            if (!returnAll) {
              qs.maxResults = this.getNodeParameter("limit", i);
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/directory/v1/customer/${qs.customer}/devices/chromeos/`,
              {},
              qs
            );
            if (!Array.isArray(responseData) || responseData.length === 0) {
              return [this.helpers.returnJsonArray({})];
            }
            return [this.helpers.returnJsonArray(responseData)];
          }
          if (operation === "update") {
            const deviceId = this.getNodeParameter("deviceId", i, void 0, {
              extractValue: true
            });
            const updateOptions = this.getNodeParameter("updateOptions", 1);
            Object.assign(qs, updateOptions);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              `/directory/v1/customer/my_customer/devices/chromeos/${deviceId}`,
              qs
            );
          }
          if (operation === "changeStatus") {
            const deviceId = this.getNodeParameter("deviceId", i, void 0, {
              extractValue: true
            });
            const action = this.getNodeParameter("action", 1);
            qs.action = action;
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/directory/v1/customer/my_customer/devices/chromeos/${deviceId}/action`,
              qs
            );
          }
        } else if (resource === "group") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              email
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", "/directory/v1/groups", body);
          }
          if (operation === "delete") {
            const groupId = this.getNodeParameter("groupId", i, void 0, {
              extractValue: true
            });
            await import_GenericFunctions.googleApiRequest.call(this, "DELETE", `/directory/v1/groups/${groupId}`, {});
            responseData = { success: true };
          }
          if (operation === "get") {
            const groupId = this.getNodeParameter("groupId", i, void 0, {
              extractValue: true
            });
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/directory/v1/groups/${groupId}`,
              {}
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filter = this.getNodeParameter("filter", i, {});
            const sort = this.getNodeParameter("sort", i, {});
            if (filter.customer) {
              qs.customer = filter.customer;
            }
            if (filter.domain) {
              qs.domain = filter.domain;
            }
            if (filter.query) {
              const query = filter.query.trim();
              const regex = /^(name|email):\S+$/;
              if (!regex.test(query)) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  'Invalid query format. Query must follow the format "displayName:<value>" or "email:<value>".'
                );
              }
              qs.query = query;
            }
            if (filter.userId) {
              qs.userId = filter.userId;
            }
            if (sort.sortRules) {
              const { orderBy, sortOrder } = sort.sortRules;
              if (orderBy) {
                qs.orderBy = orderBy;
              }
              if (sortOrder) {
                qs.sortOrder = sortOrder;
              }
            }
            if (!qs.customer) {
              qs.customer = "my_customer";
            }
            if (!returnAll) {
              qs.maxResults = this.getNodeParameter("limit", i);
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "groups",
                "GET",
                "/directory/v1/groups",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/directory/v1/groups",
                {},
                qs
              );
              responseData = responseData.groups || [];
            }
          }
          if (operation === "update") {
            const groupId = this.getNodeParameter("groupId", i, void 0, {
              extractValue: true
            });
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              `/directory/v1/groups/${groupId}`,
              body
            );
          }
        } else if (resource === "user") {
          if (operation === "addToGroup") {
            const groupId = this.getNodeParameter("groupId", i, void 0, {
              extractValue: true
            });
            const userId = this.getNodeParameter("userId", i, void 0, {
              extractValue: true
            });
            let userEmail;
            if (!userId.includes("@")) {
              const userDetails = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/directory/v1/users/${userId}`
              );
              userEmail = userDetails.primaryEmail;
            } else {
              userEmail = userId;
            }
            if (!userEmail) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Unable to determine the user email for adding to the group",
                { itemIndex: i }
              );
            }
            const body = {
              email: userEmail,
              role: "MEMBER"
            };
            await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/directory/v1/groups/${groupId}/members`,
              body
            );
            responseData = { added: true };
          }
          if (operation === "create") {
            const domain = this.getNodeParameter("domain", i);
            const firstName = this.getNodeParameter("firstName", i);
            const lastName = this.getNodeParameter("lastName", i);
            const password = this.getNodeParameter("password", i);
            const username = this.getNodeParameter("username", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name: {
                familyName: lastName,
                givenName: firstName
              },
              password,
              primaryEmail: `${username}@${domain}`
            };
            if (!username) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "The parameter 'Username' is empty", {
                itemIndex: i,
                description: "Please fill in the 'Username' parameter to create the user"
              });
            }
            if (additionalFields.phoneUi) {
              body.phones = additionalFields.phoneUi.phoneValues;
            }
            if (additionalFields.emailUi) {
              body.emails = additionalFields.emailUi.emailValues;
            }
            if (additionalFields.roles) {
              const roles = additionalFields.roles;
              body.roles = {
                superAdmin: roles.includes("superAdmin"),
                groupsAdmin: roles.includes("groupsAdmin"),
                groupsReader: roles.includes("groupsReader"),
                groupsEditor: roles.includes("groupsEditor"),
                userManagement: roles.includes("userManagement"),
                helpDeskAdmin: roles.includes("helpDeskAdmin"),
                servicesAdmin: roles.includes("servicesAdmin"),
                inventoryReportingAdmin: roles.includes("inventoryReportingAdmin"),
                storageAdmin: roles.includes("storageAdmin"),
                directorySyncAdmin: roles.includes("directorySyncAdmin"),
                mobileAdmin: roles.includes("mobileAdmin")
              };
            }
            if (additionalFields.customFields) {
              const customFields = additionalFields.customFields.fieldValues;
              const customSchemas = {};
              customFields.forEach((field) => {
                const { schemaName, fieldName, value } = field;
                if (!schemaName || !fieldName || !value) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid custom field data", {
                    itemIndex: i,
                    description: "Schema name, field name, and value are required."
                  });
                }
                customSchemas[schemaName] ??= {};
                customSchemas[schemaName][fieldName] = value;
              });
              if (Object.keys(customSchemas).length > 0) {
                body.customSchemas = customSchemas;
              }
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/directory/v1/users",
              body,
              qs
            );
          }
          if (operation === "delete") {
            const userId = this.getNodeParameter("userId", i, void 0, {
              extractValue: true
            });
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              `/directory/v1/users/${userId}`,
              {}
            );
            responseData = { deleted: true };
          }
          if (operation === "get") {
            const userId = this.getNodeParameter("userId", i, void 0, {
              extractValue: true
            });
            const output = this.getNodeParameter("output", i);
            const projection = this.getNodeParameter("projection", i);
            const fields = this.getNodeParameter("fields", i, []);
            if (projection) {
              qs.projection = projection;
            }
            if (projection === "custom" && qs.customFieldMask) {
              qs.customFieldMask = qs.customFieldMask.join(",");
            }
            if (output === "select") {
              if (!fields.includes("id")) {
                fields.push("id");
              }
              qs.fields = fields.join(",");
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/directory/v1/users/${userId}`,
              {},
              qs
            );
            if (output === "simplified") {
              responseData = {
                kind: responseData.kind,
                id: responseData.id,
                primaryEmail: responseData.primaryEmail,
                name: responseData.name,
                isAdmin: responseData.isAdmin,
                lastLoginTime: responseData.lastLoginTime,
                creationTime: responseData.creationTime,
                suspended: responseData.suspended
              };
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const output = this.getNodeParameter("output", i);
            const fields = this.getNodeParameter("fields", i, []);
            const projection = this.getNodeParameter("projection", i);
            const filter = this.getNodeParameter("filter", i, {});
            const sort = this.getNodeParameter("sort", i, {});
            if (filter.customer) {
              qs.customer = filter.customer;
            }
            if (filter.domain) {
              qs.domain = filter.domain;
            }
            if (filter.query) {
              qs.query = filter.query.trim();
            }
            if (filter.showDeleted) {
              qs.showDeleted = filter.showDeleted ? "true" : "false";
            }
            if (sort.sortRules) {
              const { orderBy, sortOrder } = sort.sortRules;
              if (orderBy) {
                qs.orderBy = orderBy;
              }
              if (sortOrder) {
                qs.sortOrder = sortOrder;
              }
            }
            qs.projection = projection;
            if (projection === "custom" && qs.customFieldMask) {
              qs.customFieldMask = qs.customFieldMask.join(",");
            }
            if (output === "select") {
              if (!fields.includes("id")) {
                fields.push("id");
              }
              qs.fields = `users(${fields.join(",")})`;
            }
            if (!qs.customer) {
              qs.customer = "my_customer";
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "users",
                "GET",
                "/directory/v1/users",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/directory/v1/users",
                {},
                qs
              );
              responseData = responseData.users;
            }
            if (output === "simplified") {
              responseData = responseData.map((user) => ({
                kind: user.kind,
                id: user.id,
                primaryEmail: user.primaryEmail,
                name: user.name,
                isAdmin: user.isAdmin,
                lastLoginTime: user.lastLoginTime,
                creationTime: user.creationTime,
                suspended: user.suspended
              }));
            }
          }
          if (operation === "removeFromGroup") {
            const groupId = this.getNodeParameter("groupId", i, void 0, {
              extractValue: true
            });
            const userId = this.getNodeParameter("userId", i, void 0, {
              extractValue: true
            });
            await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              `/directory/v1/groups/${groupId}/members/${userId}`
            );
            responseData = { removed: true };
          }
          if (operation === "update") {
            const userId = this.getNodeParameter("userId", i, void 0, {
              extractValue: true
            });
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.firstName) {
              body.name ??= {};
              body.name.givenName = updateFields.firstName;
            }
            if (updateFields.lastName) {
              body.name ??= {};
              body.name.familyName = updateFields.lastName;
            }
            if (updateFields.phoneUi) {
              body.phones = updateFields.phoneUi.phoneValues;
            }
            if (updateFields.emailUi) {
              body.emails = updateFields.emailUi.emailValues;
            }
            if (updateFields.primaryEmail) {
              body.primaryEmail = updateFields.primaryEmail;
            }
            if (updateFields.suspendUi) {
              body.suspended = updateFields.suspendUi;
            }
            if (updateFields.roles) {
              const roles = updateFields.roles;
              body.roles = {
                superAdmin: roles.includes("superAdmin"),
                groupsAdmin: roles.includes("groupsAdmin"),
                groupsReader: roles.includes("groupsReader"),
                groupsEditor: roles.includes("groupsEditor"),
                userManagement: roles.includes("userManagement"),
                helpDeskAdmin: roles.includes("helpDeskAdmin"),
                servicesAdmin: roles.includes("servicesAdmin"),
                inventoryReportingAdmin: roles.includes("inventoryReportingAdmin"),
                storageAdmin: roles.includes("storageAdmin"),
                directorySyncAdmin: roles.includes("directorySyncAdmin"),
                mobileAdmin: roles.includes("mobileAdmin")
              };
            }
            if (updateFields.customFields) {
              const customFields = updateFields.customFields.fieldValues;
              const customSchemas = {};
              customFields.forEach((field) => {
                const { schemaName, fieldName, value } = field;
                if (!schemaName || !fieldName || !value) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid custom field data", {
                    itemIndex: i,
                    description: "Schema name, field name, and value are required."
                  });
                }
                customSchemas[schemaName] ??= {};
                customSchemas[schemaName][fieldName] = value;
              });
              if (Object.keys(customSchemas).length > 0) {
                body.customSchemas = customSchemas;
              }
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              `/directory/v1/users/${userId}`,
              body,
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
        if (error instanceof import_n8n_workflow.NodeOperationError) {
          throw error;
        }
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({
              message: `Operation "${operation}" failed for resource "${resource}".`,
              description: error.message
            }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Operation "${operation}" failed for resource "${resource}".`,
          {
            description: `Please check the input parameters and ensure the API request is correctly formatted. Details: ${error.description}`,
            itemIndex: i
          }
        );
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GSuiteAdmin
});
//# sourceMappingURL=GSuiteAdmin.node.js.map