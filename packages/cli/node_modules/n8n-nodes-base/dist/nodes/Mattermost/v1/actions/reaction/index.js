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
var reaction_exports = {};
__export(reaction_exports, {
  create: () => create,
  delete: () => del,
  descriptions: () => descriptions,
  getAll: () => getAll
});
module.exports = __toCommonJS(reaction_exports);
var create = __toESM(require("./create"));
var del = __toESM(require("./del"));
var getAll = __toESM(require("./getAll"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["reaction"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Add a reaction to a post",
        action: "Create a reaction"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Remove a reaction from a post",
        action: "Delete a reaction"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many reactions to one or more posts",
        action: "Get many reactions"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...del.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  delete: null,
  descriptions,
  getAll
});
//# sourceMappingURL=index.js.map