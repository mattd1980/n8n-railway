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
var HtmlExtract_node_exports = {};
__export(HtmlExtract_node_exports, {
  HtmlExtract: () => HtmlExtract
});
module.exports = __toCommonJS(HtmlExtract_node_exports);
var import_cheerio = __toESM(require("cheerio"));
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
const extractFunctions = {
  attribute: ($, valueData) => $.attr(valueData.attribute),
  html: ($, _valueData) => $.html() || void 0,
  text: ($, _valueData) => $.text(),
  value: ($, _valueData) => $.val()
};
function getValue($, valueData, options) {
  const value = extractFunctions[valueData.returnValue]($, valueData);
  if (options.trimValues === false || value === void 0) {
    return value;
  }
  return value.trim();
}
class HtmlExtract {
  constructor() {
    this.description = {
      displayName: "HTML Extract",
      name: "htmlExtract",
      icon: "fa:cut",
      group: ["transform"],
      version: 1,
      hidden: true,
      subtitle: '={{$parameter["sourceData"] + ": " + $parameter["dataPropertyName"]}}',
      description: "Extracts data from HTML",
      defaults: {
        name: "HTML Extract",
        color: "#333377"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Source Data",
          name: "sourceData",
          type: "options",
          options: [
            {
              name: "Binary",
              value: "binary"
            },
            {
              name: "JSON",
              value: "json"
            }
          ],
          default: "json",
          description: "If HTML should be read from binary or JSON data"
        },
        {
          displayName: "Input Binary Field",
          name: "dataPropertyName",
          type: "string",
          displayOptions: {
            show: {
              sourceData: ["binary"]
            }
          },
          default: "data",
          required: true,
          hint: "The name of the input binary field containing the file to be extracted"
        },
        {
          displayName: "JSON Property",
          name: "dataPropertyName",
          type: "string",
          displayOptions: {
            show: {
              sourceData: ["json"]
            }
          },
          default: "data",
          required: true,
          description: "Name of the JSON property in which the HTML to extract the data from can be found. The property can either contain a string or an array of strings."
        },
        {
          displayName: "Extraction Values",
          name: "extractionValues",
          placeholder: "Add Value",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          default: {},
          options: [
            {
              name: "values",
              displayName: "Values",
              values: [
                {
                  displayName: "Key",
                  name: "key",
                  type: "string",
                  default: "",
                  description: "The key under which the extracted value should be saved"
                },
                {
                  displayName: "CSS Selector",
                  name: "cssSelector",
                  type: "string",
                  default: "",
                  placeholder: ".price",
                  description: "The CSS selector to use"
                },
                {
                  displayName: "Return Value",
                  name: "returnValue",
                  type: "options",
                  options: [
                    {
                      name: "Attribute",
                      value: "attribute",
                      description: 'Get an attribute value like "class" from an element'
                    },
                    {
                      name: "HTML",
                      value: "html",
                      description: "Get the HTML the element contains"
                    },
                    {
                      name: "Text",
                      value: "text",
                      description: "Get only the text content of the element"
                    },
                    {
                      name: "Value",
                      value: "value",
                      description: "Get value of an input, select or textarea"
                    }
                  ],
                  default: "text",
                  description: "What kind of data should be returned"
                },
                {
                  displayName: "Attribute",
                  name: "attribute",
                  type: "string",
                  displayOptions: {
                    show: {
                      returnValue: ["attribute"]
                    }
                  },
                  default: "",
                  placeholder: "class",
                  description: "The name of the attribute to return the value off"
                },
                {
                  displayName: "Return Array",
                  name: "returnArray",
                  type: "boolean",
                  default: false,
                  description: "Whether to return the values as an array so if multiple ones get found they also get returned separately. If not set all will be returned as a single string."
                }
              ]
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Trim Values",
              name: "trimValues",
              type: "boolean",
              default: true,
              description: "Whether to remove automatically all spaces and newlines from the beginning and end of the values"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let item;
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const dataPropertyName = this.getNodeParameter("dataPropertyName", itemIndex);
        const extractionValues = this.getNodeParameter(
          "extractionValues",
          itemIndex
        );
        const options = this.getNodeParameter("options", itemIndex, {});
        const sourceData = this.getNodeParameter("sourceData", itemIndex);
        item = items[itemIndex];
        let htmlArray = [];
        if (sourceData === "json") {
          const data = (0, import_get.default)(item.json, dataPropertyName, void 0);
          if (data === void 0) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `No property named "${dataPropertyName}" exists!`,
              { itemIndex }
            );
          }
          htmlArray = data;
        } else {
          this.helpers.assertBinaryData(itemIndex, dataPropertyName);
          const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
            itemIndex,
            dataPropertyName
          );
          htmlArray = binaryDataBuffer.toString("utf-8");
        }
        if (!Array.isArray(htmlArray)) {
          htmlArray = [htmlArray];
        }
        for (const html of htmlArray) {
          const $ = import_cheerio.default.load(html);
          const newItem = {
            json: {},
            pairedItem: {
              item: itemIndex
            }
          };
          let htmlElement;
          for (const valueData of extractionValues.values) {
            htmlElement = $(valueData.cssSelector);
            if (valueData.returnArray) {
              newItem.json[valueData.key] = [];
              htmlElement.each((_, el) => {
                newItem.json[valueData.key].push(
                  getValue($(el), valueData, options)
                );
              });
            } else {
              newItem.json[valueData.key] = getValue(htmlElement, valueData, options);
            }
          }
          returnData.push(newItem);
        }
      } catch (error) {
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
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HtmlExtract
});
//# sourceMappingURL=HtmlExtract.node.js.map