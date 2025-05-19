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
var Limit_node_exports = {};
__export(Limit_node_exports, {
  Limit: () => Limit
});
module.exports = __toCommonJS(Limit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Limit {
  constructor() {
    this.description = {
      displayName: "Limit",
      name: "limit",
      icon: "file:limit.svg",
      group: ["transform"],
      subtitle: "",
      version: 1,
      description: "Restrict the number of items",
      defaults: {
        name: "Limit"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Max Items",
          name: "maxItems",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 1,
          description: "If there are more items than this number, some are removed"
        },
        {
          displayName: "Keep",
          name: "keep",
          type: "options",
          options: [
            {
              name: "First Items",
              value: "firstItems"
            },
            {
              name: "Last Items",
              value: "lastItems"
            }
          ],
          default: "firstItems",
          description: "When removing items, whether to keep the ones at the start or the ending"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    let returnData = items;
    const maxItems = this.getNodeParameter("maxItems", 0);
    const keep = this.getNodeParameter("keep", 0);
    if (maxItems > items.length) {
      return [returnData];
    }
    if (keep === "firstItems") {
      returnData = items.slice(0, maxItems);
    } else {
      returnData = items.slice(items.length - maxItems, items.length);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Limit
});
//# sourceMappingURL=Limit.node.js.map