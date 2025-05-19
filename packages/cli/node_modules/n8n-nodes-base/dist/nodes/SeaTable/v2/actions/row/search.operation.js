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
var search_operation_exports = {};
__export(search_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(search_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    displayName: "Column Name or ID",
    name: "searchColumn",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getSearchableColumns"
    },
    required: true,
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Select the column to be searched. Not all column types are supported for search. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.'
  },
  {
    displayName: "Search Term",
    name: "searchTerm",
    type: "string",
    required: true,
    default: "",
    description: "What to look for?"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Case Insensitive Search",
        name: "insensitive",
        type: "boolean",
        default: false,
        description: "Whether the search ignores case sensitivity (true). Otherwise, it distinguishes between uppercase and lowercase characters."
      },
      {
        displayName: "Activate Wildcard Search",
        name: "wildcard",
        type: "boolean",
        default: true,
        description: "Whether the search only results perfect matches (true). Otherwise, it finds a row even if the search value is part of a string (false)."
      },
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
    operation: ["search"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const searchColumn = this.getNodeParameter("searchColumn", index);
  const searchTerm = this.getNodeParameter("searchTerm", index);
  let searchTermString = String(searchTerm);
  const options = this.getNodeParameter("options", index);
  const collaborators = await import_GenericFunctions.getBaseCollaborators.call(this);
  let sqlQuery = `SELECT * FROM \`${tableName}\` WHERE \`${searchColumn}\``;
  if (options.insensitive) {
    searchTermString = searchTermString.toLowerCase();
    sqlQuery = `SELECT * FROM \`${tableName}\` WHERE lower(\`${searchColumn}\`)`;
  }
  const wildcard = options.wildcard ?? true;
  if (wildcard) sqlQuery = sqlQuery + ' LIKE "%' + searchTermString + '%"';
  else if (!wildcard) sqlQuery = sqlQuery + ' = "' + searchTermString + '"';
  const sqlResult = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "POST",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/sql",
    {
      sql: sqlQuery,
      convert_keys: options.convert ?? true
    }
  );
  const metadata = sqlResult.metadata;
  const rows = sqlResult.results;
  rows.map((row) => (0, import_GenericFunctions.enrichColumns)(row, metadata, collaborators));
  if (options.simple) {
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
//# sourceMappingURL=search.operation.js.map