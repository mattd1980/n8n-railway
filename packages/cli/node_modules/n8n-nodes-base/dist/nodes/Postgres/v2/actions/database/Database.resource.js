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
var Database_resource_exports = {};
__export(Database_resource_exports, {
  deleteTable: () => deleteTable,
  description: () => description,
  executeQuery: () => executeQuery,
  insert: () => insert,
  select: () => select,
  update: () => update,
  upsert: () => upsert
});
module.exports = __toCommonJS(Database_resource_exports);
var deleteTable = __toESM(require("./deleteTable.operation"));
var executeQuery = __toESM(require("./executeQuery.operation"));
var insert = __toESM(require("./insert.operation"));
var select = __toESM(require("./select.operation"));
var update = __toESM(require("./update.operation"));
var upsert = __toESM(require("./upsert.operation"));
var import_common = require("../common.descriptions");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Delete",
        value: "deleteTable",
        description: "Delete an entire table or rows in a table",
        action: "Delete table or rows"
      },
      {
        name: "Execute Query",
        value: "executeQuery",
        description: "Execute an SQL query",
        action: "Execute a SQL query"
      },
      {
        name: "Insert",
        value: "insert",
        description: "Insert rows in a table",
        action: "Insert rows in a table"
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-upsert
        name: "Insert or Update",
        value: "upsert",
        // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-upsert
        description: "Insert or update rows in a table",
        action: "Insert or update rows in a table"
      },
      {
        name: "Select",
        value: "select",
        description: "Select rows from a table",
        action: "Select rows from a table"
      },
      {
        name: "Update",
        value: "update",
        description: "Update rows in a table",
        action: "Update rows in a table"
      }
    ],
    displayOptions: {
      show: {
        resource: ["database"]
      }
    },
    default: "insert"
  },
  { ...import_common.schemaRLC, displayOptions: { hide: { operation: ["executeQuery"] } } },
  { ...import_common.tableRLC, displayOptions: { hide: { operation: ["executeQuery"] } } },
  ...deleteTable.description,
  ...executeQuery.description,
  ...insert.description,
  ...select.description,
  ...update.description,
  ...upsert.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteTable,
  description,
  executeQuery,
  insert,
  select,
  update,
  upsert
});
//# sourceMappingURL=Database.resource.js.map