"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var binary_exports = {};
__export(binary_exports, {
  convertJsonToSpreadsheetBinary: () => convertJsonToSpreadsheetBinary,
  createBinaryFromJson: () => createBinaryFromJson,
  extractDataFromPDF: () => extractDataFromPDF
});
module.exports = __toCommonJS(binary_exports);
var import_iconv_lite = __toESM(require("iconv-lite"));
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_pdfjs_dist = require("pdfjs-dist");
var import_xlsx = require("xlsx");
var import_utilities = require("./utilities");
async function convertJsonToSpreadsheetBinary(items, fileFormat, options, defaultFileName = "spreadsheet") {
  const itemData = [];
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    itemData.push((0, import_utilities.flattenObject)(items[itemIndex].json));
  }
  let sheetToJsonOptions;
  if (options.headerRow === false) {
    sheetToJsonOptions = { skipHeader: true };
  }
  const sheet = import_xlsx.utils.json_to_sheet(itemData, sheetToJsonOptions);
  const writingOptions = {
    bookType: fileFormat,
    bookSST: false,
    type: "buffer"
  };
  if (fileFormat === "csv" && options.delimiter?.length) {
    writingOptions.FS = options.delimiter ?? ",";
  }
  if (["xlsx", "ods"].includes(fileFormat) && options.compression) {
    writingOptions.compression = true;
  }
  const sheetName = options.sheetName || "Sheet";
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: sheet
    }
  };
  const buffer = (0, import_xlsx.write)(workbook, writingOptions);
  const fileName = options.fileName !== void 0 ? options.fileName : `${defaultFileName}.${fileFormat}`;
  const binaryData = await this.helpers.prepareBinaryData(buffer, fileName);
  return binaryData;
}
async function createBinaryFromJson(data, options) {
  let value;
  if (options.sourceKey) {
    value = (0, import_get.default)(data, options.sourceKey);
  } else {
    value = data;
  }
  if (value === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The value in "${options.sourceKey}" is not set`, {
      itemIndex: options.itemIndex || 0
    });
  }
  let buffer;
  if (!options.dataIsBase64) {
    let valueAsString = value;
    if (typeof value === "object") {
      options.mimeType = "application/json";
      if (options.format) {
        valueAsString = JSON.stringify(value, null, 2);
      } else {
        valueAsString = JSON.stringify(value);
      }
    }
    buffer = import_iconv_lite.default.encode(valueAsString, options.encoding || "utf8", {
      addBOM: options.addBOM
    });
  } else {
    buffer = Buffer.from(value, import_n8n_workflow.BINARY_ENCODING);
  }
  const binaryData = await this.helpers.prepareBinaryData(
    buffer,
    options.fileName,
    options.mimeType
  );
  if (!binaryData.fileName) {
    const fileExtension = binaryData.fileExtension ? `.${binaryData.fileExtension}` : "";
    binaryData.fileName = `file${fileExtension}`;
  }
  return binaryData;
}
const parseText = (textContent) => {
  let lastY = void 0;
  const text = [];
  for (const item of textContent.items) {
    if ("str" in item) {
      if (lastY == item.transform[5] || !lastY) {
        text.push(item.str);
      } else {
        text.push(`
${item.str}`);
      }
      lastY = item.transform[5];
    }
  }
  return text.join("");
};
async function extractDataFromPDF(binaryPropertyName, password, maxPages, joinPages = true, itemIndex = 0) {
  const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
  const params = { password, isEvalSupported: false };
  if (binaryData.id) {
    params.data = await this.helpers.binaryToBuffer(
      await this.helpers.getBinaryStream(binaryData.id)
    );
  } else {
    params.data = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING).buffer;
  }
  const document = await (0, import_pdfjs_dist.getDocument)(params).promise;
  const { info, metadata } = await document.getMetadata().catch(() => ({ info: null, metadata: null }));
  const pages = [];
  if (maxPages !== 0) {
    let pagesToRead = document.numPages;
    if (maxPages && maxPages < document.numPages) {
      pagesToRead = maxPages;
    }
    for (let i = 1; i <= pagesToRead; i++) {
      const page = await document.getPage(i);
      const text2 = await page.getTextContent().then(parseText);
      pages.push(text2);
    }
  }
  const text = joinPages ? pages.join("\n\n") : pages;
  const returnData = {
    numpages: document.numPages,
    numrender: document.numPages,
    info,
    metadata: metadata?.getAll(),
    text,
    version: import_pdfjs_dist.version
  };
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertJsonToSpreadsheetBinary,
  createBinaryFromJson,
  extractDataFromPDF
});
//# sourceMappingURL=binary.js.map