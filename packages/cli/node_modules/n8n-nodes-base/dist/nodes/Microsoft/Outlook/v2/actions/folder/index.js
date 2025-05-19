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
var folder_exports = {};
__export(folder_exports, {
  create: () => create,
  delete: () => del,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  update: () => update
});
module.exports = __toCommonJS(folder_exports);
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var update = __toESM(require("./update.operation"));
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
        description: "Create a mail folder in the root folder of the user's mailbox",
        action: "Create a folder"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a folder",
        action: "Delete a folder"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a folder",
        action: "Get a folder"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many folders",
        action: "Get many folders"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a folder",
        action: "Update a folder"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  delete: null,
  description,
  get,
  getAll,
  update
});
//# sourceMappingURL=index.js.map