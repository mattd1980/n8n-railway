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
var MoveBinaryData_node_exports = {};
__export(MoveBinaryData_node_exports, {
  MoveBinaryData: () => MoveBinaryData
});
module.exports = __toCommonJS(MoveBinaryData_node_exports);
var import_iconv_lite = __toESM(require("iconv-lite"));
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
import_iconv_lite.default.encodingExists("utf8");
const bomAware = [];
const encodeDecodeOptions = [];
const encodings = import_iconv_lite.default.encodings;
Object.keys(encodings).forEach((encoding) => {
  if (!(encoding.startsWith("_") || typeof encodings[encoding] === "string")) {
    if (encodings[encoding].bomAware) {
      bomAware.push(encoding);
    }
    encodeDecodeOptions.push({ name: encoding, value: encoding });
  }
});
encodeDecodeOptions.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
class MoveBinaryData {
  constructor() {
    this.description = {
      hidden: true,
      displayName: "Convert to/from binary data",
      name: "moveBinaryData",
      icon: "fa:exchange-alt",
      group: ["transform"],
      version: [1, 1.1],
      subtitle: '={{$parameter["mode"]==="binaryToJson" ? "Binary to JSON" : "JSON to Binary"}}',
      description: "Move data between binary and JSON properties",
      defaults: {
        name: "Convert to/from binary data",
        color: "#7722CC"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          options: [
            {
              name: "Binary to JSON",
              value: "binaryToJson",
              description: "Move data from Binary to JSON"
            },
            {
              name: "JSON to Binary",
              value: "jsonToBinary",
              description: "Move data from JSON to Binary"
            }
          ],
          default: "binaryToJson",
          description: "From and to where data should be moved"
        },
        // ----------------------------------
        //         binaryToJson
        // ----------------------------------
        {
          displayName: "Set All Data",
          name: "setAllData",
          type: "boolean",
          displayOptions: {
            show: {
              mode: ["binaryToJson"]
            }
          },
          default: true,
          description: "Whether all JSON data should be replaced with the data retrieved from binary key. Else the data will be written to a single key."
        },
        {
          displayName: "Source Key",
          name: "sourceKey",
          type: "string",
          displayOptions: {
            show: {
              mode: ["binaryToJson"]
            }
          },
          default: "data",
          required: true,
          placeholder: "data",
          description: 'The name of the binary key to get data from. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.currentKey".'
        },
        {
          displayName: "Destination Key",
          name: "destinationKey",
          type: "string",
          displayOptions: {
            show: {
              mode: ["binaryToJson"],
              setAllData: [false]
            }
          },
          default: "data",
          required: true,
          placeholder: "",
          description: 'The name the JSON key to copy data to. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.newKey".'
        },
        // ----------------------------------
        //         jsonToBinary
        // ----------------------------------
        {
          displayName: "Convert All Data",
          name: "convertAllData",
          type: "boolean",
          displayOptions: {
            show: {
              mode: ["jsonToBinary"]
            }
          },
          default: true,
          description: "Whether all JSON data should be converted to binary. Else only the data of one key will be converted."
        },
        {
          displayName: "Source Key",
          name: "sourceKey",
          type: "string",
          displayOptions: {
            show: {
              convertAllData: [false],
              mode: ["jsonToBinary"]
            }
          },
          default: "data",
          required: true,
          placeholder: "data",
          description: 'The name of the JSON key to get data from. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.currentKey".'
        },
        {
          displayName: "Destination Key",
          name: "destinationKey",
          type: "string",
          displayOptions: {
            show: {
              mode: ["jsonToBinary"]
            }
          },
          default: "data",
          required: true,
          placeholder: "data",
          description: 'The name the binary key to copy data to. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.newKey".'
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
              description: "Whether to add special marker at the start of your text file. This marker helps some programs understand how to read the file correctly.",
              displayOptions: {
                show: {
                  "/mode": ["jsonToBinary"],
                  encoding: bomAware
                }
              },
              type: "boolean",
              default: false
            },
            {
              displayName: "Data Is Base64",
              name: "dataIsBase64",
              type: "boolean",
              displayOptions: {
                hide: {
                  useRawData: [true]
                },
                show: {
                  "/mode": ["jsonToBinary"],
                  "/convertAllData": [false]
                }
              },
              default: false,
              description: "Whether to keep the binary data as base64 string"
            },
            {
              displayName: "Encoding",
              name: "encoding",
              type: "options",
              options: encodeDecodeOptions,
              displayOptions: {
                show: {
                  "/mode": ["binaryToJson", "jsonToBinary"]
                }
              },
              default: "utf8",
              description: "Choose the character set to use to encode the data"
            },
            {
              displayName: "Strip BOM",
              name: "stripBOM",
              displayOptions: {
                show: {
                  "/mode": ["binaryToJson"],
                  encoding: bomAware
                }
              },
              type: "boolean",
              default: true
            },
            {
              displayName: "File Name",
              name: "fileName",
              type: "string",
              displayOptions: {
                show: {
                  "/mode": ["jsonToBinary"]
                }
              },
              default: "",
              placeholder: "example.json",
              description: "The file name to set"
            },
            {
              displayName: "JSON Parse",
              name: "jsonParse",
              type: "boolean",
              displayOptions: {
                hide: {
                  keepAsBase64: [true]
                },
                show: {
                  "/mode": ["binaryToJson"],
                  "/setAllData": [false]
                }
              },
              default: false,
              description: "Whether to run JSON parse on the data to get proper object data"
            },
            {
              displayName: "Keep Source",
              name: "keepSource",
              type: "boolean",
              default: false,
              description: "Whether the source key should be kept. By default it will be deleted."
            },
            {
              displayName: "Keep As Base64",
              name: "keepAsBase64",
              type: "boolean",
              displayOptions: {
                hide: {
                  jsonParse: [true]
                },
                show: {
                  "/mode": ["binaryToJson"],
                  "/setAllData": [false]
                }
              },
              default: false,
              description: "Whether to keep the binary data as base64 string"
            },
            {
              displayName: "MIME Type",
              name: "mimeType",
              type: "string",
              displayOptions: {
                show: {
                  "/mode": ["jsonToBinary"]
                }
              },
              default: "application/json",
              placeholder: "application/json",
              description: "The mime-type to set. By default will the mime-type for JSON be set."
            },
            {
              displayName: "Use Raw Data",
              name: "useRawData",
              type: "boolean",
              displayOptions: {
                hide: {
                  dataIsBase64: [true]
                },
                show: {
                  "/mode": ["jsonToBinary"]
                }
              },
              default: false,
              description: "Whether to use data as is and do not JSON.stringify it"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const mode = this.getNodeParameter("mode", 0);
    const returnData = [];
    let item;
    let newItem;
    let options;
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      item = items[itemIndex];
      options = this.getNodeParameter("options", itemIndex, {});
      newItem = {
        json: {},
        pairedItem: {
          item: itemIndex
        }
      };
      if (mode === "binaryToJson") {
        const setAllData = this.getNodeParameter("setAllData", itemIndex);
        const sourceKey = this.getNodeParameter("sourceKey", itemIndex);
        const value = (0, import_get.default)(item.binary, sourceKey);
        if (value === void 0) {
          continue;
        }
        const encoding = options.encoding || "utf8";
        const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, sourceKey);
        let convertedValue;
        if (setAllData) {
          convertedValue = import_iconv_lite.default.decode(buffer, encoding, {
            stripBOM: options.stripBOM
          });
          newItem.json = (0, import_n8n_workflow.jsonParse)(convertedValue);
        } else {
          newItem.json = (0, import_n8n_workflow.deepCopy)(item.json);
          if (options.keepAsBase64 !== true) {
            convertedValue = import_iconv_lite.default.decode(buffer, encoding, {
              stripBOM: options.stripBOM
            });
          } else {
            convertedValue = Buffer.from(buffer).toString(import_n8n_workflow.BINARY_ENCODING);
          }
          if (options.jsonParse) {
            convertedValue = (0, import_n8n_workflow.jsonParse)(convertedValue);
          }
          const destinationKey = this.getNodeParameter("destinationKey", itemIndex, "");
          (0, import_set.default)(newItem.json, destinationKey, convertedValue);
        }
        if (options.keepSource === true) {
          newItem.binary = item.binary;
        } else {
          newItem.binary = (0, import_n8n_workflow.deepCopy)(item.binary);
          (0, import_unset.default)(newItem.binary, sourceKey);
        }
      } else if (mode === "jsonToBinary") {
        const convertAllData = this.getNodeParameter("convertAllData", itemIndex);
        const destinationKey = this.getNodeParameter("destinationKey", itemIndex);
        const encoding = options.encoding || "utf8";
        let value = item.json;
        if (!convertAllData) {
          const sourceKey = this.getNodeParameter("sourceKey", itemIndex);
          value = (0, import_get.default)(item.json, sourceKey);
        }
        if (value === void 0) {
          continue;
        }
        if (item.binary !== void 0) {
          newItem.binary = (0, import_n8n_workflow.deepCopy)(item.binary);
        } else {
          newItem.binary = {};
        }
        const nodeVersion = this.getNode().typeVersion;
        let mimeType = options.mimeType;
        let data;
        if (options.dataIsBase64 !== true) {
          if (options.useRawData !== true || typeof value === "object") {
            value = JSON.stringify(value);
            if (!mimeType) {
              mimeType = "application/json";
            }
          }
          data = import_iconv_lite.default.encode(value, encoding, { addBOM: options.addBOM });
        } else {
          data = Buffer.from(value, import_n8n_workflow.BINARY_ENCODING);
        }
        if (!mimeType && nodeVersion === 1) {
          mimeType = "application/json";
        }
        const convertedValue = await this.helpers.prepareBinaryData(
          data,
          options.fileName,
          mimeType
        );
        if (!convertedValue.fileName && nodeVersion > 1) {
          const fileExtension = convertedValue.fileExtension ? `.${convertedValue.fileExtension}` : "";
          convertedValue.fileName = `file${fileExtension}`;
        }
        (0, import_set.default)(newItem.binary, destinationKey, convertedValue);
        if (options.keepSource === true) {
          newItem.json = item.json;
        } else {
          if (convertAllData) {
            newItem.json = {};
          } else {
            newItem.json = (0, import_n8n_workflow.deepCopy)(item.json);
            const sourceKey = this.getNodeParameter("sourceKey", itemIndex);
            (0, import_unset.default)(newItem.json, sourceKey);
          }
        }
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The operation "${mode}" is not known!`, {
          itemIndex
        });
      }
      returnData.push(newItem);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MoveBinaryData
});
//# sourceMappingURL=MoveBinaryData.node.js.map