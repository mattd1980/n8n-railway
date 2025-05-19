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
var Record_resource_exports = {};
__export(Record_resource_exports, {
  create: () => create,
  deleteRecord: () => deleteRecord,
  description: () => description,
  get: () => get,
  search: () => search,
  update: () => update,
  upsert: () => upsert
});
module.exports = __toCommonJS(Record_resource_exports);
var create = __toESM(require("./create.operation"));
var deleteRecord = __toESM(require("./deleteRecord.operation"));
var get = __toESM(require("./get.operation"));
var search = __toESM(require("./search.operation"));
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
        name: "Create",
        value: "create",
        description: "Create a new record in a table",
        action: "Create a record"
      },
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new record, or update the current one if it already exists (upsert)",
        action: "Create or update a record"
      },
      {
        name: "Delete",
        value: "deleteRecord",
        description: "Delete a record from a table",
        action: "Delete a record"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a record from a table",
        action: "Get a record"
      },
      {
        name: "Search",
        value: "search",
        description: "Search for specific records or list all",
        action: "Search records"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a record in a table",
        action: "Update record"
      }
    ],
    default: "get",
    displayOptions: {
      show: {
        resource: ["record"]
      }
    }
  },
  {
    ...import_common.baseRLC,
    displayOptions: {
      show: {
        resource: ["record"]
      }
    }
  },
  {
    ...import_common.tableRLC,
    displayOptions: {
      show: {
        resource: ["record"]
      }
    }
  },
  ...create.description,
  ...deleteRecord.description,
  ...get.description,
  ...search.description,
  ...update.description,
  ...upsert.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteRecord,
  description,
  get,
  search,
  update,
  upsert
});
//# sourceMappingURL=Record.resource.js.map