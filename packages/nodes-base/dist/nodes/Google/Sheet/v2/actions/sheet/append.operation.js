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
var import_n8n_workflow = require("n8n-workflow");
var import_commonDescription = require("./commonDescription");
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
const description = [
  {
    displayName: "Data Mode",
    name: "dataMode",
    type: "options",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMapInputData",
        description: "Use when node input properties match destination column names"
      },
      {
        name: "Map Each Column Below",
        value: "defineBelow",
        description: "Set the value for each destination column"
      },
      {
        name: "Nothing",
        value: "nothing",
        description: "Do not send anything"
      }
    ],
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["append"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: "defineBelow",
    description: "Whether to insert the input data this node receives in the new row"
  },
  {
    displayName: "In this mode, make sure the incoming data is named the same as the columns in your Sheet. (Use an 'Edit Fields' node before this node to change it if required.)",
    name: "autoMapNotice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["append"],
        dataMode: ["autoMapInputData"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Fields to Send",
    name: "fieldsUi",
    placeholder: "Add Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValueButtonText: "Add Field to Send",
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["append"],
        dataMode: ["defineBelow"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "fieldValues",
        values: [
          {
            displayName: "Field Name or ID",
            name: "fieldId",
            type: "options",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: {
              loadOptionsDependsOn: ["sheetName.value"],
              loadOptionsMethod: "getSheetHeaderRowAndSkipEmpty"
            },
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
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
      loadOptionsDependsOn: ["sheetName.value"],
      resourceMapper: {
        resourceMapperMethod: "getMappingColumns",
        mode: "add",
        fieldWords: {
          singular: "column",
          plural: "columns"
        },
        addAllFields: true,
        multiKeyMatch: false
      }
    },
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["append"],
        "@version": [{ _cnd: { gte: 4 } }]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["append"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    options: [
      import_commonDescription.cellFormat,
      {
        displayName: "Data Location on Sheet",
        name: "locationDefine",
        type: "fixedCollection",
        placeholder: "Select Range",
        default: { values: {} },
        options: [
          {
            displayName: "Values",
            name: "values",
            values: [
              {
                displayName: "Header Row",
                name: "headerRow",
                type: "number",
                typeOptions: {
                  minValue: 1
                },
                default: 1,
                description: "Index of the row which contains the keys. Starts at 1. The incoming node data is matched to the keys for assignment. The matching is case sensitive."
              }
            ]
          }
        ]
      },
      import_commonDescription.handlingExtraData,
      {
        ...import_commonDescription.handlingExtraData,
        displayOptions: { show: { "/columns.mappingMode": ["autoMapInputData"] } }
      },
      import_commonDescription.useAppendOption
    ]
  }
];
async function execute(sheet, range, sheetId) {
  const items = this.getInputData();
  const nodeVersion = this.getNode().typeVersion;
  let dataMode = nodeVersion < 4 ? this.getNodeParameter("dataMode", 0) : this.getNodeParameter("columns.mappingMode", 0);
  if (!items.length || dataMode === "nothing") return [];
  const options = this.getNodeParameter("options", 0, {});
  const locationDefine = options.locationDefine?.values;
  let keyRowIndex = 1;
  if (locationDefine?.headerRow) {
    keyRowIndex = locationDefine.headerRow;
  }
  const sheetData = await sheet.getData(range, "FORMATTED_VALUE");
  if (!sheetData?.length) {
    dataMode = "autoMapInputData";
  }
  if (nodeVersion >= 4.4 && dataMode !== "autoMapInputData") {
    if (sheetData?.[keyRowIndex - 1] === void 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `Could not retrieve the column names from row ${keyRowIndex}`
      );
    }
    const schema = this.getNodeParameter("columns.schema", 0);
    (0, import_GoogleSheets.checkForSchemaChanges)(this.getNode(), sheetData[keyRowIndex - 1], schema);
  }
  let inputData = [];
  if (dataMode === "autoMapInputData") {
    inputData = await import_GoogleSheets.autoMapInputData.call(this, range, sheet, items, options);
  } else {
    inputData = import_GoogleSheets.mapFields.call(this, items.length);
  }
  if (inputData.length === 0) {
    return [];
  }
  const valueInputMode = options.cellFormat || (0, import_GoogleSheets.cellFormatDefault)(nodeVersion);
  const useAppend = options.useAppend;
  if (options.useAppend) {
    await sheet.appendSheetData({
      inputData,
      range,
      keyRowIndex,
      valueInputMode,
      useAppend
    });
  } else {
    await sheet.appendEmptyRowsOrColumns(sheetId, 1, 0);
    const lastRow = (sheetData ?? [{}]).length + 1;
    await sheet.appendSheetData({
      inputData,
      range,
      keyRowIndex,
      valueInputMode,
      lastRow
    });
  }
  if (nodeVersion < 4 || dataMode === "autoMapInputData") {
    return items.map((item, index) => {
      item.pairedItem = { item: index };
      return item;
    });
  } else {
    const returnData = [];
    for (const [index, entry] of inputData.entries()) {
      returnData.push({
        json: entry,
        pairedItem: { item: index }
      });
    }
    return returnData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=append.operation.js.map