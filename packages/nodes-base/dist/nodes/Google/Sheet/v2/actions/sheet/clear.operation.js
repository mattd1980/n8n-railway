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
var clear_operation_exports = {};
__export(clear_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(clear_operation_exports);
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
const description = [
  {
    displayName: "Clear",
    name: "clear",
    type: "options",
    options: [
      {
        name: "Whole Sheet",
        value: "wholeSheet"
      },
      {
        name: "Specific Rows",
        value: "specificRows"
      },
      {
        name: "Specific Columns",
        value: "specificColumns"
      },
      {
        name: "Specific Range",
        value: "specificRange"
      }
    ],
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: "wholeSheet",
    description: "What to clear"
  },
  {
    displayName: "Keep First Row",
    name: "keepFirstRow",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["wholeSheet"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: false
  },
  {
    displayName: "Start Row Number",
    name: "startIndex",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    description: "The row number to delete from, The first row is 1",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["specificRows"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Number of Rows to Delete",
    name: "rowsToDelete",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["specificRows"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Start Column",
    name: "startIndex",
    type: "string",
    default: "A",
    description: "The column to delete",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["specificColumns"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    // Could this be better as "end column"?
    displayName: "Number of Columns to Delete",
    name: "columnsToDelete",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["specificColumns"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Range",
    name: "range",
    type: "string",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["clear"],
        clear: ["specificRange"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: "A:F",
    required: true,
    description: 'The table range to read from or to append data to. See the Google <a href="https://developers.google.com/sheets/api/guides/values#writing">documentation</a> for the details. If it contains multiple sheets it can also be added like this: "MySheet!A:F"'
  }
];
async function execute(sheet, sheetName) {
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    const clearType = this.getNodeParameter("clear", i);
    const keepFirstRow = this.getNodeParameter("keepFirstRow", i, false);
    let range = "";
    if (clearType === "specificRows") {
      const startIndex = this.getNodeParameter("startIndex", i);
      const rowsToDelete = this.getNodeParameter("rowsToDelete", i);
      const endIndex = rowsToDelete === 1 ? startIndex : startIndex + rowsToDelete - 1;
      range = `${sheetName}!${startIndex}:${endIndex}`;
    }
    if (clearType === "specificColumns") {
      const startIndex = this.getNodeParameter("startIndex", i);
      const columnsToDelete = this.getNodeParameter("columnsToDelete", i);
      const columnNumber = (0, import_GoogleSheets.getColumnNumber)(startIndex);
      const endIndex = columnsToDelete === 1 ? columnNumber : columnNumber + columnsToDelete - 1;
      range = `${sheetName}!${startIndex}:${(0, import_GoogleSheets.getColumnName)(endIndex)}`;
    }
    if (clearType === "specificRange") {
      const rangeField = this.getNodeParameter("range", i);
      const region = rangeField.includes("!") ? rangeField.split("!")[1] || "" : rangeField;
      range = `${sheetName}!${region}`;
    }
    if (clearType === "wholeSheet") {
      range = sheetName;
    }
    if (keepFirstRow) {
      const firstRow = await sheet.getData(`${range}!1:1`, "FORMATTED_VALUE");
      await sheet.clearData(range);
      await sheet.updateRows(range, firstRow, "RAW", 1);
    } else {
      await sheet.clearData(range);
    }
  }
  return items;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=clear.operation.js.map