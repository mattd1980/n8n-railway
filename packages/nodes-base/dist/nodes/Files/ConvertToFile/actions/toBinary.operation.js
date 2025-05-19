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
var toBinary_operation_exports = {};
__export(toBinary_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(toBinary_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../../../utils/binary");
var import_descriptions = require("../../../../utils/descriptions");
var import_utilities = require("../../../../utils/utilities");
const properties = [
  {
    displayName: "Base64 Input Field",
    name: "sourceProperty",
    type: "string",
    default: "",
    required: true,
    placeholder: "e.g data",
    requiresDataPath: "single",
    description: "The name of the input field that contains the base64 string to convert to a file. Use dot-notation for deep fields (e.g. 'level1.level2.currentKey')."
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
        displayName: "Data Is Base64",
        name: "dataIsBase64",
        type: "boolean",
        default: true,
        description: "Whether the data is already base64 encoded",
        displayOptions: {
          show: {
            "@version": [1]
          }
        }
      },
      {
        displayName: "Encoding",
        name: "encoding",
        type: "options",
        options: import_descriptions.encodeDecodeOptions,
        default: "utf8",
        description: "Choose the character set to use to encode the data",
        displayOptions: {
          hide: {
            dataIsBase64: [true],
            "@version": [{ _cnd: { gt: 1 } }]
          }
        }
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        placeholder: "e.g. myFile",
        description: "Name of the output file"
      },
      {
        displayName: "MIME Type",
        name: "mimeType",
        type: "string",
        default: "",
        placeholder: "e.g text/plain",
        description: 'The MIME type of the output file. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types" target="_blank">Common MIME types</a>.'
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["toBinary"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  const nodeVersion = this.getNode().typeVersion;
  for (let i = 0; i < items.length; i++) {
    try {
      const options = this.getNodeParameter("options", i, {});
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i, "data");
      const sourceProperty = this.getNodeParameter("sourceProperty", i);
      let dataIsBase64 = true;
      if (nodeVersion === 1) {
        dataIsBase64 = options.dataIsBase64 !== false;
      }
      const jsonToBinaryOptions = {
        sourceKey: sourceProperty,
        fileName: options.fileName,
        mimeType: options.mimeType,
        dataIsBase64,
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
//# sourceMappingURL=toBinary.operation.js.map