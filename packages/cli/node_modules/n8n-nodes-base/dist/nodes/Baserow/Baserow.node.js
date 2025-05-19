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
var Baserow_node_exports = {};
__export(Baserow_node_exports, {
  Baserow: () => Baserow
});
module.exports = __toCommonJS(Baserow_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_OperationDescription = require("./OperationDescription");
class Baserow {
  constructor() {
    this.description = {
      displayName: "Baserow",
      name: "baserow",
      icon: "file:baserow.svg",
      group: ["output"],
      version: 1,
      description: "Consume the Baserow API",
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      defaults: {
        name: "Baserow"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "baserowApi",
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
          default: "getAll"
        },
        ...import_OperationDescription.operationFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getDatabaseIds() {
          const credentials = await this.getCredentials("baserowApi");
          const jwtToken = await import_GenericFunctions.getJwtToken.call(this, credentials);
          const endpoint = "/api/applications/";
          const databases = await import_GenericFunctions.baserowApiRequest.call(
            this,
            "GET",
            endpoint,
            jwtToken
          );
          return (0, import_GenericFunctions.toOptions)(databases.filter((database) => database.type === "database"));
        },
        async getTableIds() {
          const credentials = await this.getCredentials("baserowApi");
          const jwtToken = await import_GenericFunctions.getJwtToken.call(this, credentials);
          const databaseId = this.getNodeParameter("databaseId", 0);
          const endpoint = `/api/database/tables/database/${databaseId}/`;
          const tables = await import_GenericFunctions.baserowApiRequest.call(
            this,
            "GET",
            endpoint,
            jwtToken
          );
          return (0, import_GenericFunctions.toOptions)(tables);
        },
        async getTableFields() {
          const credentials = await this.getCredentials("baserowApi");
          const jwtToken = await import_GenericFunctions.getJwtToken.call(this, credentials);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/api/database/fields/table/${tableId}/`;
          const fields = await import_GenericFunctions.baserowApiRequest.call(
            this,
            "GET",
            endpoint,
            jwtToken
          );
          return (0, import_GenericFunctions.toOptions)(fields);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const mapper = new import_GenericFunctions.TableFieldMapper();
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    const tableId = this.getNodeParameter("tableId", 0);
    const credentials = await this.getCredentials("baserowApi");
    const jwtToken = await import_GenericFunctions.getJwtToken.call(this, credentials);
    const fields = await mapper.getTableFields.call(this, tableId, jwtToken);
    mapper.createMappings(fields);
    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === "getAll") {
          const { order, filters, filterType, search } = this.getNodeParameter(
            "additionalOptions",
            i
          );
          const qs = {};
          if (order?.fields) {
            qs.order_by = order.fields.map(({ field, direction }) => `${direction}${mapper.setField(field)}`).join(",");
          }
          if (filters?.fields) {
            filters.fields.forEach(({ field, operator, value }) => {
              qs[`filter__field_${mapper.setField(field)}__${operator}`] = value;
            });
          }
          if (filterType) {
            qs.filter_type = filterType;
          }
          if (search) {
            qs.search = search;
          }
          const endpoint = `/api/database/rows/table/${tableId}/`;
          const rows = await import_GenericFunctions.baserowApiRequestAllItems.call(
            this,
            "GET",
            endpoint,
            jwtToken,
            {},
            qs
          );
          rows.forEach((row) => mapper.idsToNames(row));
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(rows),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "get") {
          const rowId = this.getNodeParameter("rowId", i);
          const endpoint = `/api/database/rows/table/${tableId}/${rowId}/`;
          const row = await import_GenericFunctions.baserowApiRequest.call(this, "GET", endpoint, jwtToken);
          mapper.idsToNames(row);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(row),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "create") {
          const body = {};
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputDataToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputDataToIgnore.includes(key)) continue;
              body[key] = items[i].json[key];
              mapper.namesToIds(body);
            }
          } else {
            const fieldsUi = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fieldsUi) {
              body[`field_${field.fieldId}`] = field.fieldValue;
            }
          }
          const endpoint = `/api/database/rows/table/${tableId}/`;
          const createdRow = await import_GenericFunctions.baserowApiRequest.call(this, "POST", endpoint, jwtToken, body);
          mapper.idsToNames(createdRow);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(createdRow),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "update") {
          const rowId = this.getNodeParameter("rowId", i);
          const body = {};
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputsToIgnore.includes(key)) continue;
              body[key] = items[i].json[key];
              mapper.namesToIds(body);
            }
          } else {
            const fieldsUi = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fieldsUi) {
              body[`field_${field.fieldId}`] = field.fieldValue;
            }
          }
          const endpoint = `/api/database/rows/table/${tableId}/${rowId}/`;
          const updatedRow = await import_GenericFunctions.baserowApiRequest.call(this, "PATCH", endpoint, jwtToken, body);
          mapper.idsToNames(updatedRow);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(updatedRow),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "delete") {
          const rowId = this.getNodeParameter("rowId", i);
          const endpoint = `/api/database/rows/table/${tableId}/${rowId}/`;
          await import_GenericFunctions.baserowApiRequest.call(this, "DELETE", endpoint, jwtToken);
          const executionData = this.helpers.constructExecutionMetaData(
            [{ json: { success: true } }],
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {}, itemIndex: i });
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
  Baserow
});
//# sourceMappingURL=Baserow.node.js.map