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
var resourceMapping_exports = {};
__export(resourceMapping_exports, {
  getMappingColumns: () => getMappingColumns
});
module.exports = __toCommonJS(resourceMapping_exports);
var import_transport = require("../../transport");
var import_utils = require("../helpers/utils");
const fieldTypeMapping = {
  string: ["text", "varchar", "character varying", "character", "char"],
  number: [
    "integer",
    "smallint",
    "bigint",
    "decimal",
    "numeric",
    "real",
    "double precision",
    "smallserial",
    "serial",
    "bigserial"
  ],
  boolean: ["boolean"],
  dateTime: [
    "timestamp",
    "date",
    "timestampz",
    "timestamp without time zone",
    "timestamp with time zone"
  ],
  time: ["time", "time without time zone", "time with time zone"],
  object: ["json", "jsonb"],
  options: ["enum", "USER-DEFINED"],
  array: ["ARRAY"]
};
function mapPostgresType(postgresType) {
  let mappedType = "string";
  for (const t of Object.keys(fieldTypeMapping)) {
    const postgresTypes = fieldTypeMapping[t];
    if (postgresTypes?.includes(postgresType)) {
      mappedType = t;
    }
  }
  return mappedType;
}
async function getMappingColumns() {
  const credentials = await this.getCredentials("postgres");
  const { db } = await import_transport.configurePostgres.call(this, credentials);
  const schema = this.getNodeParameter("schema", 0, {
    extractValue: true
  });
  const table = this.getNodeParameter("table", 0, {
    extractValue: true
  });
  const operation = this.getNodeParameter("operation", 0, {
    extractValue: true
  });
  const columns = await (0, import_utils.getTableSchema)(db, schema, table, { getColumnsForResourceMapper: true });
  const unique = operation === "upsert" ? await (0, import_utils.uniqueColumns)(db, table, schema) : [];
  const enumInfo = await (0, import_utils.getEnums)(db);
  const fields = await Promise.all(
    columns.map(async (col) => {
      const canBeUsedToMatch = operation === "upsert" ? unique.some((u) => u.attname === col.column_name) : true;
      const type = mapPostgresType(col.data_type);
      const options = type === "options" ? (0, import_utils.getEnumValues)(enumInfo, col.udt_name) : void 0;
      const hasDefault = Boolean(col.column_default);
      const isGenerated = col.is_generated === "ALWAYS" || ["ALWAYS", "BY DEFAULT"].includes(col.identity_generation ?? "");
      const nullable = col.is_nullable === "YES";
      return {
        id: col.column_name,
        displayName: col.column_name,
        required: !nullable && !hasDefault && !isGenerated,
        defaultMatch: col.column_name === "id" && canBeUsedToMatch || false,
        display: true,
        type,
        canBeUsedToMatch,
        options
      };
    })
  );
  return { fields };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMappingColumns
});
//# sourceMappingURL=resourceMapping.js.map