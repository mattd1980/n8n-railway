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
var removeDuplicates_operation_exports = {};
__export(removeDuplicates_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(removeDuplicates_operation_exports);
var import_get = __toESM(require("lodash/get"));
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_lt = __toESM(require("lodash/lt"));
var import_pick = __toESM(require("lodash/pick"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Compare",
    name: "compare",
    type: "options",
    options: [
      {
        name: "All Fields",
        value: "allFields"
      },
      {
        name: "All Fields Except",
        value: "allFieldsExcept"
      },
      {
        name: "Selected Fields",
        value: "selectedFields"
      }
    ],
    default: "allFields",
    description: "The fields of the input items to compare to see if they are the same"
  },
  {
    displayName: "Fields To Exclude",
    name: "fieldsToExclude",
    type: "string",
    placeholder: "e.g. email, name",
    requiresDataPath: "multiple",
    description: "Fields in the input to exclude from the comparison",
    default: "",
    displayOptions: {
      show: {
        compare: ["allFieldsExcept"]
      }
    }
  },
  {
    displayName: "Fields To Compare",
    name: "fieldsToCompare",
    type: "string",
    placeholder: "e.g. email, name",
    requiresDataPath: "multiple",
    description: "Fields in the input to add to the comparison",
    default: "",
    displayOptions: {
      show: {
        compare: ["selectedFields"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        compare: ["allFieldsExcept", "selectedFields"]
      }
    },
    options: [
      import_common.disableDotNotationBoolean,
      {
        displayName: "Remove Other Fields",
        name: "removeOtherFields",
        type: "boolean",
        default: false,
        description: "Whether to remove any fields that are not being compared. If disabled, will keep the values from the first of the duplicates."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["itemList"],
    operation: ["removeDuplicates"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const compare = this.getNodeParameter("compare", 0);
  const disableDotNotation = this.getNodeParameter(
    "options.disableDotNotation",
    0,
    false
  );
  const removeOtherFields = this.getNodeParameter("options.removeOtherFields", 0, false);
  const nodeVersion = this.getNode().typeVersion;
  let keys = disableDotNotation ? Object.keys(items[0].json) : Object.keys((0, import_utilities.flattenKeys)(items[0].json));
  for (const item of items) {
    for (const key of disableDotNotation ? Object.keys(item.json) : Object.keys((0, import_utilities.flattenKeys)(item.json))) {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
  }
  if (compare === "allFieldsExcept") {
    const fieldsToExclude = (0, import_utils.prepareFieldsArray)(
      this.getNodeParameter("fieldsToExclude", 0, ""),
      "Fields To Exclude"
    );
    if (!fieldsToExclude.length) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
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
      this.getNodeParameter("fieldsToCompare", 0, ""),
      "Fields To Compare"
    );
    if (!fieldsToCompare.length) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
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
      const a_value = disableDotNotation ? a.json[key] : (0, import_get.default)(a.json, key);
      const b_value = disableDotNotation ? b.json[key] : (0, import_get.default)(b.json, key);
      if (nodeVersion >= 3.1) {
        const a_value_tnum = (0, import_utils.typeToNumber)(a_value);
        const b_value_tnum = (0, import_utils.typeToNumber)(b_value);
        if (a_value_tnum !== b_value_tnum) {
          result = a_value_tnum - b_value_tnum;
          break;
        }
      }
      const equal = (0, import_isEqual.default)(a_value, b_value);
      if (!equal) {
        const lessThan = (0, import_lt.default)(a_value, b_value);
        result = lessThan ? -1 : 1;
        break;
      }
    }
    return result;
  });
  for (const key of keys) {
    let type = void 0;
    for (const item of newItems) {
      if (key === "") {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Name of field to compare is blank");
      }
      const value = !disableDotNotation ? (0, import_get.default)(item.json, key) : item.json[key];
      if (value === void 0 && disableDotNotation && key.includes(".")) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `'${key}' field is missing from some input items`,
          {
            description: "If you're trying to use a nested field, make sure you turn off 'disable dot notation' in the node options"
          }
        );
      } else if (value === void 0) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `'${key}' field is missing from some input items`
        );
      }
      if (nodeVersion < 3.1 && type !== void 0 && value !== void 0 && type !== typeof value) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `'${key}' isn't always the same type`, {
          description: "The type of this field varies between items"
        });
      } else {
        type = typeof value;
      }
    }
  }
  const removedIndexes = [];
  let temp = newItems[0];
  for (let index = 1; index < newItems.length; index++) {
    if ((0, import_utilities.compareItems)(newItems[index], temp, keys, disableDotNotation)) {
      removedIndexes.push(newItems[index].json.__INDEX);
    } else {
      temp = newItems[index];
    }
  }
  let returnData = items.filter((_, index) => !removedIndexes.includes(index));
  if (removeOtherFields) {
    returnData = returnData.map((item, index) => ({
      json: (0, import_pick.default)(item.json, ...keys),
      pairedItem: { item: index }
    }));
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=removeDuplicates.operation.js.map