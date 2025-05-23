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
var MicrosoftExcelV1_node_exports = {};
__export(MicrosoftExcelV1_node_exports, {
  MicrosoftExcelV1: () => MicrosoftExcelV1
});
module.exports = __toCommonJS(MicrosoftExcelV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../../utils/descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_TableDescription = require("./TableDescription");
var import_WorkbookDescription = require("./WorkbookDescription");
var import_WorksheetDescription = require("./WorksheetDescription");
var import_utilities = require("../../../../utils/utilities");
const versionDescription = {
  displayName: "Microsoft Excel",
  name: "microsoftExcel",
  icon: "file:excel.svg",
  group: ["input"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Microsoft Excel API",
  defaults: {
    name: "Microsoft Excel"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "microsoftExcelOAuth2Api",
      required: true
    }
  ],
  properties: [
    import_descriptions.oldVersionNotice,
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Table",
          value: "table",
          description: "Represents an Excel table"
        },
        {
          name: "Workbook",
          value: "workbook",
          description: "Workbook is the top level object which contains related workbook objects such as worksheets, tables, ranges, etc"
        },
        {
          name: "Worksheet",
          value: "worksheet",
          description: "An Excel worksheet is a grid of cells. It can contain data, tables, charts, etc."
        }
      ],
      default: "workbook"
    },
    ...import_WorkbookDescription.workbookOperations,
    ...import_WorkbookDescription.workbookFields,
    ...import_WorksheetDescription.worksheetOperations,
    ...import_WorksheetDescription.worksheetFields,
    ...import_TableDescription.tableOperations,
    ...import_TableDescription.tableFields
  ]
};
class MicrosoftExcelV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the workbooks to display them to user so that he can
        // select them easily
        async getWorkbooks() {
          const qs = {
            select: "id,name"
          };
          const returnData = [];
          const workbooks = await import_GenericFunctions.microsoftApiRequestAllItems.call(
            this,
            "value",
            "GET",
            "/drive/root/search(q='.xlsx')",
            {},
            qs
          );
          for (const workbook of workbooks) {
            const workbookName = workbook.name;
            const workbookId = workbook.id;
            returnData.push({
              name: workbookName,
              value: workbookId
            });
          }
          return returnData;
        },
        // Get all the worksheets to display them to user so that he can
        // select them easily
        async getworksheets() {
          const workbookId = this.getCurrentNodeParameter("workbook");
          const qs = {
            select: "id,name"
          };
          const returnData = [];
          const worksheets = await import_GenericFunctions.microsoftApiRequestAllItems.call(
            this,
            "value",
            "GET",
            `/drive/items/${workbookId}/workbook/worksheets`,
            {},
            qs
          );
          for (const worksheet of worksheets) {
            const worksheetName = worksheet.name;
            const worksheetId = worksheet.id;
            returnData.push({
              name: worksheetName,
              value: worksheetId
            });
          }
          return returnData;
        },
        // Get all the tables to display them to user so that he can
        // select them easily
        async getTables() {
          const workbookId = this.getCurrentNodeParameter("workbook");
          const worksheetId = this.getCurrentNodeParameter("worksheet");
          const qs = {
            select: "id,name"
          };
          const returnData = [];
          const tables = await import_GenericFunctions.microsoftApiRequestAllItems.call(
            this,
            "value",
            "GET",
            `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables`,
            {},
            qs
          );
          for (const table of tables) {
            const tableName = table.name;
            const tableId = table.id;
            returnData.push({
              name: tableName,
              value: tableId
            });
          }
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const itemData = (0, import_utilities.generatePairedItemData)(items.length);
    const returnData = [];
    const length = items.length;
    let qs = {};
    const result = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "table") {
      if (operation === "addRow") {
        try {
          const workbookId = this.getNodeParameter("workbook", 0);
          const worksheetId = this.getNodeParameter("worksheet", 0);
          const tableId = this.getNodeParameter("table", 0);
          const additionalFields = this.getNodeParameter("additionalFields", 0);
          const body = {};
          if (additionalFields.index) {
            body.index = additionalFields.index;
          }
          responseData = await import_GenericFunctions.microsoftApiRequest.call(
            this,
            "GET",
            `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
            {},
            qs
          );
          const columns = responseData.value.map((column) => column.name);
          const rows = [];
          for (const item of items) {
            const row = [];
            for (const column of columns) {
              row.push(item.json[column]);
            }
            rows.push(row);
          }
          body.values = rows;
          const { id } = await import_GenericFunctions.microsoftApiRequest.call(
            this,
            "POST",
            `/drive/items/${workbookId}/workbook/createSession`,
            { persistChanges: true }
          );
          responseData = await import_GenericFunctions.microsoftApiRequest.call(
            this,
            "POST",
            `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/rows/add`,
            body,
            {},
            "",
            { "workbook-session-id": id }
          );
          await import_GenericFunctions.microsoftApiRequest.call(
            this,
            "POST",
            `/drive/items/${workbookId}/workbook/closeSession`,
            {},
            {},
            "",
            { "workbook-session-id": id }
          );
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData }
          );
          returnData.push(...executionData);
        } catch (error) {
          if (this.continueOnFail()) {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData }
            );
            returnData.push(...executionErrorData);
          } else {
            throw error;
          }
        }
      }
      if (operation === "getColumns") {
        for (let i = 0; i < length; i++) {
          try {
            qs = {};
            const workbookId = this.getNodeParameter("workbook", i);
            const worksheetId = this.getNodeParameter("worksheet", i);
            const tableId = this.getNodeParameter("table", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const rawData = this.getNodeParameter("rawData", i);
            if (rawData) {
              const filters = this.getNodeParameter("filters", i);
              if (filters.fields) {
                qs.$select = filters.fields;
              }
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItemsSkip.call(
                this,
                "value",
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
                {},
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
                {},
                qs
              );
              responseData = responseData.value;
            }
            if (!rawData) {
              responseData = responseData.map((column) => ({ name: column.name }));
            } else {
              const dataProperty = this.getNodeParameter("dataProperty", i);
              responseData = { [dataProperty]: responseData };
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getRows") {
        for (let i = 0; i < length; i++) {
          qs = {};
          try {
            const workbookId = this.getNodeParameter("workbook", i);
            const worksheetId = this.getNodeParameter("worksheet", i);
            const tableId = this.getNodeParameter("table", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const rawData = this.getNodeParameter("rawData", i);
            if (rawData) {
              const filters = this.getNodeParameter("filters", i);
              if (filters.fields) {
                qs.$select = filters.fields;
              }
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItemsSkip.call(
                this,
                "value",
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/rows`,
                {},
                qs
              );
            } else {
              const rowsQs = { ...qs };
              rowsQs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/rows`,
                {},
                rowsQs
              );
              responseData = responseData.value;
            }
            if (!rawData) {
              const columnsQs = { ...qs };
              columnsQs.$select = "name";
              let columns = await import_GenericFunctions.microsoftApiRequestAllItemsSkip.call(
                this,
                "value",
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
                {},
                columnsQs
              );
              columns = columns.map((column) => column.name);
              for (let index = 0; index < responseData.length; index++) {
                const object = {};
                for (let y = 0; y < columns.length; y++) {
                  object[columns[y]] = responseData[index].values[0][y];
                }
                const executionData = this.helpers.constructExecutionMetaData(
                  this.helpers.returnJsonArray({ ...object }),
                  { itemData: { item: index } }
                );
                returnData.push(...executionData);
              }
            } else {
              const dataProperty = this.getNodeParameter("dataProperty", i);
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ [dataProperty]: responseData }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "lookup") {
        for (let i = 0; i < length; i++) {
          qs = {};
          try {
            const workbookId = this.getNodeParameter("workbook", i);
            const worksheetId = this.getNodeParameter("worksheet", i);
            const tableId = this.getNodeParameter("table", i);
            const lookupColumn = this.getNodeParameter("lookupColumn", i);
            const lookupValue = this.getNodeParameter("lookupValue", i);
            const options = this.getNodeParameter("options", i);
            responseData = await import_GenericFunctions.microsoftApiRequestAllItemsSkip.call(
              this,
              "value",
              "GET",
              `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/rows`,
              {},
              {}
            );
            qs.$select = "name";
            let columns = await import_GenericFunctions.microsoftApiRequestAllItemsSkip.call(
              this,
              "value",
              "GET",
              `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
              {},
              qs
            );
            columns = columns.map((column) => column.name);
            if (!columns.includes(lookupColumn)) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
                message: `Column ${lookupColumn} does not exist on the table selected`
              });
            }
            result.length = 0;
            for (let index = 0; index < responseData.length; index++) {
              const object = {};
              for (let y = 0; y < columns.length; y++) {
                object[columns[y]] = responseData[index].values[0][y];
              }
              result.push({ ...object });
            }
            if (options.returnAllMatches) {
              responseData = result.filter((data) => {
                return data[lookupColumn]?.toString() === lookupValue;
              });
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            } else {
              responseData = result.find((data) => {
                return data[lookupColumn]?.toString() === lookupValue;
              });
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "workbook") {
      for (let i = 0; i < length; i++) {
        qs = {};
        try {
          if (operation === "addWorksheet") {
            const workbookId = this.getNodeParameter("workbook", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {};
            if (additionalFields.name) {
              body.name = additionalFields.name;
            }
            const { id } = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${workbookId}/workbook/createSession`,
              { persistChanges: true }
            );
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${workbookId}/workbook/worksheets/add`,
              body,
              {},
              "",
              { "workbook-session-id": id }
            );
            await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${workbookId}/workbook/closeSession`,
              {},
              {},
              "",
              { "workbook-session-id": id }
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            if (filters.fields) {
              qs.$select = filters.fields;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                "/drive/root/search(q='.xlsx')",
                {},
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                "/drive/root/search(q='.xlsx')",
                {},
                qs
              );
              responseData = responseData.value;
            }
          }
          if (Array.isArray(responseData)) {
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else if (responseData !== void 0) {
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
            continue;
          }
          throw error;
        }
      }
    }
    if (resource === "worksheet") {
      for (let i = 0; i < length; i++) {
        qs = {};
        try {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const workbookId = this.getNodeParameter("workbook", i);
            const filters = this.getNodeParameter("filters", i);
            if (filters.fields) {
              qs.$select = filters.fields;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets`,
                {},
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/drive/items/${workbookId}/workbook/worksheets`,
                {},
                qs
              );
              responseData = responseData.value;
            }
          }
          if (operation === "getContent") {
            const workbookId = this.getNodeParameter("workbook", i);
            const worksheetId = this.getNodeParameter("worksheet", i);
            const range = this.getNodeParameter("range", i);
            const rawData = this.getNodeParameter("rawData", i);
            if (rawData) {
              const filters = this.getNodeParameter("filters", i);
              if (filters.fields) {
                qs.$select = filters.fields;
              }
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`,
              {},
              qs
            );
            if (!rawData) {
              const keyRow = this.getNodeParameter("keyRow", i);
              const dataStartRow = this.getNodeParameter("dataStartRow", i);
              if (responseData.values === null) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
                  message: "Range did not return data"
                });
              }
              const keyValues = responseData.values[keyRow];
              for (let index = dataStartRow; index < responseData.values.length; index++) {
                const object = {};
                for (let y = 0; y < keyValues.length; y++) {
                  object[keyValues[y]] = responseData.values[index][y];
                }
                const executionData = this.helpers.constructExecutionMetaData(
                  this.helpers.returnJsonArray({ ...object }),
                  { itemData: { item: index } }
                );
                returnData.push(...executionData);
              }
            } else {
              const dataProperty = this.getNodeParameter("dataProperty", i);
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ [dataProperty]: responseData }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          }
        } catch (error) {
          if (this.continueOnFail()) {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
            continue;
          }
          throw error;
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftExcelV1
});
//# sourceMappingURL=MicrosoftExcelV1.node.js.map