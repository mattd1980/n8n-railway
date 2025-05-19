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
    displayName: "Table Name",
    name: "tableName",
    type: "options",
    placeholder: "Select a table",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTableNameAndId"
    },
    default: "",
    description: 'Choose from the list, of specify by using an expression. Provide it in the way "table_name:::table_id".'
  },
  {
    displayName: "Link Column",
    name: "linkColumn",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getLinkColumnsWithColumnKey"
    },
    required: true,
    default: "",
    description: 'Choose from the list of specify the Link Column by using an expression. You have to provide it in the way "column_name:::link_id:::other_table_id:::column_key".'
  },
  {
    displayName: "Row ID",
    name: "rowId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getRowIds"
    },
    default: ""
  }
];
const displayOptions = {
  show: {
    resource: ["link"],
    operation: ["list"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const linkColumn = this.getNodeParameter("linkColumn", index);
  const rowId = this.getNodeParameter("rowId", index);
  const responseData = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "POST",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/query-links/",
    {
      table_id: tableName.split(":::")[1],
      link_column_key: linkColumn.split(":::")[3],
      rows: [
        {
          row_id: rowId,
          offset: 0,
          limit: 100
        }
      ]
    }
  );
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=list.operation.js.map