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
var Drive_resource_exports = {};
__export(Drive_resource_exports, {
  create: () => create,
  deleteDrive: () => deleteDrive,
  description: () => description,
  get: () => get,
  list: () => list,
  update: () => update
});
module.exports = __toCommonJS(Drive_resource_exports);
var create = __toESM(require("./create.operation"));
var deleteDrive = __toESM(require("./deleteDrive.operation"));
var get = __toESM(require("./get.operation"));
var list = __toESM(require("./list.operation"));
var update = __toESM(require("./update.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a shared drive",
        action: "Create shared drive"
      },
      {
        name: "Delete",
        value: "deleteDrive",
        description: "Permanently delete a shared drive",
        action: "Delete shared drive"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a shared drive",
        action: "Get shared drive"
      },
      {
        name: "Get Many",
        value: "list",
        description: "Get the list of shared drives",
        action: "Get many shared drives"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a shared drive",
        action: "Update shared drive"
      }
    ],
    default: "create",
    displayOptions: {
      show: {
        resource: ["drive"]
      }
    }
  },
  ...create.description,
  ...deleteDrive.description,
  ...get.description,
  ...list.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteDrive,
  description,
  get,
  list,
  update
});
//# sourceMappingURL=Drive.resource.js.map