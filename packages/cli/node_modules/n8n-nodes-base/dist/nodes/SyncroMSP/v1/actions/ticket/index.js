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
var ticket_exports = {};
__export(ticket_exports, {
  create: () => create,
  delete: () => del,
  descriptions: () => descriptions,
  get: () => get,
  getAll: () => getAll,
  update: () => update
});
module.exports = __toCommonJS(ticket_exports);
var create = __toESM(require("./create"));
var del = __toESM(require("./del"));
var get = __toESM(require("./get"));
var getAll = __toESM(require("./getAll"));
var update = __toESM(require("./update"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ticket"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create new ticket",
        action: "Create a ticket"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete ticket",
        action: "Delete a ticket"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve ticket",
        action: "Get a ticket"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many tickets",
        action: "Get many tickets"
      },
      {
        name: "Update",
        value: "update",
        description: "Update ticket",
        action: "Update a ticket"
      }
    ],
    default: "getAll"
  },
  ...getAll.description,
  ...create.description,
  ...get.description,
  ...del.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  delete: null,
  descriptions,
  get,
  getAll,
  update
});
//# sourceMappingURL=index.js.map