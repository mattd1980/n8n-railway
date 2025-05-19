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
var MicrosoftExcel_node_exports = {};
__export(MicrosoftExcel_node_exports, {
  MicrosoftExcel: () => MicrosoftExcel
});
module.exports = __toCommonJS(MicrosoftExcel_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MicrosoftExcelV1 = require("./v1/MicrosoftExcelV1.node");
var import_MicrosoftExcelV2 = require("./v2/MicrosoftExcelV2.node");
class MicrosoftExcel extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Microsoft Excel 365",
      name: "microsoftExcel",
      icon: "file:excel.svg",
      group: ["input"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Microsoft Excel API",
      defaultVersion: 2.1
    };
    const nodeVersions = {
      1: new import_MicrosoftExcelV1.MicrosoftExcelV1(baseDescription),
      2: new import_MicrosoftExcelV2.MicrosoftExcelV2(baseDescription),
      2.1: new import_MicrosoftExcelV2.MicrosoftExcelV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftExcel
});
//# sourceMappingURL=MicrosoftExcel.node.js.map