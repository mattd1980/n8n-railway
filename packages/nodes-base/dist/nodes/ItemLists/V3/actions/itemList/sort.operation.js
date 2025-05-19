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
var sort_operation_exports = {};
__export(sort_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(sort_operation_exports);
var import_get = __toESM(require("lodash/get"));
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_lt = __toESM(require("lodash/lt"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Type",
    name: "type",
    type: "options",
    options: [
      {
        name: "Simple",
        value: "simple"
      },
      {
        name: "Random",
        value: "random"
      },
      {
        name: "Code",
        value: "code"
      }
    ],
    default: "simple",
    description: "The fields of the input items to compare to see if they are the same"
  },
  {
    displayName: "Fields To Sort By",
    name: "sortFieldsUi",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    placeholder: "Add Field To Sort By",
    options: [
      {
        displayName: "",
        name: "sortField",
        values: [
          {
            displayName: "Field Name",
            name: "fieldName",
            type: "string",
            required: true,
            default: "",
            description: "The field to sort by",
            // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
            placeholder: "e.g. id",
            hint: " Enter the field name as text",
            requiresDataPath: "single"
          },
          {
            displayName: "Order",
            name: "order",
            type: "options",
            options: [
              {
                name: "Ascending",
                value: "ascending"
              },
              {
                name: "Descending",
                value: "descending"
              }
            ],
            default: "ascending",
            description: "The order to sort by"
          }
        ]
      }
    ],
    default: {},
    description: "The fields of the input items to compare to see if they are the same",
    displayOptions: {
      show: {
        type: ["simple"]
      }
    }
  },
  {
    displayName: "Code",
    name: "code",
    type: "string",
    typeOptions: {
      alwaysOpenEditWindow: true,
      editor: "jsEditor",
      rows: 10
    },
    default: `// The two items to compare are in the variables a and b
// Access the fields in a.json and b.json
// Return -1 if a should go before b
// Return 1 if b should go before a
// Return 0 if there's no difference

fieldName = 'myField';

if (a.json[fieldName] < b.json[fieldName]) {
return -1;
}
if (a.json[fieldName] > b.json[fieldName]) {
return 1;
}
return 0;`,
    description: "Javascript code to determine the order of any two items",
    displayOptions: {
      show: {
        type: ["code"]
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
        type: ["simple"]
      }
    },
    options: [import_common.disableDotNotationBoolean]
  }
];
const displayOptions = {
  show: {
    resource: ["itemList"],
    operation: ["sort"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  let returnData = [...items];
  const type = this.getNodeParameter("type", 0);
  const disableDotNotation = this.getNodeParameter(
    "options.disableDotNotation",
    0,
    false
  );
  if (type === "random") {
    (0, import_utilities.shuffleArray)(returnData);
    return returnData;
  }
  if (type === "simple") {
    const sortFieldsUi = this.getNodeParameter("sortFieldsUi", 0);
    const sortFields = sortFieldsUi.sortField;
    if (!sortFields?.length) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "No sorting specified. Please add a field to sort by"
      );
    }
    for (const { fieldName } of sortFields) {
      let found = false;
      for (const item of items) {
        if (!disableDotNotation) {
          if ((0, import_get.default)(item.json, fieldName) !== void 0) {
            found = true;
          }
        } else if (item.json.hasOwnProperty(fieldName)) {
          found = true;
        }
      }
      if (!found && disableDotNotation && fieldName.includes(".")) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Couldn't find the field '${fieldName}' in the input data`,
          {
            description: "If you're trying to use a nested field, make sure you turn off 'disable dot notation' in the node options"
          }
        );
      } else if (!found) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Couldn't find the field '${fieldName}' in the input data`
        );
      }
    }
    const sortFieldsWithDirection = sortFields.map((field) => ({
      name: field.fieldName,
      dir: field.order === "ascending" ? 1 : -1
    }));
    returnData.sort((a, b) => {
      let result = 0;
      for (const field of sortFieldsWithDirection) {
        let equal;
        if (!disableDotNotation) {
          const _a = typeof (0, import_get.default)(a.json, field.name) === "string" ? (0, import_get.default)(a.json, field.name).toLowerCase() : (0, import_get.default)(a.json, field.name);
          const _b = typeof (0, import_get.default)(b.json, field.name) === "string" ? (0, import_get.default)(b.json, field.name).toLowerCase() : (0, import_get.default)(b.json, field.name);
          equal = (0, import_isEqual.default)(_a, _b);
        } else {
          const _a = typeof a.json[field.name] === "string" ? a.json[field.name].toLowerCase() : a.json[field.name];
          const _b = typeof b.json[field.name] === "string" ? b.json[field.name].toLowerCase() : b.json[field.name];
          equal = (0, import_isEqual.default)(_a, _b);
        }
        if (!equal) {
          let lessThan;
          if (!disableDotNotation) {
            const _a = typeof (0, import_get.default)(a.json, field.name) === "string" ? (0, import_get.default)(a.json, field.name).toLowerCase() : (0, import_get.default)(a.json, field.name);
            const _b = typeof (0, import_get.default)(b.json, field.name) === "string" ? (0, import_get.default)(b.json, field.name).toLowerCase() : (0, import_get.default)(b.json, field.name);
            lessThan = (0, import_lt.default)(_a, _b);
          } else {
            const _a = typeof a.json[field.name] === "string" ? a.json[field.name].toLowerCase() : a.json[field.name];
            const _b = typeof b.json[field.name] === "string" ? b.json[field.name].toLowerCase() : b.json[field.name];
            lessThan = (0, import_lt.default)(_a, _b);
          }
          if (lessThan) {
            result = -1 * field.dir;
          } else {
            result = 1 * field.dir;
          }
          break;
        }
      }
      return result;
    });
  } else {
    returnData = import_utils.sortByCode.call(this, returnData);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=sort.operation.js.map