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
var combineByPosition_exports = {};
__export(combineByPosition_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(combineByPosition_exports);
var import_merge = __toESM(require("lodash/merge"));
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
const properties = [
  import_descriptions.numberInputsProperty,
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        ...import_descriptions.clashHandlingProperties,
        default: { values: { resolveClash: "addSuffix" } }
      },
      {
        displayName: "Include Any Unpaired Items",
        name: "includeUnpaired",
        type: "boolean",
        default: false,
        description: "Whether unpaired items should be included in the result when there are differing numbers of items among the inputs"
      }
    ]
  }
];
const displayOptions = {
  show: {
    mode: ["combine"],
    combineBy: ["combineByPosition"]
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
  const includeUnpaired = this.getNodeParameter("options.includeUnpaired", 0, false);
  let preferredInputIndex;
  if (clashHandling?.resolveClash?.includes("preferInput")) {
    preferredInputIndex = Number(clashHandling.resolveClash.replace("preferInput", "")) - 1;
  } else {
    preferredInputIndex = inputsData.length - 1;
  }
  const preferred = inputsData[preferredInputIndex];
  if (clashHandling.resolveClash === "addSuffix") {
    for (const [inputIndex, input] of inputsData.entries()) {
      inputsData[inputIndex] = (0, import_utils.addSuffixToEntriesKeys)(input, String(inputIndex + 1));
    }
  }
  let numEntries;
  if (includeUnpaired) {
    numEntries = Math.max(...inputsData.map((input) => input.length), preferred.length);
  } else {
    numEntries = Math.min(...inputsData.map((input) => input.length), preferred.length);
    if (numEntries === 0) {
      this.addExecutionHints({
        message: 'Consider enabling "Include Any Unpaired Items" in options or check your inputs'
      });
      return [returnData];
    }
  }
  const mergeIntoSingleObject = (0, import_utils.selectMergeMethod)(clashHandling);
  for (let i = 0; i < numEntries; i++) {
    const preferredEntry = preferred[i] ?? {};
    const restEntries = inputsData.map((input) => input[i] ?? {});
    const json = {
      ...mergeIntoSingleObject(
        {},
        ...restEntries.map((entry) => entry.json ?? {}),
        preferredEntry.json ?? {}
      )
    };
    const binary = {
      ...(0, import_merge.default)({}, ...restEntries.map((entry) => entry.binary ?? {}), preferredEntry.binary ?? {})
    };
    const pairedItem = [
      ...restEntries.map((entry) => entry.pairedItem).flat(),
      preferredEntry.pairedItem
    ].filter((item) => item !== void 0);
    returnData.push({ json, binary, pairedItem });
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=combineByPosition.js.map