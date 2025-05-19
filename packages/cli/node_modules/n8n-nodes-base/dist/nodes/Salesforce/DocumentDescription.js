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
var DocumentDescription_exports = {};
__export(DocumentDescription_exports, {
  documentFields: () => documentFields,
  documentOperations: () => documentOperations
});
module.exports = __toCommonJS(DocumentDescription_exports);
const documentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["document"]
      }
    },
    options: [
      {
        name: "Upload",
        value: "upload",
        description: "Upload a document",
        action: "Upload a document"
      }
    ],
    default: "upload"
  }
];
const documentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                document:upload                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["document"],
        operation: ["upload"]
      }
    },
    description: "Name of the file"
  },
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    displayOptions: {
      show: {
        resource: ["document"],
        operation: ["upload"]
      }
    },
    placeholder: "",
    hint: "The name of the input binary field containing the file to be uploaded"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["document"],
        operation: ["upload"]
      }
    },
    options: [
      {
        displayName: "File Extension",
        name: "fileExtension",
        type: "string",
        default: "",
        placeholder: "pdf",
        description: "File extension to use. If none is set, the value from the binary data will be used."
      },
      {
        displayName: "Link To Object ID",
        name: "linkToObjectId",
        type: "string",
        default: "",
        description: "ID of the object you want to link this document to"
      },
      {
        displayName: "Owner Name or ID",
        name: "ownerId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getUsers"
        },
        default: "",
        description: 'ID of the owner of this document. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  documentFields,
  documentOperations
});
//# sourceMappingURL=DocumentDescription.js.map