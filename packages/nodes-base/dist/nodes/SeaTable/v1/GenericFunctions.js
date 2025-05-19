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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  columnNamesGlob: () => columnNamesGlob,
  columnNamesToArray: () => columnNamesToArray,
  dtableSchemaColumns: () => dtableSchemaColumns,
  dtableSchemaIsColumn: () => dtableSchemaIsColumn,
  getBaseAccessToken: () => getBaseAccessToken,
  getColumns: () => getColumns,
  getDownloadableColumns: () => getDownloadableColumns,
  getTableColumns: () => getTableColumns,
  getTableViews: () => getTableViews,
  nameOfPredicate: () => nameOfPredicate,
  resolveBaseUri: () => resolveBaseUri,
  rowDeleteInternalColumns: () => rowDeleteInternalColumns,
  rowExport: () => rowExport,
  rowFormatColumns: () => rowFormatColumns,
  rowMapKeyToName: () => rowMapKeyToName,
  rowsFormatColumns: () => rowsFormatColumns,
  rowsSequence: () => rowsSequence,
  seaTableApiRequest: () => seaTableApiRequest,
  setableApiRequestAllItems: () => setableApiRequestAllItems,
  simplify: () => simplify,
  split: () => split,
  updateAble: () => updateAble
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_Schema = require("./Schema");
const userBaseUri = (uri) => {
  if (uri === void 0) {
    return uri;
  }
  if (uri.endsWith("/")) {
    return uri.slice(0, -1);
  }
  return uri;
};
function resolveBaseUri(ctx) {
  return ctx?.credentials?.environment === "cloudHosted" ? "https://cloud.seatable.io" : userBaseUri(ctx?.credentials?.domain);
}
async function getBaseAccessToken(ctx) {
  if (ctx?.base?.access_token !== void 0) {
    return;
  }
  const options = {
    headers: {
      Authorization: `Token ${ctx?.credentials?.token}`
    },
    uri: `${resolveBaseUri(ctx)}/api/v2.1/dtable/app-access-token/`,
    json: true
  };
  ctx.base = await this.helpers.request(options);
}
function endpointCtxExpr(ctx, endpoint) {
  const endpointVariables = {};
  endpointVariables.access_token = ctx?.base?.access_token;
  endpointVariables.dtable_uuid = ctx?.base?.dtable_uuid;
  return endpoint.replace(
    /{{ *(access_token|dtable_uuid|server) *}}/g,
    (match, name) => {
      return endpointVariables[name] || match;
    }
  );
}
async function seaTableApiRequest(ctx, method, endpoint, body = {}, qs = {}, url = void 0, option = {}) {
  const credentials = await this.getCredentials("seaTableApi");
  ctx.credentials = credentials;
  await getBaseAccessToken.call(this, ctx);
  const options = {
    headers: {
      Authorization: `Token ${ctx?.base?.access_token}`
    },
    method,
    qs,
    body,
    uri: url || `${resolveBaseUri(ctx)}${endpointCtxExpr(ctx, endpoint)}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function setableApiRequestAllItems(ctx, propertyName, method, endpoint, body, query) {
  if (query === void 0) {
    query = {};
  }
  const segment = import_Schema.schema.rowFetchSegmentLimit;
  query.start = 0;
  query.limit = segment;
  const returnData = [];
  let responseData;
  do {
    responseData = await seaTableApiRequest.call(
      this,
      ctx,
      method,
      endpoint,
      body,
      query
    );
    returnData.push.apply(returnData, responseData[propertyName]);
    query.start = +query.start + segment;
  } while (responseData && responseData.length > segment - 1);
  return returnData;
}
async function getTableColumns(tableName, ctx = {}) {
  const {
    metadata: { tables }
  } = await seaTableApiRequest.call(
    this,
    ctx,
    "GET",
    "/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata"
  );
  for (const table of tables) {
    if (table.name === tableName) {
      return table.columns;
    }
  }
  return [];
}
async function getTableViews(tableName, ctx = {}) {
  const { views } = await seaTableApiRequest.call(
    this,
    ctx,
    "GET",
    "/dtable-server/api/v1/dtables/{{dtable_uuid}}/views",
    {},
    { table_name: tableName }
  );
  return views;
}
function simplify(data, metadata) {
  return data.results.map((row) => {
    for (const key of Object.keys(row)) {
      if (!key.startsWith("_")) {
        row[metadata[key]] = row[key];
        delete row[key];
      }
    }
    return row;
  });
}
function getColumns(data) {
  return data.metadata.reduce(
    (obj, value) => Object.assign(obj, { [`${value.key}`]: value.name }),
    {}
  );
}
function getDownloadableColumns(data) {
  return data.metadata.filter((row) => ["image", "file"].includes(row.type)).map((row) => row.name);
}
const uniquePredicate = (current, index, all) => all.indexOf(current) === index;
const nonInternalPredicate = (name) => !Object.keys(import_Schema.schema.internalNames).includes(name);
const namePredicate = (name) => (named) => named.name === name;
const nameOfPredicate = (names) => (name) => names.find(namePredicate(name));
const normalize = (subject) => subject ? subject.normalize() : "";
const split = (subject) => normalize(subject).split(/\s*((?:[^\\,]*?(?:\\[\s\S])*)*?)\s*(?:,|$)/).filter((s) => s.length).map((s) => s.replace(/\\([\s\S])/gm, (_, $1) => $1));
function columnNamesToArray(columnNames) {
  return columnNames ? split(columnNames).filter(nonInternalPredicate).filter(uniquePredicate) : [];
}
function columnNamesGlob(columnNames, dtableColumns) {
  const buffer = [];
  const names = dtableColumns.map((c) => c.name).filter(nonInternalPredicate);
  columnNames.forEach((columnName) => {
    if (columnName !== "*") {
      buffer.push(columnName);
      return;
    }
    buffer.push(...names);
  });
  return buffer.filter(uniquePredicate);
}
function rowsSequence(rows) {
  const l = rows.length;
  if (l) {
    const [first] = rows;
    if (first?._seq !== void 0) {
      return;
    }
  }
  for (let i = 0; i < l; ) {
    rows[i]._seq = ++i;
  }
}
function rowDeleteInternalColumns(row) {
  Object.keys(import_Schema.schema.internalNames).forEach((columnName) => delete row[columnName]);
  return row;
}
function rowFormatColumn(input) {
  if (null === input || void 0 === input) {
    return null;
  }
  if (typeof input === "boolean" || typeof input === "number" || typeof input === "string") {
    return input;
  }
  if (Array.isArray(input) && input.every((i) => typeof i === "string")) {
    return input;
  } else if (Array.isArray(input) && input.every((i) => typeof i === "object")) {
    const returnItems = [];
    input.every((i) => returnItems.push(i.display_value));
    return returnItems;
  }
  return null;
}
function rowFormatColumns(row, columnNames) {
  const outRow = {};
  columnNames.forEach((c) => outRow[c] = rowFormatColumn(row[c]));
  return outRow;
}
function rowsFormatColumns(rows, columnNames) {
  rows = rows.map((row) => rowFormatColumns(row, columnNames));
}
function rowMapKeyToName(row, columns) {
  const mappedRow = {};
  Object.keys(import_Schema.schema.internalNames).forEach((key) => {
    if (row[key]) {
      mappedRow[key] = row[key];
      delete row[key];
    }
  });
  Object.keys(row).forEach((key) => {
    const column = columns.find((c) => c.key === key);
    if (column) {
      mappedRow[column.name] = row[key];
    }
  });
  return mappedRow;
}
function rowExport(row, columns) {
  for (const columnName of Object.keys(columns)) {
    if (!columns.find(namePredicate(columnName))) {
      delete row[columnName];
    }
  }
  return row;
}
const dtableSchemaIsColumn = (column) => !!import_Schema.schema.columnTypes[column.type];
const dtableSchemaIsUpdateAbleColumn = (column) => !!import_Schema.schema.columnTypes[column.type] && !import_Schema.schema.nonUpdateAbleColumnTypes[column.type];
const dtableSchemaColumns = (columns) => columns.filter(dtableSchemaIsColumn);
const updateAble = (columns) => columns.filter(dtableSchemaIsUpdateAbleColumn);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  columnNamesGlob,
  columnNamesToArray,
  dtableSchemaColumns,
  dtableSchemaIsColumn,
  getBaseAccessToken,
  getColumns,
  getDownloadableColumns,
  getTableColumns,
  getTableViews,
  nameOfPredicate,
  resolveBaseUri,
  rowDeleteInternalColumns,
  rowExport,
  rowFormatColumns,
  rowMapKeyToName,
  rowsFormatColumns,
  rowsSequence,
  seaTableApiRequest,
  setableApiRequestAllItems,
  simplify,
  split,
  updateAble
});
//# sourceMappingURL=GenericFunctions.js.map