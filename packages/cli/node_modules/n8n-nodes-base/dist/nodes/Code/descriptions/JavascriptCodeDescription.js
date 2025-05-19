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
var JavascriptCodeDescription_exports = {};
__export(JavascriptCodeDescription_exports, {
  javascriptCodeDescription: () => javascriptCodeDescription
});
module.exports = __toCommonJS(JavascriptCodeDescription_exports);
const commonDescription = {
  displayName: "JavaScript",
  name: "jsCode",
  type: "string",
  typeOptions: {
    editor: "codeNodeEditor",
    editorLanguage: "javaScript"
  },
  default: "",
  description: 'JavaScript code to execute.<br><br>Tip: You can use luxon vars like <code>$today</code> for dates and <code>$jmespath</code> for querying JSON structures. <a href="https://docs.n8n.io/nodes/n8n-nodes-base.function">Learn more</a>.',
  noDataExpression: true
};
const v1Properties = [
  {
    ...commonDescription,
    displayOptions: {
      show: {
        "@version": [1],
        mode: ["runOnceForAllItems"]
      }
    }
  },
  {
    ...commonDescription,
    displayOptions: {
      show: {
        "@version": [1],
        mode: ["runOnceForEachItem"]
      }
    }
  }
];
const v2Properties = [
  {
    ...commonDescription,
    displayOptions: {
      show: {
        "@version": [2],
        language: ["javaScript"],
        mode: ["runOnceForAllItems"]
      }
    }
  },
  {
    ...commonDescription,
    displayOptions: {
      show: {
        "@version": [2],
        language: ["javaScript"],
        mode: ["runOnceForEachItem"]
      }
    }
  }
];
const javascriptCodeDescription = [
  ...v1Properties,
  ...v2Properties,
  {
    displayName: 'Type <code>$</code> for a list of <a target="_blank" href="https://docs.n8n.io/code-examples/methods-variables-reference/">special vars/methods</a>. Debug by using <code>console.log()</code> statements and viewing their output in the browser console.',
    name: "notice",
    type: "notice",
    displayOptions: {
      show: {
        language: ["javaScript"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  javascriptCodeDescription
});
//# sourceMappingURL=JavascriptCodeDescription.js.map