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
var draft_exports = {};
__export(draft_exports, {
  create: () => create,
  delete: () => del,
  description: () => description,
  get: () => get,
  send: () => send,
  update: () => update
});
module.exports = __toCommonJS(draft_exports);
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var send = __toESM(require("./send.operation"));
var update = __toESM(require("./update.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["draft"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new email draft",
        action: "Create a draft"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an email draft",
        action: "Delete a draft"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an email draft",
        action: "Get a draft"
      },
      {
        name: "Send",
        value: "send",
        description: "Send an existing email draft",
        action: "Send a draft"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an email draft",
        action: "Update a draft"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...send.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  delete: null,
  description,
  get,
  send,
  update
});
//# sourceMappingURL=index.js.map