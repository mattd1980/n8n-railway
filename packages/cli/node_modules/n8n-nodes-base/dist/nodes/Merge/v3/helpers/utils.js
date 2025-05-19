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
  addSourceField: () => addSourceField,
  addSuffixToEntriesKeys: () => addSuffixToEntriesKeys,
  checkInput: () => checkInput,
  checkMatchFieldsInput: () => checkMatchFieldsInput,
  configuredInputs: () => configuredInputs,
  findMatches: () => findMatches,
  getNodeInputsData: () => getNodeInputsData,
  mergeMatched: () => mergeMatched,
  modifySelectQuery: () => modifySelectQuery,
  rowToExecutionData: () => rowToExecutionData,
  selectMergeMethod: () => selectMergeMethod
});
module.exports = __toCommonJS(utils_exports);
var import_assign = __toESM(require("lodash/assign"));
var import_assignWith = __toESM(require("lodash/assignWith"));
var import_get = __toESM(require("lodash/get"));
var import_merge = __toESM(require("lodash/merge"));
var import_mergeWith = __toESM(require("lodash/mergeWith"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
function addSuffixToEntriesKeys(data, suffix) {
  return data.map((entry) => {
    const json = {};
    Object.keys(entry.json).forEach((key) => {
      json[`${key}_${suffix}`] = entry.json[key];
    });
    return { ...entry, json };
  });
}
function findAllMatches(data, lookup, disableDotNotation, isEntriesEqual) {
  return data.reduce((acc, entry2, i) => {
    if (entry2 === void 0) return acc;
    for (const key of Object.keys(lookup)) {
      const expectedValue = lookup[key];
      let entry2FieldValue;
      if (disableDotNotation) {
        entry2FieldValue = entry2.json[key];
      } else {
        entry2FieldValue = (0, import_get.default)(entry2.json, key);
      }
      if (!isEntriesEqual(expectedValue, entry2FieldValue)) {
        return acc;
      }
    }
    return acc.concat({
      entry: entry2,
      index: i
    });
  }, []);
}
function findFirstMatch(data, lookup, disableDotNotation, isEntriesEqual) {
  const index = data.findIndex((entry2) => {
    if (entry2 === void 0) return false;
    for (const key of Object.keys(lookup)) {
      const expectedValue = lookup[key];
      let entry2FieldValue;
      if (disableDotNotation) {
        entry2FieldValue = entry2.json[key];
      } else {
        entry2FieldValue = (0, import_get.default)(entry2.json, key);
      }
      if (!isEntriesEqual(expectedValue, entry2FieldValue)) {
        return false;
      }
    }
    return true;
  });
  if (index === -1) return [];
  return [{ entry: data[index], index }];
}
function findMatches(input1, input2, fieldsToMatch, options) {
  const data1 = [...input1];
  const data2 = [...input2];
  const isEntriesEqual = (0, import_utilities.fuzzyCompare)(options.fuzzyCompare);
  const disableDotNotation = options.disableDotNotation || false;
  const multipleMatches = options.multipleMatches || "all";
  const filteredData = {
    matched: [],
    matched2: [],
    unmatched1: [],
    unmatched2: []
  };
  const matchedInInput2 = /* @__PURE__ */ new Set();
  matchesLoop: for (const entry1 of data1) {
    const lookup = {};
    fieldsToMatch.forEach((matchCase) => {
      let valueToCompare;
      if (disableDotNotation) {
        valueToCompare = entry1.json[matchCase.field1];
      } else {
        valueToCompare = (0, import_get.default)(entry1.json, matchCase.field1);
      }
      lookup[matchCase.field2] = valueToCompare;
    });
    for (const fieldValue of Object.values(lookup)) {
      if (fieldValue === void 0) {
        filteredData.unmatched1.push(entry1);
        continue matchesLoop;
      }
    }
    const foundedMatches = multipleMatches === "all" ? findAllMatches(data2, lookup, disableDotNotation, isEntriesEqual) : findFirstMatch(data2, lookup, disableDotNotation, isEntriesEqual);
    const matches = foundedMatches.map((match) => match.entry);
    foundedMatches.map((match) => matchedInInput2.add(match.index));
    if (matches.length) {
      if (options.outputDataFrom === "both" || options.joinMode === "enrichInput1" || options.joinMode === "enrichInput2") {
        matches.forEach((match) => {
          filteredData.matched.push({
            entry: entry1,
            matches: [match]
          });
        });
      } else {
        filteredData.matched.push({
          entry: entry1,
          matches
        });
      }
    } else {
      filteredData.unmatched1.push(entry1);
    }
  }
  data2.forEach((entry, i) => {
    if (matchedInInput2.has(i)) {
      filteredData.matched2.push(entry);
    } else {
      filteredData.unmatched2.push(entry);
    }
  });
  return filteredData;
}
function selectMergeMethod(clashResolveOptions) {
  const mergeMode = clashResolveOptions.mergeMode;
  if (clashResolveOptions.overrideEmpty) {
    let customizer2 = function(targetValue, srcValue) {
      if (srcValue === void 0 || srcValue === null || srcValue === "") {
        return targetValue;
      }
    };
    var customizer = customizer2;
    if (mergeMode === "deepMerge") {
      return (target, ...source) => {
        const targetCopy = Object.assign({}, target);
        return (0, import_mergeWith.default)(targetCopy, ...source, customizer2);
      };
    }
    if (mergeMode === "shallowMerge") {
      return (target, ...source) => {
        const targetCopy = Object.assign({}, target);
        return (0, import_assignWith.default)(targetCopy, ...source, customizer2);
      };
    }
  } else {
    if (mergeMode === "deepMerge") {
      return (target, ...source) => (0, import_merge.default)({}, target, ...source);
    }
    if (mergeMode === "shallowMerge") {
      return (target, ...source) => (0, import_assign.default)({}, target, ...source);
    }
  }
  return (target, ...source) => (0, import_merge.default)({}, target, ...source);
}
function mergeMatched(matched, clashResolveOptions, joinMode) {
  const returnData = [];
  let resolveClash = clashResolveOptions.resolveClash;
  const mergeIntoSingleObject = selectMergeMethod(clashResolveOptions);
  for (const match of matched) {
    let { entry, matches } = match;
    let json = {};
    let binary = {};
    let pairedItem = [];
    if (resolveClash === "addSuffix") {
      const suffix1 = "1";
      const suffix2 = "2";
      [entry] = addSuffixToEntriesKeys([entry], suffix1);
      matches = addSuffixToEntriesKeys(matches, suffix2);
      json = mergeIntoSingleObject({ ...entry.json }, ...matches.map((item) => item.json));
      binary = mergeIntoSingleObject(
        { ...entry.binary },
        ...matches.map((item) => item.binary)
      );
      pairedItem = [
        ...(0, import_utilities.preparePairedItemDataArray)(entry.pairedItem),
        ...matches.map((item) => (0, import_utilities.preparePairedItemDataArray)(item.pairedItem)).flat()
      ];
    } else {
      const preferInput1 = "preferInput1";
      const preferLast = "preferLast";
      if (resolveClash === void 0) {
        if (joinMode !== "enrichInput2") {
          resolveClash = "preferLast";
        } else {
          resolveClash = "preferInput1";
        }
      }
      if (resolveClash === preferInput1) {
        const [firstMatch, ...restMatches] = matches;
        json = mergeIntoSingleObject(
          { ...firstMatch.json },
          ...restMatches.map((item) => item.json),
          entry.json
        );
        binary = mergeIntoSingleObject(
          { ...firstMatch.binary },
          ...restMatches.map((item) => item.binary),
          entry.binary
        );
        pairedItem = [
          ...(0, import_utilities.preparePairedItemDataArray)(firstMatch.pairedItem),
          ...restMatches.map((item) => (0, import_utilities.preparePairedItemDataArray)(item.pairedItem)).flat(),
          ...(0, import_utilities.preparePairedItemDataArray)(entry.pairedItem)
        ];
      }
      if (resolveClash === preferLast) {
        json = mergeIntoSingleObject({ ...entry.json }, ...matches.map((item) => item.json));
        binary = mergeIntoSingleObject(
          { ...entry.binary },
          ...matches.map((item) => item.binary)
        );
        pairedItem = [
          ...(0, import_utilities.preparePairedItemDataArray)(entry.pairedItem),
          ...matches.map((item) => (0, import_utilities.preparePairedItemDataArray)(item.pairedItem)).flat()
        ];
      }
    }
    returnData.push({
      json,
      binary,
      pairedItem
    });
  }
  return returnData;
}
function checkMatchFieldsInput(data) {
  if (data.length === 1 && data[0].field1 === "" && data[0].field2 === "") {
    throw new import_n8n_workflow.ApplicationError(
      'You need to define at least one pair of fields in "Fields to Match" to match on',
      { level: "warning" }
    );
  }
  for (const [index, pair] of data.entries()) {
    if (pair.field1 === "" || pair.field2 === "") {
      throw new import_n8n_workflow.ApplicationError(
        `You need to define both fields in "Fields to Match" for pair ${index + 1},
				 field 1 = '${pair.field1}'
				 field 2 = '${pair.field2}'`,
        { level: "warning" }
      );
    }
  }
  return data;
}
function checkInput(input, fields, disableDotNotation, inputLabel) {
  for (const field of fields) {
    const isPresent = (input || []).some((entry) => {
      if (disableDotNotation) {
        return entry.json.hasOwnProperty(field);
      }
      return (0, import_get.default)(entry.json, field, void 0) !== void 0;
    });
    if (!isPresent) {
      throw new import_n8n_workflow.ApplicationError(
        `Field '${field}' is not present in any of items in '${inputLabel}'`,
        { level: "warning" }
      );
    }
  }
  return input;
}
function addSourceField(data, sourceField) {
  return data.map((entry) => {
    const json = {
      ...entry.json,
      _source: sourceField
    };
    return {
      ...entry,
      json
    };
  });
}
const configuredInputs = (parameters) => {
  return Array.from({ length: parameters.numberInputs || 2 }, (_, i) => ({
    type: "main",
    displayName: `Input ${(i + 1).toString()}`
  }));
};
function getNodeInputsData() {
  const returnData = [];
  const inputs = import_n8n_workflow.NodeHelpers.getConnectionTypes(this.getNodeInputs()).filter(
    (type) => type === import_n8n_workflow.NodeConnectionTypes.Main
  );
  for (let i = 0; i < inputs.length; i++) {
    try {
      returnData.push(this.getInputData(i) ?? []);
    } catch (error) {
      returnData.push([]);
    }
  }
  return returnData;
}
const rowToExecutionData = (data) => {
  const keys = Object.keys(data);
  const pairedItem = [];
  const json = {};
  for (const key of keys) {
    if (key.startsWith("pairedItem")) {
      if (data[key] === void 0) continue;
      pairedItem.push(data[key]);
    } else {
      json[key] = data[key];
    }
  }
  return { json, pairedItem };
};
function modifySelectQuery(userQuery, inputLength) {
  const selectMatch = userQuery.match(/SELECT\s+(.+?)\s+FROM/i);
  if (!selectMatch) return userQuery;
  let selectedColumns = selectMatch[1].trim();
  if (selectedColumns === "*") {
    return userQuery;
  }
  const pairedItemColumns = [];
  for (let i = 1; i <= inputLength; i++) {
    if (userQuery.includes(`input${i}`)) {
      pairedItemColumns.push(`input${i}.pairedItem AS pairedItem${i}`);
    }
  }
  selectedColumns += pairedItemColumns.length ? ", " + pairedItemColumns.join(", ") : "";
  return userQuery.replace(selectMatch[0], `SELECT ${selectedColumns} FROM`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addSourceField,
  addSuffixToEntriesKeys,
  checkInput,
  checkMatchFieldsInput,
  configuredInputs,
  findMatches,
  getNodeInputsData,
  mergeMatched,
  modifySelectQuery,
  rowToExecutionData,
  selectMergeMethod
});
//# sourceMappingURL=utils.js.map