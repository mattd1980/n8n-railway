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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve folders from"
  },
  {
    ...import_common.folderRLC,
    description: "Select the folder to update the file in",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    ...import_common.fileRLC,
    description: "Select the file to update",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected,
        ...import_common.untilFolderSelected
      }
    }
  },
  {
    displayName: "Updated File Name",
    name: "fileName",
    default: "",
    description: "If not specified, the original file name will be used",
    placeholder: "e.g. My New File",
    routing: {
      send: {
        property: "name",
        type: "body",
        value: "={{ $value }}"
      }
    },
    type: "string"
  },
  {
    displayName: "Change File Content",
    name: "changeFileContent",
    default: false,
    description: "Whether to update the file contents",
    placeholder: "e.g. My New File",
    required: true,
    type: "boolean"
  },
  {
    displayName: "Updated File Contents",
    name: "fileContents",
    default: "",
    description: "Find the name of input field containing the binary data to update the file in the Input panel on the left, in the Binary tab",
    displayOptions: {
      show: {
        changeFileContent: [true]
      }
    },
    hint: "The name of the input field containing the binary file data to update the file",
    placeholder: "data",
    required: true,
    routing: {
      output: {
        postReceive: [
          async function(items, _response) {
            for (const item of items) {
              const site = this.getNodeParameter("site", void 0, {
                extractValue: true
              });
              const file = this.getNodeParameter("file", void 0, {
                extractValue: true
              });
              const binaryProperty = this.getNodeParameter("fileContents");
              this.helpers.assertBinaryData(binaryProperty);
              const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(binaryProperty);
              const response = await import_transport.microsoftSharePointApiRequest.call(
                this,
                "PUT",
                `/sites/${site}/drive/items/${file}/content`,
                binaryDataBuffer
              );
              item.json = response;
            }
            return items;
          }
        ]
      }
    },
    type: "string"
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=update.operation.js.map