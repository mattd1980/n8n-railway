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
var mode_exports = {};
__export(mode_exports, {
  append: () => append,
  chooseBranch: () => chooseBranch,
  combineAll: () => combineAll,
  combineByFields: () => combineByFields,
  combineByPosition: () => combineByPosition,
  combineBySql: () => combineBySql,
  description: () => description
});
module.exports = __toCommonJS(mode_exports);
var append = __toESM(require("./append"));
var chooseBranch = __toESM(require("./chooseBranch"));
var combineAll = __toESM(require("./combineAll"));
var combineByFields = __toESM(require("./combineByFields"));
var combineByPosition = __toESM(require("./combineByPosition"));
var combineBySql = __toESM(require("./combineBySql"));
const description = [
  {
    displayName: "Mode",
    name: "mode",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Append",
        value: "append",
        description: "Output items of each input, one after the other"
      },
      {
        name: "Combine",
        value: "combine",
        description: "Merge matching items together"
      },
      {
        name: "SQL Query",
        value: "combineBySql",
        description: "Write a query to do the merge"
      },
      {
        name: "Choose Branch",
        value: "chooseBranch",
        description: "Output data from a specific branch, without modifying it"
      }
    ],
    default: "append",
    description: "How input data should be merged"
  },
  {
    displayName: "Combine By",
    name: "combineBy",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Matching Fields",
        value: "combineByFields",
        description: "Combine items with the same field values"
      },
      {
        name: "Position",
        value: "combineByPosition",
        description: "Combine items based on their order"
      },
      {
        name: "All Possible Combinations",
        value: "combineAll",
        description: "Every pairing of every two items (cross join)"
      }
    ],
    default: "combineByFields",
    description: "How input data should be merged",
    displayOptions: {
      show: { mode: ["combine"] }
    }
  },
  ...append.description,
  ...combineAll.description,
  ...combineByFields.description,
  ...combineBySql.description,
  ...combineByPosition.description,
  ...chooseBranch.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  append,
  chooseBranch,
  combineAll,
  combineByFields,
  combineByPosition,
  combineBySql,
  description
});
//# sourceMappingURL=index.js.map