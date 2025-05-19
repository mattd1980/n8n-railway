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
var AddDescription_exports = {};
__export(AddDescription_exports, {
  addFields: () => addFields
});
module.exports = __toCommonJS(AddDescription_exports);
const addFields = [
  {
    displayName: "Paths to Add",
    name: "pathsToAdd",
    type: "string",
    displayOptions: {
      show: {
        operation: ["add"]
      }
    },
    default: "",
    placeholder: "README.md",
    description: "Comma-separated list of paths (absolute or relative to Repository Path) of files or folders to add",
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFields
});
//# sourceMappingURL=AddDescription.js.map