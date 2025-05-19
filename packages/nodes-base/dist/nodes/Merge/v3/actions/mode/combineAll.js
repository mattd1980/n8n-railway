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
var combineAll_exports = {};
__export(combineAll_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(combineAll_exports);
var import_merge = __toESM(require("lodash/merge"));
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
const properties = [
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [import_descriptions.clashHandlingProperties, import_descriptions.fuzzyCompareProperty]
  }
];
const displayOptions = {
  show: {
    mode: ["combine"],
    combineBy: ["combineAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputsData) {
  const returnData = [];
  const clashHandling = this.getNodeParameter(
    "options.clashHandling.values",
    0,
    {}
  );
  let input1 = inputsData[0];
  let input2 = inputsData[1];
  if (clashHandling.resolveClash === "preferInput1") {
    [input1, input2] = [input2, input1];
  }
  if (clashHandling.resolveClash === "addSuffix") {
    input1 = (0, import_utils.addSuffixToEntriesKeys)(input1, "1");
    input2 = (0, import_utils.addSuffixToEntriesKeys)(input2, "2");
  }
  const mergeIntoSingleObject = (0, import_utils.selectMergeMethod)(clashHandling);
  if (!input1 || !input2) {
    return [returnData];
  }
  let entry1;
  let entry2;
  for (entry1 of input1) {
    for (entry2 of input2) {
      returnData.push({
        json: {
          ...mergeIntoSingleObject(entry1.json, entry2.json)
        },
        binary: {
          ...(0, import_merge.default)({}, entry1.binary, entry2.binary)
        },
        pairedItem: [entry1.pairedItem, entry2.pairedItem]
      });
    }
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=combineAll.js.map