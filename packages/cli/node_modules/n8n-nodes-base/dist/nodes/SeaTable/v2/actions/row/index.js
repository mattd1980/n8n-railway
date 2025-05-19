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
var row_exports = {};
__export(row_exports, {
  create: () => create,
  descriptions: () => descriptions,
  get: () => get,
  list: () => list,
  lock: () => lock,
  remove: () => remove,
  search: () => search,
  unlock: () => unlock,
  update: () => update
});
module.exports = __toCommonJS(row_exports);
var create = __toESM(require("./create.operation"));
var get = __toESM(require("./get.operation"));
var list = __toESM(require("./list.operation"));
var lock = __toESM(require("./lock.operation"));
var remove = __toESM(require("./remove.operation"));
var search = __toESM(require("./search.operation"));
var import_sharedProperties = require("./sharedProperties");
var unlock = __toESM(require("./unlock.operation"));
var update = __toESM(require("./update.operation"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["row"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new row",
        action: "Create a row"
      },
      {
        name: "Delete",
        value: "remove",
        description: "Delete a row",
        action: "Delete a row"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the content of a row",
        action: "Get a row"
      },
      {
        name: "Get Many",
        value: "list",
        description: "Get many rows from a table or a table view",
        action: "Get many rows"
      },
      {
        name: "Lock",
        value: "lock",
        description: "Lock a row to prevent further changes",
        action: "Add a row lock"
      },
      {
        name: "Search",
        value: "search",
        description: "Search one or multiple rows",
        action: "Search a row by keyword"
      },
      {
        name: "Unlock",
        value: "unlock",
        description: "Remove the lock from a row",
        action: "Remove a row lock"
      },
      {
        name: "Update",
        value: "update",
        description: "Update the content of a row",
        action: "Update a row"
      }
    ],
    default: "create"
  },
  ...import_sharedProperties.sharedProperties,
  ...create.description,
  ...get.description,
  ...list.description,
  ...search.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  descriptions,
  get,
  list,
  lock,
  remove,
  search,
  unlock,
  update
});
//# sourceMappingURL=index.js.map