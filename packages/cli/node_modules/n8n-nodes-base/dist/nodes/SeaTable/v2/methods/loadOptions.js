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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getAssetColumns: () => getAssetColumns,
  getLinkColumns: () => getLinkColumns,
  getLinkColumnsWithColumnKey: () => getLinkColumnsWithColumnKey,
  getRowIds: () => getRowIds,
  getSearchableColumns: () => getSearchableColumns,
  getSignatureColumns: () => getSignatureColumns,
  getTableNameAndId: () => getTableNameAndId,
  getTableNames: () => getTableNames,
  getTableUpdateAbleColumns: () => getTableUpdateAbleColumns,
  getTableViews: () => getTableViews
});
module.exports = __toCommonJS(loadOptions_exports);
var import_GenericFunctions = require("../GenericFunctions");
async function getTableNames() {
  const returnData = [];
  const {
    metadata: { tables }
  } = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/metadata"
  );
  for (const table of tables) {
    returnData.push({
      name: table.name,
      value: table.name
    });
  }
  return returnData;
}
async function getTableNameAndId() {
  const returnData = [];
  const {
    metadata: { tables }
  } = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/metadata"
  );
  for (const table of tables) {
    returnData.push({
      name: table.name,
      value: table.name + ":::" + table._id
    });
  }
  return returnData;
}
async function getSearchableColumns() {
  const returnData = [];
  const tableName = this.getCurrentNodeParameter("tableName");
  if (tableName) {
    const columns = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/columns",
      {},
      { table_name: tableName }
    );
    for (const col of columns.columns) {
      if (col.type === "text" || col.type === "long-text" || col.type === "number" || col.type === "single-select" || col.type === "email" || col.type === "url" || col.type === "rate" || col.type === "formula") {
        returnData.push({
          name: col.name,
          value: col.name
        });
      }
    }
  }
  return returnData;
}
async function getLinkColumns() {
  const returnData = [];
  const table = this.getCurrentNodeParameter("tableName");
  const tableName = table.split(":::")[0];
  const tableId = table.split(":::")[1];
  if (tableName) {
    const columns = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/columns",
      {},
      { table_name: tableName }
    );
    for (const col of columns.columns) {
      if (col.type === "link") {
        const otid = tableId !== col.data.other_table_id ? col.data.other_table_id : col.data.table_id;
        returnData.push({
          name: col.name,
          value: col.name + ":::" + col.data.link_id + ":::" + otid
        });
      }
    }
  }
  return returnData;
}
async function getLinkColumnsWithColumnKey() {
  const returnData = [];
  const table = this.getCurrentNodeParameter("tableName");
  const tableName = table.split(":::")[0];
  const tableId = table.split(":::")[1];
  if (tableName) {
    const columns = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/columns",
      {},
      { table_name: tableName }
    );
    for (const col of columns.columns) {
      if (col.type === "link") {
        const otid = tableId !== col.data.other_table_id ? col.data.other_table_id : col.data.table_id;
        returnData.push({
          name: col.name,
          value: col.name + ":::" + col.data.link_id + ":::" + otid + ":::" + col.key
        });
      }
    }
  }
  return returnData;
}
async function getAssetColumns() {
  const returnData = [];
  const tableName = this.getCurrentNodeParameter("tableName");
  if (tableName) {
    const columns = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/columns",
      {},
      { table_name: tableName }
    );
    for (const col of columns.columns) {
      if (col.type === "image" || col.type === "file") {
        returnData.push({
          name: col.name,
          value: col.name + ":::" + col.type
        });
      }
    }
  }
  return returnData;
}
async function getSignatureColumns() {
  const returnData = [];
  const tableName = this.getCurrentNodeParameter("tableName");
  if (tableName) {
    const columns = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/columns",
      {},
      { table_name: tableName }
    );
    for (const col of columns.columns) {
      if (col.type === "digital-sign") {
        returnData.push({
          name: col.name,
          value: col.name
        });
      }
    }
  }
  return returnData;
}
async function getTableUpdateAbleColumns() {
  const tableName = this.getNodeParameter("tableName");
  let columns = await import_GenericFunctions.getTableColumns.call(this, tableName);
  columns = (0, import_GenericFunctions.updateAble)(columns);
  return columns.filter((column) => column.editable).map((column) => ({ name: column.name, value: column.name }));
}
async function getRowIds() {
  const table = this.getCurrentNodeParameter("tableName");
  const operation = this.getCurrentNodeParameter("operation");
  let tableName = table;
  if (table.indexOf(":::") !== -1) {
    tableName = table.split(":::")[0];
  }
  let lockQuery = "";
  if (operation === "lock") {
    lockQuery = "WHERE _locked is null";
  }
  if (operation === "unlock") {
    lockQuery = "WHERE _locked = true";
  }
  const returnData = [];
  if (tableName) {
    const sqlResult = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "POST",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/sql",
      {
        sql: `SELECT * FROM \`${tableName}\` ${lockQuery} LIMIT 1000`,
        convert_keys: false
      }
    );
    const rows = sqlResult.results;
    for (const row of rows) {
      returnData.push({
        name: `${row["0000"]} (${row._id})`,
        value: row._id
      });
    }
  }
  return returnData;
}
async function getTableViews() {
  const returnData = [];
  const tableName = this.getCurrentNodeParameter("tableName");
  if (tableName) {
    const { views } = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/views",
      {},
      { table_name: tableName }
    );
    returnData.push({
      name: "<Do not limit to a view>",
      value: ""
    });
    for (const view of views) {
      returnData.push({
        name: view.name,
        value: view.name
      });
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAssetColumns,
  getLinkColumns,
  getLinkColumnsWithColumnKey,
  getRowIds,
  getSearchableColumns,
  getSignatureColumns,
  getTableNameAndId,
  getTableNames,
  getTableUpdateAbleColumns,
  getTableViews
});
//# sourceMappingURL=loadOptions.js.map