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
  getAttachmentColumns: () => getAttachmentColumns,
  getColumns: () => getColumns,
  getColumnsWithRecordId: () => getColumnsWithRecordId,
  getColumnsWithoutColumnToMatchOn: () => getColumnsWithoutColumnToMatchOn
});
module.exports = __toCommonJS(loadOptions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
async function getColumns() {
  const base = this.getNodeParameter("base", void 0, {
    extractValue: true
  });
  const tableId = encodeURI(
    this.getNodeParameter("table", void 0, {
      extractValue: true
    })
  );
  const response = await import_transport.apiRequest.call(this, "GET", `meta/bases/${base}/tables`);
  const tableData = (response.tables || []).find((table) => {
    return table.id === tableId;
  });
  if (!tableData) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Table information could not be found!", {
      level: "warning"
    });
  }
  const result = [];
  for (const field of tableData.fields) {
    result.push({
      name: field.name,
      value: field.name,
      description: `Type: ${field.type}`
    });
  }
  return result;
}
async function getColumnsWithRecordId() {
  const returnData = await getColumns.call(this);
  return [
    {
      // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased-id, n8n-nodes-base/node-param-display-name-miscased
      name: "id",
      value: "id",
      description: "Type: primaryFieldId"
    },
    ...returnData
  ];
}
async function getColumnsWithoutColumnToMatchOn() {
  const columnToMatchOn = this.getNodeParameter("columnToMatchOn");
  const returnData = await getColumns.call(this);
  return returnData.filter((column) => column.value !== columnToMatchOn);
}
async function getAttachmentColumns() {
  const base = this.getNodeParameter("base", void 0, {
    extractValue: true
  });
  const tableId = encodeURI(
    this.getNodeParameter("table", void 0, {
      extractValue: true
    })
  );
  const response = await import_transport.apiRequest.call(this, "GET", `meta/bases/${base}/tables`);
  const tableData = (response.tables || []).find((table) => {
    return table.id === tableId;
  });
  if (!tableData) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Table information could not be found!", {
      level: "warning"
    });
  }
  const result = [];
  for (const field of tableData.fields) {
    if (!field.type?.toLowerCase()?.includes("attachment")) {
      continue;
    }
    result.push({
      name: field.name,
      value: field.name,
      description: `Type: ${field.type}`
    });
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAttachmentColumns,
  getColumns,
  getColumnsWithRecordId,
  getColumnsWithoutColumnToMatchOn
});
//# sourceMappingURL=loadOptions.js.map