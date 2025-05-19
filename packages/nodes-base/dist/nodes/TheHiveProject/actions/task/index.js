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
var task_exports = {};
__export(task_exports, {
  create: () => create,
  deleteTask: () => deleteTask,
  description: () => description,
  executeResponder: () => executeResponder,
  get: () => get,
  search: () => search,
  update: () => update
});
module.exports = __toCommonJS(task_exports);
var create = __toESM(require("./create.operation"));
var deleteTask = __toESM(require("./deleteTask.operation"));
var executeResponder = __toESM(require("./executeResponder.operation"));
var get = __toESM(require("./get.operation"));
var search = __toESM(require("./search.operation"));
var update = __toESM(require("./update.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    default: "create",
    type: "options",
    noDataExpression: true,
    required: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a task"
      },
      {
        name: "Delete",
        value: "deleteTask",
        action: "Delete an task"
      },
      {
        name: "Execute Responder",
        value: "executeResponder",
        action: "Execute responder on a task"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a task"
      },
      {
        name: "Search",
        value: "search",
        action: "Search tasks"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a task"
      }
    ],
    displayOptions: {
      show: {
        resource: ["task"]
      }
    }
  },
  ...create.description,
  ...deleteTask.description,
  ...executeResponder.description,
  ...get.description,
  ...search.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteTask,
  description,
  executeResponder,
  get,
  search,
  update
});
//# sourceMappingURL=index.js.map