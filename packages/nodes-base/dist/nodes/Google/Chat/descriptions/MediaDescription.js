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
var MediaDescription_exports = {};
__export(MediaDescription_exports, {
  mediaFields: () => mediaFields,
  mediaOperations: () => mediaOperations
});
module.exports = __toCommonJS(MediaDescription_exports);
const mediaOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    displayOptions: {
      show: {
        resource: ["media"]
      }
    },
    options: [
      {
        name: "Download",
        value: "download",
        description: "Download media",
        action: "Download media"
      }
    ],
    default: "download"
  }
];
const mediaFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 media:download                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Resource Name",
    name: "resourceName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["download"]
      }
    },
    default: "",
    description: "Name of the media that is being downloaded"
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["download"]
      }
    },
    hint: "The name of the output binary field to put the file in"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mediaFields,
  mediaOperations
});
//# sourceMappingURL=MediaDescription.js.map