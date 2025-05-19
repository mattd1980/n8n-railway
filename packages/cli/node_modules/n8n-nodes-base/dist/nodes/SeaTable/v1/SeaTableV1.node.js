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
var SeaTableV1_node_exports = {};
__export(SeaTableV1_node_exports, {
  SeaTableV1: () => SeaTableV1
});
module.exports = __toCommonJS(SeaTableV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_SeaTable = require("./SeaTable.node");
class SeaTableV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getTableNames() {
          const returnData = [];
          const {
            metadata: { tables }
          } = await import_GenericFunctions.seaTableApiRequest.call(
            this,
            {},
            "GET",
            "/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata/"
          );
          for (const table of tables) {
            returnData.push({
              name: table.name,
              value: table.name
            });
          }
          return returnData;
        },
        async getTableIds() {
          const returnData = [];
          const {
            metadata: { tables }
          } = await import_GenericFunctions.seaTableApiRequest.call(
            this,
            {},
            "GET",
            "/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata/"
          );
          for (const table of tables) {
            returnData.push({
              name: table.name,
              value: table._id
            });
          }
          return returnData;
        },
        async getTableUpdateAbleColumns() {
          const tableName = this.getNodeParameter("tableName");
          const columns = await import_GenericFunctions.getTableColumns.call(this, tableName);
          return columns.filter((column) => column.editable).map((column) => ({ name: column.name, value: column.name }));
        },
        async getAllSortableColumns() {
          const tableName = this.getNodeParameter("tableName");
          const columns = await import_GenericFunctions.getTableColumns.call(this, tableName);
          return columns.filter(
            (column) => !["file", "image", "url", "collaborator", "long-text"].includes(column.type)
          ).map((column) => ({ name: column.name, value: column.name }));
        },
        async getViews() {
          const tableName = this.getNodeParameter("tableName");
          const views = await import_GenericFunctions.getTableViews.call(this, tableName);
          return views.map((view) => ({ name: view.name, value: view.name }));
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...import_SeaTable.versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const body = {};
    const qs = {};
    const ctx = {};
    if (resource === "row") {
      if (operation === "create") {
        const tableName = this.getNodeParameter("tableName", 0);
        const tableColumns = await import_GenericFunctions.getTableColumns.call(this, tableName);
        body.table_name = tableName;
        const fieldsToSend = this.getNodeParameter("fieldsToSend", 0);
        let rowInput = {};
        for (let i = 0; i < items.length; i++) {
          rowInput = {};
          try {
            if (fieldsToSend === "autoMapInputData") {
              const incomingKeys = Object.keys(items[i].json);
              const inputDataToIgnore = (0, import_GenericFunctions.split)(
                this.getNodeParameter("inputsToIgnore", i, "")
              );
              for (const key of incomingKeys) {
                if (inputDataToIgnore.includes(key)) continue;
                rowInput[key] = items[i].json[key];
              }
            } else {
              const columns = this.getNodeParameter(
                "columnsUi.columnValues",
                i,
                []
              );
              for (const column of columns) {
                rowInput[column.columnName] = column.columnValue;
              }
            }
            body.row = (0, import_GenericFunctions.rowExport)(rowInput, (0, import_GenericFunctions.updateAble)(tableColumns));
            responseData = await import_GenericFunctions.seaTableApiRequest.call(
              this,
              ctx,
              "POST",
              "/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/",
              body
            );
            const { _id: insertId } = responseData;
            if (insertId === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "SeaTable: No identity after appending row.",
                { itemIndex: i }
              );
            }
            const newRowInsertData = (0, import_GenericFunctions.rowMapKeyToName)(responseData, tableColumns);
            qs.table_name = tableName;
            qs.convert = true;
            const newRow = await import_GenericFunctions.seaTableApiRequest.call(
              this,
              ctx,
              "GET",
              `/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/${encodeURIComponent(
                insertId
              )}/`,
              body,
              qs
            );
            if (newRow._id === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "SeaTable: No identity for appended row.",
                { itemIndex: i }
              );
            }
            const row = (0, import_GenericFunctions.rowFormatColumns)(
              { ...newRowInsertData, ...newRow },
              tableColumns.map(({ name }) => name).concat(["_id", "_ctime", "_mtime"])
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(row),
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
      } else if (operation === "get") {
        for (let i = 0; i < items.length; i++) {
          try {
            const tableId = this.getNodeParameter("tableId", 0);
            const rowId = this.getNodeParameter("rowId", i);
            const response = await import_GenericFunctions.seaTableApiRequest.call(
              this,
              ctx,
              "GET",
              `/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/${rowId}`,
              {},
              { table_id: tableId, convert: true }
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(response),
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
      } else if (operation === "getAll") {
        const tableName = this.getNodeParameter("tableName", 0);
        const tableColumns = await import_GenericFunctions.getTableColumns.call(this, tableName);
        for (let i = 0; i < items.length; i++) {
          try {
            const endpoint = "/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/";
            qs.table_name = tableName;
            const filters = this.getNodeParameter("filters", i);
            const options = this.getNodeParameter("options", i);
            const returnAll = this.getNodeParameter("returnAll", 0);
            Object.assign(qs, filters, options);
            if (qs.convert_link_id === false) {
              delete qs.convert_link_id;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.setableApiRequestAllItems.call(
                this,
                ctx,
                "rows",
                "GET",
                endpoint,
                body,
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.seaTableApiRequest.call(this, ctx, "GET", endpoint, body, qs);
              responseData = responseData.rows;
            }
            const rows = responseData.map(
              (row) => (0, import_GenericFunctions.rowFormatColumns)(
                { ...row },
                tableColumns.map(({ name }) => name).concat(["_id", "_ctime", "_mtime"])
              )
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(rows),
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
            }
            throw error;
          }
        }
      } else if (operation === "delete") {
        for (let i = 0; i < items.length; i++) {
          try {
            const tableName = this.getNodeParameter("tableName", 0);
            const rowId = this.getNodeParameter("rowId", i);
            const requestBody = {
              table_name: tableName,
              row_id: rowId
            };
            const response = await import_GenericFunctions.seaTableApiRequest.call(
              this,
              ctx,
              "DELETE",
              "/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/",
              requestBody,
              qs
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(response),
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
      } else if (operation === "update") {
        const tableName = this.getNodeParameter("tableName", 0);
        const tableColumns = await import_GenericFunctions.getTableColumns.call(this, tableName);
        body.table_name = tableName;
        const fieldsToSend = this.getNodeParameter("fieldsToSend", 0);
        let rowInput = {};
        for (let i = 0; i < items.length; i++) {
          const rowId = this.getNodeParameter("rowId", i);
          rowInput = {};
          try {
            if (fieldsToSend === "autoMapInputData") {
              const incomingKeys = Object.keys(items[i].json);
              const inputDataToIgnore = (0, import_GenericFunctions.split)(
                this.getNodeParameter("inputsToIgnore", i, "")
              );
              for (const key of incomingKeys) {
                if (inputDataToIgnore.includes(key)) continue;
                rowInput[key] = items[i].json[key];
              }
            } else {
              const columns = this.getNodeParameter(
                "columnsUi.columnValues",
                i,
                []
              );
              for (const column of columns) {
                rowInput[column.columnName] = column.columnValue;
              }
            }
            body.row = (0, import_GenericFunctions.rowExport)(rowInput, (0, import_GenericFunctions.updateAble)(tableColumns));
            body.table_name = tableName;
            body.row_id = rowId;
            responseData = await import_GenericFunctions.seaTableApiRequest.call(
              this,
              ctx,
              "PUT",
              "/dtable-server/api/v1/dtables/{{dtable_uuid}}/rows/",
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ _id: rowId, ...responseData }),
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
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTableV1
});
//# sourceMappingURL=SeaTableV1.node.js.map