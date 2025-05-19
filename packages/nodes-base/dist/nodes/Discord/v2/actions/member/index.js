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
var member_exports = {};
__export(member_exports, {
  description: () => description,
  getAll: () => getAll,
  roleAdd: () => roleAdd,
  roleRemove: () => roleRemove
});
module.exports = __toCommonJS(member_exports);
var getAll = __toESM(require("./getAll.operation"));
var roleAdd = __toESM(require("./roleAdd.operation"));
var roleRemove = __toESM(require("./roleRemove.operation"));
var import_common = require("../common.description");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["member"],
        authentication: ["botToken", "oAuth2"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve the members of a server",
        action: "Get many members"
      },
      {
        name: "Role Add",
        value: "roleAdd",
        description: "Add a role to a member",
        action: "Add a role to a member"
      },
      {
        name: "Role Remove",
        value: "roleRemove",
        description: "Remove a role from a member",
        action: "Remove a role from a member"
      }
    ],
    default: "getAll"
  },
  {
    ...import_common.guildRLC,
    displayOptions: {
      show: {
        resource: ["member"],
        authentication: ["botToken", "oAuth2"]
      }
    }
  },
  ...getAll.description,
  ...roleAdd.description,
  ...roleRemove.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  getAll,
  roleAdd,
  roleRemove
});
//# sourceMappingURL=index.js.map