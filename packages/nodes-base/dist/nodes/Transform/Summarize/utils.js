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
  NUMERICAL_AGGREGATIONS: () => NUMERICAL_AGGREGATIONS,
  aggregateAndSplitData: () => aggregateAndSplitData,
  checkIfFieldExists: () => checkIfFieldExists,
  fieldValueGetter: () => fieldValueGetter,
  flattenAggregationResultToArray: () => flattenAggregationResultToArray,
  flattenAggregationResultToObject: () => flattenAggregationResultToObject
});
module.exports = __toCommonJS(utils_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
const AggregationDisplayNames = {
  append: "appended_",
  average: "average_",
  concatenate: "concatenated_",
  count: "count_",
  countUnique: "unique_count_",
  max: "max_",
  min: "min_",
  sum: "sum_"
};
const NUMERICAL_AGGREGATIONS = ["average", "sum"];
function isEmpty(value) {
  return value === void 0 || value === null || value === "";
}
function normalizeFieldName(fieldName) {
  return fieldName.replace(/[\]\["]/g, "").replace(/[ .]/g, "_");
}
const fieldValueGetter = (disableDotNotation) => {
  return (item, field) => disableDotNotation ? item[field] : (0, import_get.default)(item, field);
};
function checkIfFieldExists(items, aggregations, getValue) {
  for (const aggregation of aggregations) {
    if (aggregation.field === "") {
      continue;
    }
    const exist = items.some((item) => getValue(item, aggregation.field) !== void 0);
    if (!exist) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The field '${aggregation.field}' does not exist in any items`
      );
    }
  }
}
function aggregate(items, entry, getValue) {
  const { aggregation, field } = entry;
  let data = [...items];
  if (NUMERICAL_AGGREGATIONS.includes(aggregation)) {
    data = data.filter(
      (item) => typeof getValue(item, field) === "number" && !isEmpty(getValue(item, field))
    );
  }
  switch (aggregation) {
    //combine operations
    case "append":
      if (!entry.includeEmpty) {
        data = data.filter((item) => !isEmpty(getValue(item, field)));
      }
      return data.map((item) => getValue(item, field));
    case "concatenate":
      const separateBy = entry.separateBy === "other" ? entry.customSeparator : entry.separateBy;
      if (!entry.includeEmpty) {
        data = data.filter((item) => !isEmpty(getValue(item, field)));
      }
      return data.map((item) => {
        let value = getValue(item, field);
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        if (typeof value === "undefined") {
          value = "undefined";
        }
        return value;
      }).join(separateBy);
    //numerical operations
    case "average":
      return data.reduce((acc, item) => {
        return acc + getValue(item, field);
      }, 0) / data.length;
    case "sum":
      return data.reduce((acc, item) => {
        return acc + getValue(item, field);
      }, 0);
    //comparison operations
    case "min":
      let min;
      for (const item of data) {
        const value = getValue(item, field);
        if (value !== void 0 && value !== null && value !== "") {
          if (min === void 0 || value < min) {
            min = value;
          }
        }
      }
      return min ?? null;
    case "max":
      let max;
      for (const item of data) {
        const value = getValue(item, field);
        if (value !== void 0 && value !== null && value !== "") {
          if (max === void 0 || value > max) {
            max = value;
          }
        }
      }
      return max ?? null;
    //count operations
    case "countUnique":
      if (!entry.includeEmpty) {
        return new Set(data.map((item) => getValue(item, field)).filter((item) => !isEmpty(item))).size;
      }
      return new Set(data.map((item) => getValue(item, field))).size;
    default:
      if (!entry.includeEmpty) {
        return data.filter((item) => !isEmpty(getValue(item, field))).length;
      }
      return data.length;
  }
}
function aggregateData(data, fieldsToSummarize, options, getValue) {
  const returnData = Object.fromEntries(
    fieldsToSummarize.map((aggregation) => {
      const key = normalizeFieldName(
        `${AggregationDisplayNames[aggregation.aggregation]}${aggregation.field}`
      );
      const result = aggregate(data, aggregation, getValue);
      return [key, result];
    })
  );
  if (options.outputFormat === "singleItem") {
    return { returnData };
  }
  return { returnData, pairedItems: data.map((item) => item._itemIndex) };
}
function aggregateAndSplitData({
  splitKeys,
  inputItems,
  fieldsToSummarize,
  options,
  getValue,
  convertKeysToString = false
}) {
  if (!splitKeys?.length) {
    return aggregateData(inputItems, fieldsToSummarize, options, getValue);
  }
  const [firstSplitKey, ...restSplitKeys] = splitKeys;
  const groupedItems = /* @__PURE__ */ new Map();
  for (const item of inputItems) {
    let splitValue = getValue(item, firstSplitKey);
    if (splitValue && typeof splitValue === "object") {
      splitValue = JSON.stringify(splitValue);
    }
    if (convertKeysToString) {
      splitValue = String(splitValue);
    }
    if (options.skipEmptySplitFields && typeof splitValue !== "number" && !splitValue) {
      continue;
    }
    const group = groupedItems.get(splitValue) ?? [];
    groupedItems.set(splitValue, group.concat([item]));
  }
  const splits = new Map(
    Array.from(groupedItems.entries()).map(([groupKey, items]) => [
      groupKey,
      aggregateAndSplitData({
        splitKeys: restSplitKeys,
        inputItems: items,
        fieldsToSummarize,
        options,
        getValue
      })
    ])
  );
  return { fieldName: firstSplitKey, splits };
}
function flattenAggregationResultToObject(result) {
  if ("splits" in result) {
    return Object.fromEntries(
      Array.from(result.splits.entries()).map(([key, value]) => [
        key,
        flattenAggregationResultToObject(value)
      ])
    );
  }
  return result.returnData;
}
function flattenAggregationResultToArray(result) {
  if ("splits" in result) {
    return Array.from(result.splits.entries()).flatMap(
      ([value, innerResult]) => flattenAggregationResultToArray(innerResult).map((v) => {
        v.returnData[normalizeFieldName(result.fieldName)] = value;
        return v;
      })
    );
  }
  return [result];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NUMERICAL_AGGREGATIONS,
  aggregateAndSplitData,
  checkIfFieldExists,
  fieldValueGetter,
  flattenAggregationResultToArray,
  flattenAggregationResultToObject
});
//# sourceMappingURL=utils.js.map