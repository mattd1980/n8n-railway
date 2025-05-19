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
var channel_exports = {};
__export(channel_exports, {
  create: () => create,
  deleteChannel: () => deleteChannel,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  update: () => update
});
module.exports = __toCommonJS(channel_exports);
var create = __toESM(require("./create.operation"));
var deleteChannel = __toESM(require("./deleteChannel.operation"));
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
        resource: ["channel"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a channel",
        action: "Create channel"
      },
      {
        name: "Delete",
        value: "deleteChannel",
        description: "Delete a channel",
        action: "Delete channel"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a channel",
        action: "Get channel"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many channels",
        action: "Get many channels"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a channel",
        action: "Update channel"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...deleteChannel.description,
  ...get.description,
  ...getAll.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteChannel,
  description,
  get,
  getAll,
  update
});
//# sourceMappingURL=index.js.map