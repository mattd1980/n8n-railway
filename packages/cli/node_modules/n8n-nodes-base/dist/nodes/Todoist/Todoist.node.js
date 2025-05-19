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
var Todoist_node_exports = {};
__export(Todoist_node_exports, {
  Todoist: () => Todoist
});
module.exports = __toCommonJS(Todoist_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_TodoistV1 = require("./v1/TodoistV1.node");
var import_TodoistV2 = require("./v2/TodoistV2.node");
class Todoist extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Todoist",
      name: "todoist",
      icon: "file:todoist.svg",
      group: ["output"],
      defaultVersion: 2.1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Todoist API"
    };
    const nodeVersions = {
      1: new import_TodoistV1.TodoistV1(baseDescription),
      2: new import_TodoistV2.TodoistV2(baseDescription),
      2.1: new import_TodoistV2.TodoistV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Todoist
});
//# sourceMappingURL=Todoist.node.js.map