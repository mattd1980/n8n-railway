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
var fromFile_operation_exports = {};
__export(fromFile_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(fromFile_operation_exports);
var import_csv_parse = require("csv-parse");
var import_n8n_workflow = require("n8n-workflow");
var import_xlsx = require("xlsx");
var import_description = require("../description");
const description = [
  import_description.binaryProperty,
  {
    displayName: "File Format",
    name: "fileFormat",
    type: "options",
    options: [
      {
        name: "Autodetect",
        value: "autodetect"
      },
      {
        name: "CSV",
        value: "csv",
        description: "Comma-separated values"
      },
      {
        name: "HTML",
        value: "html",
        description: "HTML Table"
      },
      {
        name: "ODS",
        value: "ods",
        description: "OpenDocument Spreadsheet"
      },
      {
        name: "RTF",
        value: "rtf",
        description: "Rich Text Format"
      },
      {
        name: "XLS",
        value: "xls",
        description: "Excel"
      },
      {
        name: "XLSX",
        value: "xlsx",
        description: "Excel"
      }
    ],
    default: "autodetect",
    description: "The format of the binary data to read from",
    displayOptions: {
      show: {
        operation: ["fromFile"]
      }
    }
  },
  import_description.fromFileOptions
];
async function execute(items, fileFormatProperty = "fileFormat") {
  const returnData = [];
  let fileExtension;
  let fileFormat;
  for (let i = 0; i < items.length; i++) {
    try {
      const options = this.getNodeParameter("options", i, {});
      fileFormat = this.getNodeParameter(fileFormatProperty, i, "");
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
      const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
      fileExtension = binaryData.fileExtension;
      let rows = [];
      if (fileFormat === "autodetect" && (binaryData.mimeType === "text/csv" || binaryData.mimeType === "text/plain" && binaryData.fileExtension === "csv")) {
        fileFormat = "csv";
      }
      if (fileFormat === "csv") {
        const maxRowCount = options.maxRowCount;
        const parser = (0, import_csv_parse.parse)({
          delimiter: options.delimiter,
          fromLine: options.fromLine,
          encoding: options.encoding,
          bom: options.enableBOM,
          to: maxRowCount > -1 ? maxRowCount : void 0,
          columns: options.headerRow !== false,
          relax_quotes: options.relaxQuotes,
          onRecord: (record) => {
            if (!options.includeEmptyCells) {
              record = Object.fromEntries(
                Object.entries(record).filter(([_key, value]) => value !== "")
              );
            }
            rows.push(record);
          }
        });
        if (binaryData.id) {
          const stream = await this.helpers.getBinaryStream(binaryData.id);
          await new Promise(async (resolve, reject) => {
            parser.on("error", reject);
            parser.on("readable", () => {
              stream.unpipe(parser);
              stream.destroy();
              resolve();
            });
            stream.pipe(parser);
          });
        } else {
          parser.write(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
          parser.end();
        }
      } else {
        let workbook;
        const xlsxOptions = { raw: options.rawData };
        if (options.readAsString) xlsxOptions.type = "string";
        if (binaryData.id) {
          const binaryPath = this.helpers.getBinaryPath(binaryData.id);
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
        rows = import_xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], sheetToJsonOptions);
        if (rows.length === 0) {
          continue;
        }
      }
      if (options.headerRow === false) {
        for (const rowData of rows) {
          returnData.push({
            json: {
              row: rowData
            },
            pairedItem: {
              item: i
            }
          });
        }
      } else {
        for (const rowData of rows) {
          returnData.push({
            json: rowData,
            pairedItem: {
              item: i
            }
          });
        }
      }
    } catch (error) {
      let errorDescription = error.description;
      if (fileExtension && fileExtension !== fileFormat) {
        error.message = `The file selected in 'Input Binary Field' is not in ${fileFormat} format`;
        errorDescription = `Try to change the operation or select a ${fileFormat} file in 'Input Binary Field'`;
      }
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: error.message
          },
          pairedItem: {
            item: i
          }
        });
        continue;
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
        itemIndex: i,
        description: errorDescription
      });
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=fromFile.operation.js.map