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
var PythonCodeDescription_exports = {};
__export(PythonCodeDescription_exports, {
  pythonCodeDescription: () => pythonCodeDescription
});
module.exports = __toCommonJS(PythonCodeDescription_exports);
const commonDescription = {
  displayName: "Python",
  name: "pythonCode",
  type: "string",
  typeOptions: {
    editor: "codeNodeEditor",
    editorLanguage: "python"
  },
  default: "",
  description: 'Python code to execute.<br><br>Tip: You can use built-in methods and variables like <code>_today</code> for dates and <code>_jmespath</code> for querying JSON structures. <a href="https://docs.n8n.io/code/builtin/">Learn more</a>.',
  noDataExpression: true
};
const pythonCodeDescription = [
  {
    ...commonDescription,
    displayOptions: {
      show: {
        language: ["python"],
        mode: ["runOnceForAllItems"]
      }
    }
  },
  {
    ...commonDescription,
    displayOptions: {
      show: {
        language: ["python"],
        mode: ["runOnceForEachItem"]
      }
    }
  },
  {
    displayName: "Debug by using <code>print()</code> statements and viewing their output in the browser console.",
    name: "notice",
    type: "notice",
    displayOptions: {
      show: {
        language: ["python"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pythonCodeDescription
});
//# sourceMappingURL=PythonCodeDescription.js.map