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
  createConnection: () => createConnection,
  searchTables: () => searchTables
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_promise = __toESM(require("mysql2/promise"));
async function createConnection(credentials) {
  const { ssl, caCertificate, clientCertificate, clientPrivateKey, ...baseCredentials } = credentials;
  if (ssl) {
    baseCredentials.ssl = {};
    if (caCertificate) {
      baseCredentials.ssl.ca = caCertificate;
    }
    if (clientCertificate || clientPrivateKey) {
      baseCredentials.ssl.cert = clientCertificate;
      baseCredentials.ssl.key = clientPrivateKey;
    }
  }
  return await import_promise.default.createConnection(baseCredentials);
}
async function searchTables(tableName) {
  const credentials = await this.getCredentials("mySql");
  const connection = await createConnection(credentials);
  const sql = `SELECT table_name
FROM   information_schema.tables
WHERE  table_schema = ?
AND table_name LIKE ?
ORDER  BY table_name`;
  const values = [credentials.database, `%${tableName ?? ""}%`];
  const [rows] = await connection.query(sql, values);
  const results = rows.map((table) => ({
    name: table.table_name || table.TABLE_NAME,
    value: table.table_name || table.TABLE_NAME
  }));
  await connection.end();
  return { results };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createConnection,
  searchTables
});
//# sourceMappingURL=GenericFunctions.js.map