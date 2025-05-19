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
var delete_operation_exports = {};
__export(delete_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(delete_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
const description = [
  {
    displayName: "To Delete",
    name: "toDelete",
    type: "options",
    options: [
      {
        name: "Rows",
        value: "rows",
        description: "Rows to delete"
      },
      {
        name: "Columns",
        value: "columns",
        description: "Columns to delete"
      }
    ],
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["delete"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    default: "rows",
    description: "What to delete"
  },
  {
    displayName: "Start Row Number",
    name: "startIndex",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 2,
    description: "The row number to delete from, The first row is 2",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["delete"],
        toDelete: ["rows"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Number of Rows to Delete",
    name: "numberToDelete",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["delete"],
        toDelete: ["rows"]
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
        operation: ["delete"],
        toDelete: ["columns"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Number of Columns to Delete",
    name: "numberToDelete",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["delete"],
        toDelete: ["columns"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  }
];
async function execute(sheet, sheetName) {
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    const requests = [];
    let startIndex, endIndex, numberToDelete;
    const deleteType = this.getNodeParameter("toDelete", i);
    if (deleteType === "rows") {
      startIndex = this.getNodeParameter("startIndex", i);
      startIndex--;
      numberToDelete = this.getNodeParameter("numberToDelete", i);
      if (numberToDelete === 1) {
        endIndex = startIndex + 1;
      } else {
        endIndex = startIndex + numberToDelete;
      }
      requests.push({
        deleteDimension: {
          range: {
            sheetId: sheetName,
            dimension: "ROWS",
            startIndex,
            endIndex
          }
        }
      });
    } else if (deleteType === "columns") {
      startIndex = this.getNodeParameter("startIndex", i);
      numberToDelete = this.getNodeParameter("numberToDelete", i);
      startIndex = (0, import_GoogleSheets.getColumnNumber)(startIndex) - 1;
      if (numberToDelete === 1) {
        endIndex = startIndex + 1;
      } else {
        endIndex = startIndex + numberToDelete;
      }
      requests.push({
        deleteDimension: {
          range: {
            sheetId: sheetName,
            dimension: "COLUMNS",
            startIndex,
            endIndex
          }
        }
      });
    }
    await sheet.spreadsheetBatchUpdate(requests);
  }
  const itemData = (0, import_utilities.generatePairedItemData)(this.getInputData().length);
  const returnData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)({ success: true }), {
    itemData
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=delete.operation.js.map