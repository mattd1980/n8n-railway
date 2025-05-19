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
var RemoveDuplicatesV2_node_exports = {};
__export(RemoveDuplicatesV2_node_exports, {
  RemoveDuplicatesV2: () => RemoveDuplicatesV2
});
module.exports = __toCommonJS(RemoveDuplicatesV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_RemoveDuplicatesV2 = require("./RemoveDuplicatesV2.description");
var import_utils = require("../utils");
const versionDescription = {
  displayName: "Remove Duplicates",
  name: "removeDuplicates",
  icon: "file:removeDuplicates.svg",
  group: ["transform"],
  subtitle: "",
  version: [2],
  description: "Delete items with matching field values",
  defaults: {
    name: "Remove Duplicates"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputNames: ["Kept", "Discarded"],
  hints: [
    {
      message: "The dedupe key set in \u201CValue to Dedupe On\u201D has no value",
      displayCondition: '={{ $parameter["operation"] === "removeItemsSeenInPreviousExecutions" && ($parameter["logic"] === "removeItemsWithAlreadySeenKeyValues" && $parameter["dedupeValue"] === undefined) || ($parameter["logic"] === "removeItemsUpToStoredIncrementalKey" && $parameter["incrementalDedupeValue"] === undefined) || ($parameter["logic"] === "removeItemsUpToStoredDate" && $parameter["dateDedupeValue"] === undefined) }}',
      whenToDisplay: "beforeExecution",
      location: "outputPane"
    }
  ],
  properties: [...import_RemoveDuplicatesV2.removeDuplicatesNodeFields]
};
class RemoveDuplicatesV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    const returnData = [];
    const DEFAULT_MAX_ENTRIES = 1e4;
    try {
      switch (operation) {
        case "removeDuplicateInputItems": {
          return (0, import_utils.removeDuplicateInputItems)(this, items);
        }
        case "removeItemsSeenInPreviousExecutions": {
          const logic = this.getNodeParameter("logic", 0);
          const scope = this.getNodeParameter("options.scope", 0, "node");
          if (logic === "removeItemsWithAlreadySeenKeyValues") {
            if (!["node", "workflow"].includes(scope)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `The scope '${scope}' is not supported. Please select either "node" or "workflow".`
              );
            }
            let checkValue;
            const itemMapping = {};
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
              checkValue = this.getNodeParameter("dedupeValue", itemIndex, "")?.toString() ?? "";
              if (itemMapping[checkValue]) {
                itemMapping[checkValue].push(items[itemIndex]);
              } else {
                itemMapping[checkValue] = [items[itemIndex]];
              }
            }
            const maxEntries = this.getNodeParameter(
              "options.historySize",
              0,
              DEFAULT_MAX_ENTRIES
            );
            const maxEntriesNum = Number(maxEntries);
            const currentProcessedDataCount = await this.helpers.getProcessedDataCount(scope, {
              mode: "entries",
              maxEntries
            });
            if (currentProcessedDataCount + items.length > maxEntriesNum) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "The number of items to be processed exceeds the maximum history size. Please increase the history size or reduce the number of items to be processed."
              );
            }
            const itemsProcessed = await this.helpers.checkProcessedAndRecord(
              Object.keys(itemMapping),
              scope,
              { mode: "entries", maxEntries }
            );
            const processedDataCount = await this.helpers.getProcessedDataCount(scope, {
              mode: "entries",
              maxEntries
            });
            returnData.push(
              itemsProcessed.new.map((key) => {
                return itemMapping[key];
              }).flat(),
              itemsProcessed.processed.map((key) => {
                return itemMapping[key];
              }).flat()
            );
            if (maxEntriesNum > 0 && processedDataCount / maxEntriesNum > 0.5) {
              this.addExecutionHints({
                message: `Some duplicates may be not be removed since you're approaching the maximum history size (${maxEntriesNum} items). You can raise this limit using the \u2018history size\u2019 option.`,
                location: "outputPane"
              });
            }
            return returnData;
          } else if (logic === "removeItemsUpToStoredIncrementalKey") {
            if (!["node", "workflow"].includes(scope)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `The scope '${scope}' is not supported. Please select either "node" or "workflow".`
              );
            }
            let parsedIncrementalKey;
            const itemMapping = {};
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
              const incrementalKey = this.getNodeParameter("incrementalDedupeValue", itemIndex, "");
              if (!incrementalKey?.toString()) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "The `Value to Dedupe` On is empty. Please provide a value."
                );
              }
              parsedIncrementalKey = Number(incrementalKey);
              if (isNaN(parsedIncrementalKey)) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  `The value '${incrementalKey}' is not a number. Please provide a number.`
                );
              }
              if (itemMapping[parsedIncrementalKey]) {
                itemMapping[parsedIncrementalKey].push(items[itemIndex]);
              } else {
                itemMapping[parsedIncrementalKey] = [items[itemIndex]];
              }
            }
            const itemsProcessed = await this.helpers.checkProcessedAndRecord(
              Object.keys(itemMapping),
              scope,
              { mode: "latestIncrementalKey" }
            );
            returnData.push(
              itemsProcessed.new.map((key) => {
                return itemMapping[key];
              }).flat(),
              itemsProcessed.processed.map((key) => {
                return itemMapping[key];
              }).flat()
            );
            return returnData;
          } else if (logic === "removeItemsUpToStoredDate") {
            if (!["node", "workflow"].includes(scope)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `The scope '${scope}' is not supported. Please select either "node" or "workflow".`
              );
            }
            let checkValue;
            const itemMapping = {};
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
              checkValue = this.getNodeParameter("dateDedupeValue", itemIndex, "")?.toString() ?? "";
              if (!checkValue) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "The `Value to Dedupe` On is empty. Please provide a value."
                );
              }
              try {
                (0, import_n8n_workflow.tryToParseDateTime)(checkValue);
              } catch (error) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  `The value '${checkValue}' is not a valid date. Please provide a valid date.`
                );
              }
              if (itemMapping[checkValue]) {
                itemMapping[checkValue].push(items[itemIndex]);
              } else {
                itemMapping[checkValue] = [items[itemIndex]];
              }
            }
            const itemsProcessed = await this.helpers.checkProcessedAndRecord(
              Object.keys(itemMapping),
              scope,
              { mode: "latestDate" }
            );
            returnData.push(
              itemsProcessed.new.map((key) => {
                return itemMapping[key];
              }).flat(),
              itemsProcessed.processed.map((key) => {
                return itemMapping[key];
              }).flat()
            );
            return returnData;
          } else {
            return [items];
          }
        }
        case "clearDeduplicationHistory": {
          const mode = this.getNodeParameter("mode", 0);
          if (mode === "updateKeyValuesInDatabase") {
          } else if (mode === "deleteKeyValuesFromDatabase") {
          } else if (mode === "cleanDatabase") {
            const scope = this.getNodeParameter("options.scope", 0, "node");
            await this.helpers.clearAllProcessedItems(scope, {
              mode: "entries"
            });
          }
          return [items];
        }
        default: {
          return [items];
        }
      }
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push([{ json: this.getInputData(0)[0].json, error }]);
      } else {
        throw error;
      }
    }
    return returnData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveDuplicatesV2
});
//# sourceMappingURL=RemoveDuplicatesV2.node.js.map