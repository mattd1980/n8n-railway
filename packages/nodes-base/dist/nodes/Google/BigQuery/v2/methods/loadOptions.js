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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getDatasets: () => getDatasets,
  getSchema: () => getSchema
});
module.exports = __toCommonJS(loadOptions_exports);
var import_transport = require("../transport");
async function getDatasets() {
  const projectId = this.getNodeParameter("projectId", void 0, {
    extractValue: true
  });
  const returnData = [];
  const { datasets } = await import_transport.googleBigQueryApiRequest.call(
    this,
    "GET",
    `/v2/projects/${projectId}/datasets`
  );
  for (const dataset of datasets) {
    returnData.push({
      name: dataset.datasetReference.datasetId,
      value: dataset.datasetReference.datasetId
    });
  }
  return returnData;
}
async function getSchema() {
  const projectId = this.getNodeParameter("projectId", void 0, {
    extractValue: true
  });
  const datasetId = this.getNodeParameter("datasetId", void 0, {
    extractValue: true
  });
  const tableId = this.getNodeParameter("tableId", void 0, {
    extractValue: true
  });
  const returnData = [];
  const { schema } = await import_transport.googleBigQueryApiRequest.call(
    this,
    "GET",
    `/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
    {}
  );
  for (const field of schema.fields) {
    returnData.push({
      name: field.name,
      value: field.name,
      description: `type: ${field.type}` + (field.mode ? ` mode: ${field.mode}` : "")
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDatasets,
  getSchema
});
//# sourceMappingURL=loadOptions.js.map