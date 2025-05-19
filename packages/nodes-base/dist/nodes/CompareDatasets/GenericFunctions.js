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
  checkInput: () => checkInput,
  checkInputAndThrowError: () => checkInputAndThrowError,
  checkMatchFieldsInput: () => checkMatchFieldsInput,
  findMatches: () => findMatches
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_lodash = require("lodash");
var import_difference = __toESM(require("lodash/difference"));
var import_get = __toESM(require("lodash/get"));
var import_intersection = __toESM(require("lodash/intersection"));
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_omit = __toESM(require("lodash/omit"));
var import_set = __toESM(require("lodash/set"));
var import_union = __toESM(require("lodash/union"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const processNullishValueFunction = (version) => {
  if (version >= 2) {
    return (value) => value === void 0 ? null : value;
  }
  return (value) => value || null;
};
function compareItems(item1, item2, fieldsToMatch, options, skipFields, isEntriesEqual) {
  const keys = {};
  fieldsToMatch.forEach((field) => {
    keys[field.field1] = item1.json[field.field1];
  });
  const keys1 = Object.keys(item1.json);
  const keys2 = Object.keys(item2.json);
  const allUniqueKeys = (0, import_union.default)(keys1, keys2);
  let keysToCompare;
  if (options.fuzzyCompare && options.nodeVersion >= 2.1) {
    keysToCompare = allUniqueKeys;
  } else {
    keysToCompare = (0, import_intersection.default)(keys1, keys2);
  }
  const same = keysToCompare.reduce((acc, key) => {
    if (isEntriesEqual(item1.json[key], item2.json[key])) {
      acc[key] = item1.json[key];
    }
    return acc;
  }, {});
  const sameKeys = Object.keys(same);
  const differentKeys = (0, import_difference.default)(allUniqueKeys, sameKeys);
  const different = {};
  const skipped = {};
  differentKeys.forEach((key, i) => {
    const processNullishValue = processNullishValueFunction(options.nodeVersion);
    switch (options.resolve) {
      case "preferInput1":
        different[key] = processNullishValue(item1.json[key]);
        break;
      case "preferInput2":
        different[key] = processNullishValue(item2.json[key]);
        break;
      default:
        let input1 = processNullishValue(item1.json[key]);
        let input2 = processNullishValue(item2.json[key]);
        let [firstInputName, secondInputName] = ["input1", "input2"];
        if (options.nodeVersion >= 2) {
          [firstInputName, secondInputName] = ["inputA", "inputB"];
        }
        if (options.nodeVersion >= 2.1 && !options.disableDotNotation && !skipFields.some((field) => field === key)) {
          const skippedFieldsWithDotNotation = skipFields.filter(
            (field) => field.startsWith(key) && field.includes(".")
          );
          input1 = (0, import_lodash.cloneDeep)(input1);
          input2 = (0, import_lodash.cloneDeep)(input2);
          if (skippedFieldsWithDotNotation.length && (typeof input1 !== "object" || typeof input2 !== "object")) {
            throw new import_n8n_workflow.ApplicationError(
              `The field '${key}' in item ${i} is not an object. It is not possible to use dot notation.`,
              { level: "warning" }
            );
          }
          if (skipped[key] === void 0 && skippedFieldsWithDotNotation.length) {
            skipped[key] = { [firstInputName]: {}, [secondInputName]: {} };
          }
          for (const skippedField of skippedFieldsWithDotNotation) {
            const nestedField = skippedField.replace(`${key}.`, "");
            (0, import_set.default)(
              skipped[key][firstInputName],
              nestedField,
              (0, import_get.default)(input1, nestedField)
            );
            (0, import_set.default)(
              skipped[key][secondInputName],
              nestedField,
              (0, import_get.default)(input2, nestedField)
            );
            (0, import_unset.default)(input1, nestedField);
            (0, import_unset.default)(input2, nestedField);
          }
          different[key] = { [firstInputName]: input1, [secondInputName]: input2 };
        } else {
          if (skipFields.includes(key)) {
            skipped[key] = { [firstInputName]: input1, [secondInputName]: input2 };
          } else {
            different[key] = { [firstInputName]: input1, [secondInputName]: input2 };
          }
        }
    }
  });
  return {
    json: { keys, same, different, ...!(0, import_isEmpty.default)(skipped) && { skipped } },
    pairedItem: [
      ...(0, import_utilities.preparePairedItemDataArray)(item1.pairedItem),
      ...(0, import_utilities.preparePairedItemDataArray)(item2.pairedItem)
    ]
  };
}
function combineItems(item1, item2, prefer, except, disableDotNotation) {
  let exceptFields;
  const [entry, match] = prefer === "input1" ? [item1, item2] : [item2, item1];
  if (except && Array.isArray(except) && except.length) {
    exceptFields = except;
  } else {
    exceptFields = except ? except.split(",").map((field) => field.trim()) : [];
  }
  exceptFields.forEach((field) => {
    entry.json[field] = match.json[field];
    if (disableDotNotation) {
      entry.json[field] = match.json[field];
    } else {
      const value = (0, import_get.default)(match.json, field) || null;
      (0, import_set.default)(entry, ["json", field], value);
    }
  });
  return entry;
}
function findAllMatches(data, lookup, disableDotNotation, isEntriesEqual) {
  return data.reduce((acc, entry2, i) => {
    if (entry2 === void 0) return acc;
    for (const key of Object.keys(lookup)) {
      const excpectedValue = lookup[key];
      let entry2FieldValue;
      if (disableDotNotation) {
        entry2FieldValue = entry2.json[key];
      } else {
        entry2FieldValue = (0, import_get.default)(entry2.json, key);
      }
      if (!isEntriesEqual(excpectedValue, entry2FieldValue)) {
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
      const excpectedValue = lookup[key];
      let entry2FieldValue;
      if (disableDotNotation) {
        entry2FieldValue = entry2.json[key];
      } else {
        entry2FieldValue = (0, import_get.default)(entry2.json, key);
      }
      if (!isEntriesEqual(excpectedValue, entry2FieldValue)) {
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
  const isEntriesEqual = (0, import_utilities.fuzzyCompare)(
    options.fuzzyCompare,
    options.nodeVersion
  );
  const disableDotNotation = options.disableDotNotation || false;
  const multipleMatches = options.multipleMatches || "first";
  const skipFields = (options.skipFields || "").split(",").map((field) => field.trim());
  if (disableDotNotation && skipFields.some((field) => field.includes("."))) {
    const fieldToSkip = skipFields.find((field) => field.includes("."));
    const msg = `Dot notation is disabled, but field to skip comparing '${fieldToSkip}' contains dot`;
    throw new import_n8n_workflow.ApplicationError(msg, { level: "warning" });
  }
  const filteredData = {
    matched: [],
    unmatched1: [],
    unmatched2: []
  };
  const matchedInInput2 = /* @__PURE__ */ new Set();
  matchesLoop: for (const entry of data1) {
    const lookup = {};
    fieldsToMatch.forEach((matchCase) => {
      let valueToCompare;
      if (disableDotNotation) {
        valueToCompare = entry.json[matchCase.field1];
      } else {
        valueToCompare = (0, import_get.default)(entry.json, matchCase.field1);
      }
      lookup[matchCase.field2] = valueToCompare;
    });
    for (const fieldValue of Object.values(lookup)) {
      if (fieldValue === void 0) {
        filteredData.unmatched1.push(entry);
        continue matchesLoop;
      }
    }
    const foundedMatches = multipleMatches === "all" ? findAllMatches(data2, lookup, disableDotNotation, isEntriesEqual) : findFirstMatch(data2, lookup, disableDotNotation, isEntriesEqual);
    const matches = foundedMatches.map((match) => match.entry);
    foundedMatches.map((match) => matchedInInput2.add(match.index));
    if (matches.length) {
      filteredData.matched.push({ entry, matches });
    } else {
      filteredData.unmatched1.push(entry);
    }
  }
  data2.forEach((entry, i) => {
    if (!matchedInInput2.has(i)) {
      filteredData.unmatched2.push(entry);
    }
  });
  const same = [];
  const different = [];
  filteredData.matched.forEach((entryMatches) => {
    let entryCopy;
    entryMatches.matches.forEach((match) => {
      let entryFromInput1 = entryMatches.entry.json;
      let entryFromInput2 = match.json;
      if (skipFields.length) {
        if (disableDotNotation || !skipFields.some((field) => field.includes("."))) {
          entryFromInput1 = (0, import_omit.default)(entryFromInput1, skipFields);
          entryFromInput2 = (0, import_omit.default)(entryFromInput2, skipFields);
        } else {
          entryFromInput1 = (0, import_lodash.cloneDeep)(entryFromInput1);
          entryFromInput2 = (0, import_lodash.cloneDeep)(entryFromInput2);
          skipFields.forEach((field) => {
            (0, import_unset.default)(entryFromInput1, field);
            (0, import_unset.default)(entryFromInput2, field);
          });
        }
      }
      let isItemsEqual = true;
      if (options.fuzzyCompare) {
        for (const key of Object.keys(entryFromInput1)) {
          if (!isEntriesEqual(entryFromInput1[key], entryFromInput2[key])) {
            isItemsEqual = false;
            break;
          }
        }
      } else {
        isItemsEqual = isEntriesEqual(entryFromInput1, entryFromInput2);
      }
      if (isItemsEqual) {
        if (!entryCopy) {
          if (options.fuzzyCompare && options.resolve === "preferInput2") {
            entryCopy = match;
          } else {
            entryCopy = entryMatches.entry;
          }
        }
      } else {
        switch (options.resolve) {
          case "preferInput1":
            different.push(entryMatches.entry);
            break;
          case "preferInput2":
            different.push(match);
            break;
          case "mix":
            different.push(
              combineItems(
                entryMatches.entry,
                match,
                options.preferWhenMix,
                options.exceptWhenMix,
                disableDotNotation
              )
            );
            break;
          default:
            different.push(
              compareItems(
                entryMatches.entry,
                match,
                fieldsToMatch,
                options,
                skipFields,
                isEntriesEqual
              )
            );
        }
      }
    });
    if (!(0, import_isEmpty.default)(entryCopy)) {
      same.push(entryCopy);
    }
  });
  return [filteredData.unmatched1, same, different, filteredData.unmatched2];
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
function checkInput(input) {
  if (!input) return [];
  if (input.some((item) => (0, import_isEmpty.default)(item.json))) {
    input = input.filter((item) => !(0, import_isEmpty.default)(item.json));
  }
  return input;
}
function checkInputAndThrowError(input, fields, disableDotNotation, inputLabel) {
  if (input.some((item) => (0, import_isEmpty.default)(item.json))) {
    input = input.filter((item) => !(0, import_isEmpty.default)(item.json));
  }
  if (input.length === 0) {
    return input;
  }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkInput,
  checkInputAndThrowError,
  checkMatchFieldsInput,
  findMatches
});
//# sourceMappingURL=GenericFunctions.js.map