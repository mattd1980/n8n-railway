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
var moveTo_operation_exports = {};
__export(moveTo_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(moveTo_operation_exports);
var import_iconv_lite = __toESM(require("iconv-lite"));
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
var import_ts_ics = require("ts-ics");
var import_descriptions = require("../../../../utils/descriptions");
var import_utilities = require("../../../../utils/utilities");
const properties = [
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    placeholder: "e.g data",
    hint: "The name of the input field containing the file data to be processed"
  },
  {
    displayName: "Destination Output Field",
    name: "destinationKey",
    type: "string",
    default: "data",
    required: true,
    placeholder: "e.g data",
    description: "The name of the output field that will contain the extracted data"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "File Encoding",
        name: "encoding",
        type: "options",
        options: import_descriptions.encodeDecodeOptions,
        default: "utf8",
        description: "Specify the encoding of the file, defaults to UTF-8"
      },
      {
        displayName: "Strip BOM",
        name: "stripBOM",
        displayOptions: {
          show: {
            encoding: ["utf8", "cesu8", "ucs2"]
          }
        },
        type: "boolean",
        default: true,
        description: "Whether to strip the BOM (Byte Order Mark) from the file, this could help in an environment where the presence of the BOM is causing issues or inconsistencies"
      },
      {
        displayName: "Keep Source",
        name: "keepSource",
        type: "options",
        default: "json",
        options: [
          {
            name: "JSON",
            value: "json",
            description: "Include JSON data of the input item"
          },
          {
            name: "Binary",
            value: "binary",
            description: "Include binary data of the input item"
          },
          {
            name: "Both",
            value: "both",
            description: "Include both JSON and binary data of the input item"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["binaryToPropery", "fromJson", "text", "fromIcs", "xml"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, operation) {
  const returnData = [];
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    try {
      const item = items[itemIndex];
      const options = this.getNodeParameter("options", itemIndex);
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", itemIndex);
      const newItem = {
        json: {},
        pairedItem: { item: itemIndex }
      };
      const value = (0, import_get.default)(item.binary, binaryPropertyName);
      if (!value) continue;
      const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
      const encoding = options.encoding || this.helpers.detectBinaryEncoding(buffer);
      if (options.keepSource && options.keepSource !== "binary") {
        newItem.json = (0, import_n8n_workflow.deepCopy)(item.json);
      }
      let convertedValue;
      if (operation !== "binaryToPropery") {
        convertedValue = import_iconv_lite.default.decode(buffer, encoding, {
          stripBOM: options.stripBOM
        });
      } else {
        convertedValue = Buffer.from(buffer).toString(import_n8n_workflow.BINARY_ENCODING);
      }
      if (operation === "fromJson") {
        if (convertedValue === "") {
          convertedValue = {};
        } else {
          convertedValue = (0, import_n8n_workflow.jsonParse)(convertedValue);
        }
      }
      if (operation === "fromIcs") {
        convertedValue = (0, import_ts_ics.icsCalendarToObject)(convertedValue);
      }
      const destinationKey = this.getNodeParameter("destinationKey", itemIndex, "");
      (0, import_set.default)(newItem.json, destinationKey, convertedValue);
      if (options.keepSource === "binary" || options.keepSource === "both") {
        newItem.binary = item.binary;
      } else {
        newItem.binary = (0, import_n8n_workflow.deepCopy)(item.binary);
        (0, import_unset.default)(newItem.binary, binaryPropertyName);
      }
      returnData.push(newItem);
    } catch (error) {
      let errorDescription;
      if (error.message.includes("Unexpected token")) {
        error.message = "The file selected in 'Input Binary Field' is not in JSON format";
        errorDescription = "Try to change the operation or select a JSON file in 'Input Binary Field'";
      }
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: error.message
          },
          pairedItem: {
            item: itemIndex
          }
        });
        continue;
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
        itemIndex,
        description: errorDescription
      });
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=moveTo.operation.js.map