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
var import_n8n_workflow = require("n8n-workflow");
var import_commonDescription = require("./commonDescription");
var import_GoogleSheets = require("../../helpers/GoogleSheets.types");
var import_GoogleSheets2 = require("../../helpers/GoogleSheets.utils");
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
        operation: ["update"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
      }
    },
    default: "defineBelow",
    description: "Whether to insert the input data this node receives in the new row"
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased, n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Column to match on",
    name: "columnToMatchOn",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["sheetName.value"],
      loadOptionsMethod: "getSheetHeaderRowAndSkipEmpty"
    },
    default: "",
    hint: "Used to find the correct row to update. Doesn't get changed.",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["update"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
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
        resource: ["sheet"],
        operation: ["update"],
        dataMode: ["defineBelow"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
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
        resource: ["sheet"],
        operation: ["update"],
        dataMode: ["defineBelow"],
        "@version": [3]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
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
              loadOptionsDependsOn: ["sheetName.value", "columnToMatchOn"],
              loadOptionsMethod: "getSheetHeaderRowAndAddColumn"
            },
            default: ""
          },
          {
            displayName: "Column Name",
            name: "columnName",
            type: "string",
            default: "",
            displayOptions: {
              show: {
                column: ["newColumn"]
              }
            }
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
        mode: "update",
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
        operation: ["update"],
        "@version": [{ _cnd: { gte: 4 } }]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
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
        operation: ["update"]
      },
      hide: {
        ...import_GoogleSheets2.untilSheetSelected
      }
    },
    options: [
      import_commonDescription.cellFormat,
      import_commonDescription.locationDefine,
      import_commonDescription.handlingExtraData,
      {
        ...import_commonDescription.handlingExtraData,
        displayOptions: { show: { "/columns.mappingMode": ["autoMapInputData"] } }
      }
    ]
  }
];
async function execute(sheet, sheetName) {
  const items = this.getInputData();
  const nodeVersion = this.getNode().typeVersion;
  const range = `${sheetName}!A:Z`;
  const valueInputMode = this.getNodeParameter(
    "options.cellFormat",
    0,
    (0, import_GoogleSheets2.cellFormatDefault)(nodeVersion)
  );
  const options = this.getNodeParameter("options", 0, {});
  const valueRenderMode = options.valueRenderMode || "UNFORMATTED_VALUE";
  const locationDefineOptions = options.locationDefine?.values;
  let keyRowIndex = 0;
  let dataStartRowIndex = 1;
  if (locationDefineOptions) {
    if (locationDefineOptions.headerRow) {
      keyRowIndex = parseInt(locationDefineOptions.headerRow, 10) - 1;
    }
    if (locationDefineOptions.firstDataRow) {
      dataStartRowIndex = parseInt(locationDefineOptions.firstDataRow, 10) - 1;
    }
  }
  let columnNames = [];
  const sheetData = await sheet.getData(sheetName, "FORMATTED_VALUE");
  if (sheetData?.[keyRowIndex] === void 0) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Could not retrieve the column names from row ${keyRowIndex + 1}`
    );
  }
  columnNames = sheetData[keyRowIndex];
  const newColumns = /* @__PURE__ */ new Set();
  const columnsToMatchOn = nodeVersion < 4 ? [this.getNodeParameter("columnToMatchOn", 0)] : this.getNodeParameter("columns.matchingColumns", 0);
  const dataMode = nodeVersion < 4 ? this.getNodeParameter("dataMode", 0) : this.getNodeParameter("columns.mappingMode", 0);
  const keyIndex = columnNames.indexOf(columnsToMatchOn[0]);
  const columnValuesList = await sheet.getColumnValues({
    range,
    keyIndex,
    dataStartRowIndex,
    valueRenderMode,
    sheetData
  });
  const updateData = [];
  const mappedValues = [];
  const errorOnUnexpectedColumn = (key, i) => {
    if (!columnNames.includes(key)) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Unexpected fields in node input", {
        itemIndex: i,
        description: `The input field '${key}' doesn't match any column in the Sheet. You can ignore this by changing the 'Handling extra data' field, which you can find under 'Options'.`
      });
    }
  };
  const addNewColumn = (key) => {
    if (!columnNames.includes(key) && key !== import_GoogleSheets.ROW_NUMBER) {
      newColumns.add(key);
    }
  };
  for (let i = 0; i < items.length; i++) {
    if (dataMode === "nothing") continue;
    const inputData = [];
    if (dataMode === "autoMapInputData") {
      const handlingExtraDataOption = options.handlingExtraData || "insertInNewColumn";
      if (handlingExtraDataOption === "ignoreIt") {
        inputData.push(items[i].json);
      }
      if (handlingExtraDataOption === "error") {
        Object.keys(items[i].json).forEach((key) => errorOnUnexpectedColumn(key, i));
        inputData.push(items[i].json);
      }
      if (handlingExtraDataOption === "insertInNewColumn") {
        Object.keys(items[i].json).forEach(addNewColumn);
        inputData.push(items[i].json);
      }
    } else {
      const valueToMatchOn = nodeVersion < 4 ? this.getNodeParameter("valueToMatchOn", i, "") : this.getNodeParameter(`columns.value["${columnsToMatchOn[0]}"]`, i, "");
      if (valueToMatchOn === "") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "The 'Column to Match On' parameter is required",
          {
            itemIndex: i
          }
        );
      }
      if (nodeVersion < 4) {
        const valuesToSend = this.getNodeParameter("fieldsUi.values", i, []);
        if (!valuesToSend?.length) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "At least one value has to be added under 'Values to Send'"
          );
        }
        const fields = valuesToSend.reduce((acc, entry) => {
          if (entry.column === "newColumn") {
            const columnName = entry.columnName;
            if (!columnNames.includes(columnName)) {
              newColumns.add(columnName);
            }
            acc[columnName] = entry.fieldValue;
          } else {
            acc[entry.column] = entry.fieldValue;
          }
          return acc;
        }, {});
        fields[columnsToMatchOn[0]] = valueToMatchOn;
        inputData.push(fields);
      } else {
        const mappingValues = this.getNodeParameter("columns.value", i);
        if (Object.keys(mappingValues).length === 0) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "At least one value has to be added under 'Values to Send'"
          );
        }
        Object.keys(mappingValues).forEach((key) => {
          if (key === "row_number" && (mappingValues[key] === null || mappingValues[key] === void 0)) {
            throw new import_n8n_workflow.UserError(
              "Column to match on (row_number) is not defined. Since the field is used to determine the row to update, it needs to have a value set."
            );
          }
          if (mappingValues[key] === void 0 || mappingValues[key] === null) {
            mappingValues[key] = "";
          }
        });
        inputData.push(mappingValues);
        mappedValues.push(mappingValues);
      }
    }
    if (newColumns.size) {
      const newColumnNames = columnNames.concat([...newColumns]);
      await sheet.updateRows(
        sheetName,
        [newColumnNames],
        options.cellFormat || (0, import_GoogleSheets2.cellFormatDefault)(nodeVersion),
        keyRowIndex + 1
      );
      columnNames = newColumnNames;
      newColumns.clear();
    }
    let preparedData;
    const columnNamesList = [columnNames.concat([...newColumns])];
    if (columnsToMatchOn[0] === "row_number") {
      preparedData = sheet.prepareDataForUpdatingByRowNumber(inputData, range, columnNamesList);
    } else {
      const indexKey = columnsToMatchOn[0];
      preparedData = await sheet.prepareDataForUpdateOrUpsert({
        inputData,
        indexKey,
        range,
        keyRowIndex,
        dataStartRowIndex,
        valueRenderMode,
        columnNamesList,
        columnValuesList
      });
    }
    updateData.push(...preparedData.updateData);
  }
  if (updateData.length) {
    await sheet.batchUpdate(updateData, valueInputMode);
  }
  if (nodeVersion < 4 || dataMode === "autoMapInputData") {
    return items.map((item, index) => {
      item.pairedItem = { item: index };
      return item;
    });
  } else {
    if (!updateData.length) {
      return [];
    }
    const returnData = [];
    for (const [index, entry] of mappedValues.entries()) {
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
//# sourceMappingURL=update.operation.js.map