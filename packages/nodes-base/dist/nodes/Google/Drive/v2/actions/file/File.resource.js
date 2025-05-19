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
var File_resource_exports = {};
__export(File_resource_exports, {
  copy: () => copy,
  createFromText: () => createFromText,
  deleteFile: () => deleteFile,
  description: () => description,
  download: () => download,
  move: () => move,
  share: () => share,
  update: () => update,
  upload: () => upload
});
module.exports = __toCommonJS(File_resource_exports);
var copy = __toESM(require("./copy.operation"));
var createFromText = __toESM(require("./createFromText.operation"));
var deleteFile = __toESM(require("./deleteFile.operation"));
var download = __toESM(require("./download.operation"));
var move = __toESM(require("./move.operation"));
var share = __toESM(require("./share.operation"));
var update = __toESM(require("./update.operation"));
var upload = __toESM(require("./upload.operation"));
const description = [
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
        name: "Copy",
        value: "copy",
        description: "Create a copy of an existing file",
        action: "Copy file"
      },
      {
        name: "Create From Text",
        value: "createFromText",
        description: "Create a file from a provided text",
        action: "Create file from text"
      },
      {
        name: "Delete",
        value: "deleteFile",
        description: "Permanently delete a file",
        action: "Delete a file"
      },
      {
        name: "Download",
        value: "download",
        description: "Download a file",
        action: "Download file"
      },
      {
        name: "Move",
        value: "move",
        description: "Move a file to another folder",
        action: "Move file"
      },
      {
        name: "Share",
        value: "share",
        description: "Add sharing permissions to a file",
        action: "Share file"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a file",
        action: "Update file"
      },
      {
        name: "Upload",
        value: "upload",
        description: "Upload an existing file to Google Drive",
        action: "Upload file"
      }
    ],
    default: "upload"
  },
  ...copy.description,
  ...deleteFile.description,
  ...createFromText.description,
  ...download.description,
  ...move.description,
  ...share.description,
  ...update.description,
  ...upload.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copy,
  createFromText,
  deleteFile,
  description,
  download,
  move,
  share,
  update,
  upload
});
//# sourceMappingURL=File.resource.js.map