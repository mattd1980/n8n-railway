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
var user_exports = {};
__export(user_exports, {
  create: () => create,
  deleteUser: () => deleteUser,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  update: () => update
});
module.exports = __toCommonJS(user_exports);
var create = __toESM(require("./create.operation"));
var deleteUser = __toESM(require("./deleteUser.operation"));
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
        resource: ["user"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an user",
        action: "Create a user"
      },
      {
        name: "Delete",
        value: "deleteUser",
        description: "Delete an user",
        action: "Delete a user"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an user",
        action: "Get a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many users",
        action: "Get many users"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an user",
        action: "Update a user"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...deleteUser.description,
  ...get.description,
  ...getAll.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteUser,
  description,
  get,
  getAll,
  update
});
//# sourceMappingURL=index.js.map