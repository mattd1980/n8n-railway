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
var QuickBase_node_exports = {};
__export(QuickBase_node_exports, {
  QuickBase: () => QuickBase
});
module.exports = __toCommonJS(QuickBase_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_FieldDescription = require("./FieldDescription");
var import_FileDescription = require("./FileDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_RecordDescription = require("./RecordDescription");
var import_ReportDescription = require("./ReportDescription");
var import_utilities = require("../../utils/utilities");
class QuickBase {
  constructor() {
    this.description = {
      displayName: "Quick Base",
      name: "quickbase",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:quickbase.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Integrate with the Quick Base RESTful API",
      defaults: {
        name: "Quick Base"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "quickbaseApi",
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
              name: "Field",
              value: "field"
            },
            {
              name: "File",
              value: "file"
            },
            {
              name: "Record",
              value: "record"
            },
            {
              name: "Report",
              value: "report"
            }
          ],
          default: "record"
        },
        ...import_FieldDescription.fieldOperations,
        ...import_FieldDescription.fieldFields,
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields,
        ...import_RecordDescription.recordOperations,
        ...import_RecordDescription.recordFields,
        ...import_ReportDescription.reportOperations,
        ...import_ReportDescription.reportFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getTableFields() {
          const returnData = [];
          const tableId = this.getCurrentNodeParameter("tableId");
          const fields = await import_GenericFunctions.quickbaseApiRequest.call(this, "GET", "/fields", {}, { tableId });
          for (const field of fields) {
            returnData.push({
              name: field.label,
              value: field.id
            });
          }
          return returnData;
        },
        async getUniqueTableFields() {
          const returnData = [];
          const tableId = this.getCurrentNodeParameter("tableId");
          const fields = await import_GenericFunctions.quickbaseApiRequest.call(this, "GET", "/fields", {}, { tableId });
          for (const field of fields) {
            if (field.unique === true && field.properties.primaryKey === false) {
              returnData.push({
                name: field.label,
                value: field.id
              });
            }
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const itemData = (0, import_utilities.generatePairedItemData)(items.length);
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "field") {
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          const returnAll = this.getNodeParameter("returnAll", i);
          const tableId = this.getNodeParameter("tableId", i);
          const options = this.getNodeParameter("options", i);
          Object.assign(
            {
              tableId
            },
            options
          );
          responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "GET", "/fields", {}, qs);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    if (resource === "file") {
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          const tableId = this.getNodeParameter("tableId", i);
          const recordId = this.getNodeParameter("recordId", i);
          const fieldId = this.getNodeParameter("fieldId", i);
          const versionNumber = this.getNodeParameter("versionNumber", i);
          responseData = await import_GenericFunctions.quickbaseApiRequest.call(
            this,
            "DELETE",
            `/files/${tableId}/${recordId}/${fieldId}/${versionNumber}`
          );
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "download") {
        for (let i = 0; i < length; i++) {
          const tableId = this.getNodeParameter("tableId", i);
          const recordId = this.getNodeParameter("recordId", i);
          const fieldId = this.getNodeParameter("fieldId", i);
          const versionNumber = this.getNodeParameter("versionNumber", i);
          const newItem = {
            json: items[i].json,
            binary: {}
          };
          if (items[i].binary !== void 0) {
            Object.assign(newItem.binary, items[i].binary);
          }
          items[i] = newItem;
          const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
          responseData = await import_GenericFunctions.quickbaseApiRequest.call(
            this,
            "GET",
            `/files/${tableId}/${recordId}/${fieldId}/${versionNumber}`,
            {},
            {},
            { json: false, resolveWithFullResponse: true }
          );
          const contentDisposition = responseData.headers["content-disposition"];
          const data = Buffer.from(responseData.body, "base64");
          items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
            data,
            contentDisposition.split("=")[1]
          );
        }
        return [items];
      }
    }
    if (resource === "record") {
      if (operation === "create") {
        const tableId = this.getNodeParameter("tableId", 0);
        const simple = this.getNodeParameter("simple", 0);
        const data = [];
        const options = this.getNodeParameter("options", 0);
        for (let i = 0; i < length; i++) {
          const record = {};
          const columns = this.getNodeParameter("columns", i);
          const columnList = columns.split(",").map((column) => column.trim());
          if (options.useFieldIDs === true) {
            for (const key of Object.keys(items[i].json)) {
              record[key] = { value: items[i].json[key] };
            }
          } else {
            const { fieldsLabelKey } = await import_GenericFunctions.getFieldsObject.call(this, tableId);
            for (const key of Object.keys(items[i].json)) {
              if (fieldsLabelKey.hasOwnProperty(key) && columnList.includes(key)) {
                record[fieldsLabelKey[key].toString()] = { value: items[i].json[key] };
              }
            }
          }
          data.push(record);
        }
        const body = {
          data,
          to: tableId
        };
        body.fieldsToReturn = [3];
        if (options.fields) {
          body.fieldsToReturn = options.fields;
        }
        responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "POST", "/records", body);
        if (simple) {
          const { data: records } = responseData;
          responseData = [];
          for (const record of records) {
            const recordData = {};
            for (const [key, value] of Object.entries(record)) {
              recordData[key] = value.value;
            }
            responseData.push(recordData);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData }
        );
        returnData.push(...executionData);
      }
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          const tableId = this.getNodeParameter("tableId", i);
          const where = this.getNodeParameter("where", i);
          const body = {
            from: tableId,
            where
          };
          responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "DELETE", "/records", body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          const returnAll = this.getNodeParameter("returnAll", i);
          const tableId = this.getNodeParameter("tableId", i);
          const options = this.getNodeParameter("options", i);
          const body = {
            from: tableId
          };
          Object.assign(body, options);
          if (options.sortByUi) {
            const sort = options.sortByUi.sortByValues;
            body.sortBy = sort;
            delete body.sortByUi;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.quickbaseApiRequestAllItems.call(
              this,
              "POST",
              "/records/query",
              body,
              qs
            );
          } else {
            body.options = { top: this.getNodeParameter("limit", i) };
            responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "POST", "/records/query", body, qs);
            const { data: records, fields } = responseData;
            responseData = [];
            const fieldsIdKey = {};
            for (const field of fields) {
              fieldsIdKey[field.id] = field.label;
            }
            for (const record of records) {
              const data = {};
              for (const [key, value] of Object.entries(record)) {
                data[fieldsIdKey[key]] = value.value;
              }
              responseData.push(data);
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "update") {
        const tableId = this.getNodeParameter("tableId", 0);
        const { fieldsLabelKey: _fieldsLabelKey, fieldsIdKey } = await import_GenericFunctions.getFieldsObject.call(
          this,
          tableId
        );
        const simple = this.getNodeParameter("simple", 0);
        const updateKey = this.getNodeParameter("updateKey", 0);
        const data = [];
        const options = this.getNodeParameter("options", 0);
        for (let i = 0; i < length; i++) {
          const record = {};
          const columns = this.getNodeParameter("columns", i);
          const columnList = columns.split(",").map((column) => column.trim());
          if (options.useFieldIDs === true) {
            for (const key of Object.keys(items[i].json)) {
              record[key] = { value: items[i].json[key] };
            }
          } else {
            const { fieldsLabelKey } = await import_GenericFunctions.getFieldsObject.call(this, tableId);
            for (const key of Object.keys(items[i].json)) {
              if (fieldsLabelKey.hasOwnProperty(key) && columnList.includes(key)) {
                record[fieldsLabelKey[key].toString()] = { value: items[i].json[key] };
              }
            }
          }
          if (items[i].json[updateKey] === void 0) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The update key ${updateKey} could not be found in the input`,
              { itemIndex: i }
            );
          }
          data.push(record);
        }
        const body = {
          data,
          to: tableId
        };
        if (options.fields) {
          body.fieldsToReturn = options.fields;
        }
        responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "POST", "/records", body);
        if (simple) {
          const { data: records } = responseData;
          responseData = [];
          for (const record of records) {
            const recordData = {};
            for (const [key, value] of Object.entries(record)) {
              recordData[fieldsIdKey[key]] = value.value;
            }
            responseData.push(recordData);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData }
        );
        returnData.push(...executionData);
      }
      if (operation === "upsert") {
        const tableId = this.getNodeParameter("tableId", 0);
        const simple = this.getNodeParameter("simple", 0);
        const updateKey = this.getNodeParameter("updateKey", 0);
        const mergeFieldId = this.getNodeParameter("mergeFieldId", 0);
        const data = [];
        const options = this.getNodeParameter("options", 0);
        for (let i = 0; i < length; i++) {
          const record = {};
          const columns = this.getNodeParameter("columns", i);
          const columnList = columns.split(",").map((column) => column.trim());
          if (options.useFieldIDs === true) {
            for (const key of Object.keys(items[i].json)) {
              record[key] = { value: items[i].json[key] };
            }
          } else {
            const { fieldsLabelKey } = await import_GenericFunctions.getFieldsObject.call(this, tableId);
            for (const key of Object.keys(items[i].json)) {
              if (fieldsLabelKey.hasOwnProperty(key) && columnList.includes(key)) {
                record[fieldsLabelKey[key].toString()] = { value: items[i].json[key] };
              }
            }
          }
          if (items[i].json[updateKey] === void 0) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The update key ${updateKey} could not be found in the input`,
              { itemIndex: i }
            );
          }
          record[mergeFieldId] = { value: items[i].json[updateKey] };
          data.push(record);
        }
        const body = {
          data,
          to: tableId,
          mergeFieldId
        };
        body.fieldsToReturn = [3];
        if (options.fields) {
          body.fieldsToReturn = options.fields;
        }
        responseData = await import_GenericFunctions.quickbaseApiRequest.call(this, "POST", "/records", body);
        if (simple) {
          const { data: records } = responseData;
          responseData = [];
          for (const record of records) {
            const recordData = {};
            for (const [key, value] of Object.entries(record)) {
              recordData[key] = value.value;
            }
            responseData.push(recordData);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData }
        );
        returnData.push(...executionData);
      }
    }
    if (resource === "report") {
      if (operation === "run") {
        for (let i = 0; i < length; i++) {
          const returnAll = this.getNodeParameter("returnAll", i);
          const tableId = this.getNodeParameter("tableId", i);
          const reportId = this.getNodeParameter("reportId", i);
          qs.tableId = tableId;
          if (returnAll) {
            responseData = await import_GenericFunctions.quickbaseApiRequestAllItems.call(
              this,
              "POST",
              `/reports/${reportId}/run`,
              {},
              qs
            );
          } else {
            qs.top = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.quickbaseApiRequest.call(
              this,
              "POST",
              `/reports/${reportId}/run`,
              {},
              qs
            );
            const { data: records, fields } = responseData;
            responseData = [];
            const fieldsIdKey = {};
            for (const field of fields) {
              fieldsIdKey[field.id] = field.label;
            }
            for (const record of records) {
              const data = {};
              for (const [key, value] of Object.entries(record)) {
                data[fieldsIdKey[key]] = value.value;
              }
              responseData.push(data);
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          const reportId = this.getNodeParameter("reportId", i);
          const tableId = this.getNodeParameter("tableId", i);
          qs.tableId = tableId;
          responseData = await import_GenericFunctions.quickbaseApiRequest.call(
            this,
            "GET",
            `/reports/${reportId}`,
            {},
            qs
          );
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickBase
});
//# sourceMappingURL=QuickBase.node.js.map