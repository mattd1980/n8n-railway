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
var getPublicURL_operation_exports = {};
__export(getPublicURL_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getPublicURL_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    displayName: "Asset Path",
    name: "assetPath",
    type: "string",
    placeholder: "/images/2023-09/logo.png",
    required: true,
    default: ""
  }
];
const displayOptions = {
  show: {
    resource: ["asset"],
    operation: ["getPublicURL"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const assetPath = this.getNodeParameter("assetPath", index);
  let responseData = [];
  if (assetPath) {
    responseData = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      `/api/v2.1/dtable/app-download-link/?path=${assetPath}`
    );
  }
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getPublicURL.operation.js.map