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
var search_exports = {};
__export(search_exports, {
  create: () => create,
  deleteJob: () => deleteJob,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  getResult: () => getResult
});
module.exports = __toCommonJS(search_exports);
var create = __toESM(require("./create.operation"));
var deleteJob = __toESM(require("./deleteJob.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var getResult = __toESM(require("./getResult.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["search"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a search job",
        action: "Create a search job"
      },
      {
        name: "Delete",
        value: "deleteJob",
        description: "Delete a search job",
        action: "Delete a search job"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a search job",
        action: "Get a search job"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many search jobs",
        action: "Get many search jobs"
      },
      {
        name: "Get Result",
        value: "getResult",
        description: "Get the result of a search job",
        action: "Get the result of a search job"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...deleteJob.description,
  ...get.description,
  ...getAll.description,
  ...getResult.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteJob,
  description,
  get,
  getAll,
  getResult
});
//# sourceMappingURL=index.js.map