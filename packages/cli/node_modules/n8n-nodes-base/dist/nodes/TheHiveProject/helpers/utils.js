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
var utils_exports = {};
__export(utils_exports, {
  constructFilter: () => constructFilter,
  fixFieldType: () => fixFieldType,
  prepareInputItem: () => prepareInputItem,
  splitAndTrim: () => splitAndTrim
});
module.exports = __toCommonJS(utils_exports);
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
function splitAndTrim(str) {
  if (typeof str === "string") {
    return str.split(",").map((tag) => tag.trim()).filter((tag) => tag);
  }
  return str;
}
function fixFieldType(fields) {
  const returnData = {};
  for (const key of Object.keys(fields)) {
    if ([
      "date",
      "lastSyncDate",
      "startDate",
      "endDate",
      "dueDate",
      "includeInTimeline",
      "sightedAt"
    ].includes(key)) {
      returnData[key] = Date.parse(fields[key]);
      continue;
    }
    if (["tags", "addTags", "removeTags"].includes(key)) {
      returnData[key] = splitAndTrim(fields[key]);
      continue;
    }
    returnData[key] = fields[key];
  }
  return returnData;
}
function prepareInputItem(item, schema, i) {
  const returnData = {};
  for (const entry of schema) {
    const id = entry.id;
    const value = (0, import_get.default)(item, id);
    if (value !== void 0) {
      (0, import_set.default)(returnData, id, value);
    } else {
      if (entry.required) {
        throw new import_n8n_workflow.ApplicationError(`Required field "${id}" is missing in item ${i}`, {
          level: "warning"
        });
      }
    }
  }
  return returnData;
}
function constructFilter(entry) {
  const { field, value } = entry;
  let { operator } = entry;
  if (operator === void 0) {
    operator = "_eq";
  }
  if (operator === "_between") {
    const { from, to } = entry;
    return {
      _between: {
        _field: field,
        _from: from,
        _to: to
      }
    };
  }
  if (operator === "_in") {
    const { values } = entry;
    return {
      _in: {
        _field: field,
        _values: typeof values === "string" ? splitAndTrim(values) : values
      }
    };
  }
  return {
    [operator]: {
      _field: field,
      _value: value
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  constructFilter,
  fixFieldType,
  prepareInputItem,
  splitAndTrim
});
//# sourceMappingURL=utils.js.map