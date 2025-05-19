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
  removeDuplicateInputItems: () => removeDuplicateInputItems,
  validateInputData: () => validateInputData
});
module.exports = __toCommonJS(utils_exports);
var import_lodash = require("lodash");
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
var import_utils = require("../utils/utils");
const validateInputData = (node, items, keysToCompare, disableDotNotation) => {
  for (const key of keysToCompare) {
    let type = void 0;
    for (const [i, item] of items.entries()) {
      if (key === "") {
        throw new import_n8n_workflow.NodeOperationError(node, "Name of field to compare is blank");
      }
      const value = !disableDotNotation ? (0, import_get.default)(item.json, key) : item.json[key];
      if (value === null && node.typeVersion > 1) continue;
      if (value === void 0 && disableDotNotation && key.includes(".")) {
        throw new import_n8n_workflow.NodeOperationError(node, `'${key}' field is missing from some input items`, {
          description: "If you're trying to use a nested field, make sure you turn off 'disable dot notation' in the node options"
        });
      } else if (value === void 0) {
        throw new import_n8n_workflow.NodeOperationError(node, `'${key}' field is missing from some input items`);
      }
      if (type !== void 0 && value !== void 0 && type !== typeof value) {
        const description = "The type of this field varies between items" + (node.typeVersion > 1 ? `, in item [${i - 1}] it's a ${type} and in item [${i}] it's a ${typeof value} ` : "");
        throw new import_n8n_workflow.NodeOperationError(node, `'${key}' isn't always the same type`, {
          description
        });
      } else {
        type = typeof value;
      }
    }
  }
};
function removeDuplicateInputItems(context, items) {
  const compare = context.getNodeParameter("compare", 0);
  const disableDotNotation = context.getNodeParameter(
    "options.disableDotNotation",
    0,
    false
  );
  const removeOtherFields = context.getNodeParameter(
    "options.removeOtherFields",
    0,
    false
  );
  let keys = disableDotNotation ? Object.keys(items[0].json) : Object.keys((0, import_utilities.flattenKeys)(items[0].json));
  for (const item of items) {
    const itemKeys = disableDotNotation ? Object.keys(item.json) : Object.keys((0, import_utilities.flattenKeys)(item.json));
    for (const key of itemKeys) {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
  }
  if (compare === "allFieldsExcept") {
    const fieldsToExclude = (0, import_utils.prepareFieldsArray)(
      context.getNodeParameter("fieldsToExclude", 0, ""),
      "Fields To Exclude"
    );
    if (!fieldsToExclude.length) {
      throw new import_n8n_workflow.NodeOperationError(
        context.getNode(),
        "No fields specified. Please add a field to exclude from comparison"
      );
    }
    if (!disableDotNotation) {
      keys = Object.keys((0, import_utilities.flattenKeys)(items[0].json));
    }
    keys = keys.filter((key) => !fieldsToExclude.includes(key));
  }
  if (compare === "selectedFields") {
    const fieldsToCompare = (0, import_utils.prepareFieldsArray)(
      context.getNodeParameter("fieldsToCompare", 0, ""),
      "Fields To Compare"
    );
    if (!fieldsToCompare.length) {
      throw new import_n8n_workflow.NodeOperationError(
        context.getNode(),
        "No fields specified. Please add a field to compare on"
      );
    }
    if (!disableDotNotation) {
      keys = Object.keys((0, import_utilities.flattenKeys)(items[0].json));
    }
    keys = fieldsToCompare.map((key) => key.trim());
  }
  const newItems = items.map(
    (item, index) => ({
      json: { ...item.json, __INDEX: index },
      pairedItem: { item: index }
    })
  );
  newItems.sort((a, b) => {
    let result = 0;
    for (const key of keys) {
      let equal;
      if (!disableDotNotation) {
        equal = (0, import_lodash.isEqual)((0, import_get.default)(a.json, key), (0, import_get.default)(b.json, key));
      } else {
        equal = (0, import_lodash.isEqual)(a.json[key], b.json[key]);
      }
      if (!equal) {
        let lessThan;
        if (!disableDotNotation) {
          lessThan = (0, import_lodash.lt)((0, import_get.default)(a.json, key), (0, import_get.default)(b.json, key));
        } else {
          lessThan = (0, import_lodash.lt)(a.json[key], b.json[key]);
        }
        result = lessThan ? -1 : 1;
        break;
      }
    }
    return result;
  });
  validateInputData(context.getNode(), newItems, keys, disableDotNotation);
  const removedIndexes = [];
  let temp = newItems[0];
  for (let index = 1; index < newItems.length; index++) {
    if ((0, import_utilities.compareItems)(newItems[index], temp, keys, disableDotNotation)) {
      removedIndexes.push(newItems[index].json.__INDEX);
    } else {
      temp = newItems[index];
    }
  }
  let updatedItems = items.filter(
    (_, index) => !removedIndexes.includes(index)
  );
  if (removeOtherFields) {
    updatedItems = updatedItems.map((item, index) => ({
      json: (0, import_lodash.pick)(item.json, ...keys),
      pairedItem: { item: index }
    }));
  }
  return [updatedItems];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeDuplicateInputItems,
  validateInputData
});
//# sourceMappingURL=utils.js.map