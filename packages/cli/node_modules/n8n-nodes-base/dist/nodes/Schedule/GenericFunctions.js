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
  intervalToRecurrence: () => intervalToRecurrence,
  recurrenceCheck: () => recurrenceCheck,
  toCronExpression: () => toCronExpression
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
function recurrenceCheck(recurrence, recurrenceRules, timezone) {
  if (!recurrence.activated) return true;
  const intervalSize = recurrence.intervalSize;
  if (!intervalSize) return false;
  const index = recurrence.index;
  const typeInterval = recurrence.typeInterval;
  const lastExecution = recurrenceRules[index];
  const momentTz = import_moment_timezone.default.tz(timezone);
  if (typeInterval === "hours") {
    const hour = momentTz.hour();
    if (lastExecution === void 0 || hour === (intervalSize + lastExecution) % 24) {
      recurrenceRules[index] = hour;
      return true;
    }
  } else if (typeInterval === "days") {
    const dayOfYear = momentTz.dayOfYear();
    if (lastExecution === void 0 || dayOfYear === (intervalSize + lastExecution) % 365) {
      recurrenceRules[index] = dayOfYear;
      return true;
    }
  } else if (typeInterval === "weeks") {
    const week = momentTz.week();
    if (lastExecution === void 0 || // First time executing this rule
    week === (intervalSize + lastExecution) % 52 || // not first time, but minimum interval has passed
    week === lastExecution) {
      recurrenceRules[index] = week;
      return true;
    }
  } else if (typeInterval === "months") {
    const month = momentTz.month();
    if (lastExecution === void 0 || month === (intervalSize + lastExecution) % 12) {
      recurrenceRules[index] = month;
      return true;
    }
  }
  return false;
}
const toCronExpression = (interval) => {
  if (interval.field === "cronExpression") return interval.expression;
  if (interval.field === "seconds") return `*/${interval.secondsInterval} * * * * *`;
  const randomSecond = (0, import_n8n_workflow.randomInt)(0, 60);
  if (interval.field === "minutes") return `${randomSecond} */${interval.minutesInterval} * * * *`;
  const minute = interval.triggerAtMinute ?? (0, import_n8n_workflow.randomInt)(0, 60);
  if (interval.field === "hours")
    return `${randomSecond} ${minute} */${interval.hoursInterval} * * *`;
  const hour = interval.triggerAtHour ?? (0, import_n8n_workflow.randomInt)(0, 24);
  if (interval.field === "days") return `${randomSecond} ${minute} ${hour} * * *`;
  if (interval.field === "weeks") {
    const days = interval.triggerAtDay;
    const daysOfWeek = days.length === 0 ? "*" : days.join(",");
    return `${randomSecond} ${minute} ${hour} * * ${daysOfWeek}`;
  }
  const dayOfMonth = interval.triggerAtDayOfMonth ?? (0, import_n8n_workflow.randomInt)(0, 31);
  return `${randomSecond} ${minute} ${hour} ${dayOfMonth} */${interval.monthsInterval} *`;
};
function intervalToRecurrence(interval, index) {
  let recurrence = { activated: false };
  if (interval.field === "hours") {
    const { hoursInterval } = interval;
    if (hoursInterval !== 1) {
      recurrence = {
        activated: true,
        index,
        intervalSize: hoursInterval,
        typeInterval: "hours"
      };
    }
  }
  if (interval.field === "days") {
    const { daysInterval } = interval;
    if (daysInterval !== 1) {
      recurrence = {
        activated: true,
        index,
        intervalSize: daysInterval,
        typeInterval: "days"
      };
    }
  }
  if (interval.field === "weeks") {
    const { weeksInterval } = interval;
    if (weeksInterval !== 1) {
      recurrence = {
        activated: true,
        index,
        intervalSize: weeksInterval,
        typeInterval: "weeks"
      };
    }
  }
  if (interval.field === "months") {
    const { monthsInterval } = interval;
    if (monthsInterval !== 1) {
      recurrence = {
        activated: true,
        index,
        intervalSize: monthsInterval,
        typeInterval: "months"
      };
    }
  }
  return recurrence;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  intervalToRecurrence,
  recurrenceCheck,
  toCronExpression
});
//# sourceMappingURL=GenericFunctions.js.map