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
var NoOp_node_exports = {};
__export(NoOp_node_exports, {
  NoOp: () => NoOp
});
module.exports = __toCommonJS(NoOp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class NoOp {
  constructor() {
    this.description = {
      displayName: "No Operation, do nothing",
      name: "noOp",
      icon: "fa:arrow-right",
      iconColor: "gray",
      group: ["organization"],
      version: 1,
      description: "No Operation",
      defaults: {
        name: "No Operation, do nothing",
        color: "#b0b0b0"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: []
    };
  }
  async execute() {
    const items = this.getInputData();
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NoOp
});
//# sourceMappingURL=NoOp.node.js.map