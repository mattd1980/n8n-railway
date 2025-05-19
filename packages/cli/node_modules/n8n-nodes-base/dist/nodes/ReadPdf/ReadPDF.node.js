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
var ReadPDF_node_exports = {};
__export(ReadPDF_node_exports, {
  ReadPDF: () => ReadPDF
});
module.exports = __toCommonJS(ReadPDF_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../utils/binary");
class ReadPDF {
  constructor() {
    this.description = {
      hidden: true,
      displayName: "Read PDF",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-name-miscased
      name: "readPDF",
      icon: "fa:file-pdf",
      group: ["input"],
      version: 1,
      description: "Reads a PDF and extracts its content",
      defaults: {
        name: "Read PDF",
        color: "#003355"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Input Binary Field",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          required: true,
          description: "Name of the binary property from which to read the PDF file"
        },
        {
          displayName: "Encrypted",
          name: "encrypted",
          type: "boolean",
          default: false,
          required: true
        },
        {
          displayName: "Password",
          name: "password",
          type: "string",
          typeOptions: { password: true },
          default: "",
          description: "Password to decrypt the PDF file with",
          displayOptions: {
            show: {
              encrypted: [true]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      try {
        const binaryPropertyName = this.getNodeParameter("binaryPropertyName", itemIndex);
        let password;
        if (this.getNodeParameter("encrypted", itemIndex) === true) {
          password = this.getNodeParameter("password", itemIndex);
        }
        const json = await import_binary.extractDataFromPDF.call(
          this,
          binaryPropertyName,
          password,
          void 0,
          void 0,
          itemIndex
        );
        returnData.push({
          binary: items[itemIndex].binary,
          json
        });
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
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex });
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadPDF
});
//# sourceMappingURL=ReadPDF.node.js.map