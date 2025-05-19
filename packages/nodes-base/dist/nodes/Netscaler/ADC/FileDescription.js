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
  fileDescription: () => fileDescription
});
module.exports = __toCommonJS(FileDescription_exports);
const fileDescription = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a file"
      },
      {
        name: "Download",
        value: "download",
        action: "Download a file"
      },
      {
        name: "Upload",
        value: "upload",
        action: "Upload a file"
      }
    ],
    default: "upload",
    displayOptions: {
      show: {
        resource: ["file"]
      }
    }
  },
  // Upload --------------------------------------------------------------------------
  {
    displayName: "File Location",
    name: "fileLocation",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    default: "/nsconfig/ssl/"
  },
  {
    displayName: "Input Data Field Name",
    name: "binaryProperty",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    default: "data",
    description: "The name of the incoming field containing the binary file data to be processed"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["upload"],
        resource: ["file"]
      }
    },
    options: [
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        description: "Name of the file. It should not include filepath."
      }
    ]
  },
  // Delete, Download ---------------------------------------------------------------
  {
    displayName: "File Location",
    name: "fileLocation",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete", "download"],
        resource: ["file"]
      }
    },
    default: "/nsconfig/ssl/"
  },
  {
    displayName: "File Name",
    name: "fileName",
    type: "string",
    default: "",
    required: true,
    description: "Name of the file. It should not include filepath.",
    displayOptions: {
      show: {
        operation: ["delete", "download"],
        resource: ["file"]
      }
    }
  },
  {
    displayName: "Put Output in Field",
    name: "binaryProperty",
    type: "string",
    required: true,
    default: "data",
    description: "The name of the output field to put the binary file data in",
    displayOptions: {
      show: {
        operation: ["download"],
        resource: ["file"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileDescription
});
//# sourceMappingURL=FileDescription.js.map