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
var file_exports = {};
__export(file_exports, {
  del: () => del,
  descriptions: () => descriptions,
  download: () => download,
  getAll: () => getAll,
  update: () => update,
  upload: () => upload
});
module.exports = __toCommonJS(file_exports);
var del = __toESM(require("./del"));
var download = __toESM(require("./download"));
var getAll = __toESM(require("./getAll"));
var update = __toESM(require("./update"));
var upload = __toESM(require("./upload"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["file"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a company file",
        action: "Delete a file"
      },
      {
        name: "Download",
        value: "download",
        description: "Download a company file",
        action: "Download a file"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many company files",
        action: "Get many files"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a company file",
        action: "Update a file"
      },
      {
        name: "Upload",
        value: "upload",
        description: "Upload a company file",
        action: "Upload a file"
      }
    ],
    default: "delete"
  },
  ...del.description,
  ...download.description,
  ...getAll.description,
  ...update.description,
  ...upload.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  del,
  descriptions,
  download,
  getAll,
  update,
  upload
});
//# sourceMappingURL=index.js.map