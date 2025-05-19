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
  schemaSearch: () => schemaSearch,
  tableSearch: () => tableSearch
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../../transport");
async function schemaSearch() {
  const credentials = await this.getCredentials("postgres");
  const options = { nodeVersion: this.getNode().typeVersion };
  const { db } = await import_transport.configurePostgres.call(this, credentials, options);
  const response = await db.any("SELECT schema_name FROM information_schema.schemata");
  return {
    results: response.map((schema) => ({
      name: schema.schema_name,
      value: schema.schema_name
    }))
  };
}
async function tableSearch() {
  const credentials = await this.getCredentials("postgres");
  const options = { nodeVersion: this.getNode().typeVersion };
  const { db } = await import_transport.configurePostgres.call(this, credentials, options);
  const schema = this.getNodeParameter("schema", 0, {
    extractValue: true
  });
  const response = await db.any(
    "SELECT table_name FROM information_schema.tables WHERE table_schema=$1",
    [schema]
  );
  return {
    results: response.map((table) => ({
      name: table.table_name,
      value: table.table_name
    }))
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  schemaSearch,
  tableSearch
});
//# sourceMappingURL=listSearch.js.map