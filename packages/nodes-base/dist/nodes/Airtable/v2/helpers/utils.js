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
  findMatches: () => findMatches,
  flattenOutput: () => flattenOutput,
  processAirtableError: () => processAirtableError,
  removeIgnored: () => removeIgnored
});
module.exports = __toCommonJS(utils_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
function removeIgnored(data, ignore) {
  if (ignore) {
    let ignoreFields = [];
    if (typeof ignore === "string") {
      ignoreFields = ignore.split(",").map((field) => field.trim());
    } else {
      ignoreFields = ignore;
    }
    const newData = {};
    for (const field of Object.keys(data)) {
      if (!ignoreFields.includes(field)) {
        newData[field] = data[field];
      }
    }
    return newData;
  } else {
    return data;
  }
}
function findMatches(data, keys, fields, updateAll) {
  if (updateAll) {
    const matches = data.filter((record) => {
      for (const key of keys) {
        if (record.fields[key] !== fields[key]) {
          return false;
        }
      }
      return true;
    });
    if (!matches?.length) {
      throw new import_n8n_workflow.ApplicationError("No records match provided keys", { level: "warning" });
    }
    return matches;
  } else {
    const match = data.find((record) => {
      for (const key of keys) {
        if (record.fields[key] !== fields[key]) {
          return false;
        }
      }
      return true;
    });
    if (!match) {
      throw new import_n8n_workflow.ApplicationError("Record matching provided keys was not found", {
        level: "warning"
      });
    }
    return [match];
  }
}
function processAirtableError(error, id, itemIndex) {
  if (error.description === "NOT_FOUND" && id) {
    error.description = `${id} is not a valid Record ID`;
  }
  if (error.description?.includes("You must provide an array of up to 10 record objects") && id) {
    error.description = `${id} is not a valid Record ID`;
  }
  if (itemIndex !== void 0) {
    (0, import_set.default)(error, "context.itemIndex", itemIndex);
  }
  return error;
}
const flattenOutput = (record) => {
  const { fields, ...rest } = record;
  return {
    ...rest,
    ...fields
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findMatches,
  flattenOutput,
  processAirtableError,
  removeIgnored
});
//# sourceMappingURL=utils.js.map