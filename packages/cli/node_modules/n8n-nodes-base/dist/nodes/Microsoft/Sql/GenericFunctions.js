"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  configurePool: () => configurePool,
  copyInputItem: () => copyInputItem,
  createTableStruct: () => createTableStruct,
  deleteOperation: () => deleteOperation,
  executeQueryQueue: () => executeQueryQueue,
  executeSqlQueryAndPrepareResults: () => executeSqlQueryAndPrepareResults,
  formatColumns: () => formatColumns,
  insertOperation: () => insertOperation,
  mssqlChunk: () => mssqlChunk,
  updateOperation: () => updateOperation
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_mssql = __toESM(require("mssql"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
function copyInputItem(item, properties) {
  const newItem = {};
  for (const property of properties) {
    if (item.json[property] === void 0) {
      newItem[property] = null;
    } else {
      newItem[property] = (0, import_n8n_workflow.deepCopy)(item.json[property]);
    }
  }
  return newItem;
}
function createTableStruct(getNodeParam, items, additionalProperties = [], keyName) {
  return items.reduce((tables, item, index) => {
    const table = getNodeParam("table", index);
    const columnString = getNodeParam("columns", index);
    const columns = columnString.split(",").map((column) => column.trim());
    const itemCopy = copyInputItem(item, columns.concat(additionalProperties));
    const keyParam = keyName ? getNodeParam(keyName, index) : void 0;
    if (tables[table] === void 0) {
      tables[table] = {};
    }
    if (tables[table][columnString] === void 0) {
      tables[table][columnString] = [];
    }
    if (keyName) {
      itemCopy[keyName] = keyParam;
    }
    tables[table][columnString].push(itemCopy);
    return tables;
  }, {});
}
async function executeQueryQueue(tables, buildQueryQueue) {
  return await Promise.all(
    Object.keys(tables).map(async (table) => {
      const columnsResults = Object.keys(tables[table]).map(async (columnString) => {
        return await Promise.all(
          buildQueryQueue({
            table,
            columnString,
            items: tables[table][columnString]
          })
        );
      });
      return await Promise.all(columnsResults);
    })
  );
}
function formatColumns(columns) {
  return columns.split(",").map((column) => `[${column.trim()}]`).join(", ");
}
function configurePool(credentials) {
  const config = {
    server: credentials.server,
    port: credentials.port,
    database: credentials.database,
    user: credentials.user,
    password: credentials.password,
    domain: credentials.domain ? credentials.domain : void 0,
    connectionTimeout: credentials.connectTimeout,
    requestTimeout: credentials.requestTimeout,
    options: {
      encrypt: credentials.tls,
      enableArithAbort: false,
      tdsVersion: credentials.tdsVersion,
      trustServerCertificate: credentials.allowUnauthorizedCerts
    }
  };
  return new import_mssql.default.ConnectionPool(config);
}
const escapeTableName = (table) => {
  table = table.trim();
  if (table.startsWith("[") && table.endsWith("]")) {
    return table;
  } else {
    return `[${table}]`;
  }
};
const MSSQL_PARAMETER_LIMIT = 2100;
function mssqlChunk(rows) {
  const chunked = [[]];
  let currentParamCount = 0;
  for (const row of rows) {
    const rowValues = Object.values(row);
    const valueCount = rowValues.length;
    if (currentParamCount + valueCount >= MSSQL_PARAMETER_LIMIT) {
      chunked.push([]);
      currentParamCount = 0;
    }
    chunked[chunked.length - 1].push(row);
    currentParamCount += valueCount;
  }
  return chunked;
}
async function insertOperation(tables, pool) {
  return await executeQueryQueue(
    tables,
    ({ table, columnString, items }) => {
      return mssqlChunk(items).map(async (insertValues) => {
        const request = pool.request();
        const valuesPlaceholder = [];
        for (const [rIndex, entry] of insertValues.entries()) {
          const row = Object.values(entry);
          valuesPlaceholder.push(`(${row.map((_, vIndex) => `@r${rIndex}v${vIndex}`).join(", ")})`);
          for (const [vIndex, value] of row.entries()) {
            request.input(`r${rIndex}v${vIndex}`, value);
          }
        }
        const query = `INSERT INTO ${escapeTableName(table)} (${formatColumns(
          columnString
        )}) VALUES ${valuesPlaceholder.join(", ")};`;
        return await request.query(query);
      });
    }
  );
}
async function updateOperation(tables, pool) {
  return await executeQueryQueue(
    tables,
    ({ table, columnString, items }) => {
      return items.map(async (item) => {
        const request = pool.request();
        const columns = columnString.split(",").map((column) => column.trim());
        const setValues = [];
        const condition = `${item.updateKey} = @condition`;
        request.input("condition", item[item.updateKey]);
        for (const [index, col] of columns.entries()) {
          setValues.push(`[${col}] = @v${index}`);
          request.input(`v${index}`, item[col]);
        }
        const query = `UPDATE ${escapeTableName(table)} SET ${setValues.join(
          ", "
        )} WHERE ${condition};`;
        return await request.query(query);
      });
    }
  );
}
async function deleteOperation(tables, pool) {
  const queriesResults = await Promise.all(
    Object.keys(tables).map(async (table) => {
      const deleteKeyResults = Object.keys(tables[table]).map(async (deleteKey) => {
        const deleteItemsList = (0, import_utilities.chunk)(
          tables[table][deleteKey].map(
            (item) => copyInputItem(item, [deleteKey])
          ),
          1e3
        );
        const queryQueue = deleteItemsList.map(async (deleteValues) => {
          const request = pool.request();
          const valuesPlaceholder = [];
          for (const [index, entry] of deleteValues.entries()) {
            valuesPlaceholder.push(`@v${index}`);
            request.input(`v${index}`, entry[deleteKey]);
          }
          const query = `DELETE FROM ${escapeTableName(
            table
          )} WHERE [${deleteKey}] IN (${valuesPlaceholder.join(", ")});`;
          return await request.query(query);
        });
        return await Promise.all(queryQueue);
      });
      return await Promise.all(deleteKeyResults);
    })
  );
  return (0, import_utilities.flatten)(queriesResults).reduce(
    (acc, resp) => acc += resp.rowsAffected.reduce((sum, val) => sum += val),
    0
  );
}
async function executeSqlQueryAndPrepareResults(pool, rawQuery, itemIndex) {
  const rawResult = await pool.request().query(rawQuery);
  const { recordsets, rowsAffected } = rawResult;
  if (Array.isArray(recordsets) && recordsets.length > 0) {
    const result = recordsets.length > 1 ? (0, import_utilities.flatten)(recordsets) : recordsets[0];
    return result.map((entry) => ({
      json: entry,
      pairedItem: [{ item: itemIndex }]
    }));
  } else if (rowsAffected && rowsAffected.length > 0) {
    return rowsAffected.map((affectedRows, idx) => ({
      json: {
        message: `Query ${idx + 1} executed successfully`,
        rowsAffected: affectedRows
      },
      pairedItem: [{ item: itemIndex }]
    }));
  } else {
    return [
      {
        json: { message: "Query executed successfully, but no rows were affected" },
        pairedItem: [{ item: itemIndex }]
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configurePool,
  copyInputItem,
  createTableStruct,
  deleteOperation,
  executeQueryQueue,
  executeSqlQueryAndPrepareResults,
  formatColumns,
  insertOperation,
  mssqlChunk,
  updateOperation
});
//# sourceMappingURL=GenericFunctions.js.map