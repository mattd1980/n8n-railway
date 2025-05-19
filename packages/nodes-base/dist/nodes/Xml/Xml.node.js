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
var Xml_node_exports = {};
__export(Xml_node_exports, {
  Xml: () => Xml
});
module.exports = __toCommonJS(Xml_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
class Xml {
  constructor() {
    this.description = {
      displayName: "XML",
      name: "xml",
      icon: "fa:file-code",
      iconColor: "purple",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["mode"]==="jsonToxml" ? "JSON to XML" : "XML to JSON"}}',
      description: "Convert data from and to XML",
      defaults: {
        name: "XML",
        color: "#333377"
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
              name: "JSON to XML",
              value: "jsonToxml",
              description: "Converts data from JSON to XML"
            },
            {
              name: "XML to JSON",
              value: "xmlToJson",
              description: "Converts data from XML to JSON"
            }
          ],
          default: "xmlToJson",
          description: "From and to what format the data should be converted"
        },
        {
          displayName: "If your XML is inside a binary file, use the 'Extract from File' node to convert it to text first",
          name: "xmlNotice",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              mode: ["xmlToJson"]
            }
          }
        },
        // ----------------------------------
        //         option:jsonToxml
        // ----------------------------------
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          displayOptions: {
            show: {
              mode: ["jsonToxml"]
            }
          },
          default: "data",
          required: true,
          description: "Name of the property to which to contains the converted XML data"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          displayOptions: {
            show: {
              mode: ["jsonToxml"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Allow Surrogate Chars",
              name: "allowSurrogateChars",
              type: "boolean",
              default: false,
              description: "Whether to allow using characters from the Unicode surrogate blocks"
            },
            {
              displayName: "Attribute Key",
              name: "attrkey",
              type: "string",
              default: "$",
              description: "Prefix that is used to access the attributes"
            },
            {
              displayName: "Cdata",
              name: "cdata",
              type: "boolean",
              default: false,
              description: "Whether to wrap text nodes in &lt;![CDATA[ ... ]]&gt; instead of escaping when necessary. Does not add &lt;![CDATA[ ... ]]&gt; if it is not required."
            },
            {
              displayName: "Character Key",
              name: "charkey",
              type: "string",
              default: "_",
              description: "Prefix that is used to access the character content"
            },
            {
              displayName: "Headless",
              name: "headless",
              type: "boolean",
              default: false,
              description: "Whether to omit the XML header"
            },
            {
              displayName: "Root Name",
              name: "rootName",
              type: "string",
              default: "root",
              description: "Root element name to be used"
            }
          ]
        },
        // ----------------------------------
        //         option:xmlToJson
        // ----------------------------------
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          displayOptions: {
            show: {
              mode: ["xmlToJson"]
            }
          },
          default: "data",
          required: true,
          description: "Name of the property which contains the XML data to convert"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          displayOptions: {
            show: {
              mode: ["xmlToJson"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Attribute Key",
              name: "attrkey",
              type: "string",
              default: "$",
              description: "Prefix that is used to access the attributes"
            },
            {
              displayName: "Character Key",
              name: "charkey",
              type: "string",
              default: "_",
              description: "Prefix that is used to access the character content"
            },
            {
              displayName: "Explicit Array",
              name: "explicitArray",
              type: "boolean",
              default: false,
              description: "Whether to always put child nodes in an array if true; otherwise an array is created only if there is more than one"
            },
            {
              displayName: "Explicit Root",
              name: "explicitRoot",
              type: "boolean",
              default: true,
              description: "Whether to set this if you want to get the root node in the resulting object"
            },
            {
              displayName: "Ignore Attributes",
              name: "ignoreAttrs",
              type: "boolean",
              default: false,
              description: "Whether to ignore all XML attributes and only create text nodes"
            },
            {
              displayName: "Merge Attributes",
              name: "mergeAttrs",
              type: "boolean",
              default: true,
              description: "Whether to merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object. This option is ignored if ignoreAttrs is true."
            },
            {
              displayName: "Normalize",
              name: "normalize",
              type: "boolean",
              default: false,
              description: "Whether to trim whitespaces inside text nodes"
            },
            {
              displayName: "Normalize Tags",
              name: "normalizeTags",
              type: "boolean",
              default: false,
              description: "Whether to normalize all tag names to lowercase"
            },
            {
              displayName: "Trim",
              name: "trim",
              type: "boolean",
              default: false,
              description: "Whether to trim the whitespace at the beginning and end of text nodes"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const mode = this.getNodeParameter("mode", 0);
    const dataPropertyName = this.getNodeParameter("dataPropertyName", 0);
    const options = this.getNodeParameter("options", 0, {});
    let item;
    const returnData = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        item = items[itemIndex];
        if (mode === "xmlToJson") {
          const parserOptions = Object.assign(
            {
              mergeAttrs: true,
              explicitArray: false
            },
            options
          );
          const parser = new import_xml2js.Parser(parserOptions);
          if (item.json[dataPropertyName] === void 0) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Item has no JSON property called "${dataPropertyName}"`,
              { itemIndex }
            );
          }
          const json = await parser.parseStringPromise(item.json[dataPropertyName]);
          returnData.push({ json: (0, import_n8n_workflow.deepCopy)(json) });
        } else if (mode === "jsonToxml") {
          const builder = new import_xml2js.Builder(options);
          returnData.push({
            json: {
              [dataPropertyName]: builder.buildObject(items[itemIndex].json)
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The operation "${mode}" is not known!`, {
            itemIndex
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          items[itemIndex] = {
            json: {
              error: error.message
            },
            pairedItem: {
              item: itemIndex
            }
          };
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
  Xml
});
//# sourceMappingURL=Xml.node.js.map