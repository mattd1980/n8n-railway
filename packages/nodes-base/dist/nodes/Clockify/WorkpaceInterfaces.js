"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var WorkpaceInterfaces_exports = {};
__export(WorkpaceInterfaces_exports, {
  AdminOnlyPages: () => AdminOnlyPages,
  AutomaticLockTypes: () => AutomaticLockTypes,
  DatePeriods: () => DatePeriods,
  DaysOfWeek: () => DaysOfWeek
});
module.exports = __toCommonJS(WorkpaceInterfaces_exports);
const AdminOnlyPages = {
  PROJECT: "PROJECT",
  TEAM: "TEAM",
  REPORTS: "REPORTS"
};
const DaysOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY"
};
const DatePeriods = {
  DAYS: "DAYS",
  WEEKS: "WEEKS",
  MONTHS: "MONTHS"
};
const AutomaticLockTypes = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  OLDER_THAN: "OLDER_THAN"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminOnlyPages,
  AutomaticLockTypes,
  DatePeriods,
  DaysOfWeek
});
//# sourceMappingURL=WorkpaceInterfaces.js.map