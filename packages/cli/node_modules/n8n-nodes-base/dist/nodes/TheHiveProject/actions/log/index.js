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
var log_exports = {};
__export(log_exports, {
  addAttachment: () => addAttachment,
  create: () => create,
  deleteAttachment: () => deleteAttachment,
  deleteLog: () => deleteLog,
  description: () => description,
  executeResponder: () => executeResponder,
  get: () => get,
  search: () => search
});
module.exports = __toCommonJS(log_exports);
var addAttachment = __toESM(require("./addAttachment.operation"));
var create = __toESM(require("./create.operation"));
var deleteAttachment = __toESM(require("./deleteAttachment.operation"));
var deleteLog = __toESM(require("./deleteLog.operation"));
var executeResponder = __toESM(require("./executeResponder.operation"));
var get = __toESM(require("./get.operation"));
var search = __toESM(require("./search.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    required: true,
    default: "create",
    options: [
      {
        name: "Add Attachment",
        value: "addAttachment",
        action: "Add attachment to a task log"
      },
      {
        name: "Create",
        value: "create",
        action: "Create a task log"
      },
      {
        name: "Delete",
        value: "deleteLog",
        action: "Delete task log"
      },
      {
        name: "Delete Attachment",
        value: "deleteAttachment",
        action: "Delete attachment from a task log"
      },
      {
        name: "Execute Responder",
        value: "executeResponder",
        action: "Execute responder on a task log"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a task log"
      },
      {
        name: "Search",
        value: "search",
        action: "Search task logs"
      }
    ],
    displayOptions: {
      show: {
        resource: ["log"]
      }
    }
  },
  ...addAttachment.description,
  ...create.description,
  ...deleteAttachment.description,
  ...deleteLog.description,
  ...executeResponder.description,
  ...get.description,
  ...search.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAttachment,
  create,
  deleteAttachment,
  deleteLog,
  description,
  executeResponder,
  get,
  search
});
//# sourceMappingURL=index.js.map