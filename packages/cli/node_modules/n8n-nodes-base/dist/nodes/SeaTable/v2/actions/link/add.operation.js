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
var add_operation_exports = {};
__export(add_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(add_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Table Name (Source)",
    name: "tableName",
    type: "options",
    placeholder: "Name of table",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTableNameAndId"
    },
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Choose from the list, of specify by using an expression. Provide it in the way "table_name:::table_id".'
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Link Column",
    name: "linkColumn",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getLinkColumns"
    },
    required: true,
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Choose from the list of specify the Link Column by using an expression. You have to provide it in the way "column_name:::link_id:::other_table_id".'
  },
  {
    displayName: "Row ID From the Source Table",
    name: "linkColumnSourceId",
    type: "string",
    required: true,
    default: "",
    description: "Provide the row ID of table you selected"
  },
  {
    displayName: "Row ID From the Target",
    name: "linkColumnTargetId",
    type: "string",
    required: true,
    default: "",
    description: "Provide the row ID of table you want to link"
  }
];
const displayOptions = {
  show: {
    resource: ["link"],
    operation: ["add"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const linkColumn = this.getNodeParameter("linkColumn", index);
  const linkColumnSourceId = this.getNodeParameter("linkColumnSourceId", index);
  const linkColumnTargetId = this.getNodeParameter("linkColumnTargetId", index);
  const body = {
    link_id: linkColumn.split(":::")[1],
    table_id: tableName.split(":::")[1],
    other_table_id: linkColumn.split(":::")[2],
    other_rows_ids_map: {
      [linkColumnSourceId]: [linkColumnTargetId]
    }
  };
  const responseData = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "POST",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/links/",
    body
  );
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=add.operation.js.map