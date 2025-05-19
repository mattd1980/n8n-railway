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
var report_exports = {};
__export(report_exports, {
  create: () => create,
  deleteReport: () => deleteReport,
  description: () => description,
  get: () => get,
  getAll: () => getAll
});
module.exports = __toCommonJS(report_exports);
var create = __toESM(require("./create.operation"));
var deleteReport = __toESM(require("./deleteReport.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["report"]
      }
    },
    options: [
      {
        name: "Create From Search",
        value: "create",
        description: "Create a search report from a search job",
        action: "Create a search report"
      },
      {
        name: "Delete",
        value: "deleteReport",
        description: "Delete a search report",
        action: "Delete a search report"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a search report",
        action: "Get a search report"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many search reports",
        action: "Get many search reports"
      }
    ],
    default: "getAll"
  },
  ...create.description,
  ...deleteReport.description,
  ...get.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteReport,
  description,
  get,
  getAll
});
//# sourceMappingURL=index.js.map