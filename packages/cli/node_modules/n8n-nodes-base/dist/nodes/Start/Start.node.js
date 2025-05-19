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
var Start_node_exports = {};
__export(Start_node_exports, {
  Start: () => Start
});
module.exports = __toCommonJS(Start_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Start {
  constructor() {
    this.description = {
      displayName: "Start",
      name: "start",
      icon: "fa:play",
      group: ["input"],
      version: 1,
      description: "Starts the workflow execution from this node",
      maxNodes: 1,
      hidden: true,
      defaults: {
        name: "Start",
        color: "#00e000"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "This node is where a manual workflow execution starts. To make one, go back to the canvas and click \u2018execute workflow\u2019",
          name: "notice",
          type: "notice",
          default: ""
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Start
});
//# sourceMappingURL=Start.node.js.map