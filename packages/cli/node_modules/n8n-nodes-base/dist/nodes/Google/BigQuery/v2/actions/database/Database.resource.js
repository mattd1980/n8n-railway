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
  description: () => description,
  executeQuery: () => executeQuery,
  insert: () => insert
});
module.exports = __toCommonJS(Database_resource_exports);
var executeQuery = __toESM(require("./executeQuery.operation"));
var insert = __toESM(require("./insert.operation"));
var import_RLC = require("../commonDescriptions/RLC.description");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["database"]
      }
    },
    options: [
      {
        name: "Execute Query",
        value: "executeQuery",
        description: "Execute a SQL query",
        action: "Execute a SQL query"
      },
      {
        name: "Insert",
        value: "insert",
        description: "Insert rows in a table",
        action: "Insert rows in a table"
      }
    ],
    default: "executeQuery"
  },
  {
    ...import_RLC.projectRLC,
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["executeQuery", "insert"]
      }
    }
  },
  {
    ...import_RLC.datasetRLC,
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["insert"]
      }
    }
  },
  {
    ...import_RLC.tableRLC,
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["insert"]
      }
    }
  },
  ...executeQuery.description,
  ...insert.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  executeQuery,
  insert
});
//# sourceMappingURL=Database.resource.js.map