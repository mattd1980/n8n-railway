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
var listSearch_exports = {};
__export(listSearch_exports, {
  searchTables: () => searchTables
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function searchTables() {
  const credentials = await this.getCredentials("mySql");
  const nodeOptions = this.getNodeParameter("options", 0);
  const pool = await import_transport.createPool.call(this, credentials, nodeOptions);
  try {
    const connection = await pool.getConnection();
    const query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = ?";
    const values = [credentials.database];
    const formatedQuery = connection.format(query, values);
    const response = (await connection.query(formatedQuery))[0];
    connection.release();
    const results = response.map((table) => ({
      name: table.table_name || table.TABLE_NAME,
      value: table.table_name || table.TABLE_NAME
    }));
    return { results };
  } finally {
    await pool.end();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchTables
});
//# sourceMappingURL=listSearch.js.map