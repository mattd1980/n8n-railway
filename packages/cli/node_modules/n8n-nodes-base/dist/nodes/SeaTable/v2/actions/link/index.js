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
var link_exports = {};
__export(link_exports, {
  add: () => add,
  descriptions: () => descriptions,
  list: () => list,
  remove: () => remove
});
module.exports = __toCommonJS(link_exports);
var add = __toESM(require("./add.operation"));
var list = __toESM(require("./list.operation"));
var remove = __toESM(require("./remove.operation"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["link"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Create a link between two rows in a link column",
        action: "Add a row link"
      },
      {
        name: "List",
        value: "list",
        description: "List all links of a specific row",
        action: "List row links"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a link between two rows from a link column",
        action: "Remove a row link"
      }
    ],
    default: "add"
  },
  ...add.description,
  ...list.description,
  ...remove.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  descriptions,
  list,
  remove
});
//# sourceMappingURL=index.js.map