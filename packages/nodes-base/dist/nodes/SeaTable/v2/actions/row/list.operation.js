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
var list_operation_exports = {};
__export(list_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(list_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "View Name",
    name: "viewName",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getTableViews"
    },
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'The name of SeaTable view to access, or specify by using an expression. Provide it in the way "col.name:::col.type".'
  },
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
    operation: ["list"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const viewName = this.getNodeParameter("viewName", index);
  const options = this.getNodeParameter("options", index);
  const collaborators = await import_GenericFunctions.getBaseCollaborators.call(this);
  const requestMeta = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/metadata/"
  );
  const requestRows = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/",
    {},
    {
      table_name: tableName,
      view_name: viewName,
      limit: 1e3,
      convert_keys: options.convert ?? true
    }
  );
  const metadata = requestMeta.metadata.tables.find((table) => table.name === tableName)?.columns ?? [];
  const rows = requestRows.rows;
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
//# sourceMappingURL=list.operation.js.map