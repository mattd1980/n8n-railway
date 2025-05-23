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
var NocoDB_node_exports = {};
__export(NocoDB_node_exports, {
  NocoDB: () => NocoDB
});
module.exports = __toCommonJS(NocoDB_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_OperationDescription = require("./OperationDescription");
class NocoDB {
  constructor() {
    this.description = {
      displayName: "NocoDB",
      name: "nocoDb",
      icon: "file:nocodb.svg",
      group: ["input"],
      version: [1, 2, 3],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Read, update, write and delete data from NocoDB",
      defaults: {
        name: "NocoDB"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "nocoDb",
          required: true,
          displayOptions: {
            show: {
              authentication: ["nocoDb"]
            }
          }
        },
        {
          name: "nocoDbApiToken",
          required: true,
          displayOptions: {
            show: {
              authentication: ["nocoDbApiToken"]
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
              value: "nocoDbApiToken"
            },
            {
              name: "User Token",
              value: "nocoDb"
            }
          ],
          default: "nocoDb"
        },
        {
          displayName: "API Version",
          name: "version",
          type: "options",
          isNodeSetting: true,
          options: [
            {
              name: "Before v0.90.0",
              value: 1
            },
            {
              name: "v0.90.0 Onwards",
              value: 2
            },
            {
              name: "v0.200.0 Onwards",
              value: 3
            }
          ],
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          default: 1
        },
        {
          displayName: "API Version",
          name: "version",
          type: "options",
          isNodeSetting: true,
          options: [
            {
              name: "Before v0.90.0",
              value: 1
            },
            {
              name: "v0.90.0 Onwards",
              value: 2
            },
            {
              name: "v0.200.0 Onwards",
              value: 3
            }
          ],
          displayOptions: {
            show: {
              "@version": [2]
            }
          },
          default: 2
        },
        {
          displayName: "API Version",
          name: "version",
          type: "options",
          isNodeSetting: true,
          options: [
            {
              name: "Before v0.90.0",
              value: 1
            },
            {
              name: "v0.90.0 Onwards",
              value: 2
            },
            {
              name: "v0.200.0 Onwards",
              value: 3
            }
          ],
          displayOptions: {
            show: {
              "@version": [3]
            }
          },
          default: 3
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Row",
              value: "row"
            }
          ],
          default: "row"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["row"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a row",
              action: "Create a row"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a row",
              action: "Delete a row"
            },
            {
              name: "Get",
              value: "get",
              description: "Retrieve a row",
              action: "Get a row"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Retrieve many rows",
              action: "Get many rows"
            },
            {
              name: "Update",
              value: "update",
              description: "Update a row",
              action: "Update a row"
            }
          ],
          default: "get"
        },
        ...import_OperationDescription.operationFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getWorkspaces() {
          try {
            const requestMethod = "GET";
            const endpoint = "/api/v1/workspaces/";
            const responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, {}, {});
            return responseData.list.map((i) => ({ name: i.title, value: i.id }));
          } catch (e) {
            return [{ name: "No Workspace", value: "none" }];
          }
        },
        async getBases() {
          const version = this.getNodeParameter("version", 0);
          const workspaceId = this.getNodeParameter("workspaceId", 0);
          try {
            if (workspaceId && workspaceId !== "none") {
              const requestMethod = "GET";
              const endpoint = `/api/v1/workspaces/${workspaceId}/bases/`;
              const responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, {}, {});
              return responseData.list.map((i) => ({ name: i.title, value: i.id }));
            } else {
              const requestMethod = "GET";
              const endpoint = version === 3 ? "/api/v2/meta/bases/" : "/api/v1/db/meta/projects/";
              const responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, {}, {});
              return responseData.list.map((i) => ({ name: i.title, value: i.id }));
            }
          } catch (e) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              new Error(`Error while fetching ${version === 3 ? "bases" : "projects"}!`, {
                cause: e
              }),
              {
                level: "warning"
              }
            );
          }
        },
        // This only supports using the Base ID
        async getTables() {
          const version = this.getNodeParameter("version", 0);
          const baseId = this.getNodeParameter("projectId", 0);
          if (baseId) {
            try {
              const requestMethod = "GET";
              const endpoint = version === 3 ? `/api/v2/meta/bases/${baseId}/tables` : `/api/v1/db/meta/projects/${baseId}/tables`;
              const responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, {}, {});
              return responseData.list.map((i) => ({ name: i.title, value: i.id }));
            } catch (e) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                new Error("Error while fetching tables!", { cause: e }),
                {
                  level: "warning"
                }
              );
            }
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `No  ${version === 3 ? "base" : "project"} selected!`,
              {
                level: "warning"
              }
            );
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const version = this.getNodeParameter("version", 0);
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let returnAll = false;
    let requestMethod = "GET";
    let qs = {};
    let endPoint = "";
    const baseId = this.getNodeParameter("projectId", 0);
    const table = this.getNodeParameter("table", 0);
    if (resource === "row") {
      if (operation === "create") {
        requestMethod = "POST";
        if (version === 1) {
          endPoint = `/nc/${baseId}/api/v1/${table}/bulk`;
        } else if (version === 2) {
          endPoint = `/api/v1/db/data/bulk/noco/${baseId}/${table}`;
        } else if (version === 3) {
          endPoint = `/api/v2/tables/${table}/records`;
        }
        const body = [];
        for (let i = 0; i < items.length; i++) {
          const newItem = {};
          const dataToSend = this.getNodeParameter("dataToSend", i);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputDataToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputDataToIgnore.includes(key)) continue;
              newItem[key] = items[i].json[key];
            }
          } else {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fields) {
              if (!field.binaryData) {
                newItem[field.fieldName] = field.fieldValue;
              } else if (field.binaryProperty) {
                const binaryPropertyName = field.binaryProperty;
                const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                const formData = {
                  file: {
                    value: dataBuffer,
                    options: {
                      filename: binaryData.fileName,
                      contentType: binaryData.mimeType
                    }
                  },
                  json: JSON.stringify({
                    api: "xcAttachmentUpload",
                    project_id: baseId,
                    dbAlias: "db",
                    args: {}
                  })
                };
                let postUrl = "";
                if (version === 1) {
                  postUrl = "/dashboard";
                } else if (version === 2) {
                  postUrl = "/api/v1/db/storage/upload";
                } else if (version === 3) {
                  postUrl = "/api/v2/storage/upload";
                }
                responseData = await import_GenericFunctions.apiRequest.call(
                  this,
                  "POST",
                  postUrl,
                  {},
                  version === 3 ? { base_id: baseId } : { project_id: baseId },
                  void 0,
                  {
                    formData
                  }
                );
                newItem[field.fieldName] = JSON.stringify(
                  Array.isArray(responseData) ? responseData : [responseData]
                );
              }
            }
          }
          body.push(newItem);
        }
        try {
          responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endPoint, body, qs);
          if (version === 3) {
            for (let i = body.length - 1; i >= 0; i--) {
              body[i] = { ...body[i], ...responseData[i] };
            }
            returnData.push(...body);
          } else {
            let id = responseData[0];
            for (let i = body.length - 1; i >= 0; i--) {
              body[i].id = id--;
            }
            returnData.push(...body);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ error: error.toString() });
          }
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
      }
      if (operation === "delete") {
        requestMethod = "DELETE";
        let primaryKey = "id";
        if (version === 1) {
          endPoint = `/nc/${baseId}/api/v1/${table}/bulk`;
        } else if (version === 2) {
          endPoint = `/api/v1/db/data/bulk/noco/${baseId}/${table}`;
          primaryKey = this.getNodeParameter("primaryKey", 0);
          if (primaryKey === "custom") {
            primaryKey = this.getNodeParameter("customPrimaryKey", 0);
          }
        } else if (version === 3) {
          endPoint = `/api/v2/tables/${table}/records`;
          primaryKey = this.getNodeParameter("primaryKey", 0);
          if (primaryKey === "custom") {
            primaryKey = this.getNodeParameter("customPrimaryKey", 0);
          }
        }
        const body = [];
        for (let i = 0; i < items.length; i++) {
          const id = this.getNodeParameter("id", i);
          body.push({ [primaryKey]: id });
        }
        try {
          responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endPoint, body, qs);
          if (version === 1) {
            returnData.push(...items.map((item) => item.json));
          } else if (version === 2) {
            returnData.push(
              ...responseData.map((result, index) => {
                if (result === 0) {
                  const errorMessage = `The row with the ID "${body[index].id}" could not be deleted. It probably doesn't exist.`;
                  if (this.continueOnFail()) {
                    return { error: errorMessage };
                  }
                  throw new import_n8n_workflow.NodeApiError(
                    this.getNode(),
                    { message: errorMessage },
                    { message: errorMessage, itemIndex: index }
                  );
                }
                return {
                  success: true
                };
              })
            );
          } else if (version === 3) {
            returnData.push(...responseData);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ error: error.toString() });
          }
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
      }
      if (operation === "getAll") {
        const data = [];
        const downloadAttachments = this.getNodeParameter("downloadAttachments", 0);
        try {
          for (let i = 0; i < items.length; i++) {
            requestMethod = "GET";
            if (version === 1) {
              endPoint = `/nc/${baseId}/api/v1/${table}`;
            } else if (version === 2) {
              endPoint = `/api/v1/db/data/noco/${baseId}/${table}`;
            } else if (version === 3) {
              endPoint = `/api/v2/tables/${table}/records`;
            }
            returnAll = this.getNodeParameter("returnAll", 0);
            qs = this.getNodeParameter("options", i, {});
            if (qs.sort) {
              const properties = qs.sort.property;
              qs.sort = properties.map((prop) => `${prop.direction === "asc" ? "" : "-"}${prop.field}`).join(",");
            }
            if (qs.fields) {
              qs.fields = qs.fields.join(",");
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.apiRequestAllItems.call(this, requestMethod, endPoint, {}, qs);
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endPoint, {}, qs);
              if (version === 2 || version === 3) {
                responseData = responseData.list;
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
            if (downloadAttachments) {
              const downloadFieldNames = this.getNodeParameter("downloadFieldNames", 0).split(",");
              const response = await import_GenericFunctions.downloadRecordAttachments.call(
                this,
                responseData,
                downloadFieldNames,
                [{ item: i }]
              );
              data.push(...response);
            }
          }
          if (downloadAttachments) {
            return [data];
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: error.toString() } });
          } else {
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "get") {
        requestMethod = "GET";
        const newItems = [];
        for (let i = 0; i < items.length; i++) {
          try {
            const id = this.getNodeParameter("id", i);
            if (version === 1) {
              endPoint = `/nc/${baseId}/api/v1/${table}/${id}`;
            } else if (version === 2) {
              endPoint = `/api/v1/db/data/noco/${baseId}/${table}/${id}`;
            } else if (version === 3) {
              endPoint = `/api/v2/tables/${table}/records/${id}`;
            }
            responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endPoint, {}, qs);
            if (version === 2) {
              if (Object.keys(responseData).length === 0) {
                const errorMessage = `The row with the ID "${id}" could not be queried. It probably doesn't exist.`;
                if (this.continueOnFail()) {
                  newItems.push({ json: { error: errorMessage } });
                  continue;
                }
                throw new import_n8n_workflow.NodeApiError(
                  this.getNode(),
                  { message: errorMessage },
                  { message: errorMessage, itemIndex: i }
                );
              }
            }
            const downloadAttachments = this.getNodeParameter("downloadAttachments", i);
            if (downloadAttachments) {
              const downloadFieldNames = this.getNodeParameter("downloadFieldNames", i).split(",");
              const data = await import_GenericFunctions.downloadRecordAttachments.call(
                this,
                [responseData],
                downloadFieldNames,
                [{ item: i }]
              );
              const newItem = {
                binary: data[0].binary,
                json: {}
              };
              const executionData = this.helpers.constructExecutionMetaData(
                [newItem],
                { itemData: { item: i } }
              );
              newItems.push(...executionData);
            } else {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              newItems.push(...executionData);
            }
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.toString() }),
                { itemData: { item: i } }
              );
              newItems.push(...executionData);
              continue;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { itemIndex: i });
          }
        }
        return [newItems];
      }
      if (operation === "update") {
        requestMethod = "PATCH";
        let primaryKey = "id";
        if (version === 1) {
          endPoint = `/nc/${baseId}/api/v1/${table}/bulk`;
          requestMethod = "PUT";
        } else if (version === 2) {
          endPoint = `/api/v1/db/data/bulk/noco/${baseId}/${table}`;
          primaryKey = this.getNodeParameter("primaryKey", 0);
          if (primaryKey === "custom") {
            primaryKey = this.getNodeParameter("customPrimaryKey", 0);
          }
        } else if (version === 3) {
          endPoint = `/api/v2/tables/${table}/records`;
        }
        const body = [];
        for (let i = 0; i < items.length; i++) {
          const id = version === 3 ? null : this.getNodeParameter("id", i);
          const newItem = version === 3 ? {} : { [primaryKey]: id };
          const dataToSend = this.getNodeParameter("dataToSend", i);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputDataToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputDataToIgnore.includes(key)) continue;
              newItem[key] = items[i].json[key];
            }
          } else {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fields) {
              if (!field.binaryData) {
                newItem[field.fieldName] = field.fieldValue;
              } else if (field.binaryProperty) {
                const binaryPropertyName = field.binaryProperty;
                const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                const formData = {
                  file: {
                    value: dataBuffer,
                    options: {
                      filename: binaryData.fileName,
                      contentType: binaryData.mimeType
                    }
                  },
                  json: JSON.stringify({
                    api: "xcAttachmentUpload",
                    project_id: baseId,
                    dbAlias: "db",
                    args: {}
                  })
                };
                let postUrl = "";
                if (version === 1) {
                  postUrl = "/dashboard";
                } else if (version === 2) {
                  postUrl = "/api/v1/db/storage/upload";
                } else if (version === 3) {
                  postUrl = "/api/v2/storage/upload";
                }
                responseData = await import_GenericFunctions.apiRequest.call(
                  this,
                  "POST",
                  postUrl,
                  {},
                  version === 3 ? { base_id: baseId } : { project_id: baseId },
                  void 0,
                  {
                    formData
                  }
                );
                newItem[field.fieldName] = JSON.stringify(
                  Array.isArray(responseData) ? responseData : [responseData]
                );
              }
            }
          }
          body.push(newItem);
        }
        try {
          responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endPoint, body, qs);
          if (version === 1) {
            returnData.push(...body);
          } else if (version === 2) {
            returnData.push(
              ...responseData.map((result, index) => {
                if (result === 0) {
                  const errorMessage = `The row with the ID "${body[index].id}" could not be updated. It probably doesn't exist.`;
                  if (this.continueOnFail()) {
                    return { error: errorMessage };
                  }
                  throw new import_n8n_workflow.NodeApiError(
                    this.getNode(),
                    { message: errorMessage },
                    { message: errorMessage, itemIndex: index }
                  );
                }
                return {
                  success: true
                };
              })
            );
          } else if (version === 3) {
            for (let i = body.length - 1; i >= 0; i--) {
              body[i] = { ...body[i], ...responseData[i] };
            }
            returnData.push(...body);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ error: error.toString() });
          }
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NocoDB
});
//# sourceMappingURL=NocoDB.node.js.map