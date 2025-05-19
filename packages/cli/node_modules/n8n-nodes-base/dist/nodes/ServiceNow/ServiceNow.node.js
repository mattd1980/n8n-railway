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
var ServiceNow_node_exports = {};
__export(ServiceNow_node_exports, {
  ServiceNow: () => ServiceNow
});
module.exports = __toCommonJS(ServiceNow_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AttachmentDescription = require("./AttachmentDescription");
var import_BusinessServiceDescription = require("./BusinessServiceDescription");
var import_ConfigurationItemsDescription = require("./ConfigurationItemsDescription");
var import_DepartmentDescription = require("./DepartmentDescription");
var import_DictionaryDescription = require("./DictionaryDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_IncidentDescription = require("./IncidentDescription");
var import_TableRecordDescription = require("./TableRecordDescription");
var import_UserDescription = require("./UserDescription");
var import_UserGroupDescription = require("./UserGroupDescription");
var import_UserRoleDescription = require("./UserRoleDescription");
class ServiceNow {
  constructor() {
    this.description = {
      displayName: "ServiceNow",
      name: "serviceNow",
      icon: "file:servicenow.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume ServiceNow API",
      defaults: {
        name: "ServiceNow"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "serviceNowOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        },
        {
          name: "serviceNowBasicApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["basicAuth"]
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
              name: "Basic Auth",
              value: "basicAuth"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "oAuth2",
          description: "Authentication method to use"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Attachment",
              value: "attachment"
            },
            {
              name: "Business Service",
              value: "businessService"
            },
            {
              name: "Configuration Item",
              value: "configurationItems"
            },
            {
              name: "Department",
              value: "department"
            },
            {
              name: "Dictionary",
              value: "dictionary"
            },
            {
              name: "Incident",
              value: "incident"
            },
            {
              name: "Table Record",
              value: "tableRecord"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "User Group",
              value: "userGroup"
            },
            {
              name: "User Role",
              value: "userRole"
            }
          ],
          default: "user"
        },
        // ATTACHMENT SERVICE
        ...import_AttachmentDescription.attachmentOperations,
        ...import_AttachmentDescription.attachmentFields,
        // BUSINESS SERVICE
        ...import_BusinessServiceDescription.businessServiceOperations,
        ...import_BusinessServiceDescription.businessServiceFields,
        // CONFIGURATION ITEMS
        ...import_ConfigurationItemsDescription.configurationItemsOperations,
        ...import_ConfigurationItemsDescription.configurationItemsFields,
        // DEPARTMENT
        ...import_DepartmentDescription.departmentOperations,
        ...import_DepartmentDescription.departmentFields,
        // DICTIONARY
        ...import_DictionaryDescription.dictionaryOperations,
        ...import_DictionaryDescription.dictionaryFields,
        // INCIDENT
        ...import_IncidentDescription.incidentOperations,
        ...import_IncidentDescription.incidentFields,
        // TABLE RECORD
        ...import_TableRecordDescription.tableRecordOperations,
        ...import_TableRecordDescription.tableRecordFields,
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        // USER GROUP
        ...import_UserGroupDescription.userGroupOperations,
        ...import_UserGroupDescription.userGroupFields,
        // USER ROLE
        ...import_UserRoleDescription.userRoleOperations,
        ...import_UserRoleDescription.userRoleFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getTables() {
          const returnData = [];
          const response = await import_GenericFunctions.serviceNowApiRequest.call(
            this,
            "GET",
            "/now/doc/table/schema",
            {},
            {}
          );
          for (const table of response.result) {
            returnData.push({
              name: table.label,
              value: table.value,
              description: table.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        // Get all the table column to display them to user
        async getColumns() {
          const resource = this.getNodeParameter("resource", 0);
          const operation = this.getNodeParameter("operation", 0);
          const returnData = [];
          let tableName;
          if (resource === "tableRecord") {
            tableName = this.getNodeParameter("tableName");
          } else {
            tableName = (0, import_GenericFunctions.mapEndpoint)(resource, operation);
          }
          const qs = {
            sysparm_query: `name=${tableName}`,
            sysparm_fields: "column_label,element"
          };
          const response = await import_GenericFunctions.serviceNowApiRequest.call(
            this,
            "GET",
            "/now/table/sys_dictionary",
            {},
            qs
          );
          for (const column of response.result) {
            if (column.element) {
              returnData.push({
                name: column.column_label,
                value: column.element
              });
            }
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getBusinessServices() {
          const returnData = [];
          const qs = {
            sysparm_fields: "name,sys_id"
          };
          const response = await import_GenericFunctions.serviceNowApiRequest.call(
            this,
            "GET",
            "/now/table/cmdb_ci_service",
            {},
            qs
          );
          for (const column of response.result) {
            returnData.push({
              name: column.name,
              value: column.sys_id
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getUsers() {
          const returnData = [];
          const resource = this.getNodeParameter("resource", 0);
          const operation = this.getNodeParameter("operation", 0);
          const qs = {
            sysparm_fields: "sys_id,user_name"
          };
          if (resource === "incident" && operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields");
            const group = additionalFields.assignment_group;
            const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
              this,
              "GET",
              "/now/table/sys_user_grmember",
              {},
              {
                sysparm_query: `group=${group}^`
              }
            );
            for (const column of response) {
              if (column.user) {
                const responseData = await import_GenericFunctions.serviceNowApiRequest.call(
                  this,
                  "GET",
                  `/now/table/sys_user/${column.user.value}`,
                  {},
                  {}
                );
                const user = responseData.result;
                returnData.push({
                  name: user.user_name,
                  value: user.sys_id
                });
              }
            }
          } else {
            const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
              this,
              "GET",
              "/now/table/sys_user",
              {},
              qs
            );
            for (const column of response) {
              if (column.user_name) {
                returnData.push({
                  name: column.user_name,
                  value: column.sys_id
                });
              }
            }
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getAssignmentGroups() {
          const returnData = [];
          const qs = {
            sysparm_fields: "sys_id,name"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_user_group",
            {},
            qs
          );
          for (const column of response) {
            if (column.name) {
              returnData.push({
                name: column.name,
                value: column.sys_id
              });
            }
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getUserRoles() {
          const returnData = [];
          const qs = {
            sysparm_fields: "sys_id,name"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_user_role",
            {},
            qs
          );
          for (const column of response) {
            if (column.name) {
              returnData.push({
                name: column.name,
                value: column.sys_id
              });
            }
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getConfigurationItems() {
          const returnData = [];
          const qs = {
            sysparm_fields: "sys_id,name,sys_class_name"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/cmdb_ci",
            {},
            qs
          );
          for (const column of response) {
            if (column.name) {
              returnData.push({
                name: column.name,
                value: column.sys_id,
                description: column.sys_class_name
              });
            }
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getIncidentCategories() {
          const returnData = [];
          const qs = {
            sysparm_fields: "label,value",
            sysparm_query: "element=category^name=incident"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_choice",
            {},
            qs
          );
          for (const column of response) {
            returnData.push({
              name: column.label,
              value: column.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getIncidentSubcategories() {
          const returnData = [];
          const operation = this.getNodeParameter("operation");
          let category;
          if (operation === "update") {
            const updateFields = this.getNodeParameter("updateFields");
            category = updateFields.category;
          } else {
            const additionalFields = this.getNodeParameter("additionalFields");
            category = additionalFields.category;
          }
          const qs = {
            sysparm_fields: "label,value",
            sysparm_query: `name=incident^element=subcategory^dependent_value=${category}`
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_choice",
            {},
            qs
          );
          for (const column of response) {
            returnData.push({
              name: column.label,
              value: column.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getIncidentStates() {
          const returnData = [];
          const qs = {
            sysparm_fields: "label,value",
            sysparm_query: "element=state^name=incident"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_choice",
            {},
            qs
          );
          for (const column of response) {
            returnData.push({
              name: column.label,
              value: column.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getIncidentResolutionCodes() {
          const returnData = [];
          const qs = {
            sysparm_fields: "label,value",
            sysparm_query: "element=close_code^name=incident"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_choice",
            {},
            qs
          );
          for (const column of response) {
            returnData.push({
              name: column.label,
              value: column.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        },
        async getIncidentHoldReasons() {
          const returnData = [];
          const qs = {
            sysparm_fields: "label,value",
            sysparm_query: "element=hold_reason^name=incident"
          };
          const response = await import_GenericFunctions.serviceNowRequestAllItems.call(
            this,
            "GET",
            "/now/table/sys_choice",
            {},
            qs
          );
          for (const column of response) {
            returnData.push({
              name: column.label,
              value: column.value
            });
          }
          return (0, import_GenericFunctions.sortData)(returnData);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData = {};
    let qs;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "attachment") {
          if (operation === "get") {
            const attachmentsSysId = this.getNodeParameter("attachmentId", i);
            const download = this.getNodeParameter("download", i);
            const endpoint = `/now/attachment/${attachmentsSysId}`;
            const response = await import_GenericFunctions.serviceNowApiRequest.call(this, "GET", endpoint, {});
            const fileMetadata = response.result;
            responseData = {
              json: fileMetadata
            };
            if (download) {
              const outputField = this.getNodeParameter("outputField", i);
              responseData = {
                ...responseData,
                binary: {
                  [outputField]: await import_GenericFunctions.serviceNowDownloadAttachment.call(
                    this,
                    endpoint,
                    fileMetadata.file_name,
                    fileMetadata.content_type
                  )
                }
              };
            }
          } else if (operation === "getAll") {
            const download = this.getNodeParameter("download", i);
            const tableName = this.getNodeParameter("tableName", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            qs = {};
            qs.sysparm_query = `table_name=${tableName}`;
            if (options.queryFilter) {
              qs.sysparm_query = `${qs.sysparm_query}^${options.queryFilter}`;
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/attachment",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/attachment",
                {},
                qs
              );
            }
            if (download) {
              const outputField = this.getNodeParameter("outputField", i);
              const responseDataWithAttachments = [];
              for (const data of responseData) {
                responseDataWithAttachments.push({
                  json: data,
                  binary: {
                    [outputField]: await import_GenericFunctions.serviceNowDownloadAttachment.call(
                      this,
                      `/now/attachment/${data.sys_id}`,
                      data.file_name,
                      data.content_type
                    )
                  }
                });
              }
              responseData = responseDataWithAttachments;
            } else {
              responseData = responseData.map((data) => ({ json: data }));
            }
          } else if (operation === "upload") {
            const tableName = this.getNodeParameter("tableName", i);
            const recordId = this.getNodeParameter("id", i);
            const inputDataFieldName = this.getNodeParameter("inputDataFieldName", i);
            const options = this.getNodeParameter("options", i);
            const binaryData = this.helpers.assertBinaryData(i, inputDataFieldName);
            const headers = {
              "Content-Type": binaryData.mimeType
            };
            const query = {
              table_name: tableName,
              table_sys_id: recordId,
              file_name: binaryData.fileName ? binaryData.fileName : `${inputDataFieldName}.${binaryData.fileExtension}`,
              ...options
            };
            const body = await this.helpers.getBinaryDataBuffer(i, inputDataFieldName);
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "POST",
              "/now/attachment/file",
              body,
              query,
              "",
              { headers }
            );
            responseData = response.result;
          } else if (operation === "delete") {
            const attachmentsSysId = this.getNodeParameter("attachmentId", i);
            await import_GenericFunctions.serviceNowApiRequest.call(this, "DELETE", `/now/attachment/${attachmentsSysId}`);
            responseData = { success: true };
          }
        } else if (resource === "businessService") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/cmdb_ci_service",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/cmdb_ci_service",
                {},
                qs
              );
            }
          }
        } else if (resource === "configurationItems") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/cmdb_ci",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/cmdb_ci",
                {},
                qs
              );
            }
          }
        } else if (resource === "department") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/cmn_department",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/cmn_department",
                {},
                qs
              );
            }
          }
        } else if (resource === "dictionary") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/sys_dictionary",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/sys_dictionary",
                {},
                qs
              );
            }
          }
        } else if (resource === "incident") {
          if (operation === "create") {
            const shortDescription = this.getNodeParameter("short_description", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              short_description: shortDescription,
              ...additionalFields
            };
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "POST",
              "/now/table/incident",
              body
            );
            responseData = response.result;
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "DELETE",
              `/now/table/incident/${id}`
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "GET",
              `/now/table/incident/${id}`,
              {},
              qs
            );
            responseData = response.result;
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/incident",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/incident",
                {},
                qs
              );
            }
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = this.getNodeParameter("updateFields", i);
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "PATCH",
              `/now/table/incident/${id}`,
              body
            );
            responseData = response.result;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "tableRecord") {
          if (operation === "create") {
            const tableName = this.getNodeParameter("tableName", i);
            const dataToSend = this.getNodeParameter("dataToSend", i);
            let body = {};
            if (dataToSend === "mapInput") {
              const inputsToIgnore = this.getNodeParameter("inputsToIgnore", i).split(",").map((field) => field.trim());
              body = Object.entries(items[i].json).filter(([key]) => !inputsToIgnore.includes(key)).reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
            } else if (dataToSend === "columns") {
              const fieldsToSend = this.getNodeParameter("fieldsToSend", i);
              body = fieldsToSend.field.reduce((obj, field) => {
                obj[field.column] = field.value;
                return obj;
              }, {});
            }
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "POST",
              `/now/table/${tableName}`,
              body
            );
            responseData = response.result;
          } else if (operation === "delete") {
            const tableName = this.getNodeParameter("tableName", i);
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "DELETE",
              `/now/table/${tableName}/${id}`
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const tableName = this.getNodeParameter("tableName", i);
            const id = this.getNodeParameter("id", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "GET",
              `/now/table/${tableName}/${id}`,
              {},
              qs
            );
            responseData = response.result;
          } else if (operation === "getAll") {
            const tableName = this.getNodeParameter("tableName", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                `/now/table/${tableName}`,
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                `/now/table/${tableName}`,
                {},
                qs
              );
            }
          } else if (operation === "update") {
            const tableName = this.getNodeParameter("tableName", i);
            const id = this.getNodeParameter("id", i);
            const dataToSend = this.getNodeParameter("dataToSend", i);
            let body = {};
            if (dataToSend === "mapInput") {
              const inputsToIgnore = this.getNodeParameter("inputsToIgnore", i).split(",").map((field) => field.trim());
              body = Object.entries(items[i].json).filter(([key]) => !inputsToIgnore.includes(key)).reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
            } else if (dataToSend === "columns") {
              const fieldsToSend = this.getNodeParameter("fieldsToSend", i);
              body = fieldsToSend.field.reduce((obj, field) => {
                obj[field.column] = field.value;
                return obj;
              }, {});
            }
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "PATCH",
              `/now/table/${tableName}/${id}`,
              body
            );
            responseData = response.result;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "user") {
          if (operation === "create") {
            const body = this.getNodeParameter("additionalFields", i);
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "POST",
              "/now/table/sys_user",
              body
            );
            responseData = response.result;
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "DELETE",
              `/now/table/sys_user/${id}`
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const getOption = this.getNodeParameter("getOption", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (getOption === "id") {
              const id = this.getNodeParameter("id", i);
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                `/now/table/sys_user/${id}`,
                {},
                qs
              );
              responseData = response.result;
            } else {
              const userName = this.getNodeParameter("user_name", i);
              qs.sysparm_query = `user_name=${userName}`;
              qs.sysparm_limit = 1;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/sys_user",
                {},
                qs
              );
              responseData = response.result;
            }
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/sys_user",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/sys_user",
                {},
                qs
              );
            }
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = this.getNodeParameter("updateFields", i);
            const response = await import_GenericFunctions.serviceNowApiRequest.call(
              this,
              "PATCH",
              `/now/table/sys_user/${id}`,
              body
            );
            responseData = response.result;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "userGroup") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/sys_user_group",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/sys_user_group",
                {},
                qs
              );
            }
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "userRole") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (qs.sysparm_fields && typeof qs.sysparm_fields !== "string") {
              qs.sysparm_fields = qs.sysparm_fields.join(",");
            }
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              qs.sysparm_limit = limit;
              const response = await import_GenericFunctions.serviceNowApiRequest.call(
                this,
                "GET",
                "/now/table/sys_user_role",
                {},
                qs
              );
              responseData = response.result;
            } else {
              responseData = await import_GenericFunctions.serviceNowRequestAllItems.call(
                this,
                "GET",
                "/now/table/sys_user_role",
                {},
                qs
              );
            }
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    if (resource === "attachment") {
      if (operation === "get" || operation === "getAll") {
        return [returnData];
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServiceNow
});
//# sourceMappingURL=ServiceNow.node.js.map