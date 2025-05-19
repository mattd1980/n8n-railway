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
var SplitInBatchesV3_node_exports = {};
__export(SplitInBatchesV3_node_exports, {
  SplitInBatchesV3: () => SplitInBatchesV3
});
module.exports = __toCommonJS(SplitInBatchesV3_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class SplitInBatchesV3 {
  constructor() {
    this.description = {
      displayName: "Loop Over Items (Split in Batches)",
      name: "splitInBatches",
      icon: "fa:sync",
      iconColor: "dark-green",
      group: ["organization"],
      version: 3,
      description: "Split data into batches and iterate over each batch",
      defaults: {
        name: "Loop Over Items",
        color: "#007755"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main, import_n8n_workflow.NodeConnectionTypes.Main],
      outputNames: ["done", "loop"],
      properties: [
        {
          displayName: 'You may not need this node \u2014 n8n nodes automatically run once for each input item. <a href="https://docs.n8n.io/getting-started/key-concepts/looping.html#using-loops-in-n8n" target="_blank">More info</a>',
          name: "splitInBatchesNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Batch Size",
          name: "batchSize",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 1,
          description: "The number of items to return with each call"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Reset",
              name: "reset",
              type: "boolean",
              default: false,
              description: "Whether the node starts again from the beginning of the input items. This will treat incoming data as a new set rather than continuing with the previous items."
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData().slice();
    const nodeContext = this.getContext("node");
    const batchSize = this.getNodeParameter("batchSize", 0);
    const returnItems = [];
    const options = this.getNodeParameter("options", 0, {});
    if (nodeContext.items === void 0 || options.reset === true) {
      const sourceData = this.getInputSourceData();
      nodeContext.currentRunIndex = 0;
      nodeContext.maxRunIndex = Math.ceil(items.length / batchSize);
      nodeContext.sourceData = (0, import_n8n_workflow.deepCopy)(sourceData);
      returnItems.push.apply(returnItems, items.splice(0, batchSize));
      nodeContext.items = [...items];
      nodeContext.processedItems = [];
    } else {
      let getPairedItemInformation2 = function(item) {
        if (item.pairedItem === void 0) {
          return {
            item: 0,
            sourceOverwrite: nodeContext.sourceData
          };
        }
        if (Array.isArray(item.pairedItem)) {
          return item.pairedItem.map(addSourceOverwrite);
        }
        return addSourceOverwrite(item.pairedItem);
      };
      var getPairedItemInformation = getPairedItemInformation2;
      nodeContext.currentRunIndex += 1;
      returnItems.push.apply(
        returnItems,
        nodeContext.items.splice(0, batchSize)
      );
      const addSourceOverwrite = (pairedItem) => {
        if (typeof pairedItem === "number") {
          return {
            item: pairedItem,
            sourceOverwrite: nodeContext.sourceData
          };
        }
        return {
          ...pairedItem,
          sourceOverwrite: nodeContext.sourceData
        };
      };
      const sourceOverwrite = this.getInputSourceData();
      const newItems = items.map((item, index) => {
        return {
          ...item,
          pairedItem: {
            sourceOverwrite,
            item: index
          }
        };
      });
      nodeContext.processedItems = [...nodeContext.processedItems, ...newItems];
      returnItems.map((item) => {
        item.pairedItem = getPairedItemInformation2(item);
      });
    }
    nodeContext.noItemsLeft = nodeContext.items.length === 0;
    if (returnItems.length === 0) {
      nodeContext.done = true;
      return [nodeContext.processedItems, []];
    }
    nodeContext.done = false;
    return [[], returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SplitInBatchesV3
});
//# sourceMappingURL=SplitInBatchesV3.node.js.map