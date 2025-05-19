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
var utils_exports = {};
__export(utils_exports, {
  checkDuplicates: () => checkDuplicates,
  defaultEndDate: () => defaultEndDate,
  defaultStartDate: () => defaultStartDate,
  merge: () => merge,
  prepareDateRange: () => prepareDateRange,
  processFilters: () => processFilters,
  simplify: () => simplify,
  simplifyGA4: () => simplifyGA4,
  sortLoadOptions: () => sortLoadOptions
});
module.exports = __toCommonJS(utils_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
function simplify(responseData) {
  const returnData = [];
  for (const {
    columnHeader: { dimensions, metricHeader },
    data: { rows }
  } of responseData) {
    if (rows === void 0) {
      continue;
    }
    const metrics = metricHeader.metricHeaderEntries.map((entry) => entry.name);
    for (const row of rows) {
      const rowDimensions = {};
      const rowMetrics = {};
      if (dimensions) {
        for (let i = 0; i < dimensions.length; i++) {
          rowDimensions[dimensions[i]] = row.dimensions[i];
          for (const [index, metric] of metrics.entries()) {
            rowMetrics[metric] = row.metrics[0].values[index];
          }
        }
      } else {
        for (const [index, metric] of metrics.entries()) {
          rowMetrics[metric] = row.metrics[0].values[index];
        }
      }
      returnData.push({ ...rowDimensions, ...rowMetrics });
    }
  }
  return returnData;
}
function merge(responseData) {
  const response = {
    columnHeader: responseData[0].columnHeader,
    data: responseData[0].data
  };
  const allRows = [];
  for (const {
    data: { rows }
  } of responseData) {
    allRows.push(...rows);
  }
  response.data.rows = allRows;
  return [response];
}
function simplifyGA4(response) {
  if (!response.rows) return [];
  const dimensionHeaders = (response.dimensionHeaders || []).map(
    (header) => header.name
  );
  const metricHeaders = (response.metricHeaders || []).map(
    (header) => header.name
  );
  const returnData = [];
  response.rows.forEach((row) => {
    if (!row) return;
    const rowDimensions = {};
    const rowMetrics = {};
    dimensionHeaders.forEach((dimension, index) => {
      rowDimensions[dimension] = row.dimensionValues[index].value;
    });
    metricHeaders.forEach((metric, index) => {
      rowMetrics[metric] = row.metricValues[index].value;
    });
    returnData.push({ ...rowDimensions, ...rowMetrics });
  });
  return returnData;
}
function processFilters(expression) {
  const processedFilters = [];
  Object.entries(expression).forEach((entry) => {
    const [filterType, filters] = entry;
    filters.forEach((filter) => {
      let fieldName = "";
      switch (filter.listName) {
        case "other":
          fieldName = filter.name;
          delete filter.name;
          break;
        case "custom":
          fieldName = filter.name;
          delete filter.name;
          break;
        default:
          fieldName = filter.listName;
      }
      delete filter.listName;
      if (filterType === "inListFilter") {
        filter.values = filter.values.split(",");
      }
      if (filterType === "numericFilter") {
        filter.value = {
          [filter.valueType]: filter.value
        };
        delete filter.valueType;
      }
      if (filterType === "betweenFilter") {
        filter.fromValue = {
          [filter.valueType]: filter.fromValue
        };
        filter.toValue = {
          [filter.valueType]: filter.toValue
        };
        delete filter.valueType;
      }
      processedFilters.push({
        filter: {
          fieldName,
          [filterType]: filter
        }
      });
    });
  });
  return processedFilters;
}
function prepareDateRange(period, itemIndex) {
  const dateRanges = [];
  switch (period) {
    case "today":
      dateRanges.push({
        startDate: import_luxon.DateTime.local().startOf("day").toISODate(),
        endDate: import_luxon.DateTime.now().toISODate()
      });
      break;
    case "yesterday":
      dateRanges.push({
        startDate: import_luxon.DateTime.local().startOf("day").minus({ days: 1 }).toISODate(),
        endDate: import_luxon.DateTime.local().endOf("day").minus({ days: 1 }).toISODate()
      });
      break;
    case "lastCalendarWeek":
      const begginingOfLastWeek = import_luxon.DateTime.local().startOf("week").minus({ weeks: 1 }).toISODate();
      const endOfLastWeek = import_luxon.DateTime.local().endOf("week").minus({ weeks: 1 }).toISODate();
      dateRanges.push({
        startDate: begginingOfLastWeek,
        endDate: endOfLastWeek
      });
      break;
    case "lastCalendarMonth":
      const begginingOfLastMonth = import_luxon.DateTime.local().startOf("month").minus({ months: 1 }).toISODate();
      const endOfLastMonth = import_luxon.DateTime.local().endOf("month").minus({ months: 1 }).toISODate();
      dateRanges.push({
        startDate: begginingOfLastMonth,
        endDate: endOfLastMonth
      });
      break;
    case "last7days":
      dateRanges.push({
        startDate: import_luxon.DateTime.now().minus({ days: 7 }).toISODate(),
        endDate: import_luxon.DateTime.now().toISODate()
      });
      break;
    case "last30days":
      dateRanges.push({
        startDate: import_luxon.DateTime.now().minus({ days: 30 }).toISODate(),
        endDate: import_luxon.DateTime.now().toISODate()
      });
      break;
    case "custom":
      const start = import_luxon.DateTime.fromISO(this.getNodeParameter("startDate", itemIndex, ""));
      const end = import_luxon.DateTime.fromISO(this.getNodeParameter("endDate", itemIndex, ""));
      if (start > end) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Parameter Start: ${start.toISO()} cannot be after End: ${end.toISO()}`
        );
      }
      dateRanges.push({
        startDate: start.toISODate(),
        endDate: end.toISODate()
      });
      break;
    default:
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The period '${period}' is not supported, to specify own period use 'custom' option`
      );
  }
  return dateRanges;
}
const defaultStartDate = () => import_luxon.DateTime.now().startOf("day").minus({ days: 8 }).toISO();
const defaultEndDate = () => import_luxon.DateTime.now().startOf("day").minus({ days: 1 }).toISO();
function checkDuplicates(data, key, type) {
  const fields = data.map((item) => item[key]);
  const duplicates = fields.filter((field, i) => fields.indexOf(field) !== i);
  const unique = Array.from(new Set(duplicates));
  if (unique.length) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `A ${type} is specified more than once (${unique.join(", ")})`
    );
  }
}
function sortLoadOptions(data) {
  const returnData = [...data];
  returnData.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkDuplicates,
  defaultEndDate,
  defaultStartDate,
  merge,
  prepareDateRange,
  processFilters,
  simplify,
  simplifyGA4,
  sortLoadOptions
});
//# sourceMappingURL=utils.js.map