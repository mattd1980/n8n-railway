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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  compareOperationFunctions: () => compareOperationFunctions,
  convertDateTime: () => convertDateTime
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
const isDateObject = (value) => Object.prototype.toString.call(value) === "[object Date]";
const isDateInvalid = (value) => value?.toString() === "Invalid Date";
const compareOperationFunctions = {
  after: (value1, value2) => (value1 || 0) > (value2 || 0),
  before: (value1, value2) => (value1 || 0) < (value2 || 0),
  contains: (value1, value2) => (value1 || "").toString().includes((value2 || "").toString()),
  notContains: (value1, value2) => !(value1 || "").toString().includes((value2 || "").toString()),
  endsWith: (value1, value2) => value1.endsWith(value2),
  notEndsWith: (value1, value2) => !value1.endsWith(value2),
  equal: (value1, value2) => value1 === value2,
  notEqual: (value1, value2) => value1 !== value2,
  larger: (value1, value2) => (value1 || 0) > (value2 || 0),
  largerEqual: (value1, value2) => (value1 || 0) >= (value2 || 0),
  smaller: (value1, value2) => (value1 || 0) < (value2 || 0),
  smallerEqual: (value1, value2) => (value1 || 0) <= (value2 || 0),
  startsWith: (value1, value2) => value1.startsWith(value2),
  notStartsWith: (value1, value2) => !value1.startsWith(value2),
  isEmpty: (value1) => [void 0, null, "", NaN].includes(value1) || (typeof value1 === "object" && value1 !== null && !isDateObject(value1) ? Object.entries(value1).length === 0 : false) || isDateObject(value1) && isDateInvalid(value1),
  isNotEmpty: (value1) => !([void 0, null, "", NaN].includes(value1) || (typeof value1 === "object" && value1 !== null && !isDateObject(value1) ? Object.entries(value1).length === 0 : false) || isDateObject(value1) && isDateInvalid(value1)),
  regex: (value1, value2) => {
    const regexMatch = (value2 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
    let regex;
    if (!regexMatch) {
      regex = new RegExp((value2 || "").toString());
    } else if (regexMatch.length === 1) {
      regex = new RegExp(regexMatch[1]);
    } else {
      regex = new RegExp(regexMatch[1], regexMatch[2]);
    }
    return !!(value1 || "").toString().match(regex);
  },
  notRegex: (value1, value2) => {
    const regexMatch = (value2 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
    let regex;
    if (!regexMatch) {
      regex = new RegExp((value2 || "").toString());
    } else if (regexMatch.length === 1) {
      regex = new RegExp(regexMatch[1]);
    } else {
      regex = new RegExp(regexMatch[1], regexMatch[2]);
    }
    return !(value1 || "").toString().match(regex);
  }
};
const convertDateTime = (node, value) => {
  let returnValue = void 0;
  if (typeof value === "string") {
    returnValue = new Date(value).getTime();
  } else if (typeof value === "number") {
    returnValue = value;
  }
  if (import_moment_timezone.default.isMoment(value)) {
    returnValue = value.unix();
  }
  if (value instanceof Date) {
    returnValue = value.getTime();
  }
  if (returnValue === void 0 || isNaN(returnValue)) {
    throw new import_n8n_workflow.NodeOperationError(node, `The value "${value}" is not a valid DateTime.`);
  }
  return returnValue;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compareOperationFunctions,
  convertDateTime
});
//# sourceMappingURL=GenericFunctions.js.map