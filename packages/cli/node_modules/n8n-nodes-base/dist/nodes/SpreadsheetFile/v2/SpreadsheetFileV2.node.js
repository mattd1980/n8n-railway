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
var SpreadsheetFileV2_node_exports = {};
__export(SpreadsheetFileV2_node_exports, {
  SpreadsheetFileV2: () => SpreadsheetFileV2
});
module.exports = __toCommonJS(SpreadsheetFileV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var fromFile = __toESM(require("./fromFile.operation"));
var toFile = __toESM(require("./toFile.operation"));
var import_description = require("../description");
class SpreadsheetFileV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: 2,
      defaults: {
        name: "Spreadsheet File",
        color: "#2244FF"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [import_description.operationProperty, ...fromFile.description, ...toFile.description]
    };
  }
  async execute() {
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    let returnData = [];
    if (operation === "fromFile") {
      returnData = await fromFile.execute.call(this, items);
    }
    if (operation === "toFile") {
      returnData = await toFile.execute.call(this, items);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpreadsheetFileV2
});
//# sourceMappingURL=SpreadsheetFileV2.node.js.map