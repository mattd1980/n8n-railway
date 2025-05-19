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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Columns",
    name: "columns",
    type: "resourceMapper",
    noDataExpression: true,
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["table.value", "base.value"],
      resourceMapper: {
        resourceMapperMethod: "getColumnsWithRecordId",
        mode: "update",
        fieldWords: {
          singular: "column",
          plural: "columns"
        },
        addAllFields: true,
        multiKeyMatch: true
      }
    }
  },
  ...import_common.insertUpdateOptions
];
const displayOptions = {
  show: {
    resource: ["record"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, base, table) {
  const returnData = [];
  const endpoint = `${base}/${table}`;
  const dataMode = this.getNodeParameter("columns.mappingMode", 0);
  const columnsToMatchOn = this.getNodeParameter("columns.matchingColumns", 0);
  let tableData = [];
  if (!columnsToMatchOn.includes("id")) {
    const response = await import_transport.apiRequestAllItems.call(
      this,
      "GET",
      endpoint,
      {},
      { fields: columnsToMatchOn }
    );
    tableData = response.records;
  }
  for (let i = 0; i < items.length; i++) {
    let recordId = "";
    try {
      const records = [];
      const options = this.getNodeParameter("options", i, {});
      const typecast = options.typecast ? true : false;
      if (dataMode === "autoMapInputData") {
        if (columnsToMatchOn.includes("id")) {
          const { id, ...fields } = items[i].json;
          recordId = id;
          records.push({
            id: recordId,
            fields: (0, import_utils.removeIgnored)(fields, options.ignoreFields)
          });
        } else {
          const matches = (0, import_utils.findMatches)(
            tableData,
            columnsToMatchOn,
            items[i].json,
            options.updateAllMatches
          );
          for (const match of matches) {
            const id = match.id;
            const fields = items[i].json;
            records.push({ id, fields: (0, import_utils.removeIgnored)(fields, options.ignoreFields) });
          }
        }
      }
      if (dataMode === "defineBelow") {
        const getNodeParameterOptions = typecast ? { skipValidation: true } : void 0;
        if (columnsToMatchOn.includes("id")) {
          const { id, ...fields } = this.getNodeParameter(
            "columns.value",
            i,
            [],
            getNodeParameterOptions
          );
          records.push({ id, fields });
        } else {
          const fields = this.getNodeParameter(
            "columns.value",
            i,
            [],
            getNodeParameterOptions
          );
          const matches = (0, import_utils.findMatches)(
            tableData,
            columnsToMatchOn,
            fields,
            options.updateAllMatches
          );
          for (const match of matches) {
            const id = match.id;
            records.push({ id, fields: (0, import_utils.removeIgnored)(fields, columnsToMatchOn) });
          }
        }
      }
      const body = { typecast };
      const responseData = await import_transport.batchUpdate.call(this, endpoint, body, records);
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)(responseData.records),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      error = (0, import_utils.processAirtableError)(error, recordId, i);
      if (this.continueOnFail()) {
        returnData.push({ json: { message: error.message, error } });
        continue;
      }
      throw error;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map