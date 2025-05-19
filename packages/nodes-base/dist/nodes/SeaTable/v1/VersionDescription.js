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
var VersionDescription_exports = {};
__export(VersionDescription_exports, {
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(VersionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_RowDescription = require("./RowDescription");
const versionDescription = {
  displayName: "SeaTable",
  name: "seaTable",
  icon: "file:seaTable.svg",
  group: ["input"],
  version: 1,
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  description: "Consume the SeaTable API",
  defaults: {
    name: "SeaTable"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "seaTableApi",
      required: true
    }
  ],
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Row",
          value: "row"
        }
      ],
      default: "row"
    },
    ...import_RowDescription.rowOperations,
    ...import_RowDescription.rowFields
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=VersionDescription.js.map