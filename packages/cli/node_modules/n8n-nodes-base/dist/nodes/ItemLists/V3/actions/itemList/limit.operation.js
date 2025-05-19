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
var limit_operation_exports = {};
__export(limit_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(limit_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
const properties = [
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
];
const displayOptions = {
  show: {
    resource: ["itemList"],
    operation: ["limit"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  let returnData = items;
  const maxItems = this.getNodeParameter("maxItems", 0);
  const keep = this.getNodeParameter("keep", 0);
  if (maxItems > items.length) {
    return returnData;
  }
  if (keep === "firstItems") {
    returnData = items.slice(0, maxItems);
  } else {
    returnData = items.slice(items.length - maxItems, items.length);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=limit.operation.js.map