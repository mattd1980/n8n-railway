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
var case_exports = {};
__export(case_exports, {
  addAttachment: () => addAttachment,
  create: () => create,
  deleteAttachment: () => deleteAttachment,
  deleteCase: () => deleteCase,
  description: () => description,
  executeResponder: () => executeResponder,
  get: () => get,
  getAttachment: () => getAttachment,
  getTimeline: () => getTimeline,
  search: () => search,
  update: () => update
});
module.exports = __toCommonJS(case_exports);
var addAttachment = __toESM(require("./addAttachment.operation"));
var create = __toESM(require("./create.operation"));
var deleteAttachment = __toESM(require("./deleteAttachment.operation"));
var deleteCase = __toESM(require("./deleteCase.operation"));
var executeResponder = __toESM(require("./executeResponder.operation"));
var get = __toESM(require("./get.operation"));
var getAttachment = __toESM(require("./getAttachment.operation"));
var getTimeline = __toESM(require("./getTimeline.operation"));
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
        name: "Add Attachment",
        value: "addAttachment",
        action: "Add attachment to a case"
      },
      {
        name: "Create",
        value: "create",
        action: "Create a case"
      },
      {
        name: "Delete Attachment",
        value: "deleteAttachment",
        action: "Delete attachment from a case"
      },
      {
        name: "Delete Case",
        value: "deleteCase",
        action: "Delete an case"
      },
      {
        name: "Execute Responder",
        value: "executeResponder",
        action: "Execute responder on a case"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a case"
      },
      {
        name: "Get Attachment",
        value: "getAttachment",
        action: "Get attachment from a case"
      },
      {
        name: "Get Timeline",
        value: "getTimeline",
        action: "Get timeline of a case"
      },
      {
        name: "Search",
        value: "search",
        action: "Search cases"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a case"
      }
    ],
    displayOptions: {
      show: {
        resource: ["case"]
      }
    }
  },
  ...addAttachment.description,
  ...create.description,
  ...deleteAttachment.description,
  ...deleteCase.description,
  ...executeResponder.description,
  ...get.description,
  ...getAttachment.description,
  ...search.description,
  ...getTimeline.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAttachment,
  create,
  deleteAttachment,
  deleteCase,
  description,
  executeResponder,
  get,
  getAttachment,
  getTimeline,
  search,
  update
});
//# sourceMappingURL=index.js.map