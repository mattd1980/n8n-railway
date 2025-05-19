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
var Table_resource_exports = {};
__export(Table_resource_exports, {
  addTable: () => addTable,
  append: () => append,
  convertToRange: () => convertToRange,
  deleteTable: () => deleteTable,
  description: () => description,
  getColumns: () => getColumns,
  getRows: () => getRows,
  lookup: () => lookup
});
module.exports = __toCommonJS(Table_resource_exports);
var addTable = __toESM(require("./addTable.operation"));
var append = __toESM(require("./append.operation"));
var convertToRange = __toESM(require("./convertToRange.operation"));
var deleteTable = __toESM(require("./deleteTable.operation"));
var getColumns = __toESM(require("./getColumns.operation"));
var getRows = __toESM(require("./getRows.operation"));
var lookup = __toESM(require("./lookup.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["table"]
      }
    },
    options: [
      {
        name: "Append",
        value: "append",
        description: "Add rows to the end of the table",
        action: "Append rows to table"
      },
      {
        name: "Convert to Range",
        value: "convertToRange",
        description: "Convert a table to a range",
        action: "Convert to range"
      },
      {
        name: "Create",
        value: "addTable",
        description: "Add a table based on range",
        action: "Create a table"
      },
      {
        name: "Delete",
        value: "deleteTable",
        description: "Delete a table",
        action: "Delete a table"
      },
      {
        name: "Get Columns",
        value: "getColumns",
        description: "Retrieve a list of table columns",
        action: "Get columns"
      },
      {
        name: "Get Rows",
        value: "getRows",
        description: "Retrieve a list of table rows",
        action: "Get rows"
      },
      {
        name: "Lookup",
        value: "lookup",
        description: "Look for rows that match a given value in a column",
        action: "Lookup a column"
      }
    ],
    default: "append"
  },
  ...append.description,
  ...addTable.description,
  ...convertToRange.description,
  ...deleteTable.description,
  ...getColumns.description,
  ...getRows.description,
  ...lookup.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addTable,
  append,
  convertToRange,
  deleteTable,
  description,
  getColumns,
  getRows,
  lookup
});
//# sourceMappingURL=Table.resource.js.map