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
var toText_operation_exports = {};
__export(toText_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(toText_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../../../utils/binary");
var import_descriptions = require("../../../../utils/descriptions");
var import_utilities = require("../../../../utils/utilities");
const properties = [
  {
    displayName: "Text Input Field",
    name: "sourceProperty",
    type: "string",
    default: "",
    required: true,
    placeholder: "e.g data",
    requiresDataPath: "single",
    description: "The name of the input field that contains a string to convert to a file. Use dot-notation for deep fields (e.g. 'level1.level2.currentKey')."
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
        description: "Whether to add special marker at the start of your text file. This marker helps some programs understand how to read the file correctly.",
        name: "addBOM",
        displayOptions: {
          show: {
            encoding: ["utf8", "cesu8", "ucs2"]
          }
        },
        type: "boolean",
        default: false
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
        placeholder: "e.g. myFile",
        description: "Name of the output file"
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["toText"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      const options = this.getNodeParameter("options", i, {});
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i, "data");
      const sourceProperty = this.getNodeParameter("sourceProperty", i);
      const jsonToBinaryOptions = {
        sourceKey: sourceProperty,
        fileName: options.fileName || "file.txt",
        mimeType: "text/plain",
        dataIsBase64: false,
        encoding: options.encoding,
        addBOM: options.addBOM,
        itemIndex: i
      };
      const binaryData = await import_binary.createBinaryFromJson.call(this, items[i].json, jsonToBinaryOptions);
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
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=toText.operation.js.map