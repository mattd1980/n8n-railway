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
  parseDate: () => parseDate
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
function parseDate(date, options = {}) {
  let parsedDate;
  if (date instanceof import_luxon.DateTime) {
    parsedDate = date;
  } else {
    if (!Number.isNaN(Number(date)) && !options.fromFormat) {
      date = Number(date);
      if (!Number.isInteger(date)) {
        date = date * 1e3;
      }
    }
    let timezone = options.timezone;
    if (Number.isInteger(date)) {
      const timestampLengthInMilliseconds1990 = 12;
      if (date.toString().length < timestampLengthInMilliseconds1990) {
        parsedDate = import_luxon.DateTime.fromSeconds(date);
      } else {
        parsedDate = import_luxon.DateTime.fromMillis(date);
      }
    } else {
      if (!timezone && date.includes("+")) {
        const offset = date.split("+")[1].slice(0, 2);
        timezone = `Etc/GMT-${offset * 1}`;
      }
      if (options.fromFormat) {
        parsedDate = import_luxon.DateTime.fromFormat(date, options.fromFormat);
      } else {
        parsedDate = import_luxon.DateTime.fromISO((0, import_moment_timezone.default)(date).toISOString());
      }
    }
    parsedDate = parsedDate.setZone(timezone || "Etc/UTC");
    if (parsedDate.invalidReason === "unparsable") {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid date format");
    }
  }
  return parsedDate;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseDate
});
//# sourceMappingURL=GenericFunctions.js.map