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
  fileDownloadDescription: () => fileDownloadDescription
});
module.exports = __toCommonJS(description_exports);
const fileDownloadDescription = [
  {
    displayName: "File ID",
    name: "fileId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["download"],
        resource: ["file"]
      }
    },
    default: "",
    description: "ID of the file"
  },
  {
    displayName: "Put Output In Field",
    name: "output",
    type: "string",
    default: "data",
    required: true,
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
  fileDownloadDescription
});
//# sourceMappingURL=description.js.map