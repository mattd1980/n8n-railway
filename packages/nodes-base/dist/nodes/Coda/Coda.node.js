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
var Coda_node_exports = {};
__export(Coda_node_exports, {
  Coda: () => Coda
});
module.exports = __toCommonJS(Coda_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ControlDescription = require("./ControlDescription");
var import_FormulaDescription = require("./FormulaDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_TableDescription = require("./TableDescription");
var import_ViewDescription = require("./ViewDescription");
class Coda {
  constructor() {
    this.description = {
      displayName: "Coda",
      name: "coda",
      icon: "file:coda.svg",
      group: ["output"],
      version: [1, 1.1],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Coda API",
      defaults: {
        name: "Coda"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "codaApi",
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
              name: "Control",
              value: "control",
              description: "Controls provide a user-friendly way to input a value that can affect other parts of the doc"
            },
            {
              name: "Formula",
              value: "formula",
              description: "Formulas can be great for performing one-off computations"
            },
            {
              name: "Table",
              value: "table",
              description: "Access data of tables in documents"
            },
            {
              name: "View",
              value: "view",
              description: "Access data of views in documents"
            }
          ],
          default: "table"
        },
        ...import_TableDescription.tableOperations,
        ...import_TableDescription.tableFields,
        ...import_FormulaDescription.formulaOperations,
        ...import_FormulaDescription.formulaFields,
        ...import_ControlDescription.controlOperations,
        ...import_ControlDescription.controlFields,
        ...import_ViewDescription.viewOperations,
        ...import_ViewDescription.viewFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available docs to display them to user so that they can
        // select them easily
        async getDocs() {
          const returnData = [];
          const qs = {};
          const docs = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", "/docs", {}, qs);
          for (const doc of docs) {
            const docName = doc.name;
            const docId = doc.id;
            returnData.push({
              name: docName,
              value: docId
            });
          }
          return returnData;
        },
        // Get all the available tables to display them to user so that they can
        // select them easily
        async getTables() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const tables = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/tables`,
            {}
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
        },
        // Get all the available columns to display them to user so that they can
        // select them easily
        async getColumns() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const tableId = this.getCurrentNodeParameter("tableId");
          const columns = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/tables/${tableId}/columns`,
            {}
          );
          for (const column of columns) {
            const columnName = column.name;
            const columnId = column.id;
            returnData.push({
              name: columnName,
              value: columnId
            });
          }
          return returnData;
        },
        // Get all the available views to display them to user so that they can
        // select them easily
        async getViews() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const views = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/tables?tableTypes=view`,
            {}
          );
          for (const view of views) {
            const viewName = view.name;
            const viewId = view.id;
            returnData.push({
              name: viewName,
              value: viewId
            });
          }
          return returnData;
        },
        // Get all the available formulas to display them to user so that they can
        // select them easily
        async getFormulas() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const formulas = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/formulas`,
            {}
          );
          for (const formula of formulas) {
            const formulaName = formula.name;
            const formulaId = formula.id;
            returnData.push({
              name: formulaName,
              value: formulaId
            });
          }
          return returnData;
        },
        // Get all the available view rows to display them to user so that they can
        // select them easily
        async getViewRows() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const viewId = this.getCurrentNodeParameter("viewId");
          const viewRows = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/tables/${viewId}/rows`,
            {}
          );
          for (const viewRow of viewRows) {
            const viewRowName = viewRow.name;
            const viewRowId = viewRow.id;
            returnData.push({
              name: viewRowName,
              value: viewRowId
            });
          }
          return returnData;
        },
        // Get all the available view columns to display them to user so that they can
        // select them easily
        async getViewColumns() {
          const returnData = [];
          const docId = this.getCurrentNodeParameter("docId");
          const viewId = this.getCurrentNodeParameter("viewId");
          const viewColumns = await import_GenericFunctions.codaApiRequestAllItems.call(
            this,
            "items",
            "GET",
            `/docs/${docId}/tables/${viewId}/columns`,
            {}
          );
          for (const viewColumn of viewColumns) {
            const viewColumnName = viewColumn.name;
            const viewColumnId = viewColumn.id;
            returnData.push({
              name: viewColumnName,
              value: viewColumnId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const nodeVersion = this.getNode().typeVersion;
    const returnData = [];
    const items = this.getInputData();
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    let qs = {};
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "table") {
      if (operation === "createRow") {
        try {
          const sendData = {};
          for (let i = 0; i < items.length; i++) {
            qs = {};
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const options = this.getNodeParameter("options", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/rows`;
            if (options.disableParsing) {
              qs.disableParsing = options.disableParsing;
            }
            const cells = [];
            cells.length = 0;
            for (const key of Object.keys(items[i].json)) {
              cells.push({
                column: key,
                value: items[i].json[key]
              });
            }
            if (sendData[endpoint] === void 0) {
              sendData[endpoint] = {
                rows: [],
                // TODO: This is not perfect as it ignores if qs changes between
                //       different items but should be OK for now
                qs
              };
            }
            sendData[endpoint].rows.push({ cells });
            if (options.keyColumns) {
              sendData[endpoint].keyColumns = options.keyColumns.split(
                ","
              );
            }
          }
          for (const endpoint of Object.keys(sendData)) {
            await import_GenericFunctions.codaApiRequest.call(
              this,
              "POST",
              endpoint,
              sendData[endpoint],
              sendData[endpoint].qs
            );
          }
        } catch (error) {
          if (this.continueOnFail()) {
            return [this.helpers.returnJsonArray({ error: error.message })];
          }
          throw error;
        }
        return [items];
      }
      if (operation === "getRow") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const options = this.getNodeParameter("options", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/rows/${rowId}`;
            if (options.useColumnNames === false) {
              qs.useColumnNames = options.useColumnNames;
            } else {
              qs.useColumnNames = true;
            }
            if (options.valueFormat) {
              qs.valueFormat = options.valueFormat;
            }
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
            if (options.rawData === true) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            } else {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({
                  id: responseData.id,
                  ...responseData.values
                }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "getAllRows") {
        let itemsLength = items.length ? 1 : 0;
        if (nodeVersion >= 1.1) {
          itemsLength = items.length;
        }
        for (let i = 0; i < itemsLength; i++) {
          const docId = this.getNodeParameter("docId", i);
          const returnAll = this.getNodeParameter("returnAll", i);
          const tableId = this.getNodeParameter("tableId", i);
          const options = this.getNodeParameter("options", i);
          const endpoint = `/docs/${docId}/tables/${tableId}/rows`;
          if (options.useColumnNames === false) {
            qs.useColumnNames = options.useColumnNames;
          } else {
            qs.useColumnNames = true;
          }
          if (options.valueFormat) {
            qs.valueFormat = options.valueFormat;
          }
          if (options.sortBy) {
            qs.sortBy = options.sortBy;
          }
          if (options.visibleOnly) {
            qs.visibleOnly = options.visibleOnly;
          }
          if (options.query) {
            qs.query = options.query;
          }
          try {
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(
                this,
                "items",
                "GET",
                endpoint,
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            if (options.rawData === true) {
              for (const item of responseData) {
                returnData.push({
                  json: item,
                  pairedItem: [{ item: i }]
                });
              }
            } else {
              for (const item of responseData) {
                returnData.push({
                  json: {
                    id: item.id,
                    ...item.values
                  },
                  pairedItem: [{ item: i }]
                });
              }
            }
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: [{ item: i }]
              });
              continue;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
        }
        return [returnData];
      }
      if (operation === "deleteRow") {
        try {
          const sendData = {};
          for (let i = 0; i < items.length; i++) {
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/rows`;
            if (sendData[endpoint] === void 0) {
              sendData[endpoint] = [];
            }
            sendData[endpoint].push(rowId);
          }
          for (const endpoint of Object.keys(sendData)) {
            await import_GenericFunctions.codaApiRequest.call(this, "DELETE", endpoint, { rowIds: sendData[endpoint] }, qs);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            return [this.helpers.returnJsonArray({ error: error.message })];
          }
          throw error;
        }
        return [items];
      }
      if (operation === "pushButton") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const columnId = this.getNodeParameter("columnId", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/rows/${rowId}/buttons/${columnId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "POST", endpoint, {});
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [this.helpers.returnJsonArray(returnData)];
      }
      if (operation === "getColumn") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const columnId = this.getNodeParameter("columnId", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/columns/${columnId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {});
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [this.helpers.returnJsonArray(returnData)];
      }
      if (operation === "getAllColumns") {
        for (let i = 0; i < items.length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const docId = this.getNodeParameter("docId", i);
            const tableId = this.getNodeParameter("tableId", i);
            const endpoint = `/docs/${docId}/tables/${tableId}/columns`;
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", endpoint, {});
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
    }
    if (resource === "formula") {
      if (operation === "get") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const formulaId = this.getNodeParameter("formulaId", i);
            const endpoint = `/docs/${docId}/formulas/${formulaId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {});
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "getAll") {
        for (let i = 0; i < items.length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const docId = this.getNodeParameter("docId", i);
            const endpoint = `/docs/${docId}/formulas`;
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", endpoint, {});
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
    }
    if (resource === "control") {
      if (operation === "get") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const controlId = this.getNodeParameter("controlId", i);
            const endpoint = `/docs/${docId}/controls/${controlId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {});
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "getAll") {
        const returnAll = this.getNodeParameter("returnAll", 0);
        qs.limit = this.getNodeParameter("limit", 0);
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const endpoint = `/docs/${docId}/controls`;
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", endpoint, {});
            } else {
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
    }
    if (resource === "view") {
      if (operation === "get") {
        for (let i = 0; i < items.length; i++) {
          const docId = this.getNodeParameter("docId", i);
          const viewId = this.getNodeParameter("viewId", i);
          const endpoint = `/docs/${docId}/tables/${viewId}`;
          responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
        return [returnData];
      }
      if (operation === "getAll") {
        const returnAll = this.getNodeParameter("returnAll", 0);
        qs.limit = this.getNodeParameter("limit", 0);
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const endpoint = `/docs/${docId}/tables?tableTypes=view`;
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", endpoint, {});
            } else {
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "getAllViewRows") {
        let itemsLength = items.length ? 1 : 0;
        if (nodeVersion >= 1.1) {
          itemsLength = items.length;
        }
        for (let i = 0; i < itemsLength; i++) {
          const docId = this.getNodeParameter("docId", i);
          const returnAll = this.getNodeParameter("returnAll", i);
          const viewId = this.getNodeParameter("viewId", i);
          const options = this.getNodeParameter("options", i);
          const endpoint = `/docs/${docId}/tables/${viewId}/rows`;
          if (options.useColumnNames === false) {
            qs.useColumnNames = options.useColumnNames;
          } else {
            qs.useColumnNames = true;
          }
          if (options.valueFormat) {
            qs.valueFormat = options.valueFormat;
          }
          if (options.sortBy) {
            qs.sortBy = options.sortBy;
          }
          if (options.query) {
            qs.query = options.query;
          }
          try {
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(
                this,
                "items",
                "GET",
                endpoint,
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            if (options.rawData === true) {
              for (const item of responseData) {
                returnData.push({
                  json: item,
                  pairedItem: [{ item: i }]
                });
              }
            } else {
              for (const item of responseData) {
                returnData.push({
                  json: {
                    id: item.id,
                    ...item.values
                  },
                  pairedItem: [{ item: i }]
                });
              }
            }
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: [{ item: i }]
              });
              continue;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
        }
        return [returnData];
      }
      if (operation === "deleteViewRow") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const viewId = this.getNodeParameter("viewId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const endpoint = `/docs/${docId}/tables/${viewId}/rows/${rowId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "DELETE", endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "pushViewButton") {
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const viewId = this.getNodeParameter("viewId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const columnId = this.getNodeParameter("columnId", i);
            const endpoint = `/docs/${docId}/tables/${viewId}/rows/${rowId}/buttons/${columnId}`;
            responseData = await import_GenericFunctions.codaApiRequest.call(this, "POST", endpoint);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "getAllViewColumns") {
        const returnAll = this.getNodeParameter("returnAll", 0);
        qs.limit = this.getNodeParameter("limit", 0);
        for (let i = 0; i < items.length; i++) {
          try {
            const docId = this.getNodeParameter("docId", i);
            const viewId = this.getNodeParameter("viewId", i);
            const endpoint = `/docs/${docId}/tables/${viewId}/columns`;
            if (returnAll) {
              responseData = await import_GenericFunctions.codaApiRequestAllItems.call(this, "items", "GET", endpoint, {});
            } else {
              responseData = await import_GenericFunctions.codaApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.messsage }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw error;
          }
        }
        return [returnData];
      }
      if (operation === "updateViewRow") {
        for (let i = 0; i < items.length; i++) {
          try {
            qs = {};
            const docId = this.getNodeParameter("docId", i);
            const viewId = this.getNodeParameter("viewId", i);
            const rowId = this.getNodeParameter("rowId", i);
            const keyName = this.getNodeParameter("keyName", i);
            const options = this.getNodeParameter("options", i);
            const body = {};
            const endpoint = `/docs/${docId}/tables/${viewId}/rows/${rowId}`;
            if (options.disableParsing) {
              qs.disableParsing = options.disableParsing;
            }
            const cells = [];
            cells.length = 0;
            for (const key of Object.keys(items[i].json[keyName])) {
              cells.push({
                column: key,
                //@ts-ignore
                value: items[i].json[keyName][key]
              });
            }
            body.row = {
              cells
            };
            await import_GenericFunctions.codaApiRequest.call(this, "PUT", endpoint, body, qs);
          } catch (error) {
            if (this.continueOnFail()) {
              items[i].json = { error: error.message };
              continue;
            }
            throw error;
          }
        }
        return [items];
      }
    }
    return [];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Coda
});
//# sourceMappingURL=Coda.node.js.map