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
var CloneDescription_exports = {};
__export(CloneDescription_exports, {
  cloneFields: () => cloneFields
});
module.exports = __toCommonJS(CloneDescription_exports);
const cloneFields = [
  {
    displayName: "Source Repository",
    name: "sourceRepository",
    type: "string",
    displayOptions: {
      show: {
        operation: ["clone"]
      }
    },
    default: "",
    placeholder: "https://github.com/n8n-io/n8n",
    description: "The URL or path of the repository to clone",
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cloneFields
});
//# sourceMappingURL=CloneDescription.js.map