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
var Folder_resource_exports = {};
__export(Folder_resource_exports, {
  create: () => create,
  deleteFolder: () => deleteFolder,
  description: () => description,
  share: () => share
});
module.exports = __toCommonJS(Folder_resource_exports);
var create = __toESM(require("./create.operation"));
var deleteFolder = __toESM(require("./deleteFolder.operation"));
var share = __toESM(require("./share.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["folder"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a folder",
        action: "Create folder"
      },
      {
        name: "Delete",
        value: "deleteFolder",
        description: "Permanently delete a folder",
        action: "Delete folder"
      },
      {
        name: "Share",
        value: "share",
        description: "Add sharing permissions to a folder",
        action: "Share folder"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...deleteFolder.description,
  ...share.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteFolder,
  description,
  share
});
//# sourceMappingURL=Folder.resource.js.map