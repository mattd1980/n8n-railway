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
  getColumns: () => getColumns,
  getColumnsMultiOptions: () => getColumnsMultiOptions,
  getColumnsWithoutColumnToMatchOn: () => getColumnsWithoutColumnToMatchOn
});
module.exports = __toCommonJS(loadOptions_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function getColumns() {
  const credentials = await this.getCredentials("mySql");
  const nodeOptions = this.getNodeParameter("options", 0);
  const pool = await import_transport.createPool.call(this, credentials, nodeOptions);
  try {
    const connection = await pool.getConnection();
    const table = this.getNodeParameter("table", 0, {
      extractValue: true
    });
    const columns = (await connection.query(
      `SHOW COLUMNS FROM ${(0, import_utils.escapeSqlIdentifier)(table)} FROM ${(0, import_utils.escapeSqlIdentifier)(
        credentials.database
      )}`
    ))[0];
    connection.release();
    return (columns || []).map((column) => ({
      name: column.Field,
      value: column.Field,
      // eslint-disable-next-line n8n-nodes-base/node-param-description-lowercase-first-char
      description: `type: ${column.Type.toUpperCase()}, nullable: ${column.Null}`
    }));
  } finally {
    await pool.end();
  }
}
async function getColumnsMultiOptions() {
  const returnData = await getColumns.call(this);
  const returnAll = { name: "*", value: "*", description: "All columns" };
  return [returnAll, ...returnData];
}
async function getColumnsWithoutColumnToMatchOn() {
  const columnToMatchOn = this.getNodeParameter("columnToMatchOn");
  const returnData = await getColumns.call(this);
  return returnData.filter((column) => column.value !== columnToMatchOn);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getColumns,
  getColumnsMultiOptions,
  getColumnsWithoutColumnToMatchOn
});
//# sourceMappingURL=loadOptions.js.map