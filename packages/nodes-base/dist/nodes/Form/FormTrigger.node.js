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
var FormTrigger_node_exports = {};
__export(FormTrigger_node_exports, {
  FormTrigger: () => FormTrigger
});
module.exports = __toCommonJS(FormTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_FormTriggerV1 = require("./v1/FormTriggerV1.node");
var import_FormTriggerV2 = require("./v2/FormTriggerV2.node");
class FormTrigger extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "n8n Form Trigger",
      name: "formTrigger",
      icon: "file:form.svg",
      group: ["trigger"],
      description: "Generate webforms in n8n and pass their responses to the workflow",
      defaultVersion: 2.2
    };
    const nodeVersions = {
      1: new import_FormTriggerV1.FormTriggerV1(baseDescription),
      2: new import_FormTriggerV2.FormTriggerV2(baseDescription),
      2.1: new import_FormTriggerV2.FormTriggerV2(baseDescription),
      2.2: new import_FormTriggerV2.FormTriggerV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormTrigger
});
//# sourceMappingURL=FormTrigger.node.js.map