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
var Extraction_resource_exports = {};
__export(Extraction_resource_exports, {
  description: () => description,
  getPaginated: () => getPaginated,
  query: () => query,
  scrape: () => scrape
});
module.exports = __toCommonJS(Extraction_resource_exports);
var getPaginated = __toESM(require("./getPaginated.operation"));
var query = __toESM(require("./query.operation"));
var scrape = __toESM(require("./scrape.operation"));
var import_fields = require("../common/fields");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["extraction"]
      }
    },
    options: [
      {
        name: "Query Page",
        value: "query",
        description: "Query a page to extract data or ask a question given the data on the page",
        action: "Query page"
      },
      {
        name: "Query Page with Pagination",
        value: "getPaginated",
        description: "Extract content from paginated or dynamically loaded pages",
        action: "Query page with pagination"
      },
      {
        name: "Smart Scrape",
        value: "scrape",
        description: "Scrape a page and return the data as markdown",
        action: "Smart scrape page"
      }
    ],
    default: "getPaginated"
  },
  ...(0, import_fields.getSessionModeFields)("extraction", ["getPaginated", "query", "scrape"]),
  ...getPaginated.description,
  ...query.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  getPaginated,
  query,
  scrape
});
//# sourceMappingURL=Extraction.resource.js.map