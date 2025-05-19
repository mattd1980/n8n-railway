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
  addUser: () => addUser,
  create: () => create,
  delete: () => del,
  descriptions: () => descriptions,
  members: () => members,
  restore: () => restore,
  search: () => search,
  statistics: () => statistics
});
module.exports = __toCommonJS(channel_exports);
var addUser = __toESM(require("./addUser"));
var create = __toESM(require("./create"));
var del = __toESM(require("./del"));
var members = __toESM(require("./members"));
var restore = __toESM(require("./restore"));
var search = __toESM(require("./search"));
var statistics = __toESM(require("./statistics"));
const descriptions = [
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
        name: "Add User",
        value: "addUser",
        description: "Add a user to a channel",
        action: "Add a user to a channel"
      },
      {
        name: "Create",
        value: "create",
        description: "Create a new channel",
        action: "Create a channel"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Soft delete a channel",
        action: "Delete a channel"
      },
      {
        name: "Member",
        value: "members",
        description: "Get a page of members for a channel",
        action: "Get a page of members for a channel"
      },
      {
        name: "Restore",
        value: "restore",
        description: "Restores a soft deleted channel",
        action: "Restore a soft-deleted channel"
      },
      {
        name: "Search",
        value: "search",
        description: "Search for a channel",
        action: "Search for a channel"
      },
      {
        name: "Statistics",
        value: "statistics",
        description: "Get statistics for a channel",
        action: "Get statistics for a channel"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...del.description,
  ...members.description,
  ...restore.description,
  ...addUser.description,
  ...statistics.description,
  ...search.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUser,
  create,
  delete: null,
  descriptions,
  members,
  restore,
  search,
  statistics
});
//# sourceMappingURL=index.js.map