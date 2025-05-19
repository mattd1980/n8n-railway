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
var SpreadsheetFileV1_node_exports = {};
__export(SpreadsheetFileV1_node_exports, {
  SpreadsheetFileV1: () => SpreadsheetFileV1
});
module.exports = __toCommonJS(SpreadsheetFileV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_xlsx = require("xlsx");
var import_descriptions = require("../../../utils/descriptions");
var import_utilities = require("../../../utils/utilities");
var import_description = require("../description");
class SpreadsheetFileV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: 1,
      defaults: {
        name: "Spreadsheet File",
        color: "#2244FF"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        import_descriptions.oldVersionNotice,
        import_description.operationProperty,
        import_description.binaryProperty,
        ...import_description.toFileProperties,
        import_description.fromFileOptions,
        import_description.toFileOptions
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
    const operation = this.getNodeParameter("operation", 0);
    const newItems = [];
    if (operation === "fromFile") {
      for (let i = 0; i < items.length; i++) {
        try {
          const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
          const options = this.getNodeParameter("options", i, {});
          const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
          let workbook;
          const xlsxOptions = { raw: options.rawData };
          if (options.readAsString) xlsxOptions.type = "string";
          if (binaryData.id) {
            const binaryPath = this.helpers.getBinaryPath(binaryData.id);
            xlsxOptions.codepage = 65001;
            workbook = (0, import_xlsx.readFile)(binaryPath, xlsxOptions);
          } else {
            const binaryDataBuffer = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
            workbook = (0, import_xlsx.read)(
              options.readAsString ? binaryDataBuffer.toString() : binaryDataBuffer,
              xlsxOptions
            );
          }
          if (workbook.SheetNames.length === 0) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Spreadsheet does not have any sheets!", {
              itemIndex: i
            });
          }
          let sheetName = workbook.SheetNames[0];
          if (options.sheetName) {
            if (!workbook.SheetNames.includes(options.sheetName)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Spreadsheet does not contain sheet called "${options.sheetName}"!`,
                { itemIndex: i }
              );
            }
            sheetName = options.sheetName;
          }
          const sheetToJsonOptions = {};
          if (options.range) {
            if (isNaN(options.range)) {
              sheetToJsonOptions.range = options.range;
            } else {
              sheetToJsonOptions.range = parseInt(options.range, 10);
            }
          }
          if (options.includeEmptyCells) {
            sheetToJsonOptions.defval = "";
          }
          if (options.headerRow === false) {
            sheetToJsonOptions.header = 1;
          }
          const sheetJson = import_xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], sheetToJsonOptions);
          if (sheetJson.length === 0) {
            continue;
          }
          if (options.headerRow === false) {
            for (const rowData of sheetJson) {
              newItems.push({
                json: {
                  row: rowData
                },
                pairedItem: {
                  item: i
                }
              });
            }
          } else {
            for (const rowData of sheetJson) {
              newItems.push({
                json: rowData,
                pairedItem: {
                  item: i
                }
              });
            }
          }
        } catch (error) {
          if (this.continueOnFail()) {
            newItems.push({
              json: {
                error: error.message
              },
              pairedItem: {
                item: i
              }
            });
            continue;
          }
          throw error;
        }
      }
      return [newItems];
    } else if (operation === "toFile") {
      try {
        const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0);
        const fileFormat = this.getNodeParameter("fileFormat", 0);
        const options = this.getNodeParameter("options", 0, {});
        const sheetToJsonOptions = {};
        if (options.headerRow === false) {
          sheetToJsonOptions.skipHeader = true;
        }
        let item;
        const itemData = [];
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
          item = items[itemIndex];
          itemData.push((0, import_utilities.flattenObject)(item.json));
        }
        const ws = import_xlsx.utils.json_to_sheet(itemData, sheetToJsonOptions);
        const wopts = {
          bookSST: false,
          type: "buffer"
        };
        if (fileFormat === "csv") {
          wopts.bookType = "csv";
        } else if (fileFormat === "html") {
          wopts.bookType = "html";
        } else if (fileFormat === "rtf") {
          wopts.bookType = "rtf";
        } else if (fileFormat === "ods") {
          wopts.bookType = "ods";
          if (options.compression) {
            wopts.compression = true;
          }
        } else if (fileFormat === "xls") {
          wopts.bookType = "xls";
        } else if (fileFormat === "xlsx") {
          wopts.bookType = "xlsx";
          if (options.compression) {
            wopts.compression = true;
          }
        }
        const sheetName = options.sheetName || "Sheet";
        const wb = {
          SheetNames: [sheetName],
          Sheets: {
            [sheetName]: ws
          }
        };
        const wbout = (0, import_xlsx.write)(wb, wopts);
        const newItem = {
          json: {},
          binary: {},
          pairedItem
        };
        let fileName = `spreadsheet.${fileFormat}`;
        if (options.fileName !== void 0) {
          fileName = options.fileName;
        }
        newItem.binary[binaryPropertyName] = await this.helpers.prepareBinaryData(wbout, fileName);
        newItems.push(newItem);
      } catch (error) {
        if (this.continueOnFail()) {
          newItems.push({
            json: {
              error: error.message
            },
            pairedItem
          });
        } else {
          throw error;
        }
      }
    } else {
      if (this.continueOnFail()) {
        return [[{ json: { error: `The operation "${operation}" is not supported!` } }]];
      } else {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The operation "${operation}" is not supported!`
        );
      }
    }
    return [newItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpreadsheetFileV1
});
//# sourceMappingURL=SpreadsheetFileV1.node.js.map