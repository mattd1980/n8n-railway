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
var itemList_exports = {};
__export(itemList_exports, {
  concatenateItems: () => concatenateItems,
  description: () => description,
  limit: () => limit,
  removeDuplicates: () => removeDuplicates,
  sort: () => sort,
  splitOutItems: () => splitOutItems,
  summarize: () => summarize
});
module.exports = __toCommonJS(itemList_exports);
var concatenateItems = __toESM(require("./concatenateItems.operation"));
var limit = __toESM(require("./limit.operation"));
var removeDuplicates = __toESM(require("./removeDuplicates.operation"));
var sort = __toESM(require("./sort.operation"));
var splitOutItems = __toESM(require("./splitOutItems.operation"));
var summarize = __toESM(require("./summarize.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["itemList"]
      }
    },
    options: [
      {
        name: "Concatenate Items",
        value: "concatenateItems",
        description: "Combine fields into a list in a single new item",
        action: "Concatenate Items"
      },
      {
        name: "Limit",
        value: "limit",
        description: "Remove items if there are too many",
        action: "Limit"
      },
      {
        name: "Remove Duplicates",
        value: "removeDuplicates",
        description: "Remove extra items that are similar",
        action: "Remove Duplicates"
      },
      {
        name: "Sort",
        value: "sort",
        description: "Change the item order",
        action: "Sort"
      },
      {
        name: "Split Out Items",
        value: "splitOutItems",
        description: "Turn a list or values of object's properties inside item(s) into separate items",
        action: "Split Out Items"
      },
      {
        name: "Summarize",
        value: "summarize",
        description: "Aggregate items together (pivot table)",
        action: "Summarize"
      }
    ],
    default: "splitOutItems"
  },
  ...concatenateItems.description,
  ...limit.description,
  ...removeDuplicates.description,
  ...sort.description,
  ...splitOutItems.description,
  ...summarize.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  concatenateItems,
  description,
  limit,
  removeDuplicates,
  sort,
  splitOutItems,
  summarize
});
//# sourceMappingURL=index.js.map