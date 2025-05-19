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
var description_exports = {};
__export(description_exports, {
  fileUploadDescription: () => fileUploadDescription
});
module.exports = __toCommonJS(description_exports);
const fileUploadDescription = [
  {
    displayName: "Input Data Field Name",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    required: true,
    description: "The name of the input field containing the binary file data to be uploaded. Supported file types: PNG, JPEG."
  },
  {
    displayName: "Category Name or ID",
    name: "categoryId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getCompanyFileCategories"
    },
    required: true,
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    default: ""
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Share with Employee",
        name: "share",
        type: "boolean",
        default: true,
        description: "Whether this file is shared or not"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileUploadDescription
});
//# sourceMappingURL=description.js.map