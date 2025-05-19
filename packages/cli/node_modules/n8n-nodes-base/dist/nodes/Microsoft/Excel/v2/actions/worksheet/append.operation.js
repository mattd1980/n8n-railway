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
var append_operation_exports = {};
__export(append_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(append_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
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
      },
      {
        name: "Raw",
        value: "raw",
        description: "Send raw data as JSON"
      }
    ]
  },
  {
    displayName: "Data",
    name: "data",
    type: "json",
    default: "",
    required: true,
    placeholder: 'e.g. [["Sara","1/2/2006","Berlin"],["George","5/3/2010","Paris"]]',
    description: "Raw values for the specified range as array of string arrays in JSON format",
    displayOptions: {
      show: {
        dataMode: ["raw"]
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
              loadOptionsDependsOn: ["worksheet.value"],
              loadOptionsMethod: "getWorksheetColumnRow"
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
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["worksheet"],
    operation: ["append"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  const workbookId = this.getNodeParameter("workbook", 0, void 0, {
    extractValue: true
  });
  const worksheetId = this.getNodeParameter("worksheet", 0, void 0, {
    extractValue: true
  });
  const dataMode = this.getNodeParameter("dataMode", 0);
  const worksheetData = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`
  );
  let values = [];
  if (dataMode === "raw") {
    const data = this.getNodeParameter("data", 0);
    values = (0, import_utilities.processJsonInput)(data, "Data");
  }
  const columnsRow = worksheetData.values[0];
  if (dataMode === "autoMap") {
    const itemsData = items.map((item) => item.json);
    for (const item of itemsData) {
      const updateRow = [];
      for (const column of columnsRow) {
        updateRow.push(item[column]);
      }
      values.push(updateRow);
    }
  }
  if (dataMode === "define") {
    const itemsData = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const updateData = {};
      const definedFields = this.getNodeParameter("fieldsUi.values", itemIndex, []);
      for (const entry of definedFields) {
        updateData[entry.column] = entry.fieldValue;
      }
      itemsData.push(updateData);
    }
    for (const item of itemsData) {
      const updateRow = [];
      for (const column of columnsRow) {
        updateRow.push(item[column]);
      }
      values.push(updateRow);
    }
  }
  const { address } = worksheetData;
  const usedRange = address.split("!")[1];
  const [rangeFrom, rangeTo] = usedRange.split(":");
  const cellDataFrom = rangeFrom.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
  const cellDataTo = rangeTo.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
  const from = `${cellDataFrom[1]}${Number(cellDataTo[2]) + 1}`;
  const to = `${cellDataTo[1]}${Number(cellDataTo[2]) + Number(values.length)}`;
  const responseData = await import_transport.microsoftApiRequest.call(
    this,
    "PATCH",
    `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${from}:${to}')`,
    { values }
  );
  const rawData = this.getNodeParameter("options.rawData", 0, false);
  const dataProperty = this.getNodeParameter("options.dataProperty", 0, "data");
  returnData.push(
    ...import_utils.prepareOutput.call(this, this.getNode(), responseData, {
      columnsRow,
      dataProperty,
      rawData
    })
  );
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=append.operation.js.map