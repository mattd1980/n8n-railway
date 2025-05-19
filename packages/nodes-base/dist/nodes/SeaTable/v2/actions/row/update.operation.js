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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    displayName: "Data to Send",
    name: "fieldsToSend",
    type: "options",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMapInputData",
        description: "Use when node input properties match destination column names"
      },
      {
        name: "Define Below for Each Column",
        value: "defineBelow",
        description: "Set the value for each destination column"
      }
    ],
    default: "defineBelow",
    description: "Whether to insert the input data this node receives in the new row"
  },
  {
    displayName: "Inputs to Ignore",
    name: "inputsToIgnore",
    type: "string",
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["update"],
        fieldsToSend: ["autoMapInputData"]
      }
    },
    default: "",
    description: "List of input properties to avoid sending, separated by commas. Leave empty to send all properties.",
    placeholder: "Enter properties..."
  },
  {
    displayName: "Columns to Send",
    name: "columnsUi",
    placeholder: "Add Column",
    type: "fixedCollection",
    typeOptions: {
      multipleValueButtonText: "Add Column to Send",
      multipleValues: true
    },
    options: [
      {
        displayName: "Column",
        name: "columnValues",
        values: [
          {
            displayName: "Column Name or ID",
            name: "columnName",
            type: "options",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: {
              loadOptionsDependsOn: ["tableName"],
              loadOptionsMethod: "getTableUpdateAbleColumns"
            },
            default: ""
          },
          {
            displayName: "Column Value",
            name: "columnValue",
            type: "string",
            default: ""
          }
        ]
      }
    ],
    displayOptions: {
      show: {
        resource: ["row"],
        operation: ["update"],
        fieldsToSend: ["defineBelow"]
      }
    },
    default: {},
    description: "Add destination column with its value. Provide the value in this way:Date: YYYY-MM-DD or YYYY-MM-DD hh:mmDuration: time in secondsCheckbox: true, on or 1Multi-Select: comma-separated list."
  },
  {
    displayName: "Hint: Link, files, images or digital signatures have to be added separately.",
    name: "notice",
    type: "notice",
    default: ""
  }
];
const displayOptions = {
  show: {
    resource: ["row"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const tableColumns = await import_GenericFunctions.getTableColumns.call(this, tableName);
  const fieldsToSend = this.getNodeParameter("fieldsToSend", index);
  const rowId = this.getNodeParameter("rowId", index);
  let rowInput = {};
  if (fieldsToSend === "autoMapInputData") {
    const items = this.getInputData();
    const incomingKeys = Object.keys(items[index].json);
    const inputDataToIgnore = (0, import_GenericFunctions.split)(this.getNodeParameter("inputsToIgnore", index, ""));
    for (const key of incomingKeys) {
      if (inputDataToIgnore.includes(key)) continue;
      rowInput[key] = items[index].json[key];
    }
  } else {
    const columns = this.getNodeParameter("columnsUi.columnValues", index, []);
    for (const column of columns) {
      rowInput[column.columnName] = column.columnValue;
    }
  }
  rowInput = (0, import_GenericFunctions.rowExport)(rowInput, (0, import_GenericFunctions.updateAble)(tableColumns));
  rowInput = (0, import_GenericFunctions.splitStringColumnsToArrays)(rowInput, tableColumns);
  const body = {
    table_name: tableName,
    updates: [
      {
        row_id: rowId,
        row: rowInput
      }
    ]
  };
  const responseData = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "PUT",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/",
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
//# sourceMappingURL=update.operation.js.map