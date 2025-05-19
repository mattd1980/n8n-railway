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
var Worksheet_resource_exports = {};
__export(Worksheet_resource_exports, {
  append: () => append,
  clear: () => clear,
  deleteWorksheet: () => deleteWorksheet,
  description: () => description,
  getAll: () => getAll,
  readRows: () => readRows,
  update: () => update,
  upsert: () => upsert
});
module.exports = __toCommonJS(Worksheet_resource_exports);
var append = __toESM(require("./append.operation"));
var clear = __toESM(require("./clear.operation"));
var deleteWorksheet = __toESM(require("./deleteWorksheet.operation"));
var getAll = __toESM(require("./getAll.operation"));
var readRows = __toESM(require("./readRows.operation"));
var update = __toESM(require("./update.operation"));
var upsert = __toESM(require("./upsert.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["worksheet"]
      }
    },
    options: [
      {
        name: "Append",
        value: "append",
        description: "Append data to sheet",
        action: "Append data to sheet"
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-upsert
        name: "Append or Update",
        value: "upsert",
        // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-upsert
        description: "Append a new row or update the current one if it already exists (upsert)",
        action: "Append or update a sheet"
      },
      {
        name: "Clear",
        value: "clear",
        description: "Clear sheet",
        action: "Clear sheet"
      },
      {
        name: "Delete",
        value: "deleteWorksheet",
        description: "Delete sheet",
        action: "Delete sheet"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get a list of sheets",
        action: "Get sheets"
      },
      {
        name: "Get Rows",
        value: "readRows",
        description: "Retrieve a list of sheet rows",
        action: "Get rows from sheet"
      },
      {
        name: "Update",
        value: "update",
        description: "Update rows of a sheet or sheet range",
        action: "Update sheet"
      }
    ],
    default: "getAll"
  },
  ...append.description,
  ...clear.description,
  ...deleteWorksheet.description,
  ...getAll.description,
  ...readRows.description,
  ...update.description,
  ...upsert.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  append,
  clear,
  deleteWorksheet,
  description,
  getAll,
  readRows,
  update,
  upsert
});
//# sourceMappingURL=Worksheet.resource.js.map