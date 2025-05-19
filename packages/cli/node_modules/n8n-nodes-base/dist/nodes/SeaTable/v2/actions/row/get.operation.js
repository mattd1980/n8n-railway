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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(get_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Simplify",
        name: "simple",
        type: "boolean",
        default: true,
        description: "Whether to return a simplified version of the response instead of the raw data"
      },
      {
        displayName: "Return Column Names",
        name: "convert",
        type: "boolean",
        default: true,
        description: "Whether to return the column keys (false) or the column names (true)"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["row"],
    operation: ["get"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const rowId = this.getNodeParameter("rowId", index);
  const options = this.getNodeParameter("options", index);
  const collaborators = await import_GenericFunctions.getBaseCollaborators.call(this);
  const sqlResult = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "POST",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/sql/",
    {
      sql: `SELECT * FROM \`${tableName}\` WHERE _id = '${rowId}'`,
      convert_keys: options.convert ?? true
    }
  );
  const metadata = sqlResult.metadata;
  const rows = sqlResult.results;
  rows.map((row) => (0, import_GenericFunctions.enrichColumns)(row, metadata, collaborators));
  const simple = options.simple ?? true;
  if (simple) {
    rows.map((row) => (0, import_GenericFunctions.simplify_new)(row));
  }
  return this.helpers.returnJsonArray(rows);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=get.operation.js.map