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
var resourceMapping_exports = {};
__export(resourceMapping_exports, {
  getColumns: () => getColumns,
  getColumnsWithRecordId: () => getColumnsWithRecordId
});
module.exports = __toCommonJS(resourceMapping_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
const airtableReadOnlyFields = [
  "autoNumber",
  "button",
  "count",
  "createdBy",
  "createdTime",
  "formula",
  "lastModifiedBy",
  "lastModifiedTime",
  "lookup",
  "rollup",
  "externalSyncSource",
  "multipleLookupValues"
];
const airtableTypesMap = {
  string: ["singleLineText", "multilineText", "richText", "email", "phoneNumber", "url"],
  number: ["rating", "percent", "number", "duration", "currency"],
  boolean: ["checkbox"],
  dateTime: ["dateTime", "date"],
  time: [],
  object: [],
  options: ["singleSelect"],
  array: ["multipleSelects", "multipleRecordLinks", "multipleAttachments"]
};
function mapForeignType(foreignType, typesMap) {
  let type = "string";
  for (const nativeType of Object.keys(typesMap)) {
    const mappedForeignTypes = typesMap[nativeType];
    if (mappedForeignTypes?.includes(foreignType)) {
      type = nativeType;
      break;
    }
  }
  return type;
}
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
  const fields = [];
  const constructOptions = (field) => {
    if (field?.options?.choices) {
      return field.options.choices.map((choice) => ({
        name: choice.name,
        value: choice.name
      }));
    }
    return void 0;
  };
  for (const field of tableData.fields) {
    const type = mapForeignType(field.type, airtableTypesMap);
    const isReadOnly = airtableReadOnlyFields.includes(field.type);
    const options = constructOptions(field);
    fields.push({
      id: field.name,
      displayName: field.name,
      required: false,
      defaultMatch: false,
      canBeUsedToMatch: true,
      display: true,
      type,
      options,
      readOnly: isReadOnly,
      removed: isReadOnly
    });
  }
  return { fields };
}
async function getColumnsWithRecordId() {
  const returnData = await getColumns.call(this);
  return {
    fields: [
      {
        id: "id",
        displayName: "id",
        required: false,
        defaultMatch: true,
        display: true,
        type: "string",
        readOnly: true
      },
      ...returnData.fields
    ]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getColumns,
  getColumnsWithRecordId
});
//# sourceMappingURL=resourceMapping.js.map