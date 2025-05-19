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
var Workbook_resource_exports = {};
__export(Workbook_resource_exports, {
  addWorksheet: () => addWorksheet,
  deleteWorkbook: () => deleteWorkbook,
  description: () => description,
  getAll: () => getAll
});
module.exports = __toCommonJS(Workbook_resource_exports);
var addWorksheet = __toESM(require("./addWorksheet.operation"));
var deleteWorkbook = __toESM(require("./deleteWorkbook.operation"));
var getAll = __toESM(require("./getAll.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["workbook"]
      }
    },
    options: [
      {
        name: "Add Sheet",
        value: "addWorksheet",
        description: "Add a new sheet to the workbook",
        action: "Add a sheet to a workbook"
      },
      {
        name: "Delete",
        value: "deleteWorkbook",
        description: "Delete workbook",
        action: "Delete workbook"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get workbooks",
        action: "Get workbooks"
      }
    ],
    default: "getAll"
  },
  ...addWorksheet.description,
  ...deleteWorkbook.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addWorksheet,
  deleteWorkbook,
  description,
  getAll
});
//# sourceMappingURL=Workbook.resource.js.map