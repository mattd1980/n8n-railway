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
var splitOutItems_operation_exports = {};
__export(splitOutItems_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(splitOutItems_operation_exports);
var import_get = __toESM(require("lodash/get"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Fields To Split Out",
    name: "fieldToSplitOut",
    type: "string",
    default: "",
    required: true,
    placeholder: "Drag fields from the left or type their names",
    description: "The name of the input fields to break out into separate items. Separate multiple field names by commas. For binary data, use $binary.",
    requiresDataPath: "multiple"
  },
  {
    displayName: "Include",
    name: "include",
    type: "options",
    options: [
      {
        name: "No Other Fields",
        value: "noOtherFields"
      },
      {
        name: "All Other Fields",
        value: "allOtherFields"
      },
      {
        name: "Selected Other Fields",
        value: "selectedOtherFields"
      }
    ],
    default: "noOtherFields",
    description: "Whether to copy any other fields into the new items"
  },
  {
    displayName: "Fields To Include",
    name: "fieldsToInclude",
    type: "string",
    placeholder: "e.g. email, name",
    requiresDataPath: "multiple",
    description: "Fields in the input items to aggregate together",
    default: "",
    displayOptions: {
      show: {
        include: ["selectedOtherFields"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      import_common.disableDotNotationBoolean,
      {
        displayName: "Destination Field Name",
        name: "destinationFieldName",
        type: "string",
        requiresDataPath: "multiple",
        default: "",
        description: "The field in the output under which to put the split field contents"
      },
      {
        displayName: "Include Binary",
        name: "includeBinary",
        type: "boolean",
        default: false,
        description: "Whether to include the binary data in the new items"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["itemList"],
    operation: ["splitOutItems"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    const fieldsToSplitOut = this.getNodeParameter("fieldToSplitOut", i).split(",").map((field) => field.trim().replace(/^\$json\./, ""));
    const options = this.getNodeParameter("options", i, {});
    const disableDotNotation = options.disableDotNotation;
    const destinationFields = (options.destinationFieldName || "").split(",").filter((field) => field.trim() !== "").map((field) => field.trim());
    if (destinationFields.length && destinationFields.length !== fieldsToSplitOut.length) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "If multiple fields to split out are given, the same number of destination fields must be given"
      );
    }
    const include = this.getNodeParameter("include", i);
    const multiSplit = fieldsToSplitOut.length > 1;
    const item = { ...items[i].json };
    const splited = [];
    for (const [entryIndex, fieldToSplitOut] of fieldsToSplitOut.entries()) {
      const destinationFieldName = destinationFields[entryIndex] || "";
      let entityToSplit = [];
      if (fieldToSplitOut === "$binary") {
        entityToSplit = Object.entries(items[i].binary || {}).map(([key, value]) => ({
          [key]: value
        }));
      } else {
        if (!disableDotNotation) {
          entityToSplit = (0, import_get.default)(item, fieldToSplitOut);
        } else {
          entityToSplit = item[fieldToSplitOut];
        }
        if (entityToSplit === void 0) {
          entityToSplit = [];
        }
        if (typeof entityToSplit !== "object" || entityToSplit === null) {
          entityToSplit = [entityToSplit];
        }
        if (!Array.isArray(entityToSplit)) {
          entityToSplit = Object.values(entityToSplit);
        }
      }
      for (const [elementIndex, element] of entityToSplit.entries()) {
        if (splited[elementIndex] === void 0) {
          splited[elementIndex] = { json: {}, pairedItem: { item: i } };
        }
        const fieldName = destinationFieldName || fieldToSplitOut;
        if (fieldToSplitOut === "$binary") {
          if (splited[elementIndex].binary === void 0) {
            splited[elementIndex].binary = {};
          }
          splited[elementIndex].binary[Object.keys(element)[0]] = Object.values(
            element
          )[0];
          continue;
        }
        if (typeof element === "object" && element !== null && include === "noOtherFields") {
          if (destinationFieldName === "" && !multiSplit) {
            splited[elementIndex] = {
              json: { ...splited[elementIndex].json, ...element },
              pairedItem: { item: i }
            };
          } else {
            splited[elementIndex].json[fieldName] = element;
          }
        } else {
          splited[elementIndex].json[fieldName] = element;
        }
      }
    }
    for (const splitEntry of splited) {
      let newItem = splitEntry;
      if (include === "allOtherFields") {
        const itemCopy = (0, import_n8n_workflow.deepCopy)(item);
        for (const fieldToSplitOut of fieldsToSplitOut) {
          if (!disableDotNotation) {
            (0, import_unset.default)(itemCopy, fieldToSplitOut);
          } else {
            delete itemCopy[fieldToSplitOut];
          }
        }
        newItem.json = { ...itemCopy, ...splitEntry.json };
      }
      if (include === "selectedOtherFields") {
        const fieldsToInclude = (0, import_utils.prepareFieldsArray)(
          this.getNodeParameter("fieldsToInclude", i, ""),
          "Fields To Include"
        );
        if (!fieldsToInclude.length) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No fields specified", {
            description: "Please add a field to include"
          });
        }
        for (const field of fieldsToInclude) {
          if (!disableDotNotation) {
            splitEntry.json[field] = (0, import_get.default)(item, field);
          } else {
            splitEntry.json[field] = item[field];
          }
        }
        newItem = splitEntry;
      }
      const includeBinary = options.includeBinary;
      if (includeBinary) {
        if (items[i].binary && !newItem.binary) {
          newItem.binary = items[i].binary;
        }
      }
      returnData.push(newItem);
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=splitOutItems.operation.js.map