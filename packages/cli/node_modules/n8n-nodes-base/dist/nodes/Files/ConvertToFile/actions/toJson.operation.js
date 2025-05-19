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
var toJson_operation_exports = {};
__export(toJson_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(toJson_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../../../utils/binary");
var import_descriptions = require("../../../../utils/descriptions");
var import_utilities = require("../../../../utils/utilities");
const properties = [
  {
    displayName: "Mode",
    name: "mode",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "All Items to One File",
        value: "once"
      },
      {
        name: "Each Item to Separate File",
        value: "each"
      }
    ],
    default: "once"
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    placeholder: "e.g data",
    hint: "The name of the output binary field to put the file in"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Add Byte Order Mark (BOM)",
        name: "addBOM",
        type: "boolean",
        default: false,
        description: "Whether to add special marker at the start of your text file. This marker helps some programs understand how to read the file correctly.",
        displayOptions: {
          show: {
            encoding: ["utf8", "cesu8", "ucs2"]
          }
        }
      },
      {
        displayName: "Format",
        name: "format",
        type: "boolean",
        default: false,
        description: "Whether to format the JSON data for easier reading"
      },
      {
        displayName: "Encoding",
        name: "encoding",
        type: "options",
        options: import_descriptions.encodeDecodeOptions,
        default: "utf8",
        description: "Choose the character set to use to encode the data"
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        placeholder: "e.g. myFile.json",
        description: "Name of the output file"
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["toJson"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  let returnData = [];
  const mode = this.getNodeParameter("mode", 0, "once");
  if (mode === "once") {
    const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
    try {
      const options = this.getNodeParameter("options", 0, {});
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0, "data");
      const binaryData = await import_binary.createBinaryFromJson.call(
        this,
        items.map((item) => item.json),
        {
          fileName: options.fileName,
          mimeType: "application/json",
          encoding: options.encoding,
          addBOM: options.addBOM,
          format: options.format
        }
      );
      const newItem = {
        json: {},
        binary: {
          [binaryPropertyName]: binaryData
        },
        pairedItem
      };
      returnData = [newItem];
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: error.message
          },
          pairedItem
        });
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      try {
        const options = this.getNodeParameter("options", i, {});
        const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i, "data");
        const binaryData = await import_binary.createBinaryFromJson.call(this, items[i].json, {
          fileName: options.fileName,
          encoding: options.encoding,
          addBOM: options.addBOM,
          format: options.format,
          mimeType: "application/json",
          itemIndex: i
        });
        const newItem = {
          json: {},
          binary: {
            [binaryPropertyName]: binaryData
          },
          pairedItem: { item: i }
        };
        returnData.push(newItem);
      } catch (error) {
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
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex: i });
      }
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
//# sourceMappingURL=toJson.operation.js.map