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
var upsert_operation_exports = {};
__export(upsert_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(upsert_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
  {
    displayName: "Select a Range",
    name: "useRange",
    type: "boolean",
    default: false
  },
  {
    displayName: "Range",
    name: "range",
    type: "string",
    displayOptions: {
      show: {
        dataMode: ["autoMap", "define"],
        useRange: [true]
      }
    },
    placeholder: "e.g. A1:B2",
    default: "",
    description: "The sheet range to read the data from specified using a A1-style notation, has to be specific e.g A1:B5, generic ranges like A:B are not supported. Leave blank to use whole used range in the sheet.",
    hint: "First row must contain column names"
  },
  {
    displayName: "Data Mode",
    name: "dataMode",
    type: "options",
    default: "define",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMap",
        description: "Use when node input properties match destination column names"
      },
      {
        name: "Map Each Column Below",
        value: "define",
        description: "Set the value for each destination column"
      }
    ]
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased, n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Column to match on",
    name: "columnToMatchOn",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["worksheet.value", "workbook.value", "range"],
      loadOptionsMethod: "getWorksheetColumnRow"
    },
    default: "",
    hint: "Used to find the correct row to update. Doesn't get changed.",
    displayOptions: {
      show: {
        dataMode: ["autoMap", "define"]
      }
    }
  },
  {
    displayName: "Value of Column to Match On",
    name: "valueToMatchOn",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        dataMode: ["define"]
      }
    }
  },
  {
    displayName: "Values to Send",
    name: "fieldsUi",
    placeholder: "Add Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        dataMode: ["define"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "values",
        values: [
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
            displayName: "Column",
            name: "column",
            type: "options",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: {
              loadOptionsDependsOn: ["columnToMatchOn", "range"],
              loadOptionsMethod: "getWorksheetColumnRowSkipColumnToMatchOn"
            },
            default: ""
          },
          {
            displayName: "Value",
            name: "fieldValue",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Append After Selected Range",
        name: "appendAfterSelectedRange",
        type: "boolean",
        default: false,
        description: "Whether to append data after the selected range or used range",
        displayOptions: {
          show: {
            "/dataMode": ["autoMap", "define"],
            "/useRange": [true]
          }
        }
      },
      {
        displayName: "RAW Data",
        name: "rawData",
        type: "boolean",
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-boolean
        default: 0,
        description: "Whether the data should be returned RAW instead of parsed into keys according to their header"
      },
      {
        displayName: "Data Property",
        name: "dataProperty",
        type: "string",
        default: "data",
        required: true,
        displayOptions: {
          show: {
            rawData: [true]
          }
        },
        description: "The name of the property into which to write the RAW data"
      },
      {
        displayName: "Update All Matches",
        name: "updateAll",
        type: "boolean",
        default: false,
        description: "Whether to update all matching rows or just the first match"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["worksheet"],
    operation: ["upsert"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  const nodeVersion = this.getNode().typeVersion;
  try {
    const workbookId = this.getNodeParameter("workbook", 0, void 0, {
      extractValue: true
    });
    const worksheetId = this.getNodeParameter("worksheet", 0, void 0, {
      extractValue: true
    });
    let range = this.getNodeParameter("range", 0, "");
    (0, import_utils.checkRange)(this.getNode(), range);
    const dataMode = this.getNodeParameter("dataMode", 0);
    let worksheetData = {};
    if (range && dataMode !== "raw") {
      worksheetData = await import_transport.microsoftApiRequest.call(
        this,
        "PATCH",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`
      );
    }
    if (range === "") {
      const query = {};
      if (dataMode === "raw") {
        query.select = "address";
      }
      worksheetData = await import_transport.microsoftApiRequest.call(
        this,
        "GET",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`,
        void 0,
        query
      );
      range = worksheetData.address.split("!")[1];
    }
    let responseData;
    if (dataMode === "raw") {
      const data = this.getNodeParameter("data", 0);
      const values = (0, import_utilities.processJsonInput)(data, "Data");
      responseData = await import_transport.microsoftApiRequest.call(
        this,
        "PATCH",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`,
        { values }
      );
    }
    if (dataMode !== "raw" && (worksheetData.values === void 0 || worksheetData.values.length <= 1)) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "No data found in the specified range, mapping not possible, you can use raw mode instead to update selected range"
      );
    }
    const updateAll = this.getNodeParameter("options.updateAll", 0, false);
    let updateSummary = {
      updatedData: [],
      updatedRows: [],
      appendData: []
    };
    if (dataMode === "define") {
      updateSummary = import_utils.updateByDefinedValues.call(
        this,
        items.length,
        worksheetData.values,
        updateAll
      );
    }
    if (dataMode === "autoMap") {
      const columnToMatchOn = this.getNodeParameter("columnToMatchOn", 0);
      if (!items.some(({ json }) => json[columnToMatchOn] !== void 0)) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Any item in input data contains column '${columnToMatchOn}', that is selected to match on`
        );
      }
      updateSummary = (0, import_utils.updateByAutoMaping)(
        items,
        worksheetData.values,
        columnToMatchOn,
        updateAll
      );
    }
    const appendAfterSelectedRange = this.getNodeParameter(
      "options.appendAfterSelectedRange",
      0,
      false
    );
    if (nodeVersion > 2 && !appendAfterSelectedRange && updateSummary.updatedData.length) {
      for (let i = updateSummary.updatedData.length - 1; i >= 0; i--) {
        if (updateSummary.updatedData[i].every(
          (item) => item === "" || item === void 0 || item === null
        )) {
          updateSummary.updatedData.pop();
        } else {
          break;
        }
      }
    }
    if (updateSummary.appendData.length) {
      const appendValues = [];
      const columnsRow = worksheetData.values[0];
      for (const [index, item] of updateSummary.appendData.entries()) {
        const updateRow = [];
        for (const column of columnsRow) {
          updateRow.push(item[column]);
        }
        appendValues.push(updateRow);
        updateSummary.updatedRows.push(index + updateSummary.updatedData.length);
      }
      updateSummary.updatedData = updateSummary.updatedData.concat(appendValues);
      const [rangeFrom, rangeTo] = range.split(":");
      const cellDataTo = rangeTo.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
      let lastRow = cellDataTo[2];
      if (nodeVersion > 2 && !appendAfterSelectedRange) {
        const { address } = await import_transport.microsoftApiRequest.call(
          this,
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`,
          void 0,
          { select: "address" }
        );
        const addressTo = address.split("!")[1].split(":")[1];
        lastRow = addressTo.match(/([a-zA-Z]{1,10})([0-9]{0,10})/)[2];
      }
      range = `${rangeFrom}:${cellDataTo[1]}${Number(lastRow) + appendValues.length}`;
    }
    responseData = await import_transport.microsoftApiRequest.call(
      this,
      "PATCH",
      `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`,
      { values: updateSummary.updatedData }
    );
    const { updatedRows } = updateSummary;
    const rawData = this.getNodeParameter("options.rawData", 0, false);
    const dataProperty = this.getNodeParameter("options.dataProperty", 0, "data");
    returnData.push(
      ...import_utils.prepareOutput.call(this, this.getNode(), responseData, {
        updatedRows,
        rawData,
        dataProperty
      })
    );
  } catch (error) {
    if (this.continueOnFail()) {
      const itemData = (0, import_utilities.generatePairedItemData)(this.getInputData().length);
      const executionErrorData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray({ error: error.message }),
        { itemData }
      );
      returnData.push(...executionErrorData);
    } else {
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
//# sourceMappingURL=upsert.operation.js.map