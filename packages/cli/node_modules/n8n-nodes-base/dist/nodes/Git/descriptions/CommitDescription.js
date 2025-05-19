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
var CommitDescription_exports = {};
__export(CommitDescription_exports, {
  commitFields: () => commitFields
});
module.exports = __toCommonJS(CommitDescription_exports);
const commitFields = [
  {
    displayName: "Message",
    name: "message",
    type: "string",
    displayOptions: {
      show: {
        operation: ["commit"]
      }
    },
    default: "",
    description: "The commit message to use"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["commit"]
      }
    },
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Paths to Add",
        name: "pathsToAdd",
        type: "string",
        default: "",
        placeholder: "/data/file1.json",
        description: 'Comma-separated list of paths (absolute or relative to Repository Path) of files or folders to commit. If not set will all "added" files and folders be committed.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  commitFields
});
//# sourceMappingURL=CommitDescription.js.map