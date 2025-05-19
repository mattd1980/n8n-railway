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
var FileDescription_exports = {};
__export(FileDescription_exports, {
  fileFields: () => fileFields,
  fileOperations: () => fileOperations
});
module.exports = __toCommonJS(FileDescription_exports);
const fileOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["file"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a file",
        action: "Delete a file"
      },
      {
        name: "Download",
        value: "download",
        description: "Download a file",
        action: "Download a file"
      }
    ],
    default: "download"
  }
];
const fileFields = [
  /* -------------------------------------------------------------------------- */
  /*                                file:download                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Table ID",
    name: "tableId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["file"],
        operation: ["download", "delete"]
      }
    },
    description: "The table identifier"
  },
  {
    displayName: "Record ID",
    name: "recordId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["file"],
        operation: ["download", "delete"]
      }
    },
    description: "The unique identifier of the record"
  },
  {
    displayName: "Field ID",
    name: "fieldId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["file"],
        operation: ["download", "delete"]
      }
    },
    description: "The unique identifier of the field"
  },
  {
    displayName: "Version Number",
    name: "versionNumber",
    type: "number",
    default: 1,
    required: true,
    displayOptions: {
      show: {
        resource: ["file"],
        operation: ["download", "delete"]
      }
    },
    description: "The file attachment version number"
  },
  {
    displayName: "Input Binary Field",
    displayOptions: {
      show: {
        resource: ["file"],
        operation: ["download"]
      }
    },
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    hint: "The name of the input binary field containing the file to be written",
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileFields,
  fileOperations
});
//# sourceMappingURL=FileDescription.js.map